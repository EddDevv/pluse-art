import { LOGOUT_USER, REGIST_USER } from "./actions";
export type AuthType = {
  token: string | null | undefined;
  refresh_token: string | null | undefined;
};
export type ActionType = {
  type: string;
  payload: AuthType;
};

const getToken = () => {
  const tokens = localStorage.getItem("keySwagger");
  if (tokens) {
    try {
      return JSON.parse(tokens);
    } catch (e) {}
  } else {
    return {
      token: null,
      refresh_token: null,
    };
  }
};

const initialState: AuthType = {
  token: getToken()?.token,
  refresh_token: getToken()?.refresh_token,
};

export const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case REGIST_USER: {
      return {
        ...state,
        token: action.payload.token,
        refresh_token: action.payload.refresh_token,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        token: undefined,
        refresh_token: undefined,
      };
    }
    default:
      return state;
  }
};
