import { useEffect, useState } from "react";

export enum validationTypesEnum {
  isEmpty="isEmpty",
  isEmail="isEmail",
  minLength="minLength",
  maxLength="maxLength",
  isPhone="isPhone",
  isNumber="isNumber",
  isDomen="isDomen",
  isPassword="isPassword"
}
export const useValidation = (value: any, validations: any, domen: string) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [includeDomen, setIncludeDomen] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;

        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "isEmail":
          const regEmail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          regEmail.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        case "isPhone":
          // eslint-disable-next-line no-useless-escape
          const regPhone =
            // eslint-disable-next-line
            /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
          regPhone.test(value) ? setPhoneError(false) : setPhoneError(true);
          break;
        case "isNumber":
          // eslint-disable-next-line no-useless-escape
          const number = /^[0-9]*[.,][0-9]+$/;
          number.test(value) ? setNumberError(false) : setNumberError(true);
          break;
        case "isDomen":
          value.toLowerCase().includes(domen)
            ? setIncludeDomen(true)
            : setIncludeDomen(false);
          break;
        case "isLogin":
          const pattern = /^[a-zA-Z](.[a-zA-Z0-9-]*)$/;
          pattern.test(value) ? setLoginError(false) : setLoginError(true);
          break;
        case "isPassword":
          const regPassw =
          // /^[^(@)](?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
          /(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
          regPassw.test(String(value)) && value[0]!=="@"
            ? setPasswordError(false)
            : setPasswordError(true);
          break;
        default:
          break;
      }
    }
  }, [validations, value, domen]);

  useEffect(() => {
    if (
      isEmpty ||
      minLengthError ||
      maxLengthError ||
      emailError ||
      phoneError ||
      includeDomen ||
      loginError ||
      passwordError
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    phoneError,
    includeDomen,
    loginError,
    passwordError
  ]);
  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    phoneError,
    inputValid,
    numberError,
    includeDomen,
    loginError,
    passwordError
  };
};
