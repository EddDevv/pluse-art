import styles from "./Login.module.scss";
import { motion } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import { upAnimation } from "../../../utils/animation/animations";
import { useAppDispatch, useAppSelector } from "../../../store";
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
// import { IRDAuth, loginUser } from "../../../features/auth/authSlice";
// import { Button, Fade, InputGroup, InputRightElement } from "@chakra-ui/react";
// import { Captcha } from "../../../components/captcha/Captcha";
// import Meta from "../../../utils/seo/Meta";
// import { LocalSpinner } from "../../../UIcomponents/localSpinner/LocalSpinner";
// import $api, { $apiWithoutToken } from "../../../http/apiService";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Fade, InputGroup, InputRightElement } from "@chakra-ui/react";
import { LocalSpinner } from "../../../UIcomponents/localSpinner/LocalSpinner";

type EnterForm = {
  login: string;
  password: string;
  passwordRepeat: string;
  pin: string;
};

const Login: FC = () => {
  const dispatch = useAppDispatch();
  // const md5 = require("md5");

  useEffect(() => {
    console.log("login");
  }, []);

  // const { accessToken, isLoading, isError, captchaError, message } =
  //   useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  // Captcha
  const [visibleCaptcha, setVisibleCaptcha] = useState(false);
  const [successCaptcha, setSuccessCaptcha] = useState(false);
  const [isGa, setIsGa] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  // Router v6
  const navigate = useNavigate();

  // React hook form
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<EnterForm>({
    mode: "all",
  });

  const openCaptcha = () => {
    setVisibleCaptcha(!visibleCaptcha);
  };

  // useEffect(() => {
  //   if (accessToken) {
  //     navigate("/user");
  //   }
  // }, [isError, accessToken, message, navigate, dispatch]);

  // // Open captcha when many errors
  // useEffect(() => {
  //   captchaError >= 3 && openCaptcha();
  // }, [captchaError]);

  // const checkIsGaForLogin = async (login: string) => {
  //   const rd = {
  //     login,
  //   };
  //   try {
  //     const res: AxiosResponse<{ twoFactorAuth: boolean }> =
  //       await $apiWithoutToken.post("/api/user/2fa-info", rd);
  //     if (res.status === 200) {
  //       if (res.data.twoFactorAuth === true) {
  //         setIsGa(true);
  //       } else if (res.data.twoFactorAuth === false) {
  //         setIsGa(false);
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const onSubmitOrResetLoginForm: SubmitHandler<EnterForm> = async (data) => {
  //   if (isReset) {
  //     interface IRdResetRass {
  //       login: string;
  //       password: string;
  //       passwordRepeat: string;
  //       pin?: string;
  //     }
  //     const rd: IRdResetRass = {
  //       login: data.login,
  //       password: md5(data.password),
  //       passwordRepeat: md5(data.passwordRepeat),
  //       pin: data.pin,
  //     };
  //     try {
  //       const res = await $api.post("/api/user/reset", rd);
  //       if (res.status >= 200 && res.status < 300) {
  //         toast.success("Пароль успешно сброшен");
  //         setIsReset(false);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   } else {
  //     const fetchUserLoginData: IRDAuth = {
  //       Login: data.login,
  //       Password: md5(data.password),
  //     };
  //     if (isGa) {
  //       fetchUserLoginData.Pin = data.pin;
  //     }
  //     await dispatch(loginUser(fetchUserLoginData));
  //     // setIsGa(false);
  //   }
  //   reset();
  // };

  return (
    <>
      {/* <Meta title="Login" description="Авторизуйтесь в приложении."> */}
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.main_container}
        >
          <div className={styles.inner_container}>
            <motion.div
              className={styles.title}
              variants={upAnimation}
              custom={1}
            >
              {isReset ? "Сброс пароля" : "Авторизация"}
            </motion.div>

            {visibleCaptcha && (
              <Fade in={visibleCaptcha}>
                {/* <Captcha
                    setSuccessCaptcha={setSuccessCaptcha}
                    setVisibleCaptcha={setVisibleCaptcha}
                    visibleCaptcha={visibleCaptcha}
                  /> */}
              </Fade>
            )}

            <motion.div
              variants={upAnimation}
              custom={2}
              className={styles.form}
            >
              <div className={styles.input_box}>
                <div className={styles.label}>Логин</div>
                <input
                  // placeholder="Логин"
                  type="text"
                  className="gray_input"
                  {...register("login", {
                    required: "The field is required!",
                    onChange: (e) => {
                      // if (e.target.value.length >= 4) {
                      // checkIsGaForLogin(e.target.value);
                      // }
                    },
                    minLength: {
                      value: 4,
                      message: "Min 4 letters!",
                    },
                    maxLength: {
                      value: 10,
                      message: "Max 10 letters!",
                    },
                  })}
                />
                {errors?.login && (
                  <div className="required">
                    {errors.login.message || "Error!"}
                  </div>
                )}
              </div>

              {(isReset && isGa) || !isReset ? (
                <>
                  <div className={styles.input_box}>
                    <div className={styles.label}>
                      {isReset ? "Новый пароль" : "Пароль"}
                    </div>
                    <InputGroup>
                      <input
                        type={isShowPassword ? "text" : "password"}
                        className="gray_input"
                        {...register("password", {
                          required: "The field is required",
                          minLength: {
                            value: 4,
                            message: "Min 4 letters!",
                          },
                          maxLength: {
                            value: 10,
                            message: "Max 10 letters!",
                          },
                        })}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          // h="1.75rem"
                          mt={4}
                          size="sm"
                          onClick={() => setIsShowPassword(!isShowPassword)}
                        >
                          {isShowPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors?.password && (
                      <div className="required">
                        {errors.password.message || "Error!"}
                      </div>
                    )}
                  </div>

                  {isReset && (
                    <div className={styles.input_box}>
                      <div className={styles.label}>Повторите пароль</div>
                      <InputGroup>
                        <input
                          className="gray_input"
                          type={isShowPassword ? "text" : "password"}
                          {...register("passwordRepeat", {
                            minLength: {
                              value: 4,
                              message: "Минимум 4 символа!",
                            },
                            maxLength: {
                              value: 10,
                              message: "Максимум 10 символов!",
                            },
                            validate: (value) => {
                              const { password } = getValues();
                              return (
                                password === value || "Пароли должны совпадать!"
                              );
                            },
                          })}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            // h="1.75rem"
                            mt={4}
                            size="sm"
                            onClick={() => setIsShowPassword(!isShowPassword)}
                          >
                            {isShowPassword ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {errors?.passwordRepeat && (
                        <div className="required">
                          {errors.passwordRepeat.message || "Error!"}
                        </div>
                      )}
                    </div>
                  )}
                  {isGa && (
                    <div className={styles.input_box}>
                      <div className={styles.label}>Код GA</div>
                      <input
                        className="gray_input"
                        {...register("pin", {
                          required: isGa ? "The field is required" : false,
                        })}
                      />
                      {errors?.pin && (
                        <div className="required">
                          {errors.pin.message || "Error!"}
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    className="main_button_mt40_w100"
                    // disabled={isLoading || !isValid}
                    // onClick={handleSubmit(onSubmitOrResetLoginForm)}
                  >
                    {isLoading ? <LocalSpinner size="60" /> : "Войти"}
                  </button>
                </>
              ) : (
                <>
                  <div className="required">
                    Без подключенного GA сменить пароль может только
                    администратор!
                  </div>
                  <button className="main_button_mt40_w100">
                    <a
                      href="https://t.me/MTB_Invest"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Написать в поддержку
                    </a>
                  </button>
                </>
              )}

              <div className={styles.link}>
                <NavLink to="/signup">Регистрация</NavLink>
              </div>

              {!isReset ? (
                <div
                  className={styles.link}
                  style={{ marginTop: "0px" }}
                  onClick={() => setIsReset(true)}
                >
                  Забыли пароль?
                </div>
              ) : (
                <div
                  className={styles.link}
                  style={{ marginTop: "0px" }}
                  onClick={() => setIsReset(false)}
                >
                  Войти
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* </Meta> */}
    </>
  );
};

export default Login;
