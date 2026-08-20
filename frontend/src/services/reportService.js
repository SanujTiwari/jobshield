import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/reports`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const submitScamReport = async (reportData) => {
  const response = await axios.post(API_URL, reportData, getAuthHeaders());
  return response.data;
};

export const getMyReports = async () => {
  const response = await axios.get(`${API_URL}/my-reports`, getAuthHeaders());
  return response.data;
};
