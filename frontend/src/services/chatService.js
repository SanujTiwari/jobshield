import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const sendChatMessage = async (message) => {
  const response = await axios.post(
    API_URL,
    { message },
    getAuthHeaders()
  );
  return response.data;
};
