import { CryptoCurrencyType } from "./reducer";

export const CRYPTO_DATA = "CRYPTO_INFO::CRYPTO_DATA";

export const CryptoData = (value: CryptoCurrencyType[]) => ({
  type: CRYPTO_DATA,
  payload: value,
});
