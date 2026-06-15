const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateExplanation = async (jobData, riskResult) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a job scam detection expert. Analyze this job posting and provide a clear, concise explanation (2-3 sentences) of why this job posting has been rated as "${riskResult.riskLevel}" with a risk score of ${riskResult.score}/100.

Job Title: ${jobData.title}
Company: ${jobData.companyName}
Description: ${jobData.description}

Detected Risk Factors: ${riskResult.reasons.length > 0 ? riskResult.reasons.join(", ") : "No specific red flags detected"}

Provide a human-readable explanation that helps the user understand the risk assessment. Be direct and helpful. If the risk is low, reassure the user but suggest general caution. If the risk is high, clearly explain the danger signs. Do NOT use markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Explanation Error:", error);
    // Fallback: generate template-based explanation
    if (riskResult.reasons.length === 0) {
      return "This job posting appears to be legitimate. No common scam indicators were detected. However, always verify the company and job details independently before sharing personal information.";
    }
    return `This job posting has been flagged as ${riskResult.riskLevel} (score: ${riskResult.score}/100). The following concerns were identified: ${riskResult.reasons.join("; ")}. We recommend exercising caution and verifying the legitimacy of this opportunity through independent research.`;
  }
};

const chatResponse = async (userMessage) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are JobShield AI, an expert assistant specializing in detecting job scams and fraudulent employment postings. You help users understand red flags in job postings and provide advice on staying safe during their job search.

IMPORTANT RULES:
- Keep responses concise (max 3-4 paragraphs)
- Be helpful, professional, and empathetic
- If the user shares a job posting, analyze it for red flags
- Provide actionable advice
- Do NOT use markdown formatting - use plain text only
- If asked about topics unrelated to job scams/employment safety, politely redirect the conversation

User Message: ${userMessage}

Respond helpfully:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Chat AI Error:", error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment. In the meantime, remember: legitimate employers never ask for upfront payments, and always verify job postings through official company websites.";
  }
};

module.exports = { generateExplanation, chatResponse };
