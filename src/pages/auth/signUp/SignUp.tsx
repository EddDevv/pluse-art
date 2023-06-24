import styles from "./SignUp.module.scss";
import { motion } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import { upAnimation } from "../../../utils/animation/animations";
import { useAppDispatch, useAppSelector } from "../../../store";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import {
//   addCaptchaErrorCount,
//   registerUser,
// } from "../../../features/auth/authSlice";
import { Button, Center, Fade, Spinner } from "@chakra-ui/react";
import { AuthApi } from "../../../api/auth/auth";
import { $apiWithoutToken } from "../../../http/apiService";
import Meta from "../../../utils/seo/Meta";
import axios from "axios";
import { BASEAPPURL, instanceWithoutAuth } from "../../../api/instance";
import { UserRegistration } from "../../../store/auth/actions";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// import { Captcha } from "../../../components/captcha/Captcha";
// import { $apiWithoutToken } from "../../../http/apiService";
// import Meta from "../../../utils/seo/Meta";
// import Logos from "../../../components/home/logos/Logos";

type SignUpForm = {
  email: string;
  login: string;
  password: string;
  confirmPassword: string;
  phoneNumber: any;
  inviterId: string;
};

const SignUp: FC = () => {
  const { id } = useParams();
  // const md5 = require("md5");
  const { token } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const [isInviterLive, setIsInviterLive] = useState(true);
  const [inviter, setInviter] = useState("");
  const [check, setCheck] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { accessToken, isLoading, isError, captchaError, message } =
  //   useAppSelector((state) => state.auth);

  // Captcha
  const [visibleCaptcha, setVisibleCaptcha] = useState(false);
  const [successCaptcha, setSuccessCaptcha] = useState(false);
  const [registerData, setRegisterData] = useState({});

  const [checkedEmail, setCheckedEmail] = useState("");
  const [checkedLogin, setCheckedLogin] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [checkInviter, setCheckInviter] = useState("");
  const [isInviterNotFound, setIsInviterNotFound] = useState(false);
  // const [freeLogins, setFreeLogins] = useState([]);
  const [isEmailRegistered, setEmailRegistered] = useState(false);
  const [isLoginRegistered, setIsLoginRegistered] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
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

  const checkIsEmailFree = async (email: string) => {
    setLoadingEmail(true);
    const isRegister = await AuthApi.isEmail(email);
    if (isRegister?.data === true) {
      setEmailRegistered(true);
    } else {
      setEmailRegistered(false);
    }
    setLoadingEmail(false);
  };

  const checkIsLoginFree = async (login: string) => {
    setLoadingLogin(true);
    const isRegister = await AuthApi.isRegister(login);
    if (isRegister?.data === true || isRegister?.data === false) {
      setIsLoginRegistered(isRegister?.data);
    }
    setLoadingLogin(false);
  };

  // Redirect when registered
  // useEffect(() => {
  //   if (token) {
  //     navigate("/user");
  //   }
  // }, [token]);

  // Open captcha when 5 errors
  // useEffect(() => {
  //   captchaError >= 7 && openCaptcha();
  // }, [captchaError, addCaptchaErrorCount]);

  const openCaptcha = () => {
    setVisibleCaptcha(true);
  };

  // ********ФУНКЦИЯ ПОДСЧЕТА ПЕРЕхОДОВ***************
  const sendHitStatistic = async (id: any) => {
    try {
      await axios.post(`${BASEAPPURL}api/Partners/referal-stat/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      const paramsId = id?.split("&")[0];
      const existRefId = localStorage.getItem("refId");
      try {
        if (paramsId !== existRefId) {
          sendHitStatistic(paramsId);
        }
      } catch (error) {
        console.log(error);
      }
      setInviter(paramsId);
      localStorage.setItem("refId", paramsId);
    }
  }, [id]);

  useEffect(() => {
    const localRefId = localStorage.getItem("refId");

    if (localRefId) {
      setInviter(localRefId);
    }
  }, []);

  // ПРОВЕРКА СПОНСОРА НА СУЩЕСТВОВАНИЕ
  const testInviterHandler = async () => {
    if (!inviter) {
      return;
    }
    try {
      const config = {
        headers: {
          accept: "application/json",
        },
      };

      const response = await axios.get(
        `${BASEAPPURL}api/Auth/get-sponsor-login?sponsorId=${inviter}`,
        config
      );

      if (response.data !== "Партнер не найден") {
        setIsInviterLive(true);
      } else {
        setIsInviterLive(false);
      }
    } catch (error) {
      setIsInviterLive(false);
      console.error(error);
    }
  };

  // Проверка инвайтера в зависимости от изменения
  useEffect(() => {
    testInviterHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviter]);

  // Form handler to Redux
  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    const registerData = {
      email: data.email,
      login: checkedLogin,
      password: data.password,
      confirmPassword: data.confirmPassword,
      phoneNumber: data.phoneNumber,
      inviterId: Number(data.inviterId),
      code: "1",
    };
    setRegisterData(registerData);
    setCaptchaDispatch(true);
    openCaptcha();
    // setFreeLogins([]);
    reset();
  };

  const registerHandler = async (payload: any) => {
    setIsLoading(true);
    try {
      const res = await instanceWithoutAuth.post("api/Auth/register", payload);
      if (res.status >= 200 && res.status < 300 && res?.data) {
        localStorage.setItem(
          "keySwagger",
          JSON.stringify({
            token: res.data.access_token,
            refresh_token: res.data.refresh_token,
          })
        );
        dispatch(
          UserRegistration({
            token: res.data.access_token,
            refresh_token: res.data.refresh_token,
          })
        );
        toast.success("Успешно зарегистрированы");
        navigate("/user");
      }
    } catch (error: any) {
      console.error(error);
      if (error?.response?.data) {
        toast.error(`Ошибка регистрации: ${error?.response?.data}!`);
      } else {
        toast.error(`Ошибка регистрации: ${error.message}!`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const successHandler = () => {
    // dispatch(registerUser(registerData));
    registerHandler(registerData);
    setCaptchaDispatch(false);
  };

  useEffect(() => {
    successCaptcha && captchaDispatch && successHandler();
  }, [successCaptcha]);

  return (
    <>
      <Meta
        title="Register"
        description="Для регистрации в приложении ввуедите уникальный логин и пароль."
      >
        {/* {visibleCaptcha && (
          <Fade in={visibleCaptcha}>
            <Captcha
            setSuccessCaptcha={setSuccessCaptcha}
            setVisibleCaptcha={setVisibleCaptcha}
            visibleCaptcha={visibleCaptcha}
          />
          </Fade>
        )} */}

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
                  {/* *****************************************************email *******************************************/}
                  <div className={styles.div_50}>
                    <input
                      placeholder="Email"
                      type="text"
                      className="gray_input_w100"
                      value={checkedEmail}
                      {...register("email", {
                        required: "The field is required",
                        onChange: (e) => setCheckedEmail(e.target.value),
                        onBlur: (e) => checkIsEmailFree(e.target.value),
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "Введите валидный емэйл!",
                        },
                        minLength: {
                          value: 4,
                          message: "Min 4 letters!",
                        },
                      })}
                    />
                    {errors?.email && (
                      <div className="required">
                        {errors.email.message || "Error!"}
                      </div>
                    )}
                    {isEmailRegistered && (
                      <div className="required">Емэйл уже зарегистрирован</div>
                    )}
                    {loadingEmail && (
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
                  </div>

                  {/* *****************************************************login *******************************************/}
                  <div className={styles.div_50}>
                    <input
                      placeholder="Логин"
                      type="text"
                      className="gray_input"
                      value={checkedLogin}
                      {...register("login", {
                        required: "The field is required",
                        onChange: (e) => setCheckedLogin(e.target.value),
                        onBlur: (e) => checkIsLoginFree(e.target.value),
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
                    {isLoginRegistered && (
                      <div className="required">Логин уже зарегистрирован</div>
                    )}
                    {loadingLogin && (
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
                  </div>

                  {/* *****************************************************phone *******************************************/}
                  <div className={styles.div_50}>
                    <PhoneInput
                      inputProps={{
                        name: "phone",
                        required: true,
                        // defaultMask: "... ... .. .. ",
                        // autoFocus: true,
                      }}
                      containerClass="phone_cont"
                      inputClass="gray_input"
                      placeholder="Phone number"
                      country={"ru"}
                      value={phoneNumber}
                      onChange={(tel) => {
                        setPhoneNumber(tel);
                      }}
                      // {...register("phoneNumber", {
                      //   required: "The field is required",
                      // })}
                    />
                  </div>

                  <input
                    type="hidden"
                    value={phoneNumber}
                    {...register("phoneNumber", {
                      required: "The field is required",
                      onChange: (e) => setPhoneNumber(e.target.value),
                      minLength: {
                        value: 4,
                        message: "Min 4 letters!",
                      },
                    })}
                  />
                  {errors?.phoneNumber && (
                    <div className="required">
                      {/* {errors?.phoneNumber?.message || "Error!"} */}
                      The field is required
                    </div>
                  )}

                  {/* *****************************************************inviter *******************************************/}

                  <div className={styles.div_50}>
                    <input
                      readOnly={id ? true : false}
                      placeholder="Inviter"
                      type="text"
                      value={id ?? checkInviter}
                      className="gray_input"
                      {...register("inviterId", {
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
                    {errors?.inviterId && (
                      <div className="required">
                        {errors.inviterId.message || "Error!"}
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
                        pattern: {
                          value:
                            /(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                          message:
                            "Заглавная Буква, строчная буква, цифра и спецсимвол, длина не меньше 8 символов и не должен начинаться с @",
                        },
                        minLength: {
                          value: 8,
                          message: "Min 8 letters!",
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
                      {...register("confirmPassword", {
                        required: "The field is required",

                        minLength: {
                          value: 8,
                          message: "Min 8 letters!",
                        },

                        validate: (value) => {
                          const { password } = getValues();
                          return password === value || "Passwords must match!";
                        },
                      })}
                    />
                    {errors?.confirmPassword && (
                      <div className="required">
                        {errors.confirmPassword.message || "Error!"}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="main_button_mt40_w50"
                  onClick={handleSubmit(onSubmit)}
                  disabled={
                    isLoading ||
                    !isValid ||
                    visibleCaptcha ||
                    isLoginRegistered ||
                    isEmailRegistered ||
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
      </Meta>
    </>
  );
};

export default SignUp;
