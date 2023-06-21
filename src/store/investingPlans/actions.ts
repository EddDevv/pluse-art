import { InvestPlanType } from "./reducer";

export const INVEST_PLANS = "MARKETING::INVEST_PLANS";

export const InvestPlans = (value: InvestPlanType[]) => ({
  type: INVEST_PLANS,
  payload: value,
});
