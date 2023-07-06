import axios from "axios";
import { store, useAppDispatch } from "../store";
import { UserLogout } from "../store/auth/actions";
// import { logoutUser } from "../features/auth/authSlice";
// import { resetUserInfo } from "../features/userInfo/userInfoSlice";

export const API_URL = "https://api.in-mtb.com";

const localAccessToken = localStorage.getItem("accessToken");
const localRefreshToken = localStorage.getItem("refreshToken");

// Logout
const logoutHandler = () => {
  store.dispatch(UserLogout());
};

const $api = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
});

export const $apiWithoutToken = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },

  async (error) => {
    const originalRequest = error.config;
    const localRefreshToken = await localStorage.getItem("refreshToken");

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const data = {
          refresh_token: localRefreshToken,
        };

        const config = {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        };

        const response = await axios.post(
          `${API_URL}/api/App/refresh-token`,
          data,
          config
        );

        if (response.data) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        return $api.request(originalRequest);
      } catch (error: any) {
        console.error("INTESEEPTOR ERROR apiServis", error);
        logoutHandler();
      }
    }
    throw error;
  }
);

export default $api;
