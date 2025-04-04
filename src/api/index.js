import axios from "axios";
import constant from "../constant";

const api = axios.create({
  baseURL: `${constant.BACKEDN_BASE_URL}api`,
});

//  Add authorization header to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bear ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//  dont thow error on 4XX status codes
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
