export type BankCardType = {
  id: number;
  objectName: string;
  bankCardNumber: string;
  code: string;
};

export type BankAccountType = {
  id: number;
  objectName: string;
  bankBIK: string;
  bankINN: string;
  bankKorrSchet: string;
  bankKPP: string;
  bankShortName: string;
  bankAccountNumber: string;
  code: string;
};

export type BancAccountForm = {
  bankBIK: string;
  bankINN: string;
  bankKorrSchet: string;
  bankKPP: string;
  bankShortName: string;
  bankAccountNumber: string;
  // code: string;
};
