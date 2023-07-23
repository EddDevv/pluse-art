import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { CryptoWalletType } from "../../../../store/allInfoUser";
import instance from "../../../../api/instance";
import ModalMain from "../../../../UIcomponents/mainModal/ModalMain";
import { useAppSelector } from "../../../../store";
import styles from "../Settings.module.scss";
import { Loader } from "../../../../api/Loader";

type PropType = {
  wallet?: CryptoWalletType;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddWallet?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WalletItem = ({
  wallet,
  refresh,
  setRefresh,
  setIsAddWallet,
}: PropType) => {
  // **********Translation i18next***********
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userData, allInfoUser } = useAppSelector((state) => state);

  const [gaAuthEnabled, setGaAuthEnabled] = useState(false);
  const [codeGa, setCodeGa] = useState("");
  const [usdtWallet, setUsdtWallet] = useState("");

  // Проверка актививрованости GA по данным пользователя с бека
  useEffect(() => {
    if (userData?.value?.userInfo?.confirmationType === "GA") {
      setGaAuthEnabled(true);
    } else {
      setGaAuthEnabled(false);
    }
  }, [userData]);

  const handlerSubmitWallet = async () => {
    if (usdtWallet.length > 6) {
      setIsLoading(true);
      const payload = {
        cryptoWallet: usdtWallet,
        cryptoCurrency: "USDT",
        networkType: "TRC20",
        code: gaAuthEnabled ? codeGa : "111111",
      };
      try {
        await instance.post(
          `api/Profile/requisites/add-crypto-wallet`,
          payload
        );
        toast.success(t("SettingsPage.wallet"));
        setUsdtWallet("");
        setCodeGa("");
        setIsAddWallet && setIsAddWallet(false);
        setRefresh(!refresh);
      } catch (error: any) {
        console.error(error);
        if (error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error(t("DopItems.wallet_adding_error"));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteUserWallet = async () => {
    if (!wallet) return;
    setIsLoading(true);
    try {
      const res = await instance.delete(`api/Profile/requisites/${wallet.id}`);
      if (res?.status >= 200 && res.status < 300) {
        toast.success(t("New.wallet_deleted"));
        setIsOpen(false);
        setRefresh(!refresh);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error(t("DopItems.wallet_deleting_error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.collapse_item}>
      {/* <input
        value={wallet?.objectName}
        color="secondary"
        className="gray_input"
      />
      <input
        value={wallet?.cryptoWallet}
        color="secondary"
        className="wallets_value"
      /> */}
      <div className={styles.column_gap4}>
        {wallet && (
          <div className={styles.input_row}>
            <div className={styles.label}>{t("New.name")}</div>
            <input
              value={wallet?.objectName}
              readOnly
              type="text"
              className={`gray_input ${styles.w100}`}
            />
          </div>
        )}
        <div className={styles.input_row}>
          <div className={styles.label}>{t("New.wallet_number")}</div>
          <input
            value={wallet ? wallet?.cryptoWallet : usdtWallet}
            readOnly={wallet ? true : false}
            onChange={(e) => setUsdtWallet(e.target.value)}
            type="text"
            className={`gray_input ${styles.w100}`}
          />
        </div>
        {/* ....ИНПУТ ПОДТВЕРЖЕНИЯ GA................... */}
        {gaAuthEnabled && (
          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.verification")}</div>
            <input
              value={codeGa}
              onChange={(e) => setCodeGa(e.target.value)}
              type="number"
              className={`gray_input ${styles.w100}`}
            />
          </div>
        )}
      </div>

      <div className={styles.button_flex}>
        {wallet && (
          <button
            className="outline_green_button_2"
            onClick={() => setIsOpen(true)}
          >
            {t("New.delete")}
          </button>
        )}
        {!wallet && (
          <button
            className="dark_green_button_2"
            disabled={isLoading || usdtWallet.length <= 6}
            onClick={handlerSubmitWallet}
          >
            <div className="loader_for_button">
              <Loader loading={isLoading} />
            </div>
            {t("SettingsPage.save")}
          </button>
        )}
      </div>

      <ModalMain
        isOpen={isOpen}
        title={`${t("DopItems.delete_wallet")} №${wallet?.cryptoWallet}?`}
        handleClose={() => setIsOpen(false)}
        handleSubmit={() => {
          deleteUserWallet();
        }}
      />
    </div>
  );
};
