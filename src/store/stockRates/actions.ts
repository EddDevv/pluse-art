import { StockType } from "./reducer";
export const STOCK_RATES = "STOCK::STOCK_RATES";

export const stockRatesAction = (value: StockType[]) => ({
  type: STOCK_RATES,
  payload: value,
});
