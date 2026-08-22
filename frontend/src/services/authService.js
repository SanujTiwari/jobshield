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

/**
 * Register a new user account.
 * @param {{ name: string, email: string, password: string }} userData
 * @returns {Promise<{ token: string, user: object }>}
 */
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    userData
  );
  return response.data;
};

/**
 * Authenticate with email and password.
 * @param {{ email: string, password: string }} userData
 * @returns {Promise<{ token: string, user: object }>}
 */
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    userData
  );
  return response.data;
};

/**
 * Authenticate using Google OAuth credential token.
 * @param {string} credential - Google ID token from OAuth flow
 * @returns {Promise<{ token: string, user: object }>}
 */
export const googleLoginUser = async (credential) => {
  const response = await axios.post(
    `${API_URL}/auth/google`,
    { credential }
  );
  return response.data;
};

/**
 * Fetch the currently authenticated user's profile.
 * @returns {Promise<{ user: object }>}
 */
export const getUserProfile = async () => {
  const response = await axios.get(
    `${API_URL}/users/profile`,
    getAuthHeaders()
  );
  return response.data;
};