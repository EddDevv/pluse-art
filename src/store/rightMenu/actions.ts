import { OnlineUserType, UserStatisticType } from "./reducer";
export const ONLINE_USERS_LIST = "ONLINE_USERS_LIST";
export const USERS_STATISTIC = "USERS_STATISTIC";

export const OnlineUserListAction = (value: OnlineUserType[]) => ({
  type: ONLINE_USERS_LIST,
  onlineUserListPayload: value,
});

export const UsersStatisticAction = (value: UserStatisticType) => ({
  type: USERS_STATISTIC,
  userStatisticPayload: value,
});
