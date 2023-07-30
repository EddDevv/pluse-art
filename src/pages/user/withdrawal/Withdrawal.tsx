import React, { useEffect, useState } from "react";
import styles from "./Withdrawal.module.scss";
import instance, { instanceWithoutAuth } from "../../../api/instance";
import { usePagination } from "../../../utils/pagination/usePagination";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store";
import IconCrypto from "../../../assets/images/IconCrypto.png";

import IconCryptoGreen from "../../../assets/images/IconCryptoGreen.png";
import IconCard from "../../../assets/images/IconCard.png";
import IconCardWhite from "../../../assets/images/IconCardWhite.png";
import Moment from "react-moment";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";
import {
  Button,
  Checkbox,
  Collapse,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { LocalSpinner } from "../../../UIcomponents/localSpinner/LocalSpinner";
import { getNumWithoutZeroToFixedN } from "../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";
import { LocalSpinnerAbsolute } from "../../../UIcomponents/localSpinner/LocalSpinnerAbsolute";
import {
  BankAccountType,
  BankCardType,
  FinanceApi,
  accountName,
} from "../../../api/finance/financeApi";
import { toast } from "react-toastify";
import { AllInfoUserMain, CryptoWalletType } from "../../../store/allInfoUser";
import Operations from "../operations/Operations";
import { ProfileApi } from "../../../api/profile/profileApi";

const minSum = 10;

enum requsitesType {
  wallet = "wallet",
  card = "card",
  account = "account",
}

const Withdrawal = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowHistory, setIsShowHistory] = useState(false);

  const { auth, userData } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  // const value = useInputV(minSum, { isEmpty: true, isNumber: true });
  const [realSumValue, setRealSumValue] = useState<number | string>(
    minSum ? +minSum : ""
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [codeGa, setCodeGa] = useState<string | number>("");
  const [isGA, setIsGa] = useState(false);
  const [wallet, setWallet] = useState(accountName.Usd);
  const [withdrawalType, setWithdrawalType] = useState<string | requsitesType>(
    ""
  );

  const [requisiteForWithdrawalId, setRequisiteForWithdrawalId] = useState(0);
  const [
    requisiteForWithdrawalObjectName,
    setRequisiteForWithdrawalObjectName,
  ] = useState("");
  const [requisiteForWithdrawalType, setRequisiteForWithdrawalType] =
    useState("");
  const { balance } = useAppSelector((state) => state.userData.value);
  const { businessBalance } = useAppSelector((state) => state.allInfoUser);

  //   **********
  const [walletsRequisites, setWalletsRequisites] = useState<
    CryptoWalletType[]
  >([]);
  const [cardsRequisites, setCardsRequisites] = useState<BankCardType[]>([]);
  const [accountsRequisites, setAccountsRequisites] = useState<
    BankAccountType[]
  >([]);

  // Проверка актививрованости GA по данным пользователя с бека
  useEffect(() => {
    if (userData?.value?.userInfo?.confirmationType === "GA") {
      setIsGa(true);
    } else {
      setIsGa(false);
    }
  }, [userData]);

  useEffect(() => {
    minSum && setRealSumValue(+minSum?.toFixed(4));
  }, [minSum]);

  const getRequisites = async () => {
    if (!auth?.token) return;
    const res = await ProfileApi.getRequisites();

    if (res.status !== 200) return;
    setWalletsRequisites(res?.data?.cryptoWallets);
    setCardsRequisites(res?.data?.bankCards);
    setAccountsRequisites(res?.data?.bankAccounts);
  };

  useEffect(() => {
    getRequisites();
  }, [auth]);

  // ФУНКЦИЯ ВЫВОДА СРЕДСТВ
  const postWithdraw = async () => {
    setIsLoading(true);
    const resPostWithdraw = await FinanceApi.postWithdraw(
      +realSumValue,
      requisiteForWithdrawalId,
      wallet,
      isGA ? codeGa : "111111"
    );

    if (resPostWithdraw?.status >= 200 && resPostWithdraw.status < 300) {
      toast.success(t("Finance.withdrawal_done"));
      setCodeGa("");
      try {
        const resAllInfo = await instance.get("api/Partners/current");
        if (resAllInfo?.status >= 200 && resAllInfo.status < 300) {
          dispatch(AllInfoUserMain(resAllInfo.data));
        }
      } catch (e) {
        console.error(e);
      }
      //   setRefresh(!refresh);
      setRealSumValue(+minSum?.toFixed(4));
    } else {
      toast.error(resPostWithdraw.data);
      setCodeGa("");
    }
    setSuccess(false);
    setIsOpenModal(false);
    setIsLoading(false);
  };

  // ВЫЗОВ ФУНКЦИИ ВЫВОДА СРЕДСТВ
  useEffect(() => {
    if (auth.token && success) {
      postWithdraw();
    }
    // eslint-disable-next-line
  }, [success]);

  const handleChangeValue = (e: any) => {
    if (minSum && e.target.value >= minSum) {
      setRealSumValue(e.target.value);
    } else {
      setRealSumValue(e.target.value);
    }
  };

  return (
    <div className="page_container">
      <div className="page_inner_container">
        <div className={styles.title_flex}>
          <div className="page_title">{t("User_layout.get_out")}</div>
        </div>
        <div className={styles.main}>
          <div className={styles.main_title}>
            {t("New.choose_withdrawal_method")}
          </div>

          <div className={styles.main_flex}>
            <div
              className={
                withdrawalType === requsitesType.wallet
                  ? styles.main_item_active
                  : styles.main_item
              }
              onClick={() => {
                setWithdrawalType(requsitesType.wallet);
                if (walletsRequisites?.length > 0) {
                  setRequisiteForWithdrawalId(walletsRequisites[0].id);
                } else setRequisiteForWithdrawalId(0);
              }}
            >
              <div className={styles.main_icon}>
                <img
                  src={
                    withdrawalType === requsitesType.wallet
                      ? IconCryptoGreen
                      : IconCrypto
                  }
                  alt=""
                />
              </div>
              <div> {t("Finance.crypto_wallet")}</div>
            </div>
            <div
              className={
                withdrawalType === requsitesType.account
                  ? styles.main_item_active
                  : styles.main_item
              }
              onClick={() => {
                setWithdrawalType(requsitesType.account);
                if (accountsRequisites?.length > 0) {
                  setRequisiteForWithdrawalId(accountsRequisites[0].id);
                } else setRequisiteForWithdrawalId(0);
              }}
            >
              <div className={styles.main_icon}>
                <img
                  src={
                    withdrawalType === requsitesType.account
                      ? IconCardWhite
                      : IconCard
                  }
                  alt=""
                />
              </div>
              <div> {t("New.bank_account")}</div>
            </div>
          </div>

          <Collapse in={withdrawalType === requsitesType.wallet}>
            <div className={styles.choose_requisites}>
              <div className={styles.choose_requisites_item}>
                <select
                  className="gray_input_w100"
                  placeholder={t("New.chose_wallet")}
                  value={requisiteForWithdrawalId}
                  onChange={(e) => setRequisiteForWithdrawalId(+e.target.value)}
                >
                  {walletsRequisites.map((item) => (
                    <option
                      //   value={JSON.stringify(item)}
                      value={item.id}
                      key={item.id}
                      style={{ minHeight: "40px" }}
                    >
                      {item.objectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.choose_requisites_item}>
                {t("New.choose_wallet_link")}{" "}
                <b className="main_link"> {t("New.wallet_link")}</b>
              </div>
            </div>
          </Collapse>

          <Collapse in={withdrawalType === requsitesType.account}>
            <div className={styles.choose_requisites}>
              <div className={styles.choose_requisites_item}>
                <select
                  className="gray_input_w100"
                  placeholder={t("New.chose_account")}
                  value={requisiteForWithdrawalId}
                  onChange={(e) => setRequisiteForWithdrawalId(+e.target.value)}
                >
                  {accountsRequisites.map((item: BankAccountType) => (
                    <option
                      //   value={JSON.stringify(item)}
                      value={item.id}
                      key={item.id}
                      style={{ minHeight: "40px" }}
                    >
                      {item.objectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.choose_requisites_item}>
                {t("New.chose_account_link")}{" "}
                <b className="main_link"> {t("New.wallet_link")}</b>
              </div>
            </div>
          </Collapse>

          <div className={styles.main_min}>{t("New.min_sum_10")}</div>

          <div className={`${styles.main_flex_1} ${styles.main_min}`}>
            <div className={styles.flex_10}>
              <div className={styles.main_form}>Введите сумму в USD</div>
              <div className={styles.main_form}>
                <input
                  className="gray_input_w100"
                  value={realSumValue}
                  placeholder="0 USD"
                  style={{ textAlign: "end" }}
                  onChange={(e) => handleChangeValue(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.flex_10}>
              <div className={styles.main_form}>
                <div>
                  <b>{getNumWithoutZeroToFixedN(balance, 2)} &nbsp; USD</b>
                </div>
                <div>{t("New.available_for_withdrawal")}</div>
              </div>
              <div className={styles.main_form}>
                <button
                  className={styles.filter_apply}
                  onClick={() => {
                    // getHistory();
                  }}
                  disabled={isLoading || withdrawalType === ""}
                >
                  {t("Finance.withdraw")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.check_history}>
          <Checkbox
            colorScheme="teal"
            checked={isShowHistory}
            onChange={(e) => setIsShowHistory(e.target.checked)}
          />
          <div>{t("New.withdrawal_history")}</div>
        </div>
        {isShowHistory && <Operations isWithdrawal={true} />}
      </div>
    </div>
  );
};

export default Withdrawal;
