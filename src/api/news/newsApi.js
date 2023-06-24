import { store } from "../../store";
import instance from "../instance";

export const pageSize = 4;
// const instance = axios.create({
//   withCredentials: true.valueOf,
//   baseUrl: "http://lk.pride.anyusecase.com/",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${auth.token}`,
//   },
// });

class CNewsApi {
  token;
  config;
  headers;
  
  constructor() {
    this.getStore();
  }

  async getStore() {
    const { auth } = store.getState();
    // console.log("state.auth:", auth);
    this.token = auth.token;
    this.config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };
    this.headers = {
      Accept: "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  async getNewsDetail(newsId) {
    // await this.getStore();
    try {
      // const response = await axios.get(
      //   `${baseUrl}api/News/detail/${newsId}`,
      //   this.config
      // );
      const response = await instance.get(
        `api/News/detail/${newsId}`
      );
      // console.log(`api/News/detail/${newsId}`, response);
      return response;
    } catch (error) {
      console.error(error);
      if (error.response) { 
        console.error('error.response:', error.response);
        return error.response;
      } else { 
        return "error";
      } 
    }
  }

  async getVisitorList(newsId) {
    try {
      // const response = await axios.get(
      //   `${baseUrl}api/News/visitors-list/${newsId}`,
      //   this.config
      // );
      const response = await instance.get(
        `api/News/visitors-list/${newsId}`
      );
      // console.log(`api/News/visitors-list/${newsId}`, response);
      return response;
    } catch (error) {
      console.error(error);
      if (error.response) { 
        console.error('error.response:', error.response);
        return error.response;
      } else { 
        return "error";
      } 
    }
  }

}

export const NewsApi = new CNewsApi();
