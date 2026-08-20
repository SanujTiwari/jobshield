const pool = require("../config/db");

const getAdminStats = async (req, res) => {
  try {
    const usersCount = await pool.query("SELECT COUNT(*) FROM users");
    const scansCount = await pool.query("SELECT COUNT(*) FROM scans");
    const criticalScansCount = await pool.query(
      "SELECT COUNT(*) FROM scans WHERE risk_level = 'Critical Risk' OR risk_score >= 81"
    );
    const reportsCount = await pool.query("SELECT COUNT(*) FROM reports");
    const pendingReportsCount = await pool.query(
      "SELECT COUNT(*) FROM reports WHERE status = 'Pending'"
    );
    const confirmedScamsCount = await pool.query(
      "SELECT COUNT(*) FROM reports WHERE status = 'Confirmed'"
    );

    res.status(200).json({
      success: true,
      stats: {
        totalUsers: parseInt(usersCount.rows[0].count, 10),
        totalScans: parseInt(scansCount.rows[0].count, 10),
        criticalScans: parseInt(criticalScansCount.rows[0].count, 10),
        totalReports: parseInt(reportsCount.rows[0].count, 10),
        pendingReports: parseInt(pendingReportsCount.rows[0].count, 10),
        confirmedScams: parseInt(confirmedScamsCount.rows[0].count, 10),
      },
    });
  } catch (error) {
    console.error("Get Admin Stats Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAdminReports = async (req, res) => {
  try {
    const reportsQuery = await pool.query(
      `SELECT r.*, u.name as user_name, u.email as user_email
       FROM reports r
       LEFT JOIN users u ON r.user_id = u.id
       ORDER BY r.created_at DESC`
    );

    res.status(200).json({
      success: true,
      count: reportsQuery.rows.length,
      reports: reportsQuery.rows,
    });
  } catch (error) {
    console.error("Get Admin Reports Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Under Review", "Confirmed", "Rejected"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const updatedReport = await pool.query(
      `UPDATE reports SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (updatedReport.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.status(200).json({
      success: true,
      report: updatedReport.rows[0],
      message: `Report status updated to ${status}`,
    });
  } catch (error) {
    console.error("Update Report Status Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getAdminStats,
  getAdminReports,
  updateReportStatus,
};
