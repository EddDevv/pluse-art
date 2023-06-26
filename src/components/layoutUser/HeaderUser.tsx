import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/Logo.png";
import Avatar from "../../assets/images/avatar.png";

import styles from "./LayoutUser.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { menuItems } from "../../assets/consts/consts";
import { useMediaQuery } from "@chakra-ui/react";
import SideBarMobile from "./SideBarMobile";
import getRefresh from "../../api/getRefresh";
import { useAppSelector } from "../../store";
import { AuthApi } from "../../api/auth/auth";
import { MainApi } from "../../api/main/mainApi";
import { LocalSpinnerAbsolute } from "../../UIcomponents/localSpinner/LocalSpinnerAbsolute";
import { CryptoCurrencyType } from "../../store/crypto/reducer";
import { CurrencyType } from "../../store/currencyRates/reducer";
import RateCard from "./RateCard";

const HeaderUser = () => {
  const [isLagerThan1050] = useMediaQuery("(min-width: 1050px)");
  const navigate = useNavigate();
  const { auth, userData, allInfoUser } = useAppSelector((state) => state);
  const { value } = useAppSelector((state) => state.cryptoData);
  const { language } = useAppSelector((state) => state.allInfoUser.value);
  const [isLoading, setisLoading] = useState(false);
  const [rates, setRates] = useState<CryptoCurrencyType[]>([]);

  const authRefresh = async () => {
    const isOK = await getRefresh();
    if (!isOK) {
      navigate("/login");
    }
  };

  const getInfo = async () => {
    setisLoading(true);
    if (auth?.token) {
      await MainApi.getInitialFullReduxInfo();
    }
    setisLoading(false);
  };
  useEffect(() => {
    if (auth?.token) {
      getInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token, language]);

  useEffect(() => {
    if (value?.length > 0) {
      const rates: CryptoCurrencyType[] = [];
      ["BTC", "ETH", "LTC"].forEach((elem) => {
        const rate = value.find((el) => el.symbol === elem);
        if (rate) {
          rates.push(rate);
        }
      });
      setRates(rates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await AuthApi.logOutApi();
    navigate("/login");
  };

  return (
    <div className={styles.rates_container}>
      {isLoading && <LocalSpinnerAbsolute size="500" />}
      {rates.map((el) => (
        <RateCard key={el.symbol} rate={el}/>
      ))}
    </div>
  );
};

export default HeaderUser;
