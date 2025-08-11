// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://excel-project-1.onrender.com", // deployed backend URL
  withCredentials: true,            // ✅ send cookies for auth
});

export default instance;
