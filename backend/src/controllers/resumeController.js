const { GoogleGenerativeAI } = require("@google/generative-ai");
const pool = require("../config/db");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const matchResume = async (req, res) => {
  try {
    const { resumeText, resumeFile, mimeType, jobTitle, companyName, description } = req.body;

    if (!jobTitle || !companyName || !description) {
      return res.status(400).json({
        success: false,
        message: "Job details (title, company, description) are required.",
      });
    }

    if (!resumeText && !resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Please provide either a pasted resume text or an uploaded file.",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Construct prompt
    const prompt = `
      You are an expert ATS (Applicant Tracking System) recruiter and career consultant. Compare the candidate's resume with the job description below.

      Job Title: ${jobTitle}
      Company: ${companyName}
      Job Description:
      ${description}

      ${resumeText ? `Candidate Resume:\n${resumeText}` : "The candidate's resume is provided as an attached file. Analyze its contents."}

      Perform a deep, critical compatibility analysis. You MUST output your analysis in structured JSON matching this schema:
      {
        "compatibility_score": <Integer between 0 and 100 representing how well the resume matches the job requirements>,
        "match_summary": "<A professional 2-3 sentence summary explaining the compatibility rating and overall fit>",
        "missing_skills": ["<A short skill name that is requested but missing>", ...],
        "improvement_tips": ["<Direct, actionable advice on how to improve the resume for this job>", ...],
        "learning_path": [
          {
            "skill": "<Name of missing skill>",
            "resources": ["<Actionable, high-quality learning resource name or course topic>", ...]
          },
          ...
        ]
      }

      Rules:
      - Return ONLY valid raw JSON. Do NOT wrap it in markdown block tags like \`\`\`json.
      - Ensure all fields are filled.
      - If the resume is completely unrelated, the compatibility_score should be low, and the missing_skills should reflect the gap.
      - Tailor the improvement_tips to the specific job title.
    `;

    let result;
    if (resumeFile) {
      // If a file is uploaded (multimodal Gemini call)
      const filePart = {
        inlineData: {
          data: resumeFile,
          mimeType: mimeType || "application/pdf",
        },
      };
      result = await model.generateContent([filePart, prompt]);
    } else {
      // Direct text comparison
      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    let textResponse = response.text().trim();

    // Clean up potential markdown formatting
    if (textResponse.startsWith("```")) {
      textResponse = textResponse.replace(/^```(json)?/, "").replace(/```$/, "").trim();
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(textResponse);
    } catch (parseError) {
      console.error("Gemini JSON Parse Error. Response text was:", textResponse);
      throw new Error("Failed to parse analysis results from Gemini AI.");
    }

    // Save result to Postgres
    const savedMatch = await pool.query(
      `INSERT INTO resume_matches 
      (user_id, job_title, company_name, compatibility_score, match_summary, missing_skills, improvement_tips, learning_path)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        req.user.id,
        jobTitle,
        companyName,
        parsedResult.compatibility_score,
        parsedResult.match_summary,
        JSON.stringify(parsedResult.missing_skills || []),
        JSON.stringify(parsedResult.improvement_tips || []),
        JSON.stringify(parsedResult.learning_path || []),
      ]
    );

    res.status(201).json({
      success: true,
      match: {
        ...savedMatch.rows[0],
        missing_skills: parsedResult.missing_skills || [],
        improvement_tips: parsedResult.improvement_tips || [],
        learning_path: parsedResult.learning_path || [],
      },
    });
  } catch (error) {
    console.error("Resume Match Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error while performing resume matching.",
    });
  }
};

const getResumeHistory = async (req, res) => {
  try {
    const matches = await pool.query(
      `SELECT id, job_title, company_name, compatibility_score, created_at
       FROM resume_matches
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: matches.rows.length,
      history: matches.rows,
    });
  } catch (error) {
    console.error("Get Resume History Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching resume match history.",
    });
  }
};

const getResumeDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await pool.query(
      `SELECT *
       FROM resume_matches
       WHERE id = $1 AND user_id = $2`,
      [id, req.user.id]
    );

    if (match.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Resume match analysis not found.",
      });
    }

    const row = match.rows[0];

    // Decode JSON strings back to arrays
    const formattedMatch = {
      ...row,
      missing_skills: JSON.parse(row.missing_skills || "[]"),
      improvement_tips: JSON.parse(row.improvement_tips || "[]"),
      learning_path: JSON.parse(row.learning_path || "[]"),
    };

    res.status(200).json({
      success: true,
      match: formattedMatch,
    });
  } catch (error) {
    console.error("Get Resume Detail Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching resume match detail.",
    });
  }
};

const deleteResumeMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      `DELETE FROM resume_matches
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, req.user.id]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Resume match analysis not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume match analysis deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Resume Match Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while deleting resume match analysis.",
    });
  }
};

module.exports = {
  matchResume,
  getResumeHistory,
  getResumeDetail,
  deleteResumeMatch,
};
