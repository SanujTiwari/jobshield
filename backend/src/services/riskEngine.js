/**
 * ScamShield Risk Engine V2
 * Multi-Type Scam Detection & Prevention Engine
 */

// Helper to determine risk level from normalized 0-100 score
const getRiskLevel = (score) => {
  if (score <= 20) return "Safe";
  if (score <= 40) return "Low Risk";
  if (score <= 60) return "Medium Risk";
  if (score <= 80) return "High Risk";
  return "Critical Risk";
};

// Helper to determine factor severity from score contribution
const getSeverity = (factorScore) => {
  if (factorScore >= 30) return "Critical";
  if (factorScore >= 20) return "High";
  if (factorScore >= 10) return "Medium";
  return "Low";
};

// Recommendation Generator based on detected risk categories
const generateRecommendations = (riskFactors) => {
  const recommendations = new Set();
  const categories = new Set(riskFactors.map((f) => f.category));

  if (categories.has("Payment Risk")) {
    recommendations.add("Do not make any upfront payments, registration fees, or security deposits.");
    recommendations.add("Legitimate employers or platforms never ask candidates to pay for employment.");
  }

  if (categories.has("Communication Risk")) {
    recommendations.add("Avoid communicating exclusively via informal messaging apps like WhatsApp or Telegram.");
    recommendations.add("Request formal written communication from an official corporate email domain.");
  }

  if (categories.has("Company Risk") || categories.has("Identity Risk")) {
    recommendations.add("Verify the organization through official public business registries and company websites.");
    recommendations.add("Contact the company directly using phone numbers listed on their official website.");
  }

  if (categories.has("URL Risk")) {
    recommendations.add("Do not click unverified links or enter personal credentials on non-HTTPS or suspicious domains.");
    recommendations.add("Double-check the web address domain for typosquatting or misspellings.");
  }

  if (categories.has("Behavior Risk")) {
    recommendations.add("Never share sensitive banking details, OTPs, or passwords.");
    recommendations.add("Be cautious of high-pressure urgency claims or offers that seem too good to be true.");
  }

  if (recommendations.size === 0) {
    recommendations.add("Exercise standard due diligence and verify contact credentials before proceeding.");
  }

  return Array.from(recommendations);
};

// 1. Job Scam Scanner
const analyzeJob = (jobData = {}) => {
  const text = `${jobData.title || ''} ${jobData.companyName || ''} ${jobData.description || ''} ${jobData.salary || ''} ${jobData.email || ''}`.toLowerCase();
  const factors = [];
  let rawScore = 0;

  // Payment Risk Factors
  if (text.includes("registration fee") || text.includes("application fee")) {
    const score = 30;
    rawScore += score;
    factors.push({
      category: "Payment Risk",
      reason: "Registration or application fee requested before employment",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("security deposit") || text.includes("caution money")) {
    const score = 30;
    rawScore += score;
    factors.push({
      category: "Payment Risk",
      reason: "Security deposit required upfront",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("training fee") || text.includes("training charge")) {
    const score = 25;
    rawScore += score;
    factors.push({
      category: "Payment Risk",
      reason: "Mandatory training fee charged to applicant",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("investment required") || text.includes("starter kit purchase")) {
    const score = 30;
    rawScore += score;
    factors.push({
      category: "Payment Risk",
      reason: "Monetary investment or product purchase required",
      score,
      severity: getSeverity(score),
    });
  }

  // Communication & Channel Risk
  if (text.includes("gmail.com") || text.includes("yahoo.com") || text.includes("hotmail.com") || text.includes("outlook.com")) {
    const score = 20;
    rawScore += score;
    factors.push({
      category: "Communication Risk",
      reason: "Free public email domain used for official recruitment",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("whatsapp") || text.includes("telegram")) {
    const score = 20;
    rawScore += score;
    factors.push({
      category: "Communication Risk",
      reason: "Communication directed exclusively via instant messaging platforms",
      score,
      severity: getSeverity(score),
    });
  }

  // Content & Salary Risk
  if (text.includes("earn 1 lakh") || text.includes("earn 50000") || text.includes("earn $4000/week") || text.includes("guaranteed income")) {
    const score = 25;
    rawScore += score;
    factors.push({
      category: "Content Risk",
      reason: "Unrealistic or guaranteed earnings claims for minimal work",
      score,
      severity: getSeverity(score),
    });
  }

  if ((text.includes("data entry") || text.includes("typing job")) && (text.includes("high pay") || text.includes("daily payout"))) {
    const score = 20;
    rawScore += score;
    factors.push({
      category: "Content Risk",
      reason: "High-compensation claim associated with low-skill tasks",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("no experience required") && (text.includes("manager") || text.includes("director") || text.includes("executive"))) {
    const score = 15;
    rawScore += score;
    factors.push({
      category: "Content Risk",
      reason: "No experience required for senior-level title",
      score,
      severity: getSeverity(score),
    });
  }

  // Behavior Risk
  if (text.includes("urgent hiring") || text.includes("immediate joiner") || text.includes("limited seats")) {
    const score = 10;
    rawScore += score;
    factors.push({
      category: "Behavior Risk",
      reason: "High-pressure urgency or artificial scarcity phrasing",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("bank details") || text.includes("bank account") || text.includes("otp") || text.includes("credit card")) {
    const score = 25;
    rawScore += score;
    factors.push({
      category: "Behavior Risk",
      reason: "Sensitive financial or identity credentials requested upfront",
      score,
      severity: getSeverity(score),
    });
  }

  const normalizedScore = Math.min(rawScore, 100);
  const riskLevel = getRiskLevel(normalizedScore);
  const recommendations = generateRecommendations(factors);

  return {
    score: normalizedScore,
    riskLevel,
    riskFactors: factors,
    reasons: factors.map((f) => f.reason),
    recommendations,
  };
};

// 2. Message Scam Scanner
const analyzeMessage = (messageData = {}) => {
  const text = `${messageData.message || ''} ${messageData.senderEmail || ''} ${messageData.platform || ''}`.toLowerCase();
  const factors = [];
  let rawScore = 0;

  if (text.includes("congratulations") && (text.includes("selected") || text.includes("hired"))) {
    const score = 20;
    rawScore += score;
    factors.push({
      category: "Behavior Risk",
      reason: "Unsolicited job offer without formal interview process",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("pay") || text.includes("fee") || text.includes("transfer") || text.includes("rupee") || text.includes("$")) {
    const score = 30;
    rawScore += score;
    factors.push({
      category: "Payment Risk",
      reason: "Direct payment or fund transfer request inside message",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("whatsapp") || text.includes("telegram") || text.includes("signal")) {
    const score = 15;
    rawScore += score;
    factors.push({
      category: "Communication Risk",
      reason: "Request to move communication off official channels",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("urgent") || text.includes("immediately") || text.includes("expire today")) {
    const score = 15;
    rawScore += score;
    factors.push({
      category: "Behavior Risk",
      reason: "High-pressure urgency tactics detected",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("http://") || text.includes("bit.ly") || text.includes("tinyurl")) {
    const score = 20;
    rawScore += score;
    factors.push({
      category: "URL Risk",
      reason: "Shortened or unencrypted hyperlink contained in message",
      score,
      severity: getSeverity(score),
    });
  }

  const normalizedScore = Math.min(rawScore, 100);
  return {
    score: normalizedScore,
    riskLevel: getRiskLevel(normalizedScore),
    riskFactors: factors,
    reasons: factors.map((f) => f.reason),
    recommendations: generateRecommendations(factors),
  };
};

// 3. Payment Scam Scanner
const analyzePayment = (paymentData = {}) => {
  const text = `${paymentData.requestText || ''} ${paymentData.amount || ''} ${paymentData.reason || ''} ${paymentData.method || ''}`.toLowerCase();
  const factors = [];
  let rawScore = 0;

  if (text.includes("registration") || text.includes("processing fee") || text.includes("badge fee")) {
    const score = 35;
    rawScore += score;
    factors.push({
      category: "Payment Risk",
      reason: "Upfront processing or badge registration fee requested",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("crypto") || text.includes("gift card") || text.includes("upi") || text.includes("personal account")) {
    const score = 30;
    rawScore += score;
    factors.push({
      category: "Payment Risk",
      reason: "Non-standard, non-reversible, or personal payment method requested",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("refundable") || text.includes("100% refund")) {
    const score = 20;
    rawScore += score;
    factors.push({
      category: "Behavior Risk",
      reason: "Guaranteed refund claim often used to entice advance-fee fraud",
      score,
      severity: getSeverity(score),
    });
  }

  const normalizedScore = Math.min(rawScore, 100);
  return {
    score: normalizedScore,
    riskLevel: getRiskLevel(normalizedScore),
    riskFactors: factors,
    reasons: factors.map((f) => f.reason),
    recommendations: generateRecommendations(factors),
  };
};

// 4. Recruiter Scanner
const analyzeRecruiter = (recruiterData = {}) => {
  const text = `${recruiterData.name || ''} ${recruiterData.email || ''} ${recruiterData.company || ''} ${recruiterData.phone || ''}`.toLowerCase();
  const factors = [];
  let rawScore = 0;

  if (text.includes("gmail") || text.includes("yahoo") || text.includes("hotmail") || text.includes("outlook")) {
    const score = 25;
    rawScore += score;
    factors.push({
      category: "Identity Risk",
      reason: "Recruiter using free public webmail instead of official corporate domain",
      score,
      severity: getSeverity(score),
    });
  }

  if (!recruiterData.company || recruiterData.company.trim().length === 0) {
    const score = 20;
    rawScore += score;
    factors.push({
      category: "Company Risk",
      reason: "Missing or unverified employer affiliation",
      score,
      severity: getSeverity(score),
    });
  }

  if (text.includes("hr manager") && text.includes("whatsapp")) {
    const score = 20;
    rawScore += score;
    factors.push({
      category: "Communication Risk",
      reason: "Recruiter conducting official HR affairs over instant messaging",
      score,
      severity: getSeverity(score),
    });
  }

  const normalizedScore = Math.min(rawScore, 100);
  return {
    score: normalizedScore,
    riskLevel: getRiskLevel(normalizedScore),
    riskFactors: factors,
    reasons: factors.map((f) => f.reason),
    recommendations: generateRecommendations(factors),
  };
};

// 5. URL Scanner
const analyzeUrl = (urlData = {}) => {
  const url = (urlData.url || '').toLowerCase();
  const factors = [];
  let rawScore = 0;

  if (url.startsWith("http://")) {
    const score = 25;
    rawScore += score;
    factors.push({
      category: "URL Risk",
      reason: "Insecure web protocol (HTTP instead of HTTPS)",
      score,
      severity: getSeverity(score),
    });
  }

  if (url.includes("bit.ly") || url.includes("tinyurl") || url.includes("t.co") || url.includes("is.gd")) {
    const score = 20;
    rawScore += score;
    factors.push({
      category: "URL Risk",
      reason: "URL shortener hiding true destination domain",
      score,
      severity: getSeverity(score),
    });
  }

  if (url.includes("login") || url.includes("verify") || url.includes("bank") || url.includes("account")) {
    if (url.includes(".xyz") || url.includes(".top") || url.includes(".site") || url.includes(".info")) {
      const score = 30;
      rawScore += score;
      factors.push({
        category: "URL Risk",
        reason: "Sensitive keyword combined with cheap/suspicious top-level domain",
        score,
        severity: getSeverity(score),
      });
    }
  }

  if (url.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) {
    const score = 35;
    rawScore += score;
    factors.push({
      category: "URL Risk",
      reason: "Raw IP address used in place of registered domain name",
      score,
      severity: getSeverity(score),
    });
  }

  const normalizedScore = Math.min(rawScore, 100);
  return {
    score: normalizedScore,
    riskLevel: getRiskLevel(normalizedScore),
    riskFactors: factors,
    reasons: factors.map((f) => f.reason),
    recommendations: generateRecommendations(factors),
  };
};

// Backwards compatibility wrapper for original JobShield risk calculation call
const calculateRisk = (description) => {
  if (typeof description === "object" && description !== null) {
    return analyzeJob(description);
  }
  return analyzeJob({ description: String(description || "") });
};

module.exports = calculateRisk;
module.exports.getRiskLevel = getRiskLevel;
module.exports.analyzeJob = analyzeJob;
module.exports.analyzeMessage = analyzeMessage;
module.exports.analyzePayment = analyzePayment;
module.exports.analyzeRecruiter = analyzeRecruiter;
module.exports.analyzeUrl = analyzeUrl;