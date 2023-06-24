import axios from "axios";
import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";
import { BASEAPPURL } from "./instance";

const CryptoJS = require("crypto-js");

export const APIKey = "6aab0d20-6acf-49bd-bfe8-401c8be0e0dd";
export const SecretKey = "CA9043E0618FCFD0D3A46C75D3F4F012";
export const Passphrase = "Supermario123@";

// const BASEURLokx = "https://www.okx.com";
const BASEURLokx = "https://cors-anywhere.herokuapp.com/https://www.okx.com/"
// const BASEURLokx = BASEAPPURL;
// const baseUrl = BASEURL;
const OKXInstanceOur = axios.create({
  //   withCredentials: true,
  // baseURL: BASEURLokx,
  // headers: {
  //   accept: "application/json",
  //   "OK-ACCESS-KEY": APIKey,
  //   "OK-ACCESS-SIGN": SecretKey,
  //   "OK-ACCESS-PASSPHRASE": Passphrase,
  //   "OK-ACCESS-TIMESTAMP": new Date().toString(),
  // },
  timeout: 60000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json; utf-8",
    "OK-ACCESS-KEY": APIKey,
    "OK-ACCESS-PASSPHRASE": Passphrase,
  },
});

OKXInstanceOur.interceptors.request.use((config) => {
  const now = new Date().toISOString();
  // console.log("now", now);
  const method = config.method.toUpperCase();
  let { data, params } = config;

  // const sign = crypto
  //   .createHmac("sha256", SecretKey)
  //   .update(
  //     now +
  //       method.toUpperCase() +
  //       `${config.url}` +
  //       (method === "GET" ? (params ? `?${params}` : ``) : `${data}`)
  //   )
  //   .digest("base64");
  const sign = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(
      now + method.toUpperCase() + `${config.url}` + method === "GET"
        ? params
          ? `?${params}`
          : ``
        : `${data}`,
      SecretKey
    )
  );

  config.headers["OK-ACCESS-TIMESTAMP"] = now;

  config.headers["OK-ACCESS-SIGN"] = sign;
  return config;
});

export default OKXInstanceOur;
