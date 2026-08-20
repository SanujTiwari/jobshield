const pool = require("../config/db");
const {
  analyzeJob,
  analyzeMessage,
  analyzePayment,
  analyzeRecruiter,
  analyzeUrl,
} = require("../services/riskEngine");
const { generateExplanation } = require("../services/aiService");

// Generic internal save function for scans + risk_factors
const saveScanRecord = async (userId, scanType, inputData, result) => {
  let aiExplanation = "";
  try {
    aiExplanation = await generateExplanation(
      { title: inputData.title || scanType, companyName: inputData.companyName || inputData.senderEmail || "N/A", description: JSON.stringify(inputData) },
      result
    );
  } catch (err) {
    console.error("AI Explanation error:", err);
    aiExplanation = `This scan yielded a risk score of ${result.score}/100 (${result.riskLevel}).`;
  }

  // 1. Insert scan
  const scanQuery = await pool.query(
    `INSERT INTO scans (user_id, scan_type, input_data, risk_score, risk_level, ai_explanation)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      userId,
      scanType,
      JSON.stringify(inputData),
      result.score,
      result.riskLevel,
      aiExplanation,
    ]
  );

  const savedScan = scanQuery.rows[0];

  // 2. Insert risk_factors
  if (result.riskFactors && result.riskFactors.length > 0) {
    for (const factor of result.riskFactors) {
      await pool.query(
        `INSERT INTO risk_factors (scan_id, category, reason, score, severity)
         VALUES ($1, $2, $3, $4, $5)`,
        [savedScan.id, factor.category, factor.reason, factor.score, factor.severity]
      );
    }
  }

  // Also maintain backwards compatibility in jobs table if it's a job scan
  if (scanType === "job" && inputData.title && inputData.companyName) {
    try {
      await pool.query(
        `INSERT INTO jobs (user_id, title, company_name, description, risk_score, risk_level, reasons, ai_explanation)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          userId,
          inputData.title,
          inputData.companyName,
          inputData.description || "",
          result.score,
          result.riskLevel,
          JSON.stringify(result.reasons || []),
          aiExplanation,
        ]
      );
    } catch (e) {
      console.error("Jobs fallback table insert error:", e);
    }
  }

  return {
    ...savedScan,
    riskFactors: result.riskFactors || [],
    recommendations: result.recommendations || [],
  };
};

// Scan Handlers
const scanJob = async (req, res) => {
  try {
    const { title, companyName, description, salary, email, phone, website } = req.body;
    if (!title || !companyName || !description) {
      return res.status(400).json({ success: false, message: "Title, company name, and description are required" });
    }

    const inputData = { title, companyName, description, salary, email, phone, website };
    const result = analyzeJob(inputData);
    const saved = await saveScanRecord(req.user.id, "job", inputData, result);

    res.status(201).json({ success: true, scan: saved });
  } catch (error) {
    console.error("Scan Job Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const scanMessage = async (req, res) => {
  try {
    const { message, senderEmail, senderPhone, platform } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: "Message content is required" });
    }

    const inputData = { message, senderEmail, senderPhone, platform };
    const result = analyzeMessage(inputData);
    const saved = await saveScanRecord(req.user.id, "message", inputData, result);

    res.status(201).json({ success: true, scan: saved });
  } catch (error) {
    console.error("Scan Message Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const scanPayment = async (req, res) => {
  try {
    const { requestText, amount, reason, method, senderInfo } = req.body;
    if (!requestText && !reason) {
      return res.status(400).json({ success: false, message: "Payment request description or reason is required" });
    }

    const inputData = { requestText, amount, reason, method, senderInfo };
    const result = analyzePayment(inputData);
    const saved = await saveScanRecord(req.user.id, "payment", inputData, result);

    res.status(201).json({ success: true, scan: saved });
  } catch (error) {
    console.error("Scan Payment Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const scanRecruiter = async (req, res) => {
  try {
    const { name, email, phone, company, profileUrl } = req.body;
    if (!name && !email) {
      return res.status(400).json({ success: false, message: "Recruiter name or email is required" });
    }

    const inputData = { name, email, phone, company, profileUrl };
    const result = analyzeRecruiter(inputData);
    const saved = await saveScanRecord(req.user.id, "recruiter", inputData, result);

    res.status(201).json({ success: true, scan: saved });
  } catch (error) {
    console.error("Scan Recruiter Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const scanUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: "URL is required" });
    }

    const inputData = { url };
    const result = analyzeUrl(inputData);
    const saved = await saveScanRecord(req.user.id, "url", inputData, result);

    res.status(201).json({ success: true, scan: saved });
  } catch (error) {
    console.error("Scan URL Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getScanHistory = async (req, res) => {
  try {
    const query = await pool.query(
      `SELECT s.*, COALESCE(json_agg(rf.*) FILTER (WHERE rf.id IS NOT NULL), '[]') AS risk_factors
       FROM scans s
       LEFT JOIN risk_factors rf ON rf.scan_id = s.id
       WHERE s.user_id = $1
       GROUP BY s.id
       ORDER BY s.created_at DESC`,
      [req.user.id]
    );

    res.status(200).json({ success: true, count: query.rows.length, scans: query.rows });
  } catch (error) {
    console.error("Get Scan History Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getSingleScan = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await pool.query(
      `SELECT s.*, COALESCE(json_agg(rf.*) FILTER (WHERE rf.id IS NOT NULL), '[]') AS risk_factors
       FROM scans s
       LEFT JOIN risk_factors rf ON rf.scan_id = s.id
       WHERE s.id = $1 AND s.user_id = $2
       GROUP BY s.id`,
      [id, req.user.id]
    );

    if (query.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Scan not found" });
    }

    res.status(200).json({ success: true, scan: query.rows[0] });
  } catch (error) {
    console.error("Get Single Scan Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteScan = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query(
      `DELETE FROM scans WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, req.user.id]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Scan not found" });
    }

    res.status(200).json({ success: true, message: "Scan record deleted successfully" });
  } catch (error) {
    console.error("Delete Scan Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  scanJob,
  scanMessage,
  scanPayment,
  scanRecruiter,
  scanUrl,
  getScanHistory,
  getSingleScan,
  deleteScan,
};
