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
import PhoneInput from "react-phone-input-2";
import { SubmitHandler, useForm } from "react-hook-form";

type PassportForm = {
  passportSerial: string;
  passportNumber: string;
  passportIssuer: string;
  passportIssueDate1: string;
  addressReg: string;
};

const MainInfo = () => {
  const { t } = useTranslation();
  const { allInfoUser } = useAppSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditPass, setIsEditPass] = useState(false);

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

  const [phoneNumber, setPhoneNumber] = useState(
    allInfoUser?.value?.phoneNumber ?? ""
  );
  const email = useInputV(allInfoUser?.value?.email ?? "", {
    isEmpty: true,
    isEmail: true,
  });

  const [passportDate, setPassportDate] = useState("2012-12-12");

  // Initialize react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PassportForm>({
    mode: "all",
    // defaultValues: {
    //   passportSerial: "",
    //   passportNumber: "",
    //   passportIssuer: "",
    //   passportIssueDate: "",
    //   addressReg: "",
    // },
  });

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

    email.change(allInfoUser.value.email);
    email.setDirty(false);
    setPhoneNumber(allInfoUser?.value?.phoneNumber);
    setIsLoading(false);

    reset(allInfoUser.value);
    // console.log(allInfoUser.value?.passportIssueDate?.split("T")?.[0]);
    allInfoUser.value?.passportIssueDate &&
      setPassportDate(allInfoUser.value?.passportIssueDate?.split("T")?.[0]);
    setIsEdit(false);
    setIsEditPass(false);
  };

  useEffect(() => {
    setPhoneNumber(allInfoUser?.value?.phoneNumber ?? "");
  }, [allInfoUser]);

  useEffect(() => {
    handleReset();
  }, [allInfoUser]);

  const [openSnack, setOpenSnack] = useState({
    status: false,
    text: "",
    color: "error",
  });
  const [counter, setCounter] = useState(0);

  const handleUpdatePhoneMail = async () => {
    setIsLoading(true);
    if (
      phoneNumber.length > 7 &&
      phoneNumber !== allInfoUser?.value?.phoneNumber
    ) {
      const payload = {
        phone: phoneNumber,
      };

      try {
        await instance.post(`api/Profile/change-phone`, payload);
        toast.success(t("SettingsPage.save_tel"));
      } catch (error: any) {
        console.error(error);
        if (error?.response?.data) {
          toast.error(error?.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (email.value.length > 0 && email.value !== allInfoUser?.value?.email) {
      const emailPayload = {
        email: email.value,
      };

      try {
        await instance.post(`api/Profile/change-email`, emailPayload);
        toast.success(t("SettingsPage.save_email"));
      } catch (error: any) {
        console.error(error);
        if (error?.response?.data) {
          toast.error(error?.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    }
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
      }
      await handleUpdatePhoneMail();
      await MainApi.getInitialMainReduxInfo();
      setIsEdit(false);
      setIsEditPass(false);
    } catch (e) {
      console.error(e);
      toast.error(t("New.data_update_error"));
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassportData: SubmitHandler<PassportForm> = async (data) => {
    setIsLoading(true);

    const fetchData = {
      passportSerial: data.passportSerial,
      passportNumber: data.passportNumber,
      passportIssuer: data.passportIssuer,
      passportIssueDate: passportDate,
      addressReg: data.addressReg,
    };

    try {
      const res = await instance.put("/api/Profile/update-passport", fetchData);
      if (res.status >= 200 && res.status < 300) {
        toast.success(t("SettingsPage.passport_success"));
        await MainApi.getInitialMainReduxInfo();
        handleReset();
      }
    } catch (e) {
      console.error(e);
      toast.error(t("SettingsPage.passport_error"));
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div className={styles.collapse}>
      {/* *****COMMON*************************************** */}
      <div className={styles.green_header}>{t("New.common_data")}</div>

      <div className={styles.flex}>
        <div className={styles.half}>
          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.lastname")}</div>
            <input
              onChange={(e) => lastName.onChange(e)}
              value={lastName.value}
              type="text"
              className={`gray_input ${styles.w70}`}
              readOnly={!isEdit}
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.name")}</div>
            <input
              onChange={(e) => firstName.onChange(e)}
              value={firstName.value}
              type="text"
              className={`gray_input ${styles.w70}`}
              readOnly={!isEdit}
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.surname")}</div>
            <input
              onChange={(e) => middleName.onChange(e)}
              value={middleName.value}
              type="text"
              className={`gray_input ${styles.w70}`}
              readOnly={!isEdit}
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("DopItem2.inn")}</div>
            <input
              onChange={(e) => inn.onChange(e)}
              value={inn.value}
              type="text"
              className={`gray_input ${styles.w70}`}
              readOnly={!isEdit}
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.tel")}</div>
            <PhoneInput
              inputProps={{
                name: "phone",
              }}
              containerClass={styles.country}
              inputClass={`gray_input ${styles.phone}`}
              placeholder="Phone number"
              country={"ru"}
              value={phoneNumber}
              onChange={(tel) => {
                isEdit && setPhoneNumber(tel);
              }}
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.email")}</div>
            <input
              type="text"
              className={`gray_input ${styles.w70}`}
              onBlur={(e) => email.onBlur(e)}
              onChange={(e) => {
                email.onChange(e);
              }}
              value={email.value}
              readOnly={!isEdit}
            />
            {email.isDirty && email.emailError && (
              <span className="error_message">
                {t("SettingsPage.wrong_format")}
              </span>
            )}
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
              className={`gray_input ${styles.w70}`}
              readOnly={!isEdit}
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.country")}</div>
            {/* <div style={{ width: "70%" }}> */}
            <CountryDropdown
              value={country}
              classes={`gray_input ${styles.country}`}
              onChange={(val) => {
                // console.log(val);
                isEdit && setCountry(val);
              }}
              // priorityOptions={["Russian Federation", "Kyrgyzstan"]}
              // whitelist={["Russian Federation", "Kyrgyzstan"]}
            />
            {/* </div> */}
          </div>
          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.region")}</div>
            <input
              onChange={(e) => city.onChange(e)}
              value={city.value}
              type="text"
              className={`gray_input ${styles.w70}`}
              readOnly={!isEdit}
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>Skype\Telegram</div>
            <input
              onChange={(e) => telegram.onChange(e)}
              value={telegram.value}
              type="text"
              className={`gray_input ${styles.w70}`}
              readOnly={!isEdit}
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.page")} VK.com</div>
            <input
              onBlur={(e) => vkontakte.onBlur(e)}
              onChange={(e) => vkontakte.onChange(e)}
              value={vkontakte.value}
              type="text"
              className={`gray_input ${styles.w70}`}
              readOnly={!isEdit}
            />
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("SettingsPage.page")} ok.ru</div>
            <input
              onBlur={(e) => ok.onBlur(e)}
              onChange={(e) => ok.onChange(e)}
              value={ok.value}
              type="text"
              className={`gray_input ${styles.w70}`}
              readOnly={!isEdit}
            />
          </div>
        </div>
      </div>

      {/* buttons */}
      {isEdit ? (
        <div className={styles.button_flex}>
          <button
            className={`outline_green_button_2 ${styles.button_save}`}
            onClick={handleReset}
          >
            {t("SettingsPage.cancel")}
          </button>
          <button
            className={`dark_green_button_2 ${styles.button_save}`}
            disabled={isLoading}
            onClick={updateMainInfo}
          >
            <div className="loader_for_button">
              <Loader loading={isLoading} />
            </div>
            {t("SettingsPage.save")}
          </button>
        </div>
      ) : (
        <div className={styles.button_flex}>
          <button
            className={`dark_orange_button ${styles.button_save}`}
            onClick={() => setIsEdit(true)}
          >
            {t("New.edit")}
          </button>
        </div>
      )}

      {/* *****PASSSPORT*************************************** */}

      <div className={styles.green_header}> {t("New.passport_data")}</div>

      <div className={styles.flex}>
        <div className={styles.half}>
          <div className={styles.input_row}>
            <div className={styles.label}>
              {t("SettingsPage.passport_serial")}
            </div>
            <div className={styles.input70}>
              <input
                type="text"
                className="gray_input"
                readOnly={!isEditPass}
                {...register("passportSerial", {
                  required: t("SettingsPage.requared").toString(),
                  minLength: {
                    value: 2,
                    message: t("SettingsPage.min2").toString(),
                  },
                  maxLength: {
                    value: 12,
                    message: t("SettingsPage.max12").toString(),
                  },
                })}
              />
              {errors?.passportSerial && (
                <div className="required">
                  {errors.passportSerial.message || "Error!"}
                </div>
              )}
            </div>
          </div>

          <div className={styles.input_row}>
            <div className={styles.label}>{t("DopItems.number")}</div>
            <div className={styles.input70}>
              <input
                type="text"
                className="gray_input"
                readOnly={!isEditPass}
                {...register("passportNumber", {
                  required: t("SettingsPage.requared").toString(),
                  minLength: {
                    value: 4,
                    message: t("SettingsPage.min4").toString(),
                  },
                  maxLength: {
                    value: 12,
                    message: t("SettingsPage.max12").toString(),
                  },
                })}
              />
              {errors?.passportNumber && (
                <div className="required">
                  {errors.passportNumber.message || "Error!"}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.half}>
          <div className={styles.input_row}>
            <div className={styles.label}>
              {t("SettingsPage.passport_date")}
            </div>
            <div className={styles.input70}>
              <input
                type="date"
                className="!gray_input"
                value={passportDate}
                readOnly={isEditPass}
                {...register("passportIssueDate1", {
                  // required: t("SettingsPage.requared").toString(),
                  onChange: (e) => setPassportDate(e.target.value),
                })}
              />
              {errors?.passportIssueDate1 && (
                <div className="required">
                  {errors.passportIssueDate1.message || "Error!"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.input_row_upper}>
        <div className={styles.label15}>{t("SettingsPage.passport_by")}</div>
        <div className={styles.input85}>
          <input
            type="text"
            className="gray_input"
            readOnly={!isEditPass}
            {...register("passportIssuer", {
              required: t("SettingsPage.requared").toString(),
              minLength: {
                value: 10,
                message: t("SettingsPage.min10").toString(),
              },
              maxLength: {
                value: 120,
                message: t("SettingsPage.max120").toString(),
              },
            })}
          />
          {errors?.passportIssuer && (
            <div className="required">
              {errors.passportIssuer.message || "Error!"}
            </div>
          )}
        </div>
      </div>

      <div className={styles.input_row_upper}>
        <div className={styles.label15}>
          {t("SettingsPage.passport_address")}
        </div>
        <div className={styles.input85}>
          <input
            type="text"
            className="gray_input"
            readOnly={!isEditPass}
            {...register("addressReg", {
              required: t("SettingsPage.requared").toString(),
              minLength: {
                value: 10,
                message: t("SettingsPage.min10").toString(),
              },
              maxLength: {
                value: 120,
                message: t("SettingsPage.max120").toString(),
              },
            })}
          />
          {errors?.addressReg && (
            <div className="required">
              {errors.addressReg.message || "Error!"}
            </div>
          )}
        </div>
      </div>

      {/* buttons */}
      {isEditPass ? (
        <div className={styles.button_flex}>
          <button
            className={`outline_green_button_2 ${styles.button_save}`}
            onClick={() => {
              reset(allInfoUser.value);
              // console.log(allInfoUser.value?.passportIssueDate?.split("T")?.[0]);
              setPassportDate(
                allInfoUser.value?.passportIssueDate?.split("T")?.[0]
              );
              setIsEditPass(false);
              // handleReset();
            }}
          >
            {t("SettingsPage.cancel")}
          </button>
          <button
            className={`dark_green_button_2 ${styles.button_save}`}
            disabled={!isValid || isLoading}
            onClick={handleSubmit(onSubmitPassportData)}
          >
            <div className="loader_for_button">
              <Loader loading={isLoading} />
            </div>
            {t("SettingsPage.save")}
          </button>
        </div>
      ) : (
        <div className={styles.button_flex}>
          <button
            className={`dark_orange_button ${styles.button_save}`}
            onClick={() => setIsEditPass(true)}
          >
            {t("New.edit")}
          </button>
        </div>
      )}
    </div>
  );
};

export default MainInfo;
