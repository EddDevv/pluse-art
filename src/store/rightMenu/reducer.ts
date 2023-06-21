import { Reducer } from "redux";
import { ONLINE_USERS_LIST, USERS_STATISTIC } from "./actions";

export type OnlineUserType = {
  id: number;
  image: string;
  login: string;
  lastActiveDate: string;
};

export type UserStatisticType = {
  activatedReferalsCount: number;
  linkHitsCount: number;
  referalsCount: number;
};

export type RightMenuStateType = {
  onlineUserList: OnlineUserType[];
  userStatistic: UserStatisticType;
};

const initialStateRightMenu: RightMenuStateType = {
  onlineUserList: [],
  userStatistic: {
    activatedReferalsCount: 0,
    linkHitsCount: 0,
    referalsCount: 0,
  },
};
export type OnlineUserListActionType = {
  type: typeof ONLINE_USERS_LIST;
  onlineUserListPayload: OnlineUserType[];
};
export type UserStatisticActionType = {
  type: typeof USERS_STATISTIC;
  userStatisticPayload: UserStatisticType;
};
export type ActionType = OnlineUserListActionType | UserStatisticActionType;

export const rightMenuReducer: Reducer<RightMenuStateType, ActionType> = (
  state: RightMenuStateType = initialStateRightMenu,
  action: ActionType
): RightMenuStateType => {
  switch (action.type) {
    case ONLINE_USERS_LIST: {
      return {
        ...state,
        onlineUserList: action.onlineUserListPayload,
      };
    }
    case USERS_STATISTIC: {
      return {
        ...state,
        userStatistic: action.userStatisticPayload,
      };
    }

    default:
      return state;
  }
};
