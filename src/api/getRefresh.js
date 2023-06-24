import axios from "axios";
import { store } from "../store";
import {
  AllInfoUserMain,
  initialStateAllInfoUser,
  UserAvatar,
  UserWallets,
} from "../store/allInfoUser";
import { UserRegistration } from "../store/auth/actions";
import {
  setContestsListActive,
  setContestsListPast,
} from "../store/contest/actions";
// import { CryptoData } from "../store/crypto/actions";
import { UserData } from "../store/userData/actions";
import { initialStateUserData } from "../store/userData/reducer";
import { Votes } from "../store/votes/actions";
import { BASEAPPURL } from "./instance";

// const baseUrl = "http://lk.pride.anyusecase.com/";
const baseUrl = BASEAPPURL;
// const instance = axios.create({
//   withCredentials: true,
//   baseURL: baseUrl,
//   headers: {
//     accept: "application/json",
//   },
// });

const { auth } = store.getState();
// const token = auth.token;

const getRefresh = async () => {
  // console.log("getRefresh", localStorage.getItem("keySwagger"));
  if (!localStorage.getItem("keySwagger")) return;

  try {
    JSON.parse(localStorage.getItem("keySwagger"));
    // console.log(JSON.parse(localStorage.getItem("keySwagger")).refresh_token);
    // console.log(JSON.parse(localStorage.getItem("keySwagger")).token);
  } catch (e) {
    console.error("api getRefresh error no localStorage keySwagger", e);
    store.dispatch(
      UserRegistration({
        token: undefined,
        refresh_token: undefined,
      })
    );
    return 0;
  }
  // console.log(
  //   'API getRefresh localStorage.getItem("keySwagger")',
  //   JSON.parse(localStorage.getItem("keySwagger"))
  // );
  const rd = {
    token: {
      access_token:
        JSON.parse(localStorage.getItem("keySwagger")).token ?? auth.token,
      refresh_token:
        JSON.parse(localStorage.getItem("keySwagger")).refresh_token ??
        auth.refresh_token,
    },
  };
  // console.log("api getRefresh rd:", rd);
  try {
    const response = await axios.post(`${baseUrl}api/Auth/refresh-token`, rd, {
      withCredentials: true,
    });
    // console.log("api getRefresh response", response);
    store.dispatch(
      UserRegistration({
        token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      })
    );
    // console.log('getRefresh localStorage.setItem',  response.data)
    localStorage.setItem(
      "keySwagger",
      JSON.stringify({
        token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      })
    );
    return 1;
  } catch (e) {
    // console.error("App - Not authorized");
    console.error("api getRefresh refresh error", e);
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
};

export default getRefresh;
