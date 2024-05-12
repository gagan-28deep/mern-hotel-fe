import axios from "axios";
import getStorage, { removeStorage, setStorage } from "./storageService";

const backend_url = String(import.meta.env.VITE_BACKEND_URL);
const createSecureAxiosClient = (baseURL) => {
  const url = backend_url;
  const instance = axios.create({
    baseURL,
  });
  instance.interceptors.request.use(
    (config) => {
      const token = getStorage("accessToken", { decrypt: true });
      config.headers.Authorization = token ? `${token}` : "";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = newAccessToken
          ? `${newAccessToken}`
          : "";
        //originalRequest.headers.client_id = process.env.REACT_APP_DS_CLIENT_ID;
        //originalRequest.headers.client_secret = process.env.REACT_APP_DS_CLIENT_SECRET;
        return instance(originalRequest);
      }

      return Promise.reject(error);
    }
  );
  async function refreshAccessToken() {
    let newAccessToken = null;
    try {
      const refreshToken = getStorage("refreshToken", { decrypt: true });
      newAccessToken = await axios.post(`${url}/user/refresh-token`, {
        refreshToken,
      });
      console.log("newww", newAccessToken);
      setStorage('accessToken', newAccessToken?.data?.accessToken);
    } catch (error) {
      console.log(
        "========================refreshToken================================"
      );
      console.log(error);
      removeStorage("accessToken");
      removeStorage("refreshToken");
      window.location.href = "/login";
      return;
    }
    return newAccessToken?.data?.access_token;
  }
  return instance;
};

export default createSecureAxiosClient;
