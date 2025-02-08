import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalReq = error.config;
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) return Promise.reject(error);
      try {
        const res = await axiosClient.post("/auth/refresh-token", {
          refreshToken: refreshToken,
        });
        Cookies.set("accessToken", res.data.accessToken);
        originalReq.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axiosClient(originalReq);
      } catch (error) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userId");
        localStorage.removeItem("accessToken");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    }
  }
);
export default axiosClient;
