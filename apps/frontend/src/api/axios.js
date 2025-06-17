import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "__REACT_APP_API_BASE_URL__" || "http://localhost:8000";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
