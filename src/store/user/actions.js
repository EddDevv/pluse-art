export const USER_INFO = "USER::USER_INFO";
export const USER_INFO_CODE = "USER::USER_INFO_CODE";

export const UserInfo = (value) => ({
    type: USER_INFO,
    payload: value


});
export const UserInfoCode = (value) => ({
    type: USER_INFO_CODE,
    payload: value


});
