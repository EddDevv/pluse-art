import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { DealType } from "../../../../assets/types/Portfolio";
import { useText } from "../../../../hooks/useText";
import { useTimer } from "../../../../hooks/useTimer";
import styles from "../Portfolio.module.scss";
import Moment from "react-moment";
import { StatusDeal } from "../../../../assets/consts/consts";
import { getNumWithoutZeroToFixedN } from "../../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";
import ModalMain from "../../../../UIcomponents/mainModal/ModalMain";

const day21 = 21 * 24 * 60 * 60 * 1000;

type PropType = {
  deal: DealType;
  numberDeal: number;
  resumeDeal?: any;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const DealItemCancel = ({
  deal,
  numberDeal,
  resumeDeal,
  refresh,
  setRefresh,
  setCurrentPage,
}: PropType) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resumeDealLocal = async () => {
    setIsLoading(true);
    await resumeDeal(deal.id, false, "Usdc");
    setCurrentPage(1);
    setRefresh(!refresh);
    setIsLoading(false);
  };

  const { day, hours, minute, seconds } = useTimer(
    Date.parse(deal.endDate) + day21
  );

  const minText = useText(
    minute,
    t("Programs.minutes1"),
    t("Programs.minutes2"),
    t("Programs.minutes3")
  );
  const secText = useText(
    seconds,
    t("Programs.seconds1"),
    t("Programs.seconds2"),
    t("Programs.seconds3")
  );
  const hourText = useText(
    hours,
    t("Programs.hours1"),
    t("Programs.hours2"),
    t("Programs.hours3")
  );
  const dayText = useText(
    day,
    t("Programs.days1"),
    t("Programs.days2"),
    t("Programs.days3")
  );

  const dayTermText = useText(
    deal.endDate
      ? +(
          (+new Date(deal.endDate) - +new Date(deal.startDate)) /
          1000 /
          60 /
          60 /
          24
        ).toFixed(0)
      : 0,
    t("Programs.days1"),
    t("Programs.days2"),
    t("Programs.days3")
  );

  return (
    <div className={styles.deal_box} style={{ background: "#EDEDED" }}>
      <ModalMain
        title={`${t("Programs.resume")} #${deal.id}`}
        isOpen={open}
        handleClose={() => setOpen(false)}
        handleSubmit={resumeDealLocal}
      />
      <div className={styles.deal_top}>
        <div className={styles.deal_top_left}>
          <div>
            {t("Programs.deal")} #{numberDeal}{" "}
          </div>
          <div>
            {t("Programs.from")}
            <Moment format="DD/MM/YYYY">{deal.startDate}</Moment>
          </div>
        </div>
        {deal.status === StatusDeal.Term && (
          <div className={styles.deal_timer}>
            <div className={styles.timer_column}>
              <div>{day} </div>
              <span>{dayText} </span>
            </div>
            <div className={styles.timer_column}>
              <div>{hours} </div>
              <span>{hourText} </span>
            </div>
            <div className={styles.timer_column}>
              <div>{minute} </div>
              <span>{minText} </span>
            </div>
            <div className={styles.timer_column}>
              <div>{seconds} </div>
              <span>{secText} </span>
            </div>
          </div>
        )}
        {deal.status === StatusDeal.Terminate && (
          <div className={styles.deal_timer}>
            <div className={styles.timer_column}>
              <div>
                {deal.endDate
                  ? (
                      (+new Date(deal.endDate) - +new Date(deal.startDate)) /
                      1000 /
                      60 /
                      60 /
                      24
                    ).toFixed(0)
                  : 0}{" "}
              </div>
              <span>{dayTermText}</span>
            </div>
            <div className={styles.timer_column}>
              <div>{0} </div>
              <span>{t("Programs.hours3")} </span>
            </div>
            <div className={styles.timer_column}>
              <div>{0} </div>
              <span>{t("Programs.minutes3")} </span>
            </div>
            <div className={styles.timer_column}>
              <div>{0} </div>
              <span>{t("Programs.seconds3")} </span>
            </div>
          </div>
        )}
      </div>
      <div
        style={{ minHeight: "30px", textAlign: "right", paddingRight: "29px" }}
      >
        {deal.status === StatusDeal.Term && <div>{t("History.return_in")}</div>}
      </div>

      <div className={styles.deal_income_box}>
        <div>{t("New.your_income")}</div>
        <div className={styles.income}>
          {getNumWithoutZeroToFixedN(deal.sumIncome, 2)}
          <b className={styles.usd}>&nbsp; USD</b>
        </div>
      </div>

      <div className={styles.deal_sum_box}>
        <div>{t("New.portfolio_sum")}</div>
        <div className={styles.sum}>
          {deal.sum}
          <b className={styles.usd}>&nbsp; USD</b>
        </div>
      </div>

      <div className={styles.green_deal_info}>
        {t("History.deal_closed")} &nbsp;
        {deal.endDate && (
          <Moment format="DD/MM/YYYY" locale="ru">
            {deal.endDate}
          </Moment>
        )}
      </div>

      {deal.status === StatusDeal.Term && (
        <div className={styles.green_deal_info}>
          {t("Programs.deposit_returned")}
        </div>
      )}

      {deal.status === StatusDeal.Term && (
        <div className={styles.resume}>
          <button
            className={`dark_green_button ${styles.resume_button} `}
            onClick={() => setOpen(true)}
          >
            {t("Programs.resume")}
          </button>
        </div>
      )}
      {/* 
      <div>deal.sum:{deal.sum}</div>
      <div>deal.sumIncome:{deal.sumIncome}</div>
      <div>deal.speedPercent:{deal.speedPercent}</div>
      <div>deal.startDate:{deal.startDate}</div>
      <div>deal.statusChangedDate:{deal.statusChangedDate}</div>
      <div>programName:{deal.programName}</div>
      <div>deal.canReplenish:{deal?.canReplenish.toString()}</div>
      <div>deal.canInsure:{deal?.canInsure.toString()}</div>
      <div>deal.insuranceEndDate:{deal?.insuranceEndDate}</div>
      <div>deal.speedEndDate:{deal.speedEndDate}</div>
      <div>+new Date(deal.speedEndDate):{+new Date(deal.speedEndDate)}</div>
      <div>+new Date():{+new Date()}</div>
      <div>isPromo:{deal.isPromo.toString()}</div> */}
    </div>
  );
};
