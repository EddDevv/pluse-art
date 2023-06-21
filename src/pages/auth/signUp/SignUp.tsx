import styles from "./SignUp.module.scss";
import { motion } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import { upAnimation } from "../../../utils/animation/animations";
import { useAppDispatch, useAppSelector } from "../../../store";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
// import {
//   addCaptchaErrorCount,
//   registerUser,
// } from "../../../features/auth/authSlice";
import { Button, Center, Fade, Spinner } from "@chakra-ui/react";
// import { Captcha } from "../../../components/captcha/Captcha";
// import { $apiWithoutToken } from "../../../http/apiService";
// import Meta from "../../../utils/seo/Meta";
// import Logos from "../../../components/home/logos/Logos";

type SignUpForm = {
  login: string;
  password: string;
  passwordRepeat: string;
  inviter: string;
};

const SignUp: FC = () => {
  const { id } = useParams();
  const md5 = require("md5");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { accessToken, isLoading, isError, captchaError, message } =
  //   useAppSelector((state) => state.auth);

  // Captcha
  const [visibleCaptcha, setVisibleCaptcha] = useState(false);
  const [successCaptcha, setSuccessCaptcha] = useState(false);
  const [registerData, setRegisterData] = useState({});

  const [checkLogin, setCheckLogin] = useState("");
  const [checkInviter, setCheckInviter] = useState("");
  const [isBlockedInviter, setIsBlockedInviter] = useState(false);
  const [isInviterNotFound, setIsInviterNotFound] = useState(false);
  const [freeLogins, setFreeLogins] = useState([]);
  const [isFreeLogin, setIsFreeLogin] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingInviter, setLoadingInviter] = useState(false);
  const [captchaDispatch, setCaptchaDispatch] = useState(false);

  // Initialize React hook form
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    mode: "all",
  });

  // Redirect when registered
  // useEffect(() => {
  //   if (accessToken) {
  //     navigate("/user");
  //   }
  // }, [isError, accessToken, message, navigate, dispatch, successCaptcha]);

  // // Open captcha when 5 errors
  // useEffect(() => {
  //   captchaError >= 7 && openCaptcha();
  // }, [captchaError, addCaptchaErrorCount]);

  const openCaptcha = () => {
    setVisibleCaptcha(true);
  };

  // Form handler to Redux
  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    const registerData = {
      login: checkLogin,
      password: md5(data.password),
      passwordRepeat: md5(data.passwordRepeat),
      // inviter: data.inviter,
      inviter: data.inviter ? data.inviter : "admin", // 09.01.23 Временно передаем admin, если пользователь не ввел спонсора
    };
    setRegisterData(registerData);
    setCaptchaDispatch(true);
    openCaptcha();
    setFreeLogins([]);
    reset();
  };

  const successHandler = () => {
    // dispatch(registerUser(registerData));
    setCaptchaDispatch(false);
  };

  useEffect(() => {
    successCaptcha && captchaDispatch && successHandler();
  }, [successCaptcha]);

  // Checking free login
  // const testLoginHandler = async () => {
  //   setLoadingLogin(true);
  //   try {
  //     const login = {
  //       login: checkLogin,
  //     };

  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     const response = await $apiWithoutToken.post(
  //       `api/User/is-login-free`,
  //       login,
  //       config
  //     );

  //     if (response.data.free === false) {
  //       setFreeLogins(response.data.options);
  //       setIsFreeLogin(response.data.free);
  //     } else {
  //       setFreeLogins([]);
  //       setIsFreeLogin(response.data.free);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     dispatch(addCaptchaErrorCount());
  //     setLoadingLogin(false);
  //   }
  // };

  // Checking inviter is blocked
  // const testInviterIsBlocked = async () => {
  //   setIsBlockedInviter(false);
  //   setIsInviterNotFound(false);
  //   setLoadingInviter(true);

  //   try {
  //     const inviter = {
  //       login: id ? id : checkInviter,
  //     };

  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     const response = await $apiWithoutToken.post(
  //       `api/User/inviter-info`,
  //       inviter,
  //       config
  //     );

  //     if (response.data.isBlocked === true) {
  //       setIsBlockedInviter(true);
  //     } else {
  //       setIsBlockedInviter(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     dispatch(addCaptchaErrorCount());
  //     setLoadingInviter(false);
  //   }
  // };

  // Checking inviter is exist
  // const testInviterIsExist = async () => {
  //   setIsBlockedInviter(false);
  //   setIsInviterNotFound(false);
  //   setLoadingInviter(true);
  //   try {
  //     const inviter = {
  //       login: id ? id : checkInviter,
  //     };

  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     const response = await $apiWithoutToken.post(
  //       `api/User/inviter-exists`,
  //       inviter,
  //       config
  //     );

  //     if (response.data.exists === false) {
  //       setIsInviterNotFound(true);
  //     } else {
  //       setIsInviterNotFound(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     dispatch(addCaptchaErrorCount());
  //     setLoadingInviter(false);
  //   }
  // };

  // Testing inviter
  // const testInviterHandler = () => {
  //   testInviterIsBlocked();
  //   testInviterIsExist();
  //   chechIfIdSaved();
  // };

  // Check inviter when useParams
  // useEffect(() => {
  //   if (id) {
  //     testInviterHandler();
  //   }
  // }, [id]);

  // ********ФУНКЦИЯ ПОДСЧЕТА ПЕРЕхОДОВ***************
  // const transitRefLink = async () => {
  //   const rd = {
  //     login: id,
  //   };
  //   try {
  //     await $apiWithoutToken.post(`/api/User/transit-ref-link`, rd);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // ***************USE PARAMS***************
  // const chechIfIdSaved = () => {
  //   if (!id) return;
  //   const existRefId = localStorage.getItem("refId");
  //   try {
  //     if (id !== existRefId) {
  //       console.log("transitRefLink")
  //       transitRefLink();
  //       localStorage.setItem("refId", id);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {/* <Meta
        title="Register"
        description="Для регистрации в приложении ввуедите уникальный логин и пароль."
      > */}
        {visibleCaptcha && (
          <Fade in={visibleCaptcha}>
            {/* <Captcha
            setSuccessCaptcha={setSuccessCaptcha}
            setVisibleCaptcha={setVisibleCaptcha}
            visibleCaptcha={visibleCaptcha}
          /> */}
          </Fade>
        )}

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
                Регистрация
              </motion.div>

              <motion.div
                variants={upAnimation}
                custom={2}
                className={styles.form}
              >
                <div className={styles.input_container}>
                  {/* *****************************************************login *******************************************/}
                  <div className={styles.div_50}>
                    <input
                      placeholder="Логин"
                      type="text"
                      className="gray_input"
                      value={checkLogin}
                      {...register("login", {
                        required: "The field is required",
                        // onBlur: () => testLoginHandler(),
                        onChange: (e) => setCheckLogin(e.target.value),
                        pattern: {
                          value: /^[a-zA-Z](.[a-zA-Z0-9]*)$/,
                          message:
                            "Login must start with a letter. Latin letters and numbers are allowed!",
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
                    {loadingLogin ? (
                      <Center w="100%" mt={2}>
                        <Spinner
                          size="lg"
                          thickness="6px"
                          speed="0.7s"
                          emptyColor="#61D64A"
                          color="#1c3b6a"
                        />
                      </Center>
                    ) : (
                      <Center w="100%">
                        {freeLogins.length > 0 && (
                          <div className="required">
                            {"Login is not free! Free variants:"}
                          </div>
                        )}
                        {freeLogins.length > 0 &&
                          freeLogins?.map((login, index) => (
                            <Button
                              m={1}
                              mx={4}
                              fontWeight="bold"
                              color="blue.500"
                              key={index}
                              onClick={() => {
                                setCheckLogin(login);
                                setIsFreeLogin(true);
                                setFreeLogins([]);
                              }}
                            >
                              {login}
                            </Button>
                          ))}
                      </Center>
                    )}
                  </div>

                  {/* *****************************************************inviter *******************************************/}

                  <div className={styles.div_50}>
                    <input
                      readOnly={id ? true : false}
                      placeholder="Inviter"
                      type="text"
                      value={id ?? checkInviter}
                      className="gray_input"
                      {...register("inviter", {
                        // required: "The field is required!", // Закоментировано 09,01,23 на время
                        // onBlur: () => testInviterHandler(),
                        onChange: (e) => setCheckInviter(e.target.value),
                        pattern: {
                          value: /^[a-zA-Z](.[a-zA-Z0-9]*)$/,
                          message:
                            "Sponsor must start with a letter. Latin letters and numbers are allowed!",
                        },
                        minLength: {
                          value: 4,
                          message: "Min 4 letters!",
                        },
                        maxLength: {
                          value: 20,
                          message: "Max 10 letters!",
                        },
                      })}
                    />
                    {errors?.inviter && (
                      <div className="required">
                        {errors.inviter.message || "Error!"}
                      </div>
                    )}
                    {loadingInviter && (
                      <Center w="100%" mt={2}>
                        <Spinner
                          size="lg"
                          thickness="6px"
                          speed="0.7s"
                          emptyColor="#61D64A"
                          color="#1c3b6a"
                        />
                      </Center>
                    )}

                    {isBlockedInviter === true && (
                      <div className="required">Инвайтер заблокирован!</div>
                    )}

                    {isInviterNotFound === true && (
                      <div className="required">Пользователь не найден!</div>
                    )}
                  </div>

                  {/* *****************************************************password *******************************************/}

                  <div className={styles.div_50}>
                    <input
                      placeholder="Пароль"
                      type="password"
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
                    {errors?.password && (
                      <div className="required">
                        {errors.password.message || "Error!"}
                      </div>
                    )}
                  </div>

                  {/* *****************************************************passwordRepeat *******************************************/}
                  <div className={styles.div_50}>
                    <input
                      placeholder="Повторите пароль"
                      type="password"
                      className="gray_input"
                      {...register("passwordRepeat", {
                        required: "The field is required",
                        minLength: {
                          value: 4,
                          message: "Min 4 letters!",
                        },
                        maxLength: {
                          value: 10,
                          message: "Max 10 letters!",
                        },
                        validate: (value) => {
                          const { password } = getValues();
                          return password === value || "Passwords must match!";
                        },
                      })}
                    />
                    {errors?.passwordRepeat && (
                      <div className="required">
                        {errors.passwordRepeat.message || "Error!"}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="main_button_mt40_w50"
                  onClick={handleSubmit(onSubmit)}
                  disabled={
                    // isLoading ||
                    !isValid ||
                    visibleCaptcha ||
                    !isFreeLogin ||
                    isBlockedInviter ||
                    isInviterNotFound
                  }
                >
                  Зарегистрироваться
                </button>

                <div className={styles.link}>
                  <NavLink to="/login">Есть аккаунт</NavLink>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      {/* </Meta> */}
    </>
  );
};

export default SignUp;
