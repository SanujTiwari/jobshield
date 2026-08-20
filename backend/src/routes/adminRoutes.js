const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getAdminStats,
  getAdminReports,
  updateReportStatus,
} = require("../controllers/adminController");

router.get("/stats", protect, adminMiddleware, getAdminStats);
router.get("/reports", protect, adminMiddleware, getAdminReports);
router.put("/reports/:id/status", protect, adminMiddleware, updateReportStatus);

module.exports = router;
