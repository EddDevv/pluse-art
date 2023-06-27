export const FUND_BALANCE = "MAIN::FUND_BALANCE";

export const FundAction = (value: string) => ({
  type: FUND_BALANCE,
  payload: value,
});