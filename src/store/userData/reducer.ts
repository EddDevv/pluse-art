import { Reducer } from "redux";
import { USER_DATA } from "./actions";

export type PartnerInfoType = {
  id: number;
  login: string;
  fullName: string;
  image: string;
};
export type userInfoType = {
  id: number;
  login: string;
  fullName: string;
  image: string;
  rang: string;
  verificationDate: string | null;
  messagesCount: number;
  visitorsCount: number;
  riskType: string;
  isManager: boolean;
  confirmationType: string;
  passportSerial: string;
  passportNumber: string;
  passportIssuer: string;
  passportIssueDate: string;
  addressReg: string;
  isHidden: boolean;
  inn: string;
  isTelegramBinded: boolean;
};
export type UserDataType = {
  balance: number;
  balanceUsdc: number;
  balanceBitcoin: number;
  balanceEthereum: number;
  balanceLitecoin: number;
  balanceBusiness: number;
  userInfo: userInfoType;
  partnerInfo: PartnerInfoType;
};
export type UserDataStateType = {
  value: UserDataType;
};
type ActionType = {
  type: string;
  payload: UserDataType;
};
export const initialStateUserData: UserDataStateType = {
  value: {
    balance: 0,
    balanceBitcoin: 0,
    balanceEthereum: 0,
    balanceLitecoin: 0,
    balanceUsdc: 0,
    balanceBusiness: 0,
    userInfo: {
      id: 0,
      login: "",
      fullName: "",
      image: "",
      rang: "",
      verificationDate: null,
      messagesCount: 0,
      visitorsCount: 0,
      riskType: "",
      isManager: false,
      confirmationType: "",
      passportSerial: "",
      passportNumber: "",
      passportIssuer: "",
      passportIssueDate: "",
      addressReg: "",
      isHidden: true,
      inn: "",
      isTelegramBinded: false,
    },
    partnerInfo: {
      id: 0,
      login: "",
      fullName: "",
      image: "",
    },
  },
};

export const userDataReducer: Reducer<UserDataStateType, ActionType> = (
  state = initialStateUserData,
  action: ActionType
) => {
  switch (action.type) {
    case USER_DATA: {
      return {
        ...state,
        value: action.payload,
      };
    }

    default:
      return state;
  }
};
