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

export const getStats = async () => {
  const response = await axios.get(
    `${API_URL}/stats`,
    getAuthHeaders()
  );
  return response.data;
};

export const getHistory = async () => {
  const response = await axios.get(
    `${API_URL}/history`,
    getAuthHeaders()
  );
  return response.data;
};

export const analyzeJob = async (jobData) => {
  const response = await axios.post(
    `${API_URL}/analyze`,
    jobData,
    getAuthHeaders()
  );
  return response.data;
};

export const getSingleJob = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );
  return response.data;
};