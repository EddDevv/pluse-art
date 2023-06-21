import { Reducer } from "redux";
import { STOCK_RATES } from "./actions";

export interface StockQuoteDaysList {
  date: string;
  sellPrice: number;
  buyPrice: number;
}

export interface StockQuoteWeeksList {
  date: string;
  sellPrice: number;
  buyPrice: number;
}

export interface StockQuoteMonthsList {
  date: string;
  sellPrice: number;
  buyPrice: number;
}

export interface StockQuoteObject {
  stockQuoteDaysList: StockQuoteDaysList[];
  stockQuoteWeeksList: StockQuoteWeeksList[];
  stockQuoteMonthsList: StockQuoteMonthsList[];
}

export interface StockType {
  objectName: string;
  code: string;
  buyPrice: number;
  sellPrice: number;
  stockExchange: string;
  stockQuoteObject: StockQuoteObject;
}

export type StockStateType = {
  value: StockType[];
};

type ActionType = {
  type: string;
  payload: StockType[];
};

const initialState: StockStateType = {
  value: [
    {
      objectName: "",
      code: "",
      buyPrice: 0,
      sellPrice: 0,
      stockExchange: "",
      stockQuoteObject: {
        stockQuoteDaysList: [
          {
            date: "",
            sellPrice: 0,
            buyPrice: 0,
          },
        ],
        stockQuoteWeeksList: [
          {
            date: "",
            sellPrice: 0,
            buyPrice: 0,
          },
        ],
        stockQuoteMonthsList: [
          {
            date: "",
            sellPrice: 0,
            buyPrice: 0,
          },
        ],
      },
    },
  ],
};

export const stockRatesReducer: Reducer<StockStateType, ActionType> = (
  state = initialState,
  action: ActionType
): StockStateType => {
  switch (action.type) {
    case STOCK_RATES: {
      return {
        value: action.payload,
      };
    }

    default:
      return state;
  }
};
