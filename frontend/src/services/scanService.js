import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/scans`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const scanJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/job`, jobData, getAuthHeaders());
  return response.data;
};

export const scanMessage = async (messageData) => {
  const response = await axios.post(`${API_URL}/message`, messageData, getAuthHeaders());
  return response.data;
};

export const scanPayment = async (paymentData) => {
  const response = await axios.post(`${API_URL}/payment`, paymentData, getAuthHeaders());
  return response.data;
};

export const scanRecruiter = async (recruiterData) => {
  const response = await axios.post(`${API_URL}/recruiter`, recruiterData, getAuthHeaders());
  return response.data;
};

export const scanUrl = async (urlData) => {
  const response = await axios.post(`${API_URL}/url`, urlData, getAuthHeaders());
  return response.data;
};

export const getScanHistory = async () => {
  const response = await axios.get(`${API_URL}/history`, getAuthHeaders());
  return response.data;
};

export const getSingleScan = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const deleteScan = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
