const calculateRisk = (description) => {
  let score = 0;

  const reasons = [];

  const text = description.toLowerCase();

  // Original rules
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
    reasons.push("Gmail address detected - unusual for professional recruitment");
  }

  if (text.includes("yahoo.com")) {
    score += 20;
    reasons.push("Yahoo address detected - unusual for professional recruitment");
  }

  if (text.includes("earn 1 lakh") || text.includes("earn 50000") || text.includes("earn 50,000")) {
    score += 30;
    reasons.push("Unrealistic salary claim detected");
  }

  // New enhanced rules
  if (text.includes("whatsapp")) {
    score += 20;
    reasons.push("WhatsApp contact detected - unusual for legitimate employers");
  }

  if (text.includes("telegram")) {
    score += 15;
    reasons.push("Telegram contact detected - unusual for professional recruitment");
  }

  if (text.includes("no experience required") || text.includes("no experience needed")) {
    score += 15;
    reasons.push("No experience requirement may indicate low-quality opportunity");
  }

  if (text.includes("guaranteed income") || text.includes("guaranteed salary") || text.includes("guaranteed earnings")) {
    score += 25;
    reasons.push("Guaranteed income claims are often misleading");
  }

  if (text.includes("training fee") || text.includes("training cost") || text.includes("training charge")) {
    score += 30;
    reasons.push("Training fee requested - legitimate employers provide free training");
  }

  if (text.includes("personal bank") || text.includes("bank details") || text.includes("bank account")) {
    score += 25;
    reasons.push("Personal banking information requested upfront");
  }

  if (text.includes("mlm") || text.includes("multi level") || text.includes("multi-level") || text.includes("network marketing")) {
    score += 30;
    reasons.push("Multi-level marketing scheme indicators");
  }

  if (text.includes("investment required") || (text.includes("invest") && (text.includes("money") || text.includes("amount") || text.includes("rupee")))) {
    score += 30;
    reasons.push("Investment required - potential advance-fee fraud");
  }

  if (text.includes("copy paste") || text.includes("copy-paste")) {
    score += 20;
    reasons.push("Copy-paste job scam pattern detected");
  }

  if (text.includes("work from home") || text.includes("wfh")) {
    score += 10;
    reasons.push("Work from home opportunity - verify legitimacy");
  }

  if ((text.includes("data entry") || text.includes("typing job")) && (text.includes("high") || text.includes("lakh") || text.includes("50000"))) {
    score += 15;
    reasons.push("Data entry with unusually high pay claims");
  }

  if ((text.includes("part time") || text.includes("part-time")) && (text.includes("lakh") || text.includes("50000") || text.includes("high earning"))) {
    score += 10;
    reasons.push("Part-time work with unrealistic earnings claims");
  }

  if (text.includes("click here") || text.includes("apply now") || text.includes("limited seats") || text.includes("hurry")) {
    score += 10;
    reasons.push("Aggressive call-to-action language detected");
  }

  // Cap score at 100
  score = Math.min(score, 100);

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