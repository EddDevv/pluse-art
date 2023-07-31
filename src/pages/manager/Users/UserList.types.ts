export type UserType = {
  id: string;
  creationDate: string;
  firstName: string;
  middleName: string;
  lastName: string;
  inviterId: number | string;
  inviterLogin: string;
  storeId: number | string;
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
  balanceInner: number | string;
  balanceBusiness: number | string;
  balanceUsdc: number;
  balanceBitcoin: number;
  balanceEthereum: number;
  balanceLitecoin: number;
  riskType: number | string;
  confirmationType: string;
  telegram: string;
  instagram: string;
  vkontakte: string;
  facebook: string;
  twitter: string;
  rang: string;
  verificationDate: string | null;
  isActivated: boolean;
  messagesCount: number | string;
  visitorsCount: number | string;
  language: string;
};

export enum StatusEnum {
  Active = "Active",
  Blocked = "Blocked",
}
export type IdNameType = {
  id: number;
  name: string;
};

export enum SortEnum {
  CreatedAtAsc = "CreatedAtAsc",
  CreatedAtDesc = "CreatedAtDesc",
  LoginAsc = "LoginAsc",
  LoginDesc = "LoginDesc",
  NameAsc = "NameAsc",
  NameDesc = "NameDesc",
  MainBalanceAsc = "MainBalanceAsc",
  MainBalanceDesc = "MainBalanceDesc",
  BonusBalanceAsc = "BonusBalanceAsc",
  BonusBalanceDesc = "BonusBalanceDesc",
  CloneBalanceAsc = "CloneBalanceAsc",
  CloneBalanceDesc = "CloneBalanceDesc",
}
export enum GoogleAuthEnum {
  none = "",
  GA = "GA",
}
