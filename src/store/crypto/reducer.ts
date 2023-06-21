import { CRYPTO_DATA } from "./actions";

export type CryptoCurrencyType = {
  name: string;
  symbol: string;
  icon: string;
  rank: string;
  price: number;
  volume24hUsd: number;
  marketCapUsd: number;
  percentChange24h: number;
  circulatingSupply: number;
};
export type CryptoDataStateType = {
  value: CryptoCurrencyType[];
};
const initialState: CryptoDataStateType = {
  value: [],
};
export type ActionType = {
  type: string;
  payload: CryptoCurrencyType[];
};

export const cryptoDataReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CRYPTO_DATA: {
      return {
        ...state,
        value: action.payload,
      };
    }

    default:
      return state;
  }
};
