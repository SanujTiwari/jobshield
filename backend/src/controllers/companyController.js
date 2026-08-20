const { verifyCompany } = require("../services/companyVerificationService");

const handleVerifyCompany = async (req, res) => {
  try {
    const { companyName, website } = req.body;
    if (!companyName && !website) {
      return res.status(400).json({
        success: false,
        message: "Company name or website is required for verification",
      });
    }

    const verificationResult = await verifyCompany({ companyName, website });
    res.status(200).json({
      success: true,
      verification: verificationResult,
    });
  } catch (error) {
    console.error("Company verification controller error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { handleVerifyCompany };
