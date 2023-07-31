export type TransferType = {
  id: number;
  partnerId: number;
  partnerLogin: string;
  objectName: string;
  paymentArticle: string;
  paymentDate: string;
  debetSum: number;
  creditSum: number;
  accountBalance: number;
  transferType: any;
  processingStatus: any;
  comissionSum: any;
  comment: string;
  accountName: string;
  currencyCode: any;
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
