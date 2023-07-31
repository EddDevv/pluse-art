import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../api/instance";
import { useAppDispatch, useAppSelector } from "../../store";
import { AllInfoUserMain } from "../../store/allInfoUser";
import { Collapse, Fade } from "@chakra-ui/react";
import styles from "./LangSwitcher.module.scss";

export const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();
  let { id } = useParams();
  // const { language } = useAppSelector((state) => state.allInfoUser.value);
  const { value } = useAppSelector((state) => state.allInfoUser);
  const { token } = useAppSelector((state) => state.auth);

  const changeLanguage = async (lang: string) => {
    if (token) {
      try {
        const response = await instance.put(
          `api/Profile/update-language?languageCode=${lang}`
        );
        if (response?.status >= 200 && response?.status < 300) {
          toast.success(t("History.lang_change"));
          i18n.changeLanguage(lang);
          dispatch(AllInfoUserMain({ ...value, language: lang }));
        }
      } catch (error: any) {
        if (error.response) {
          console.error("error.response:", error.response?.data);
          toast.error(error.response?.data);
        } else {
          console.error(error);
          toast.error(t("History.lang_change_error"));
        }
      }
    } else {
      i18n.changeLanguage(lang);
      // dispatch(AllInfoUserMain({ ...value, language: lang }));
    }
  };

  const [showLang, setShowLang] = useState(false);

  useEffect(() => {
    if (id && !token) {
      const tempArr = id?.split("&");
      localStorage.setItem("i18nextLng", tempArr[1]);
      changeLanguage(tempArr[1]);
    } else if (!token) {
      const localLang = localStorage.getItem("i18nextLng");
      if (localLang) {
        changeLanguage(localLang);
      }
    }
  }, [token, id]);

  return (
    <div className={styles.container}>
      <div
        onClick={() => setShowLang(!showLang)}
        className="lang_btn btn_for_open_lang"
      >
        {i18n?.language?.toUpperCase()}
      </div>
      <Collapse animateOpacity in={showLang}>
        <div className={styles.collapse}>
          <button
            onClick={() => {
              changeLanguage("ru");
              setShowLang(!showLang);
            }}
            className={styles.button}
          >
            RU
          </button>
          <button
            onClick={() => {
              changeLanguage("en");
              setShowLang(!showLang);
            }}
            className={styles.button}
          >
            EN
          </button>
          <button
            onClick={() => {
              changeLanguage("cn");
              setShowLang(!showLang);
            }}
            className={styles.button}
          >
            CN
          </button>
        </div>
      </Collapse>
    </div>
  );
};
