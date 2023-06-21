import { CURRENCY_RATES } from "./actions";
export type CurrencyType = {
  objectName: string;
  code: string;
  name: string;
  symbol: string;
  rate: number;
};
export type CurrencyStateType = {
  value: CurrencyType[];
};
type ActionType = {
  type: string;
  payload: CurrencyType[];
};
const initialState: CurrencyStateType = {
  value: [
    {
      code: "ETHEREUM",
      name: "ETHEREUM",
      objectName: "ETH",
      rate: 1,
      symbol: "ETH",
    },
    {
      code: "BITCOIN",
      name: "BITCOIN",
      objectName: "BTC",
      rate: 1,
      symbol: "BTC",
    },
    {
      code: "LITECOIN",
      name: "LITECOIN",
      objectName: "LTC",
      rate: 1,
      symbol: "LTC",
    },
    {
      code: "USD",
      name: "Доллар США",
      objectName: "USD",
      rate: 1,
      symbol: "USD",
    },
    {
      code: "USDC",
      name: "USD Coin",
      objectName: "USDC",
      rate: 1,
      symbol: "USDC",
    },
  ],
};

export const currencyRatesReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CURRENCY_RATES: {
      return {
        // ...state,
        value: action.payload,
      };
    }

    default:
      return state;
  }
};
