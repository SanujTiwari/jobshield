import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    userData
  );
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    userData
  );
  return response.data;
};

export const googleLoginUser = async (credential) => {
  const response = await axios.post(
    `${API_URL}/auth/google`,
    { credential }
  );
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axios.get(
    `${API_URL}/users/profile`,
    getAuthHeaders()
  );
  return response.data;
};