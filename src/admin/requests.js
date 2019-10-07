import axios from "axios";
import { BASE_URL } from "@/helpers/consts";
import { setToken, getToken } from "@/helpers/token";

const token = getToken();

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers["Authorization"] = `Bearer ${token}`;

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  error => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      return axios.post("/refreshToken").then(response => {
        const token = response.data.token;
        setToken(token);
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return axios(originalRequest);
      }).catch(error => {
        console.error(error.message);
      });
    }
    return Promise.reject(error);
  }
);

export default axios;