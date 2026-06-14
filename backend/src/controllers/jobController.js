const pool = require("../config/db");
const calculateRisk = require("../services/riskEngine");

const analyzeJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      description,
    } = req.body;

    if (!title || !companyName || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = calculateRisk(description);

    const savedAnalysis = await pool.query(
      `INSERT INTO jobs
      (
        user_id,
        title,
        company_name,
        description,
        risk_score,
        risk_level,
        reasons
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        req.user.id,
        title,
        companyName,
        description,
        result.score,
        result.riskLevel,
        JSON.stringify(result.reasons),
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

const getJobStats = async (req, res) => {
  try {
    const jobs = await pool.query(
      `SELECT risk_level
       FROM jobs
       WHERE user_id = $1`,
      [req.user.id]
    );

    const stats = {
      totalJobs: jobs.rows.length,
      highRisk: 0,
      mediumRisk: 0,
      lowRisk: 0,
    };

    jobs.rows.forEach((job) => {
      if (job.risk_level === "High Risk") {
        stats.highRisk++;
      } else if (job.risk_level === "Medium Risk") {
        stats.mediumRisk++;
      } else {
        stats.lowRisk++;
      }
    });

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await pool.query(
      `SELECT *
       FROM jobs
       WHERE id = $1
       AND user_id = $2`,
      [id, req.user.id]
    );

    if (job.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      job: job.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJob = await pool.query(
      `DELETE FROM jobs
       WHERE id = $1
       AND user_id = $2
       RETURNING *`,
      [id, req.user.id]
    );

    if (deletedJob.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Analysis deleted successfully",
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
  getJobStats,
  getSingleJob,
  deleteJob,
};