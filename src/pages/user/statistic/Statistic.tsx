import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Statistic.module.scss";
import { useAppSelector } from "../../../store";
import { MarketingApi } from "../../../api/marketing/marketing";
import { StatisticType } from "../../../assets/types/Statistics";
import { useText } from "../../../hooks/useText";
import People from "../../../assets/images/People.png";
import Moment from "react-moment";
import { Spacer, useMediaQuery } from "@chakra-ui/react";
import instance from "../../../api/instance";

type RowType = {
  groupVolumeByLevels: number;
  groupVolumeLevel1: number;
  personalVolumeByLevels: number;
  profitBonusByLevels: number;
};

const Statistic = () => {
  const { t } = useTranslation();
  const [isLagerThan480] = useMediaQuery("(min-width: 480px)");
  const [isLagerThan760] = useMediaQuery("(min-width: 760px)");

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
    // const resGetStat1: any = await instance.get("api/Stat/income-sum");
    // const resGetStat2: any = await instance.get("api/Stat/contracts-stat");
    // const resGetStat3: any = await instance.get("api/Stat/withdrawal-sum");
    // const resGetStat4: any = await instance.get("api/Stat/reinvest-sum");

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
          <div className="page_title">{t("New.stat")}</div>
        </div>

        {!isLagerThan760 && (
          <div className={styles.flex_end}>
            <div className={styles.div_50}>{t("New.to_y_invites")}</div>
          </div>
        )}

        <div className={styles.flex_end}>
          {isLagerThan760 && <div>{t("New.to_y_invites")}</div>}
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
