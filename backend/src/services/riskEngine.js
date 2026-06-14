const calculateRisk = (description) => {
  let score = 0;

  const text = description.toLowerCase();

  if (text.includes("registration fee")) score += 30;

  if (text.includes("security deposit")) score += 30;

  if (text.includes("urgent hiring")) score += 10;

  if (text.includes("gmail.com")) score += 20;

  if (text.includes("yahoo.com")) score += 20;

  if (text.includes("earn 1 lakh")) score += 30;

  let riskLevel = "Low Risk";

  if (score >= 60) {
    riskLevel = "High Risk";
  } else if (score >= 30) {
    riskLevel = "Medium Risk";
  }

  return {
    score,
    riskLevel,
  };
};

module.exports = calculateRisk;