export type CryptoRequisitesType = {
  cryptoCurrency: string;
  cryptoWallet: string;
  id: string | number;
  networkType: string;
  objectName: string; //кошелек
  partnerId: string | number;
};

export type WithdrawalType = {
  id: string | number;
  objectName: string;
  paymentDate: string;
  debetSum: string | number;
  creditSum: string | number;
  accountBalance: string | number;
  transferType: string;
  processingStatus: string;
  comissionSum: string | number;
  comment: string;
  accountName: string;
  partnerLogin: string;
  cryptoRequisites: CryptoRequisitesType;
};

export enum AccountEnum {
  Inner = "Usdt",
  // Usdc = "Usdc",
  // Bitcoin = "Bitcoin",
  // Ethereum = "Ethereum",
  // Litecoin = "Litecoin",
  Business = "Business",
}

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

export enum TransferTypeEnum {
  // replenish = "Пополнить счет",
  input = "Пополнение для корректировки",
  output = "Вывод для корректировки",
}

export enum ProcessingStatusEnum {
  done = "Оплачен",
  wait = "На проверке",
  cancel = "Отменен",
}
