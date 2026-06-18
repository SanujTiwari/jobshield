import axios from "axios";

const API_URL = "http://localhost:5000/api/resume";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const matchResume = async (matchData) => {
  const response = await axios.post(
    `${API_URL}/match`,
    matchData,
    getAuthHeaders()
  );
  return response.data;
};

export const getResumeHistory = async () => {
  const response = await axios.get(
    `${API_URL}/history`,
    getAuthHeaders()
  );
  return response.data;
};

export const getResumeDetail = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );
  return response.data;
};

export const deleteResumeMatch = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );
  return response.data;
};
