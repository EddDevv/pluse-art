// import OKXclient from "okx-public-api";
import { RestClient } from "okx-api";

const APIKey = "6aab0d20-6acf-49bd-bfe8-401c8be0e0dd";
const SecretKey = "CA9043E0618FCFD0D3A46C75D3F4F012";
const Passphrase = "Supermario1@";
// const OKXInstance = new OKXclient(APIKey, SecretKey, Passphrase);
const OKXInstance = new RestClient({
  apiKey: APIKey,
  apiSecret: SecretKey,
  apiPass: Passphrase,
});

export default OKXInstance;
