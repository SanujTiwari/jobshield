import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/jobs`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/** Fetch dashboard statistics for the current user. */
export const getStats = async () => {
  const response = await axios.get(
    `${API_URL}/stats`,
    getAuthHeaders()
  );
  return response.data;
};

/** Fetch full scan history for the current user. */
export const getHistory = async () => {
  const response = await axios.get(
    `${API_URL}/history`,
    getAuthHeaders()
  );
  return response.data;
};

/**
 * Analyze a job posting for scam risk.
 * @param {object} jobData - Job fields to analyze
 * @returns {Promise<{ riskScore: number, riskLevel: string, factors: Array }>}
 */
export const analyzeJob = async (jobData) => {
  const response = await axios.post(
    `${API_URL}/analyze`,
    jobData,
    getAuthHeaders()
  );
  return response.data;
};

/**
 * Get a single job scan by ID.
 * @param {number|string} id - Job scan ID
 */
export const getSingleJob = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );
  return response.data;
};

/**
 * Delete a job scan record by ID.
 * @param {number|string} id - Job scan ID
 */
export const deleteJob = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );
  return response.data;
};