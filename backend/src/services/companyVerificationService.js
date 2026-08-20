const pool = require("../config/db");

/**
 * ScamShield Company Verification Service Abstraction
 * Performs company record lookup & domain authenticity verification
 */
const verifyCompany = async ({ companyName, website }) => {
  if (!companyName || companyName.trim().length === 0) {
    return {
      companyName: "Unknown",
      website: website || "",
      status: "Insufficient Information",
      riskScore: 50,
      details: "No company name provided for verification.",
    };
  }

  const name = companyName.trim();
  const domain = website ? website.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0] : '';

  try {
    // 1. Search database registry for existing records
    const dbQuery = await pool.query(
      `SELECT * FROM companies WHERE LOWER(name) = $1 OR (website IS NOT NULL AND LOWER(website) LIKE $2)`,
      [name.toLowerCase(), `%${domain}%`]
    );

    if (dbQuery.rows.length > 0) {
      const match = dbQuery.rows[0];
      return {
        companyName: match.name,
        website: match.website || website || "",
        status: match.verification_status || "Unverified",
        riskScore: match.risk_score || 0,
        details: `Record matched in ScamShield company registry. Verification status: ${match.verification_status}.`,
      };
    }

    // 2. Domain Technical Heuristic Analysis
    if (domain) {
      // Check for suspicious TLDs often associated with phishing
      if (domain.endsWith(".xyz") || domain.endsWith(".top") || domain.endsWith(".site") || domain.endsWith(".info") || domain.endsWith(".work")) {
        return {
          companyName: name,
          website: domain,
          status: "Suspicious",
          riskScore: 65,
          details: "Company domain uses a high-risk cheap top-level domain frequently associated with impersonation.",
        };
      }

      // Check if domain uses free webmail hosts
      if (domain.includes("gmail.com") || domain.includes("yahoo.com") || domain.includes("hotmail.com")) {
        return {
          companyName: name,
          website: domain,
          status: "Suspicious",
          riskScore: 70,
          details: "Webmail domain provided as company website address.",
        };
      }
    }

    // 3. Fallback when no public verification API integrated
    return {
      companyName: name,
      website: domain || website || "",
      status: "Insufficient Information",
      riskScore: 30,
      details: "No external verification records found in public registry. Recommend verifying company credentials independently.",
    };
  } catch (error) {
    console.error("Company verification service error:", error);
    return {
      companyName: name,
      website: website || "",
      status: "Insufficient Information",
      riskScore: 0,
      details: "Verification lookup service error.",
    };
  }
};

module.exports = { verifyCompany };
