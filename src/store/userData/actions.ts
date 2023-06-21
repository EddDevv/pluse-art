import { UserDataType } from "./reducer";
export const USER_DATA = "USER_INFO::USER_DATA";
// export const USER_DATA_UPDATE = "USER_INFO::USER_DATA_UPDATE";

export const UserData = (value: UserDataType) => ({
  type: USER_DATA,
  payload: value,
});
