import React, { useEffect, useState } from "react";

import styles from "../Settings.module.scss";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../store";
import { useDispatch } from "react-redux";
import instance from "../../../../api/instance";
import { UserWallets } from "../../../../store/allInfoUser";
import { BankAccountType } from "../../../../assets/types/Bank";
import { WalletItem } from "./WalletItem";
import { Collapse } from "@chakra-ui/react";
import { BankAccountItem } from "./BankAccountItem";

const PaymentInfo = () => {
  const { t } = useTranslation();
  const { allInfoUser } = useAppSelector((state) => state);
  const dispatch = useDispatch();

  // const [bankCards, setBankCards] = useState<BankCardType[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccountType[]>([]);

  const [refresh, setRefresh] = useState(false);

  const [isAddWallet, setIsAddWallet] = useState(false);
  const [isAddAccount, setIsAddAccount] = useState(false);

  useEffect(() => {
    refreshUserRequisites();
  }, [refresh]);

  const refreshUserRequisites = async () => {
    const resRequisites = await instance.get("api/Profile/requisites");

    if (resRequisites?.status >= 200 && resRequisites.status < 300) {
      dispatch(UserWallets(resRequisites?.data?.cryptoWallets));
      // setBankCards(resRequisites?.data?.bankCards);
      setBankAccounts(resRequisites?.data?.bankAccounts);
    }
  };
  return (
    <div className={styles.collapse}>
      <div className={styles.wallet_flex}>
        <div className={styles.green_header}>{t("SettingsPage.wallets")}</div>
        <button
          className="dark_orange_button"
          onClick={() => {
            setIsAddWallet(true);
          }}
          disabled={allInfoUser.wallets?.length >= 2}
        >
          {t("New.add_wallet")}
        </button>
      </div>
      <Collapse in={isAddWallet} animateOpacity>
        <WalletItem
          refresh={refresh}
          setRefresh={setRefresh}
          setIsAddWallet={setIsAddWallet}
        />
      </Collapse>
      {allInfoUser.wallets.map((item) => (
        <WalletItem wallet={item} refresh={refresh} setRefresh={setRefresh} />
      ))}

      <div className={styles.wallet_flex}>
        <div className={styles.green_header}>{t("SettingsPage.bank_acc")}</div>
        <button
          className="dark_orange_button"
          onClick={() => {
            setIsAddAccount(true);
          }}
        >
          {t("New.add_account")}
        </button>
      </div>
      <Collapse in={isAddAccount} animateOpacity>
        <BankAccountItem
          refresh={refresh}
          setRefresh={setRefresh}
          setIsAddAccount={setIsAddAccount}
        />
      </Collapse>
      {bankAccounts.length > 0 &&
        bankAccounts.map((item) => (
          <BankAccountItem
            bankAccount={item}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        ))}
    </div>
  );
};

export default PaymentInfo;
