import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./RefProgram.module.scss";
import { useAppSelector } from "../../../store";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import {
  Checkbox,
  Collapse,
  FormControl,
  IconButton,
  Spacer,
  Switch,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, CopyIcon } from "@chakra-ui/icons";

const ruDomen = "https://pulrt.com";

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

const RefProgram = () => {
  const { t, i18n } = useTranslation();

  const { allInfoUser } = useAppSelector((state) => state);
  const [referralLink, setReferralLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // **********СВИЧ ЯЗЫКА В РЕФ СЫЛКЕ***************************
  const [checked, setChecked] = useState(false);

  const handleChangeSwitch = (event: any) => {
    setChecked(event.target.checked);
  };

  const [checkedDomen, setCheckedDomen] = useState(false);

  // Создание реферальной ссылки
  useEffect(() => {
    const fullPath = window.location.href.split("/refprogram");
    const localLang = localStorage.getItem("i18nextLng");

    if (checked && checkedDomen) {
      setReferralLink(
        `${ruDomen}/register/${allInfoUser.value.id}&${localLang}`
      );
    } else if (checked) {
      setReferralLink(
        `${fullPath[0]}/register/${allInfoUser.value.id}&${localLang}`
      );
    } else if (checkedDomen) {
      setReferralLink(`${ruDomen}/register/${allInfoUser.value.id}`);
    } else {
      setReferralLink(`${fullPath[0]}/register/${allInfoUser.value.id}`);
    }
  }, [allInfoUser, checked, checkedDomen]);

  const handleCopyToClipboard = async () => {
    copy(referralLink);
    toast.success(t("SettingsPage.copy"));
  };

  return (
    <div className="page_container">
      <div className={`${styles.paper}`}>
        <div className={styles.title_flex}>
          <div className={styles.title}>{t("New.program")}</div>
        </div>

        <div className={styles.flex_end}>
          <div className={styles.desc}>{t("New.ref_prog_1")}</div>
        </div>
        <div className={styles.main_info}>{t("New.ref_prog_2")}</div>
        <div className={styles.main_info}>{t("New.ref_prog_3")}</div>

        {/* ********************************* */}
        <div className={styles.flex_link}>
          <div className={styles.ref_text}>{t("PersonalArea.ref")}:</div>
          <input
            className={`gray_input ${styles.linkinput}`}
            value={referralLink}
            readOnly
          />
          <IconButton
            onClick={handleCopyToClipboard}
            aria-label="Search database"
            icon={<CopyIcon color={"teal"} />}
          />

          <Spacer />
          <div className={styles.check_box}>
            <div className={styles.check_box_item}>
              <Checkbox
                colorScheme="teal"
                checked={checked}
                onChange={handleChangeSwitch}
                placeholder={`${i18n?.language?.toUpperCase()} lang`}
              />
              {`${i18n?.language?.toUpperCase()} lang`}
            </div>
            <div className={styles.check_box_item}>
              <Checkbox
                colorScheme="teal"
                checked={checkedDomen}
                onChange={(e) => setCheckedDomen(e.target.checked)}
                placeholder="RU domen"
              />
              RU domen
            </div>
          </div>
        </div>

        {/* **************** */}
        <div className={styles.open_flex}>
          {t("MarketingPage.classic")}
          <Spacer />
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Search database"
            icon={
              isOpen ? <CloseIcon color={"teal"} /> : <AddIcon color={"teal"} />
            }
          />
        </div>
        <Collapse in={isOpen} animateOpacity>
          <div>
            <div className={styles.points}>
              <div>
                {t("New.profit_common_1")} <b>{t("New.profit_common_2")}</b>
                {t("New.profit_common_3")}.
              </div>
            </div>
            <div className={styles.table}>
              <div className="table_row" style={{ height: "100px" }}>
                <div className="table_item_20">{t("MarketingPage.level2")}</div>
                <div className="table_item_20">
                  {t("MarketingPage.portfel")}
                </div>
                <div className="table_item_20">{t("MarketingPage.obem")}</div>
                <div className="table_item_20">{t("MarketingPage.lichno")}</div>
                <div className="table_item_20">{t("MarketingPage.dohod")}</div>
                <div className="table_item_20">{t("MarketingPage.bally")}</div>
              </div>

              {rows2.map((row) => (
                <div className={`table_row ${styles.row}`}>
                  <div className="table_item_20">{row.id}</div>
                  <div className="table_item_20">{row.portfolio}</div>
                  <div className="table_item_20">{row.totalInvestment}</div>
                  <div className="table_item_20">{row.selfInvestment}</div>
                  <div className="table_item_20">{row.income}</div>
                  <div className="table_item_20">{row.points}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.points}>
            <div>
              {t("New.profit0")} <b>{t("New.profit1_0")}</b>
              {t("New.profit1")}.
            </div>
            <div>
              {t("New.profit0")} <b>{t("New.profit2_0")}</b>
              {t("New.profit2")}.
            </div>
            <div>
              {t("New.profit0")} <b>{t("New.profit3_0")}</b>
              {t("New.profit3")}.
            </div>
            <div>
              {t("New.profit0")} <b>{t("New.profit4_0")}</b>
              {t("New.profit4")}.
            </div>
            <div>
              {t("New.profit0")} <b>{t("New.profit5_0")}</b>
              {t("New.profit5")}.
            </div>

            <div>
              {t("New.profit0")} <b>{t("New.profit6_0")}</b>
              {t("New.profit6")}.
            </div>
            <div>
              {t("New.profit0")} <b>{t("New.profit7_0")}</b>
              {t("New.profit7")}.
            </div>
            <div>
              {t("New.profit0")} <b>{t("New.profit8_0")}</b>
              {t("New.profit8")}.
            </div>
            <div>
              {t("New.profit0")} <b>{t("New.profit9_0")}</b>
              {t("New.profit9")}.
            </div>
            <div>
              {t("New.profit0")} <b>{t("New.profit10_0")}</b>
              {t("New.profit10")}.
            </div>
            <div style={{ margin: "30px 0" }}>{t("New.profit11")}.</div>
            <div>
              <b>{t("New.profit12")}.</b>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default RefProgram;
