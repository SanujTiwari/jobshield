const express = require("express");
const {
  matchResume,
  getResumeHistory,
  getResumeDetail,
  deleteResumeMatch,
} = require("../controllers/resumeController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/match", matchResume);
router.get("/history", getResumeHistory);
router.get("/:id", getResumeDetail);
router.delete("/:id", deleteResumeMatch);

module.exports = router;
