const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyzeJob,
  getJobHistory,
  getJobStats,
  getSingleJob,
  deleteJob,
} = require("../controllers/jobController");

router.post("/analyze", protect, analyzeJob);

router.get("/history", protect, getJobHistory);
router.get("/stats", protect, getJobStats);
router.get("/:id", protect, getSingleJob);

router.delete("/:id", protect, deleteJob);

module.exports = router;