require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

pool.connect()
  .then(() => {
    console.log("Database Connected");

    // Initialize resume_matches table
    pool.query(`
      CREATE TABLE IF NOT EXISTS resume_matches (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        job_title VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        compatibility_score INTEGER NOT NULL,
        match_summary TEXT NOT NULL,
        missing_skills TEXT NOT NULL,
        improvement_tips TEXT NOT NULL,
        learning_path TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `).then(() => {
      console.log("resume_matches table verified/created");
    }).catch(err => {
      console.error("Error creating resume_matches table:", err);
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed:", err);
  });