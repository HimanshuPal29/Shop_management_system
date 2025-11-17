// src/services/authService.js
import API from "../api/api";

export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await API.post("/auth/login", userData);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
