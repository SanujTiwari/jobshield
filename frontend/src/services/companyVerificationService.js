import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/companies`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const verifyCompany = async ({ companyName, website }) => {
  const response = await axios.post(`${API_URL}/verify`, { companyName, website }, getAuthHeaders());
  return response.data;
};
