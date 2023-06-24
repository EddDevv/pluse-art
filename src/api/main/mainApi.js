import instance, { BASEAPPURL } from "../instance";
import withoutTokenInstance from "../withoutTokenInstance";

class CMainApi {
  token;
  config;
  headers;

  async getEtherFund() {
    try {
      const response = await withoutTokenInstance.get(`api/Main/ether-fund`);
      return response.data;
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

  async getMainInfo() {
    try {
      const response = await instance.get(`api/Main/info`);
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

  getImage(image) {
    fetch(`${BASEAPPURL}assets/Img/${image}`, {
      method: "GET",
      headers: {
        accept: "application/octet-stream",
      },
    }).then((res) => {
      return res.url;
    });
  }
}

export const MainApi = new CMainApi();
