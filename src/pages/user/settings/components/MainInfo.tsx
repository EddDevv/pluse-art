import React, { useState, useEffect } from "react";

import styles from "../Settings.module.scss";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useInputV } from "../../../../hooks/useInputV";
import { MainApi } from "../../../../api/main/mainApi";
import instance from "../../../../api/instance";
import { toast } from "react-toastify";
import { CountryDropdown } from "react-country-region-selector";
import { Loader } from "../../../../api/Loader";

const MainInfo = () => {
  const { t } = useTranslation();
  const { allInfoUser } = useAppSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const firstName = useInputV(allInfoUser?.value?.firstName ?? "");
  const lastName = useInputV(allInfoUser?.value?.lastName ?? "");
  const middleName = useInputV(allInfoUser?.value?.middleName ?? "");
  const birthDate = useInputV(
    allInfoUser?.value?.birthDate == null
      ? ""
      : allInfoUser.value.birthDate.split("T")[0]
  );
  const [country, setCountry] = useState(
    allInfoUser?.value?.country ?? "Россия"
  );

  const city = useInputV(allInfoUser?.value?.city ?? "");
  const telegram = useInputV(allInfoUser?.value?.telegram ?? "");
  const vkontakte = useInputV(allInfoUser?.value?.vkontakte ?? "");
  const ok = useInputV(allInfoUser?.value?.facebook ?? "");

  const inn = useInputV(allInfoUser?.value?.inn ?? "");

  useEffect(() => {
    handleReset();
  }, [allInfoUser]);

  const [openSnack, setOpenSnack] = useState({
    status: false,
    text: "",
    color: "error",
  });
  const [counter, setCounter] = useState(0);

  const handleReset = () => {
    // firstName.onReset();
    // lastName.onReset();
    // middleName.onReset();
    // birthDate.onReset();
    // setCountry("");
    // city.onReset();
    // telegram.onReset();
    // vkontakte.onReset();
    firstName.change(allInfoUser?.value?.firstName ?? "");
    firstName.setDirty(false);
    lastName.change(allInfoUser?.value?.lastName ?? "");
    lastName.setDirty(false);
    middleName.change(allInfoUser?.value?.middleName ?? "");
    middleName.setDirty(false);
    birthDate.change(
      allInfoUser?.value?.birthDate == null
        ? ""
        : allInfoUser.value.birthDate.split("T")[0]
    );
    birthDate.setDirty(false);
    setCountry(allInfoUser?.value?.country ?? "Россия");
    city.change(allInfoUser?.value?.city ?? "");
    city.setDirty(false);
    telegram.change(allInfoUser?.value?.telegram ?? "");
    telegram.setDirty(false);
    vkontakte.change(allInfoUser?.value?.vkontakte ?? "");
    vkontakte.setDirty(false);
    ok.change(allInfoUser?.value?.facebook ?? "");
    ok.setDirty(false);
    inn.change(allInfoUser?.value?.inn ?? "");
    inn.setDirty(false);
    setIsLoading(false);
  };

  const updateMainInfo = async () => {
    setIsLoading(true);
    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      middleName: middleName.value,
      birthDate: birthDate.value === "" ? null : birthDate.value,
      country: country,
      city: city.value,
      telegram: telegram.value,
      vkontakte: vkontakte.value,
      // facebook: facebook.value,
      facebook: ok.value,
      // instagram: instagram.value,
      // twitter: twitter.value,
      // youtube: youtube.value,
      inn: inn.value,
    };
    try {
      const res = await instance.put("api/Profile/update", payload);
      if (res.status >= 200 && res.status < 300) {
        toast.success(t("New.data_updated"));
        await MainApi.getInitialMainReduxInfo();
      }
    } catch (e) {
      console.error(e);
      toast.error(t("New.data_update_error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.collapse}>
      <div className={styles.green_header}>{t("New.common_data")}</div>

      <div className={styles.flex}>
        <div className={styles.half}>
          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.lastname")}</div>
            <input
              onChange={(e) => lastName.onChange(e)}
              value={lastName.value}
              type="text"
              className="gray_input"
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.name")}</div>
            <input
              onChange={(e) => firstName.onChange(e)}
              value={firstName.value}
              type="text"
              className="gray_input"
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.surname")}</div>
            <input
              onChange={(e) => middleName.onChange(e)}
              value={middleName.value}
              type="text"
              className="gray_input"
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("DopItem2.inn")}</div>
            <input
              onChange={(e) => inn.onChange(e)}
              value={inn.value}
              type="text"
              className="gray_input"
            />
          </div>
        </div>

        {/* ************************************************ */}
        <div className={styles.half}>
          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.date")}</div>
            <input
              onChange={(e) => birthDate.onChange(e)}
              value={birthDate.value}
              type="date"
              className="gray_input"
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.country")}</div>
            <CountryDropdown
              value={country}
              classes="gray_input"
              onChange={(val) => {
                // console.log(val);
                setCountry(val);
              }}
              // priorityOptions={["Russian Federation", "Kyrgyzstan"]}
              // whitelist={["Russian Federation", "Kyrgyzstan"]}
            />
          </div>
          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.region")}</div>
            <input
              onChange={(e) => city.onChange(e)}
              value={city.value}
              type="text"
              className="gray_input"
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>Skype\Telegram</div>
            <input
              onChange={(e) => telegram.onChange(e)}
              value={telegram.value}
              type="text"
              className="gray_input"
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.page")} VK.com</div>
            <input
              onBlur={(e) => vkontakte.onBlur(e)}
              onChange={(e) => vkontakte.onChange(e)}
              value={vkontakte.value}
              type="text"
              className="gray_input"
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.page")} ok.ru</div>
            <input
              onBlur={(e) => ok.onBlur(e)}
              onChange={(e) => ok.onChange(e)}
              value={ok.value}
              type="text"
              className="gray_input"
            />
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className={styles.button_flex}>
        <button className="outline_green_button_2" onClick={handleReset}>
          {t("SettingsPage.cancel")}
        </button>
        <button
          className="dark_green_button_2"
          disabled={isLoading}
          onClick={updateMainInfo}
        >
          <div className="loader_for_button">
            <Loader loading={isLoading} />
          </div>
          {t("SettingsPage.save")}
        </button>
      </div>
    </div>
  );
};

export default MainInfo;
