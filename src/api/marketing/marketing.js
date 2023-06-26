// import axios from "axios";
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { store } from "../../store/index";
import { toast } from "react-toastify";
import instance from "../instance";
import { StatusDeal } from "../../assets/consts/consts";

// const baseUrl = "http://lk.pride.anyusecase.com/";
export const pageSize = 4;
// const instance = axios.create({
//   withCredentials: true.valueOf,
//   baseUrl: "http://lk.pride.anyusecase.com/",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${auth.token}`,
//   },
// });

// export const MarketingApi = {

class CMarketingApi {
  token;
  config;
  headers;

  // constructor() {
  //   this.getStore();
  // }

  // async getStore() {
  //   const { auth } = store.getState();
  //   // console.log("state.auth:", auth);
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

  async getDealList(dealStatus, pageNumber = 1, investPlan) {
    // await this.getStore();
    const silver = 61947;
    const gold = 61948;
    const plat = 61949;
    // const lowRisk = 62021;
    let data = "";
    // console.log("pageNumber:", pageNumber);
    data = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    // }
    if (dealStatus) {
      if (dealStatus === StatusDeal.Active) {
        data = data.concat(`&status=${dealStatus}`);
      } else {
        data = data.concat(`&status=${dealStatus}`);
      }
      // console.log("dealStatus:", dealStatus);
    }
    if (investPlan && investPlan === 1) {
      // console.log("dealStatus:", dealStatus);
      data = data.concat(`&programId=${silver}`);
    } else if (investPlan && investPlan === 2) {
      data = data.concat(`&programId=${gold}`);
    } else if (investPlan && investPlan === 3) {
      data = data.concat(`&programId=${plat}`);
    }
    // console.log("data:", data);

    // data = `?status=Выплачены проценты`;

    //  const options = {
    //    method: "GET",
    //    headers: this.headers,
    //    body: data,
    //  };
    //  const response = await fetch(
    //    `${baseUrl}api/Marketing/activated-programs`,
    //    options
    //  );
    //  const text = await response.text();
    //  console.log("fetch api/Marketing/activated-programs", text.data.items);
    //  return text.data.items;

    try {
      // const response = await axios.get(
      //   `${baseUrl}api/Marketing/activated-programs${data}`,
      //   this.config
      // );
      const response = await instance.get(
        `api/Marketing/activated-programs${data}`
      );
      // console.log("api/Marketing/activated-programs", response);
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

  async terminateDeal(programId) {
    const data = {
      // programId: +programId,
    };
    try {
      // const response = await axios.post(
      //   `${baseUrl}api/Marketing/terminate/${programId}`,
      //   data,
      //   this.config
      // );
      const response = await instance.post(
        `api/Marketing/terminate/${programId}`,
        data
      );
      // console.log(`api/Marketing/terminate/${programId}`, response);
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

  async resumeDeal(investmentId, insurance, accountName) {
    const data = {
      investmentId: +investmentId,
      // insurance,
      // investSpeed: 0,
      accountName: "Inner",
    };
    try {
      // const response = await axios.post(
      //   `${baseUrl}api/Marketing/resume`,
      //   data,
      //   this.config
      // );
      const response = await instance.post(`api/Marketing/resume`, data);
      toast.success(`Сделка №${investmentId} успешно возобновлена!`);
      // console.log(`api/Marketing/resume`, response);
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

  async getCoinPrice() {
    // await this.getStore();
    try {
      // const response = await axios.get(
      //   "http://lk.pride.anyusecase.com/api/Marketing/currency-rates",
      //   this.config
      // );
      const response = await instance.get("api/Marketing/currency-rates");
      // console.log(`api/Marketing/currency-rates`, response);
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

  async getStat() {
    // await this.getStore();
    try {
      // const response = await axios.get(
      //   `${baseUrl}api/Marketing/stat`,
      //   this.config
      // );
      const response = await instance.get(`api/Marketing/stat`);
      // console.log(`api/Marketing/stat`, response);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getTree() {
    // await this.getStore();
    try {
      // const response = await axios.get(
      //   `${baseUrl}api/Partners/structure`,
      //   this.config
      // );
      const response = await instance.get(`api/Partners/structure`);
      // console.log(`api/Partners/structure`, response);
      return response.data;
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

  async getTreeForNodeId(nodeId) {
    // await this.getStore();
    try {
      // const response = await axios.get(
      //   `${baseUrl}api/Partners/sublevel/${nodeId}`,
      //   this.config
      // );
      const response = await instance.get(`api/Partners/sublevel/${nodeId}`);
      // console.log(`api/Partners/sublevel/${nodeId}`, response);
      return response.data;
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

  async getInvestmentPlans() {
    try {
      const response = await instance.get(
        `api/Marketing/investment-plans-list`
      );
      // console.log(`api/Partners/sublevel/${nodeId}`, response);
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

  async getCurrencyRates() {
    try {
      const response = await instance.get("api/Marketing/currency-rates");
      // console.log(`api/Marketing/currency-rates`, response);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        console.error("error.response:", error.response);
        return error.response;
      } else {
        console.error(error);
        return "error";
      }
    }
  }
}

export const MarketingApi = new CMarketingApi();
