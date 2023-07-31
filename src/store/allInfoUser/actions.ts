import { AllInfoUserType, CryptoWalletType } from "./reducer";
export const ALL_INFO_USER_MAIN = "ALL_USER_INFO::ALL_USER_DATA";
export const USER_AVATAR = "ALL_USER_INFO::USER_AVATAR";
export const USER_WALLETS = "ALL_USER_INFO::USER_WALLETS";
export const ACCOUNTS_ENUM = "ALL_USER_INFO::ACCOUNTS_ENUM";
export const IS_RU = "ALL_USER_INFO::IS_RU";
export const CHANGE_BUSINESS_BALANCE = "ALL_USER_INFO::CHANGE_BUSINESS_BALANCE";
export const SET_ROLE = "ALL_USER_INFO::SET_ROLE";

// export const AllUserData = (value: AllInfoUserType) => ({
export const AllInfoUserMain = (value: AllInfoUserType) => ({
  type: ALL_INFO_USER_MAIN,
  allInfoUserValue: value,
});
export const UserAvatar = (value: string) => ({
  type: USER_AVATAR,
  avatar: value,
});
export const UserWallets = (value: CryptoWalletType[]) => ({
  type: USER_WALLETS,
  wallets: value,
});

export const AccountsData = (value: string[]) => ({
  type: ACCOUNTS_ENUM,
  accounts: value,
});

export const IsRuAC = (value: boolean) => ({
  type: IS_RU,
  isRuPayload: value,
});

export const ChangeBusinessBalance = (value: number) => ({
  type: CHANGE_BUSINESS_BALANCE,
  businessBalanceValue: value,
});

export const SetRoleAC = (role: string) => ({
  type: SET_ROLE,
  role: role,
});

