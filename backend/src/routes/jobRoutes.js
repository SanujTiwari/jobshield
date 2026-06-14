const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyzeJob,
  getJobHistory,
} = require("../controllers/jobController");

router.post("/analyze", protect, analyzeJob);

router.get("/history", protect, getJobHistory);

module.exports = router;