// api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  withCredentials: true, 
});

export default API;

// User Login
export const userLogin = async (email, password) => {
  try {
    const response = await API.post("/user/login", { email, password });
    return response.data;
  } catch (err) {
    const backendMessage = err?.response?.data?.message || err?.message || "Unknown error";
    throw new Error(`Login failed: ${backendMessage}`);
  }
};

// User Signup
export const userSignup = async (name, email, password) => {
  try {
    const response = await API.post("/user/signup", { name, email, password });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(`Error! Cannot Signup. ${err.message}`);
  }
};

// Check Auth Status
export const getAuthStatus = async () => {
  try {
    const response = await API.get("/user/auth-status");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Send a New Chat Message
export const postChatRequest = async (message) => {
  try {
    const response = await API.post("/chat/new", { message });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

// Get All Chats
export const getAllChats = async () => {
  try {
    const response = await API.get("/chat/all-chats");
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

// Delete All Chats
export const deleteAllChats = async () => {
  try {
    const response = await API.delete("/chat/delete-all-chats");
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const response = await API.get("/user/logout");
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
