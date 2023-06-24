import axios from "axios";
import { store } from "../store";
import { UserRegistration } from "../store/auth/actions";

// const baseUrl = "http://lk.pride.anyusecase.com/";
// const baseUrl = BASEURL;
// export const BASEAPPURL = "https://lk.pride.anyusecase.com/";
export const BASEAPPURL = "https://api.gk-pulse.com/";
export const BASEIMAGEURL = "https://api.gk-pulse.com/assets/Img/";
// const baseUrl = BASEURL;
const instance = axios.create({
  withCredentials: true,
  baseURL: BASEAPPURL,
  headers: {
    accept: "application/json",
  },
});

export const instanceWithoutAuth = axios.create({
  // withCredentials: true,
  baseURL: BASEAPPURL,
  headers: {
    accept: "application/json",
  },
});

const { auth } = store.getState();
// const token = auth.token;

instance.interceptors.request.use((config) => {
  try {
    JSON.parse(localStorage.getItem("keySwagger"));
    config.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("keySwagger")).token
    }`;
  } finally {
    return config;
  }

  // console.log('localStorage.getItem("keySwagger")', JSON.parse(localStorage.getItem("keySwagger")))
});

instance.interceptors.response.use(
  (config) => {
    // const { auth } = store.getState();
    // console.log("instance auth", auth);
    // console.log("instance auth.refresh_token", auth.refresh_token);
    // console.log(
    //   'instance localStorage.getItem("keySwagger").refresh_token',
    //   JSON.parse(localStorage.getItem("keySwagger")).refresh_token
    // );
    return config;
  },
  async (error) => {
    try {
      // console.log(JSON.parse(localStorage.getItem("keySwagger")).refresh_token);
      // console.log(JSON.parse(localStorage.getItem("keySwagger")).token);
    } catch {
      // console.log(" error in JSON.parse(localStorage)");
      return;
    }
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      // console.log("instance 401 auth", auth);
      // console.log("instance 401 auth.refresh_token", auth.refresh_token);
      // console.log(
      //   'instance localStorage.getItem("keySwagger").refresh_token',
      //   JSON.parse(localStorage.getItem("keySwagger")).refresh_token
      // );
      originalRequest._isRetry = true;
      // global.isRetry = true;
      const rd = {
        token: {
          access_token:
            JSON.parse(localStorage.getItem("keySwagger"))?.token ?? auth.token,
          refresh_token:
            JSON.parse(localStorage.getItem("keySwagger"))?.refresh_token ??
            auth.refresh_token,
        },
      };
      // console.log("instance 401 rd", rd);
      // console.log(
      //   'instance localStorage.getItem("keySwagger")',
      //   localStorage.getItem("keySwagger")
      // );

      try {
        const response = await axios.post(
          `${BASEAPPURL}api/Auth/refresh-token`,
          rd,
          {
            withCredentials: true,
          }
        );
        // console.log("response refresh after 401", response);
        store.dispatch(
          UserRegistration({
            token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          })
        );
        // console.log("instance localStorage.setItem", response.data);
        localStorage.setItem(
          "keySwagger",
          JSON.stringify({
            token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          })
        );
        // console.log("originalRequest", originalRequest);
        // error.headers.Authorization = `Bearer ${
        //   response.data.access_token
        // }`;
        // global.isRetry = false;
        return instance.request(originalRequest);
      } catch (e) {
        console.error("instance 401 refresh error", e);
        // console.error("Not authorized");
        store.dispatch(
          UserRegistration({
            token: undefined,
            refresh_token: undefined,
          })
        );
      }
    }
    throw error;
  }
  // }
);

export default instance;
