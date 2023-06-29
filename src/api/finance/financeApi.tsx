import instance from "../instance";

export const accountName = {
  Default: "Default",
  Usdc: "Usdc",
  Bitcoin: "Bitcoin",
  Ethereum: "Ethereum",
  Litecoin: "Litecoin",
  default: null,
  Usd: "USD",
};

export type WalletType = {
  accountName: string;
  comission: number;
  minSumUsd: number;
  minSum: number;
  maxSum: number;
};

export type CryptoWalletType = {
  id: number;
  objectName: string;
  cryptoWallet: string;
  cryptoCurrency: string;
  networkType: string;
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
export type BankCardType = {
  id: number;
  objectName: string;
  bankCardNumber: string;
  code: string;
};

class CFinanceApi {
  token: any;
  config: any;
  headers: any;

  // constructor() {
  //   this.getStore();
  // }

  // async getStore() {
  //   const { auth } = store.getState();
  //   this.token = auth.token;
  //   this.config = {
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `Bearer ${this.token}`,
  //     },
  //   };
  //   this.headers = {
  //     Accept: "application/json",
  //     Authorization: `Bearer ${this.token}`,
  //   };
  // }

  async getWalletsForWithdraw() {
    try {
      const response = await instance.get(`api/Finance/withdraw`);
      return response;
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        console.error("error.response:", error.response);
        return error.response;
      } else {
        return "error";
      }
    }
  }

  async postWithdraw(
    sum: number,
    bankRequisitesId: number,
    accountName: string,
    code: string | number,
    
  ) {
    let correctAccountName = accountName;
    if (accountName.toLowerCase().includes("usd")) {
      correctAccountName = "Inner";
    }

    try {
      const response = await instance.post(
        `api/Finance/withdraw?sum=${sum}&bankRequisitesId=${
          bankRequisitesId ?? 1
        }&accountName=${correctAccountName}&code=${code}`
      );
      return response;
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        console.error("error.response:", error.response);
        return error.response;
      } else {
        return "error";
      }
    }
  }
}

export const FinanceApi = new CFinanceApi();
