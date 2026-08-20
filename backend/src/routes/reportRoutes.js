const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createReport, getUserReports } = require("../controllers/reportController");

router.post("/", protect, createReport);
router.get("/my-reports", protect, getUserReports);

module.exports = router;
