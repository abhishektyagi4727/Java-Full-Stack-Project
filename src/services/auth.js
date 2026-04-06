// src/services/auth.js
import api from "./api";

// Register user for Spring Boot
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Login user for Spring Boot
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check if logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
