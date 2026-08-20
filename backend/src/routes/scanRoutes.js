const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  scanJob,
  scanMessage,
  scanPayment,
  scanRecruiter,
  scanUrl,
  getScanHistory,
  getSingleScan,
  deleteScan,
} = require("../controllers/scanController");

router.post("/job", protect, scanJob);
router.post("/message", protect, scanMessage);
router.post("/payment", protect, scanPayment);
router.post("/recruiter", protect, scanRecruiter);
router.post("/url", protect, scanUrl);

router.get("/history", protect, getScanHistory);
router.get("/:id", protect, getSingleScan);
router.delete("/:id", protect, deleteScan);

module.exports = router;
