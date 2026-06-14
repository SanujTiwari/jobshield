const calculateRisk = (description) => {
  let score = 0;

  const reasons = [];

  const text = description.toLowerCase();

  if (text.includes("registration fee")) {
    score += 30;
    reasons.push("Registration fee detected");
  }

  if (text.includes("security deposit")) {
    score += 30;
    reasons.push("Security deposit requested");
  }

  if (text.includes("urgent hiring")) {
    score += 10;
    reasons.push("Urgent hiring phrase detected");
  }

  if (text.includes("gmail.com")) {
    score += 20;
    reasons.push("Gmail address detected");
  }

  if (text.includes("yahoo.com")) {
    score += 20;
    reasons.push("Yahoo address detected");
  }

  if (text.includes("earn 1 lakh")) {
    score += 30;
    reasons.push("Unrealistic salary claim detected");
  }

  let riskLevel = "Low Risk";

  if (score >= 60) {
    riskLevel = "High Risk";
  } else if (score >= 30) {
    riskLevel = "Medium Risk";
  }

  return {
    score,
    riskLevel,
    reasons,
  };
};

module.exports = calculateRisk;