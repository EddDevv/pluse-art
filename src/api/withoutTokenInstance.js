import axios from "axios";
import { BASEAPPURL } from "./instance";

// const baseUrl = "http://lk.pride.anyusecase.com/";
// const baseUrl = BASEURl;
const withoutTokenInstance = axios.create({
  baseURL: BASEAPPURL,
  headers: {
    accept: "application/json",
  },
});

export default withoutTokenInstance;
