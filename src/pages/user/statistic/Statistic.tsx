import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Statistic.module.scss";
import { useAppSelector } from "../../../store";
import { MarketingApi } from "../../../api/marketing/marketing";
import { StatisticType } from "../../../assets/types/Statistics";
import { useText } from "../../../hooks/useText";
import People from "../../../assets/images/People.png";
import Moment from "react-moment";
import { Spacer } from "@chakra-ui/react";

const rows2 = [
  {
    id: 1,
    portfolio: "500",
    totalInvestment: "5000",
    selfInvestment: "---",
    income: "10%",
    points: "100%",
  },
  {
    id: 2,
    portfolio: "2000",
    totalInvestment: "20 000",
    selfInvestment: "---",
    income: "10%",
    points: "80%",
  },
  {
    id: 3,
    portfolio: "4000",
    totalInvestment: "40 000",
    selfInvestment: "---",
    income: "5%",
    points: "60%",
  },
  {
    id: 4,
    portfolio: "7000",
    totalInvestment: "70 000",
    selfInvestment: "---",
    income: "4%",
    points: "50%",
  },
  {
    id: 5,
    portfolio: "10 000",
    totalInvestment: "100 000",
    selfInvestment: "---",
    income: "3%",
    points: "40%",
  },
  {
    id: 6,
    portfolio: "15 000",
    totalInvestment: "250 000",
    selfInvestment: "10 000",
    income: "3%",
    points: "30%",
  },
  {
    id: 7,
    portfolio: "25 000",
    totalInvestment: "500 000",
    selfInvestment: "25 000",
    income: "3%",
    points: "20%",
  },
  {
    id: 8,
    portfolio: "50 000",
    totalInvestment: "1 000 000",
    selfInvestment: "50 000",
    income: "3%",
    points: "15%",
  },
  {
    id: 9,
    portfolio: "75 000",
    totalInvestment: "3 000 000",
    selfInvestment: "100 000",
    income: "3%",
    points: "10%",
  },
  {
    id: 10,
    portfolio: "100 000",
    totalInvestment: "5 000 000",
    selfInvestment: "200 000",
    income: "3%",
    points: "5%",
  },
];

type RowType = {
  groupVolumeByLevels: number;
  groupVolumeLevel1: number;
  personalVolumeByLevels: number;
  profitBonusByLevels: number;
};

const Statistic = () => {
  const { t } = useTranslation();

  const { auth } = useAppSelector((state) => state);
  const [stat, setStat] = useState<StatisticType | null>(null);
  const [rows, setRows] = useState<RowType[]>([]);
  const [level, setLevel] = useState(0);

  const { rightMenu } = useAppSelector((state) => state);

  const [isLoading] = useState(false);
  const [isStat, setIsStat] = useState(false);

  const textLink = useText(
    rightMenu.userStatistic.linkHitsCount,
    t("PersonalArea.transition1"),
    t("PersonalArea.transition2"),
    t("PersonalArea.transition3")
  );

  const textReg = useText(
    rightMenu.userStatistic.referalsCount,
    t("PersonalArea.reg1"),
    t("PersonalArea.reg2"),
    t("PersonalArea.reg3")
  );

  const textActivate = useText(
    rightMenu.userStatistic.activatedReferalsCount,
    t("PersonalArea.activation1"),
    t("PersonalArea.activation2"),
    t("PersonalArea.activation3")
  );

  useEffect(() => {
    const fullPath = window.location.href;

    if (fullPath.includes("statistics")) {
      setIsStat(true);
    } else {
      setIsStat(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);
  const getStat = async () => {
    const resGetStat: any = await MarketingApi.getStat();
    if (resGetStat.status >= 200 && resGetStat.status < 300) {
      setStat(resGetStat.data);
    } else {
      console.error(resGetStat);
    }
  };

  // console.log(stat);

  useEffect(() => {
    if (auth?.token && !stat?.maxBonusLevel) {
      getStat();
    }
  }, [auth, stat?.maxBonusLevel]);

  const createData = (
    groupVolumeByLevels: number,
    groupVolumeLevel1: number,
    personalVolumeByLevels: number,
    profitBonusByLevels: number
  ) => {
    return {
      groupVolumeByLevels,
      groupVolumeLevel1,
      personalVolumeByLevels,
      profitBonusByLevels,
    };
  };

  const createRows = () => {
    if (!stat) return;
    const newRows = [];
    for (let i = 0; i < stat.groupVolumeByLevels.length; i++) {
      newRows.push(
        createData(
          stat.groupVolumeByLevels[i],
          stat.groupVolumeLevel1[i],
          stat.personalVolumeByLevels[i],
          stat.profitBonusByLevels[i]
        )
      );
    }
    setRows(newRows);
    setLevel(stat.maxBonusLevel);
  };

  useEffect(() => {
    if (stat?.groupVolumeByLevels) {
      createRows();
    }
  }, [stat]);

  return (
    <div className="page_container">
      <div className={`${styles.paper}`}>
        <div className={styles.title_flex}>
          <div className={styles.title}>{t("New.stat")}</div>
        </div>

        <div className={styles.flex_end}>
          <div>{t("New.to_y_invites")}</div>
          <div className={styles.stat_box}>
            <div className={styles.main_numbers_box}>
              <div className={styles.main_numbers}>
                <div className={styles.main_numbers_1}>
                  {rightMenu.userStatistic.linkHitsCount}
                </div>
                <div className={styles.main_numbers_2_green}>{textLink}</div>
              </div>

              <div className={styles.main_numbers}>
                <div className={styles.main_numbers_1}>
                  {rightMenu.userStatistic.referalsCount}
                </div>
                <div className={styles.main_numbers_2_green}>{textReg}</div>
              </div>

              <div className={styles.main_numbers}>
                <div className={styles.main_numbers_1_red}>
                  {rightMenu.userStatistic.activatedReferalsCount}
                </div>
                <div className={styles.main_numbers_2_red}>{textActivate}</div>
              </div>
            </div>

            <div className={styles.sub_text}>{t("New.stat_update")}</div>
          </div>
        </div>

        {/* ********************************* */}

        <div className={styles.level_box}>
          <div className={styles.level_green}>
            <div>
              <img src={People} alt="" />
            </div>
            <div>
              <div>{t("Statistics.your_level")}</div>
              <div className={styles.date}>
                {t("Statistics.activation_date")}{" "}
                {stat?.activationDate && (
                  <Moment format="DD/MM/YYYY">{stat?.activationDate}</Moment>
                )}
              </div>
            </div>
            <Spacer />
            <div className={styles.level}>
              {stat?.maxBonusLevel}
              <b className={styles.level_text}>level</b>
            </div>
          </div>

          <div className={styles.numbers_box}>
            <div className={styles.numbers_column}>
              <div className={styles.number_flex}>
                {t("Statistics.referrals_amount")}
                <span>{stat?.referralsCount}</span>
              </div>
              <div className={styles.number_flex}>
                {t("Statistics.from_all_activated")}
                <span>{stat?.activeReferralsCount}</span>
              </div>
              <div className={styles.number_flex}>
                {t("Statistics.group_volume")}
                <span>{stat?.groupVolume}</span>
              </div>
            </div>

            <div className={styles.numbers_column}>
              <div className={styles.number_flex}>
                {t("Statistics.group_volume_1level")}
                <span>{stat?.groupVolume1}</span>
              </div>
              <div className={styles.number_flex}>
                {t("Statistics.personal_volume")}
                <span>{stat?.personalVolume}</span>
              </div>
              <div className={styles.number_flex}>
                {t("Statistics.available_for_rewards")}
                <span>{stat?.maxBonusLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* **************** */}

        <div className={styles.table}>
          <div
            className={`table_row ${styles.header}`}
            style={{ height: "100px" }}
          >
            <div className="table_item_25">{t("Statistics.1level_volume")}</div>
            <div className="table_item_25">
              {" "}
              {t("Statistics.structure_volume")}
            </div>
            <div className="table_item_25">
              {t("Statistics.personal_volume1")}
            </div>
            <div className="table_item_25"> {t("Statistics.reward")}</div>
          </div>

          {rows.map((row) => (
            <div className={`table_row ${styles.row}`}>
              <div className={`table_item_25 ${styles.table_item}`}>
                {row.groupVolumeLevel1} <b>USD</b>
              </div>
              <div className={`table_item_25 ${styles.table_item}`}>
                {row.groupVolumeByLevels} <b>USD</b>
              </div>
              <div className={`table_item_25 ${styles.table_item}`}>
                {row.personalVolumeByLevels} <b>USD</b>
              </div>
              <div className={`table_item_25 ${styles.table_item}`}>
                {row.profitBonusByLevels * 100}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistic;
