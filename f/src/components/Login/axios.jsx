// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // or your deployed backend URL
  withCredentials: true,            // ✅ send cookies for auth
});

export default instance;
