import { CurrencyType } from "./reducer";
export const CURRENCY_RATES = "MARKETING::CURRENCY_RATES";

export const currencyRatesAction = (value: CurrencyType[]) => ({
  type: CURRENCY_RATES,
  payload: value,
});
