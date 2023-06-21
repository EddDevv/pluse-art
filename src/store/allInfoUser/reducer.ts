import { Reducer } from "redux";
import {
  ACCOUNTS_ENUM,
  ALL_INFO_USER_MAIN,
  CHANGE_BUSINESS_BALANCE,
  IS_RU,
  USER_AVATAR,
  USER_WALLETS,
} from "./actions";

export type CryptoWalletType = {
  id: number;
  objectName: string;
  cryptoWallet: string;
  cryptoCurrency: string;
  networkType: string;
  code: string;
};
export type AllInfoUserType = {
  id: number;
  creationDate: string;
  firstName: string;
  middleName: string;
  lastName: string;
  inviterId: number;
  storeId: number;
  email: string;
  phoneNumber: string;
  login: string;
  password: string;
  image: string;
  country: string;
  city: string;
  birthDate: string;
  passportSerial: string;
  passportNumber: string;
  passportIssuer: string;
  passportIssueDate: string;
  addressReg: string;
  balance: number;
  balanceInner: number;
  balanceBusiness: number;
  balanceUsdc: number;
  balanceBitcoin: number;
  balanceEthereum: number;
  balanceLitecoin: number;
  riskType: number;
  confirmationType: string;
  telegram: string;
  instagram: string;
  vkontakte: string;
  facebook: string;
  youtube: string;
  twitter: string;
  rang: string | null | number;
  verificationDate: string | null;
  isActivated: boolean;
  messagesCount: number;
  visitorsCount: number;
  language: string;
  isHidden: boolean;
  inn: string;
};
export type AllInfoUserStateType = {
  value: AllInfoUserType;
  avatar: string;
  wallets: CryptoWalletType[];
  accounts: string[];
  isRu: boolean;
  businessBalance: number;
};

export type AllInfoUserMainActionType = {
  type: typeof ALL_INFO_USER_MAIN;
  allInfoUserValue: AllInfoUserType;
};
export type AvatarActionType = {
  type: typeof USER_AVATAR;
  avatar: string;
};
export type WalletsActionType = {
  type: typeof USER_WALLETS;
  wallets: CryptoWalletType[];
};
export type AccountsActionType = {
  type: typeof ACCOUNTS_ENUM;
  accounts: string[];
};
export type IsRuActionType = {
  type: typeof IS_RU;
  isRuPayload: boolean;
};
export type ChangeBusinessBalanceActionType = {
  type: typeof CHANGE_BUSINESS_BALANCE;
  businessBalanceValue: number;
};
export type ActionType =
  | AllInfoUserMainActionType
  | AvatarActionType
  | WalletsActionType
  | AccountsActionType
  | IsRuActionType
  | ChangeBusinessBalanceActionType;
export const initialStateAllInfoUser: AllInfoUserStateType = {
  value: {
    id: 0,
    creationDate: "",
    firstName: "",
    middleName: "",
    lastName: "",
    inviterId: 0,
    storeId: 0,
    email: "",
    phoneNumber: "",
    login: "",
    password: "",
    image: "",
    country: "",
    city: "",
    birthDate: "",
    passportSerial: "",
    passportNumber: "",
    passportIssuer: "",
    passportIssueDate: "",
    addressReg: "",
    balance: 0,
    balanceInner: 0,
    balanceBusiness: 0,
    balanceUsdc: 0,
    balanceBitcoin: 0,
    balanceEthereum: 0,
    balanceLitecoin: 0,
    riskType: 0,
    confirmationType: "",
    telegram: "",
    instagram: "",
    vkontakte: "",
    facebook: "",
    youtube: "",
    twitter: "",
    rang: "",
    verificationDate: "",
    isActivated: false,
    messagesCount: 0,
    visitorsCount: 0,
    language: "ru",
    isHidden: true,
    inn: "",
  },
  avatar: "",
  wallets: [],
  accounts: [],
  isRu: false,
  businessBalance: 0,
};

export const AllInfoUserReducer: Reducer<AllInfoUserStateType, ActionType> = (
  state: AllInfoUserStateType = initialStateAllInfoUser,
  action: ActionType
): AllInfoUserStateType => {
  switch (action.type) {
    case ALL_INFO_USER_MAIN: {
      return {
        ...state,
        value: action.allInfoUserValue,
      };
    }
    case USER_AVATAR: {
      return {
        ...state,
        avatar: action.avatar,
      };
    }
    case USER_WALLETS: {
      return {
        ...state,
        wallets: action.wallets,
      };
    }

    case ACCOUNTS_ENUM: {
      return {
        ...state,
        accounts: action.accounts,
      };
    }

    case IS_RU: {
      return {
        ...state,
        isRu: action.isRuPayload,
      };
    }

    case CHANGE_BUSINESS_BALANCE: {
      return {
        ...state,
        businessBalance: action.businessBalanceValue,
      };
    }

    default:
      return state;
  }
};
