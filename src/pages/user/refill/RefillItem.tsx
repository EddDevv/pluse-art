import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store";
import styles from "./Refill.module.scss";
import { accountName } from "../../../api/finance/financeApi";
import instance from "../../../api/instance";
import CryptoAll from "../../../assets/images/CryptoAll.png";
import FreeKassa from "../../../assets/images/FreeKassa.png";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";

type PropsType = {
  refilType: RefillType;
};

export enum RefillType {
  coinBase = "coinBase",
  freeKassa = "freeKassa",
}

const RefillItem = ({ refilType }: PropsType) => {
  const { t } = useTranslation();
  const { userData, allInfoUser } = useAppSelector((state) => state);

  const [wallet, setWallet] = useState(accountName.Usd);
  const [requisiteForWithdrawalId, setRequisiteForWithdrawalId] = useState(0);
  const [
    requisiteForWithdrawalObjectName,
    setRequisiteForWithdrawalObjectName,
  ] = useState("");
  const [requisiteForWithdrawalType, setRequisiteForWithdrawalType] =
    useState("");
  const [maxSum, setMaxSum] = useState(0);
  const [minSum, setMinSum] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [realSumValue, setRealSumValue] = useState<number | string>(
    // minSum ? +minSum?.toFixed(5) : ""
    ""
  );

  // useEffect(() => {
  //   minSum && setRealSumValue(+minSum?.toFixed(4));
  // }, [minSum]);

  const handlePopolnit = async (e: any) => {
    setIsLoading(true);
    const windowReference = global.open();

    try {
      let response: any;
      if (refilType === RefillType.coinBase) {
        response = await instance.get(
          `api/CryptoFinance/coinbase-charge-create?sumUsd=${realSumValue}`
        );
      } else {
        response = await instance.get(
          `api/EPayments/freekassa-charge-create?sumUsd=${realSumValue}`
        );
      }
      if (response?.status >= 200 && response.status < 300) {
        setTimeout(() => {
          if (windowReference) {
            windowReference.location = response?.data;
          }
        });
      }
    } catch (error: any) {
      if (error.response) {
        console.error("error.response:", error.response);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
    setRealSumValue("");
  };

  return (
    <div className={styles.main_card}>
      {/* <ModalMain title={t("Finance.refill_by_crypto")} isOpen=/> */}
      <div>
        <img
          src={refilType === RefillType.coinBase ? CryptoAll : FreeKassa}
          alt=""
        />
      </div>
      <div className={styles.input_flex}>
        <div className={styles.input_item}>{t("New.refill_sum")}</div>
        <div className={styles.input_item}>
          <input
            className="gray_input"
            style={{ width: "100%", textAlign: "right" }}
            placeholder="0 USD"
            value={realSumValue}
            onChange={(e) => {
              setRealSumValue(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        className="dark_green_button"
        style={{ width: "100%" }}
        disabled={isLoading || !realSumValue || +realSumValue < minSum}
        onClick={handlePopolnit}
      >
        {t("User_layout.put_in")}
      </button>
    </div>
  );
};

export default RefillItem;
