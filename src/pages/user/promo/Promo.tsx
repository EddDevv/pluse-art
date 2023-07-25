import React, { useEffect, useState } from "react";
import { Spacer } from "@chakra-ui/react";
import styles from "./Promo.module.scss";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store";
import Moment from "react-moment";
import { toast } from "react-toastify";
import instance, { BASEAPPURL } from "../../../api/instance";
import { ContestType } from "../../../store/contest/reducer";
import {
  AccountsForRdEnum,
  AccountsFullEnum,
} from "../../../assets/consts/consts";
import { useDispatch } from "react-redux";
import { setContestsListActive } from "../../../store/contest/actions";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";

const Promo = () => {
  const { t } = useTranslation();

  const { contests, allInfoUser } = useAppSelector((state) => state);
  const [chosen, setChosen] = useState<ContestType | null>(null);
  const [pay, setPay] = useState(false);

  const [account, setAccount] = useState<string>(AccountsFullEnum.Usd);

  const [accounts, setAccounts] = useState<string[]>([]);

  const dispatch = useDispatch();

  //   const checkBalances = () => {
  //     const array: string[] = [];
  //     Object.entries(allInfoUser.value).forEach((elem) => {
  //       if (elem[0].startsWith("balance") && elem[1]) {
  //         if (elem[0] === "balance" && +elem[1] >= item.participationCost) {
  //           array.push("Usd");
  //         } else {
  //           const account = elem[0].split("balance")?.[1];
  //           const course = currencyRates.value.find(
  //             (elem) => elem.code === account.toUpperCase()
  //           );
  //           if (course && +elem[1] * course.rate >= item.participationCost) {
  //             array.push(account);
  //           }
  //         }
  //       }
  //     });
  //     setAccounts(array);
  //     if (array.length > 0) {
  //       if (!array.includes(AccountsFullEnum.Bitcoin)) {
  //         setAccount(array[0]);
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     checkBalances();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [allInfoUser.value, currencyRates, item]);

  const handleAdd = async () => {
    if (!chosen) return;
    try {
      const response = await instance.post(
        `api/Contest/participate/${chosen.id}?accountName=${
          Object(AccountsForRdEnum)[account]
        }`
      );
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(t("Platform.you_participate"));
      }
      if (response?.status === 422) {
        let error: any = new Error(t("Platform.not_enough_money").toString());
        error.response = response;
        throw error;
      } else if (response?.status === 400) {
        let error: any = new Error(t("Platform.wallet_not_exist").toString());
        error.response = response;
        throw error;
      }
    } catch (error: any) {
      console.error("error Contest", error);
      if (error.response) {
        console.error("error.response:", error.response?.data);
        toast.error(error.response?.data);
      } else {
        console.error(error);
        toast.error(error.message);
      }
    } finally {
      setPay(false);
      const resContestActive = await instance.get(
        "api/Contest/contest-list?onlyActive=true"
      );
      // console.log("resContestActive?.data", resContestActive?.data);
      if (resContestActive?.status >= 200 && resContestActive.status < 300) {
        dispatch(setContestsListActive(resContestActive?.data));
      }
    }
  };

  return (
    <div className="page_container">
      <ModalMain
        title={t("Platform.participate")}
        isOpen={pay}
        handleClose={() => setPay(false)}
        handleSubmit={handleAdd}
      />
      <div className={`${styles.paper}`}>
        <div className={styles.title_flex}>
          <div className="page_title">
            {t("New.promo")} {new Date().getFullYear()}
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <Spacer />
          <div className={styles.flex_end}>
            <div>{t("New.take_promo")}</div>
          </div>
        </div>

        <div className={styles.main}>
          {contests?.past.map((elem) => (
            <div className={styles.item} key={elem.id}>
              <div className={styles.data}>
                {t("New.promo_added")}
                <Moment format="DD MMMM YYYY" locale="ru">
                  {elem.startDate}
                </Moment>
              </div>
              <div className={styles.flex}>
                <div className={styles.image}>
                  <img src={`${BASEAPPURL}assets/Img/${elem.image}`} alt="" />
                </div>

                <div className={styles.info_column}>
                  <div className={styles.promo_title}>{elem.caption}</div>
                  <div className={styles.promo_desc}>
                    <div>{t("New.term")}</div>
                    <span>
                      <Moment format="DD MMMM YYYY" locale="ru">
                        {elem.finishDate}
                      </Moment>
                    </span>
                  </div>
                  <div className={styles.promo_desc}>
                    <div>{t("New.cost")}</div>
                    <span>{elem.participationCost}</span>
                  </div>

                  <Spacer />
                  <div
                    className={styles.promo_desc}
                    style={{ alignItems: "end" }}
                  >
                    <div>
                      {t("Platform.participate_list")} {elem.participantsCount}
                    </div>
                    <button
                      className="dark_orange_button"
                      onClick={() => {
                        setChosen(elem);
                        setPay(true);
                      }}
                      disabled
                    >
                      {t("Platform.participate")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Promo;
