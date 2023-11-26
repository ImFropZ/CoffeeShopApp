import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.API_URI || "http://localhost:3000/api/v1",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
