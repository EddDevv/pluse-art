// import axios from "axios";
// import { store } from "../../store/index";
import instance from "../instance";

// const baseUrl = "http://lk.pride.anyusecase.com/";
class CFinanceApi {
  token;
  config;
  headers;

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
    // await this.getStore();
    try {
      // const response = await axios.get(
      //   `${baseUrl}api/Finance/withdraw`,
      //   this.config
      // );
      const response = await instance.get(`api/Finance/withdraw`);
      // console.log(`api/Main/ether-fund response:`, response.data );
      return response;
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error("error.response:", error.response);
        return error.response;
      } else {
        return "error";
      }
    }
  }

  async postWithdraw(sum, bankRequisitesId, accountName, code) {
    // await this.getStore();
    // console.log('accountName', accountName)
    let correctAccountName = accountName;
    if (accountName.toLowerCase().includes("usd")) {
      correctAccountName = "Inner";
    }
    // const data = {

    // };
    try {
      // const response = await axios.post(
      //   `${baseUrl}api/Finance/withdraw?sum=${sum}&bankRequisitesId=${bankRequisitesId}&accountName=${correctAccountName}`,
      //   data,
      //   this.config
      // );
      const response = await instance.post(
        `api/Finance/withdraw?sum=${sum}&bankRequisitesId=${
          bankRequisitesId ?? 1
        }&accountName=${correctAccountName}&code=${code}`
        // `api/Finance/withdraw?sum=${sum}&accountName=${correctAccountName}`
      );
      // console.log(`api/Finance/withdraw response:`, response );
      return response;
    } catch (error) {
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
