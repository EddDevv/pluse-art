import { INVEST_PLANS } from "./actions";
export type ActionType = {
  type: string;
  payload: InvestPlanType[];
};
export type InvestPlanType = {
  id: number;
  name: string;
  investPlan: number;
  minSum: number;
  maxSum: number;
  percentPerMonth: number;
  riskType: string;
  speedPercent: number;
  speedPrice: number;
  insurancePrice: number;
  insuranceMaxPercent: number;
};
export type StateType = {
  value: InvestPlanType[];
};
const initialState: StateType = {
  value: [
    {
      id: 61947,
      investPlan: 1,
      maxSum: 0,
      minSum: 50,
      name: "Консервативный",
      percentPerMonth: 0.05,
      riskType: "Highrisk",
      speedPercent: 0.01,
      speedPrice: 0.005,
      insurancePrice: 0.025,
      insuranceMaxPercent: 0.5,
    },
    {
      id: 61948,
      investPlan: 2,
      maxSum: 0,
      minSum: 500,
      name: "Умеренный",
      percentPerMonth: 0.1,
      riskType: "Highrisk",
      speedPercent: 0.01,
      speedPrice: 0.005,
      insurancePrice: 0.025,
      insuranceMaxPercent: 0.5,
    },
    {
      id: 61949,
      investPlan: 3,
      maxSum: 0,
      minSum: 5000,
      name: "Агрессивный",
      percentPerMonth: 0.15,
      riskType: "Highrisk",
      speedPercent: 0.01,
      speedPrice: 0.005,
      insurancePrice: 0.025,
      insuranceMaxPercent: 0.5,
    },
    // {
    //   id: 4,
    //   investPlan: 4,
    //   maxSum: 10000000,
    //   minSum: 100,
    //   name: "Низкорисковая",
    //   percentPerMonth: 0.05,
    //   riskType: "Lowrisk",
    //   speedPercent: 0,
    //   speedPrice: 0,
    //   insurancePrice: 0,
    //   insuranceMaxPercent: 0,
    // },
  ],
};

export const investPlansReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case INVEST_PLANS: {
      return {
        ...state,
        value: action.payload,
      };
    }

    default:
      return state;
  }
};
