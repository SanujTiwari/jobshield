import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/admin`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAdminStats = async () => {
  const response = await axios.get(`${API_URL}/stats`, getAuthHeaders());
  return response.data;
};

export const getAdminReports = async () => {
  const response = await axios.get(`${API_URL}/reports`, getAuthHeaders());
  return response.data;
};

export const updateReportStatus = async (reportId, status) => {
  const response = await axios.put(`${API_URL}/reports/${reportId}/status`, { status }, getAuthHeaders());
  return response.data;
};
