import axios from "axios";
import { store } from "../../store/index";
import { BASEAPPURL } from "../instance";

const baseUrl = BASEAPPURL;

class CProfileApi {
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

  async getRequisites() {
    await this.getStore();
    try {
      const response = await axios.get(
        `${baseUrl}api/Profile/requisites`,
        this.config
      );
      // console.log(`api/Profile/requisites`, response);
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

export const ProfileApi = new CProfileApi();
