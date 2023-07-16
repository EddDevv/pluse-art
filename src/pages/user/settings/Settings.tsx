import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Settings.module.scss";
import { useAppSelector } from "../../../store";
import { MarketingApi } from "../../../api/marketing/marketing";
import { StatisticType } from "../../../assets/types/Statistics";
import { useText } from "../../../hooks/useText";
import People from "../../../assets/images/People.png";
import Moment from "react-moment";
import { Spacer } from "@chakra-ui/react";
import instance from "../../../api/instance";
// import HiOutlineIdentification from "react-icons/hi"
import {
  AiOutlineCreditCard,
  AiOutlineSecurityScan,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import Profile from "./profile/Profile";

const set_items = [
  { id: 1, name: "user_info", icon: <AiOutlineUserSwitch /> },
  { id: 2, name: "pay_info", icon: <AiOutlineCreditCard /> },
  { id: 3, name: "security", icon: <AiOutlineSecurityScan /> },
  { id: 4, name: "doc", icon: <BsBook /> },
];

const Settings = () => {
  const { t } = useTranslation();

  const { auth } = useAppSelector((state) => state);

  const [chosenId, setChosenId] = useState<string | number>("");

  return (
    <>
      <Profile />
      <div className="page_container">
        <div className={`${styles.paper}`}>
          <div className={styles.title_flex}>
            <div className="page_title">{t("New.settings")}</div>
          </div>

          {set_items.map((elem) => (
            <div
              onClick={() => setChosenId(elem.id)}
              className={
                elem.id === chosenId ? styles.block_open : styles.block_close
              }
            >
              {elem.icon}
              <div>{t(`New.${elem.name}`)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Settings;
