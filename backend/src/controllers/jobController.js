const pool = require("../config/db");
const calculateRisk = require("../services/riskEngine");

const analyzeJob = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Job description is required",
      });
    }

    const result = calculateRisk(description);

    const savedAnalysis = await pool.query(
      `INSERT INTO jobs
      (user_id, description, risk_score, risk_level)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        req.user.id,
        description,
        result.score,
        result.riskLevel,
      ]
    );

    res.status(201).json({
      success: true,
      analysis: savedAnalysis.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getJobHistory = async (req, res) => {
  try {
    const jobs = await pool.query(
      `SELECT *
       FROM jobs
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: jobs.rows.length,
      jobs: jobs.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  analyzeJob,
  getJobHistory,
};