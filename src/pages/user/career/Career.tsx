import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Career.module.scss";
import { useAppSelector } from "../../../store";
import { StatisticType } from "../../../assets/types/Statistics";
import { Spacer } from "@chakra-ui/react";

const Career = () => {
  const { t } = useTranslation();

  const { auth } = useAppSelector((state) => state);
  const [stat, setStat] = useState<StatisticType | null>(null);

  return (
    <div className="page_container">
      <div className={`${styles.paper}`}>
        <div className={styles.title_flex}>
          <div className="page_title">{t("New.career")}</div>
        </div>

        <div style={{ display: "flex" }}>
          {" "}
          <Spacer />
          <div className={styles.flex_end}>
            <div>{t("Career.young_company")}</div>
          </div>
        </div>

        {/* **************** */}
        <div className={styles.main}>
          <p>{t("Career.we_are_the_best")}</p>

          <p className={styles.main_green}>{t("Career.what_propose")}</p>
          <li> {t("Career.right_investment")}</li>
          <li>{t("Career.trading_training")}</li>
          <li>{t("Career.creation_our_portfolio")}</li>
          <li>{t("Career.insurance")}</li>
          <li>{t("Career.automation")}</li>

          <p className={styles.main_green}>{t("Career.responsibilities")}</p>
          <li>{t("Career.build_your_portfolio")}</li>
          <li> {t("Career.attract_new_customers")}</li>
          <li>{t("Career.avise_clients")}</li>
          <li>{t("Career.business_meetings")}</li>
          <li>{t("Career.long_term_relationships")}</li>
          <li>{t("Career.do_plan")}</li>

          <p className={styles.main_green}>{t("Career.want_to_see")}</p>
          <li>{t("Career.successful_experience")}</li>
          <li>{t("Career.higher_education")}</li>
          <li>{t("Career.speech")}</li>
          <li>{t("Career.qualities")}</li>

          <p className={styles.main_green}>{t("Career.you_get")}</p>
          <li>{t("Career.opportunities")}</li>
          <li>{t("Career.salary")}</li>
          <li>{t("Career.education")}</li>
          <li>{t("Career.education2")}</li>

          <p style={{ marginTop: "50px" }} className={styles.main_green}>
            {t("Career.send_your_resume")}
            <b className={styles.main_green}>director@gk-pulse.com</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Career;
