const pool = require("../config/db");

const adminMiddleware = async (req, res, next) => {
  try {
    const userQuery = await pool.query(
      "SELECT id, role FROM users WHERE id = $1",
      [req.user.id]
    );

    if (userQuery.rows.length === 0 || userQuery.rows[0].role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = adminMiddleware;
