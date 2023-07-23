import React, { useEffect, useState } from "react";

import styles from "../Settings.module.scss";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../store";
import instance from "../../../../api/instance";
import { toast } from "react-toastify";
import { MainApi } from "../../../../api/main/mainApi";
import {
  Button,
  Checkbox,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CopyIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useInputV } from "../../../../hooks/useInputV";
import { SubmitHandler, useForm } from "react-hook-form";

type ChangePassForm = {
  password: string;
  confirmPassword: string;
  code: string;
};

const Security = () => {
  const { t } = useTranslation();

  const { userData, allInfoUser } = useAppSelector((state) => state);

  const [codeGaP, setCodeGaP] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  // // Initialize React hook form
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   getValues,
  //   formState: { errors, isValid },
  // } = useForm<ChangePassForm>({
  //   mode: "all",
  // });

  // const onSubmit: SubmitHandler<ChangePassForm> = (data) => {
  //   const rd = {
  //     password: data.password,
  //     confirmPassword: data.confirmPassword,

  //     code: "1",
  //   };
  // };
  const password = useInputV("", {
    isEmpty: true,
    minLength: 6,
    isPassword: true,
    // maxLength: 10,
  });

  const passwordConfirm = useInputV("", {
    isEmpty: true,
    // minLength: 6,
    // maxLength: 10,
  });
  const handleReset = () => {
    password.onReset();
    passwordConfirm.onReset();
    password.setDirty(false);
    setCodeGaP("");
  };

  const changePassword = async () => {
    const payload = {
      password: password.value,
      confirmPassword: passwordConfirm.value,
      code: gaAuthEnabled ? codeGaP : "111111",
    };
    try {
      const response = await instance.post(
        "api/Profile/change-password",
        payload
      );
      if (response.status < 300 && response.status >= 200) {
        toast.success(t("New.pass_changed"));
      }
    } catch (e: any) {
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      } else if (e?.response) {
        toast.error(e?.response);
      } else {
        toast.error(t("SettingsPage.error"));
      }
      console.error(e);
      setCodeGaP("");
    }
  };

  const setHidden = async () => {
    try {
      const response = await instance.put(
        `api/Profile/update-visibility?isHidden=${!allInfoUser.value.isHidden}`
      );
      if (response?.status >= 200 && response.status < 300) {
        toast.success(
          allInfoUser.value.isHidden
            ? t("DopItem2.profile_open")
            : t("DopItem2.profile_hidden")
        );
        await MainApi.getInitialMainReduxInfo();
      }
    } catch (e: any) {
      if (e?.response?.data) {
        toast.error(e?.response?.data);
        console.error(e?.response?.data);
      } else if (e?.response) {
        toast.error(e?.response);
      } else {
        toast.error(t("SettingsPage.error"));
        console.error(e);
      }
    }
  };

  const [gaAuthEnabled, setGaAuthEnabled] = useState(false);
  const [gaResCode, setGaResCode] = useState("");
  const [gaResUrl, setGaResURL] = useState("");
  const [gaCode, setGaCode] = useState("");

  // Проверка актививрованости GA по данным пользователя с бека
  useEffect(() => {
    if (userData?.value?.userInfo?.confirmationType === "GA") {
      setGaAuthEnabled(true);
    } else {
      setGaAuthEnabled(false);
    }
  }, [userData]);

  // ПОЛУЧЕНИЕ GA QR и КОДА
  const getGADataHandler = async () => {
    try {
      const response = await instance.post("api/Confirm/ga-authorization");
      if (response.status < 300 && response.status >= 200) {
        setGaResCode(response.data?.code);
        setGaResURL(response.data?.url);
      }
    } catch (e: any) {
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      } else if (e?.response) {
        toast.error(e?.response);
      } else {
        toast.error(t("SettingsPage.error"));
      }
      console.error(e);
      setGaCode("");
      // setGaResCode("");
      setGaResURL("");
    }
  };

  useEffect(() => {
    getGADataHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // ОБНОВЛЕНИЕ ДАННЫх ПОЛЬЗОВАТЕЛЯ
  const refreshUserData = async () => {
    await MainApi.getInitialMainReduxInfo();
  };

  const resetGaData = () => {
    setGaCode("");
    // setGaResCode("");
  };

  const enableGaHandler = async () => {
    try {
      const response = await instance.post(
        `api/Confirm/update-ga-settings?on=true&code=${gaCode}`
      );
      if (response?.status >= 200 && response.status < 300) {
        toast.success(t("SettingsPage.ga_success"));
      }
      resetGaData();
      await refreshUserData();
    } catch (e: any) {
      // console.error(e?.response?.data);
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      } else if (e?.response) {
        toast.error(e?.response);
      } else {
        toast.error(t("SettingsPage.error"));
      }
      console.error(e);
      resetGaData();
    }
  };

  const disableGaHandler = async () => {
    try {
      const response = await instance.post(
        `api/Confirm/update-ga-settings?on=false&code=${gaCode}`
      );

      if (response?.status >= 200 && response.status < 300) {
        toast.success(t("SettingsPage.ga_delete"));
        await refreshUserData();
        resetGaData();
      }
    } catch (e: any) {
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      } else if (e?.response) {
        toast.error(e?.response);
      } else {
        toast.error(t("SettingsPage.error"));
      }
      console.error(e);
      resetGaData();
    }
  };
  return (
    <div className={styles.collapse}>
      {/* ******************password ************************************** */}

      <div className={styles.green_header}>{t("New.pass")}</div>

      <>
        <div className={styles.flex}>
          <div className={styles.half}>
            <div className={styles.input_row}>
              <div className={styles.label_120}>
                {t("SettingsPage.new_pas")}
              </div>

              {/* *****************************************************password *******************************************/}

              <div className={styles.w100}>
                <InputGroup>
                  <input
                    placeholder="Пароль"
                    type={isShowPassword ? "text" : "password"}
                    className="gray_input_w100"
                    onBlur={(e) => password.onBlur(e)}
                    onChange={(e) => password.onChange(e)}
                    value={password.value}
                    // {...register("password", {
                    //   required: "The field is required",
                    //   pattern: {
                    //     value:
                    //       /(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                    //     message:
                    //       "Заглавная Буква, строчная буква, цифра и спецсимвол, длина не меньше 8 символов и не должен начинаться с @",
                    //   },
                    //   minLength: {
                    //     value: 8,
                    //     message: "Min 8 letters!",
                    //   },
                    // })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      // h="1.75rem"
                      mt={2}
                      size="sm"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* {errors?.password && (
                      <div className="required">
                        {errors.password.message || "Error!"}
                      </div>
                    )} */}
                {password.isDirty && password.passwordError && (
                  <span className="required">{t("Login.required_pass")}</span>
                )}
              </div>
            </div>

            {/* ....ИНПУТ ПОДТВЕРЖЕНИЯ GA................... */}
            {gaAuthEnabled && (
              <div className={styles.input_row}>
                <div className={styles.label_120}>
                  {t("SettingsPage.verification")}
                </div>
                <div className={styles.w100}>
                  <input
                    value={codeGaP}
                    onChange={(e) => setCodeGaP(e.target.value)}
                    type="number"
                    className="gray_input_w100"
                  />
                </div>
              </div>
            )}
          </div>

          {/* *****************************************************passwordRepeat *******************************************/}
          <div className={styles.half}>
            <div className={styles.input_row}>
              <div className={styles.label_120}>
                {t("SettingsPage.new_pas")}
              </div>
              <div className={styles.w100}>
                <InputGroup>
                  <input
                    placeholder="Повторите пароль"
                    type={isShowPassword ? "text" : "password"}
                    className="gray_input_w100"
                    onBlur={(e) => passwordConfirm.onBlur(e)}
                    onChange={(e) => passwordConfirm.onChange(e)}
                    value={passwordConfirm.value}
                    // {...register("confirmPassword", {
                    //   required: "The field is required",

                    //   minLength: {
                    //     value: 8,
                    //     message: "Min 8 letters!",
                    //   },

                    //   validate: (value) => {
                    //     const { password } = getValues();
                    //     return (
                    //       password === value || "Passwords must match!"
                    //     );
                    //   },
                    // })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      // h="1.75rem"
                      mt={2}
                      size="sm"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* {errors?.confirmPassword && (
                      <div className="required">
                        {errors.confirmPassword.message || "Error!"}
                      </div>
                    )} */}
                {passwordConfirm.value !== password.value && (
                  <span className="required">
                    {t("SettingsPage.pas_wrong")}
                  </span>
                )}
                {passwordConfirm.value !== password.value && (
                  <span className="required">
                    {t("SettingsPage.pas_wrong")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.button_flex}>
          <button className="outline_green_button_2" onClick={handleReset}>
            {t("SettingsPage.cancel")}
          </button>
          <button
            className="dark_green_button_2"
            disabled={
              gaAuthEnabled
                ? passwordConfirm.value.length < 6 ||
                  (passwordConfirm.value !== password.value &&
                    password.inputValid) ||
                  codeGaP.length < 6
                : passwordConfirm.value.length < 6 ||
                  (passwordConfirm.value !== password.value &&
                    password.inputValid)
            }
            onClick={changePassword}
          >
            {t("SettingsPage.save")}
          </button>
        </div>
      </>

      {/* ******************GA************************************** */}
      <>
        <div className={styles.green_header}>Google Auth</div>
        <div className={styles.flex}>
          <div className={styles.half} style={{ gap: "24px" }}>
            {!gaAuthEnabled && (
              <div className={styles.input_row}>
                <div className={styles.label_120}>
                  {t("SettingsPage.ga_secret")}
                </div>

                <input
                  value={gaResCode}
                  readOnly
                  className={`gray_input ${styles.w100}`}
                />
                <IconButton
                  onClick={() => {
                    window.navigator.clipboard.writeText(gaResCode);
                    toast.success(t("SettingsPage.copy"));
                  }}
                  color="secondary"
                  aria-label="copy"
                >
                  <CopyIcon color={"teal"} />
                </IconButton>
              </div>
            )}

            <div className={`styles.label ${styles.w100}`}>
              {t("SettingsPage.ga_confirm")}{" "}
              {gaAuthEnabled
                ? t("SettingsPage.ga_deact")
                : t("SettingsPage.ga_activate")}{" "}
              Google Auth
            </div>

            <div className={styles.input_row}>
              <input
                onChange={(e) => setGaCode(e.target.value)}
                value={gaCode}
                type="number"
                className={`gray_input ${styles.w100}`}
              />
              <button
                onClick={gaAuthEnabled ? disableGaHandler : enableGaHandler}
                disabled={gaCode.length < 5}
                className="dark_orange_button"
              >
                {gaAuthEnabled
                  ? t("SettingsPage.ga_disable")
                  : t("SettingsPage.ga_enable")}
              </button>
            </div>
          </div>

          <div className={styles.half}>
            {!gaAuthEnabled && (
              <img src={gaResUrl} alt="ga qr code" style={{ width: "30%" }} />
            )}
          </div>
        </div>
      </>

      {/* ******************HIDDEN************************************** */}

      <div className={styles.check_flex}>
        <Checkbox
          colorScheme="teal"
          checked={allInfoUser.value.isHidden === true}
          onChange={setHidden}
        />
        <div>{t("DopItem2.hide_user_info")}</div>
      </div>
    </div>
  );
};

export default Security;
