const pool = require("../config/db");

const createReport = async (req, res) => {
  try {
    const { scanId, scamType, companyName, recruiterInfo, description, evidence } = req.body;
    if (!scamType || !description) {
      return res.status(400).json({
        success: false,
        message: "Scam type and description are required",
      });
    }

    const newReport = await pool.query(
      `INSERT INTO reports (user_id, scan_id, scam_type, company_name, recruiter_info, description, evidence, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Pending')
       RETURNING *`,
      [req.user.id, scanId || null, scamType, companyName || null, recruiterInfo || null, description, evidence || null]
    );

    res.status(201).json({
      success: true,
      report: newReport.rows[0],
      message: "Scam report submitted successfully for review.",
    });
  } catch (error) {
    console.error("Create Report Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getUserReports = async (req, res) => {
  try {
    const reports = await pool.query(
      `SELECT * FROM reports WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: reports.rows.length,
      reports: reports.rows,
    });
  } catch (error) {
    console.error("Get User Reports Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createReport,
  getUserReports,
};
