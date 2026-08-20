const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { handleVerifyCompany } = require("../controllers/companyController");

router.post("/verify", protect, handleVerifyCompany);

module.exports = router;
