import axios from "axios";
import {
  AllInfoUserMain,
  initialStateAllInfoUser,
  IsRuAC,
  UserAvatar,
  UserWallets,
} from "../../store/allInfoUser";
import { UserLogout, UserRegistration } from "../../store/auth/actions";
import {
  setContestsListActive,
  setContestsListPast,
} from "../../store/contest/actions";
import { store } from "../../store/index";
import { UserData } from "../../store/userData/actions";
import { initialStateUserData } from "../../store/userData/reducer";
import { Votes } from "../../store/votes/actions";
import instance, { BASEAPPURL } from "../instance";

// const baseUrl = "http://lk.pride.anyusecase.com/";
const baseUrl = BASEAPPURL;
// const instance = axios.create({
//   withCredentials: true.valueOf,
//   baseURL: baseUrl,
//   headers: {
//     accept: "application/json",
//     // Authorization: `Bearer ${auth.token}`,
//   },
// });

// instance.interceptors.request.use((config)=> {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('keySwagger')}`;
//   return config;
// })

class CAuthApi {
  token;
  refresh_token;
  config;
  headers;

  constructor() {
    this.getStore();
  }

  async getStore() {
    const { auth } = store.getState();
    this.token = auth.token;
    this.refresh_token = auth.refresh_token;
    this.config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };
    this.headers = {
      Accept: "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  async isRegister(login) {
    await this.getStore();
    try {
      // const response = await axios.get(
      //   `${baseUrl}api/Auth/is-login-registered?login=${login}`,
      // );
      const response = await instance.get(
        `api/Auth/is-login-registered?login=${login}`
      );
      // console.log("api/Auth/is-login-registered?login=", response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async isEmail(email) {
    await this.getStore();
    try {
      // const response = await axios.get(
      //   `${baseUrl}api/Auth/is-email-registered?email=${email}`,
      // );
      const response = await instance.get(
        `api/Auth/is-email-registered?email=${email}`
      );
      // console.log("api/Auth/is-login-registered?login=", response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async register(data) {
    // await this.getStore();
    try {
      const response = await axios.post(
        `${baseUrl}api/Auth/register`,
        data
        // this.config
      );
      // console.log(`api/Auth/register`, response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async login(loginOrEmail, password) {
    const data = {
      loginOrEmail,
      password,
    };
    try {
      // const response = await axios.post(
      //   `${baseUrl}api/Auth/login`,
      //   data,
      // );
      const response = await instance.post(`api/Auth/login`, data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async setLogout() {
    store.dispatch(IsRuAC(true));
    store.dispatch(UserLogout());

    store.dispatch(
      UserRegistration({
        token: undefined,
        refresh_token: undefined,
      })
    );
    store.dispatch(AllInfoUserMain(initialStateAllInfoUser.value));
    store.dispatch(UserData(initialStateUserData.value));
    store.dispatch(
      Votes({
        items: [
          {
            id: 0,
            question: "",
            answers: [],
          },
        ],
      })
    );
    store.dispatch(UserWallets([]));
    store.dispatch(UserAvatar(""));
    store.dispatch(setContestsListActive([]));
    store.dispatch(setContestsListPast([]));
  }

  async logOutApi(loginOrEmail, password) {
    await this.getStore();
    try {
      const res = await instance.delete(
        `${BASEAPPURL}api/Auth/logout?refreshToken=${this.refresh_token}`
      );
      localStorage.removeItem("keySwagger");
      await this.setLogout();
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  async getUserInfo() {
    await this.getStore();
    // if (this.token === null) {
    //   console.log('Trying to getUserInfo without auth');
    //   return;
    // }
    try {
      const response = await axios.get(
        `${baseUrl}api/Partners/current`,
        this.config
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export const AuthApi = new CAuthApi();
