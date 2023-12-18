import _axios from "axios";

export const jsonAxios = _axios.create({
  baseURL: import.meta.env.API_URI || "http://localhost:3000/api/v1",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
jsonAxios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export const formAxios = _axios.create({
  baseURL: import.meta.env.API_URI || "http://localhost:3000/api/v1",
  maxBodyLength: Infinity,
  headers: {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor
formAxios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);
