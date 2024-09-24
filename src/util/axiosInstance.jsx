import axios from "axios";
import constant from "../constant";

const axiosInstance = axios.create({
  baseURL: `${constant.VITE_APP_BACKEND_BASE_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
