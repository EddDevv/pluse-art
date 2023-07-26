import React, { useEffect, useState } from "react";
import { Spacer } from "@chakra-ui/react";
import styles from "./Shop.module.scss";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store";
import Moment from "react-moment";
import { toast } from "react-toastify";
import instance, { BASEAPPURL } from "../../../api/instance";
import { Gift } from "../../../assets/icons/Gift";
import { Diamand } from "../../../assets/icons/Diamand";
import { SettingsGreen } from "../../../assets/icons/SettingsGreen";
import Jewerly from "../../../assets/images/Jewerly.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../assets/consts/consts";

const product = {
  type: "Кольцо",
  name: "LUNE",
  desc: [
    "Белое золото 750 пробы",
    "Примерный вес 2,75 г",
    "Бриллиант (25 шт. 0,67 карата)",
  ],
  price: 250000,
  image: Jewerly,
};

const ProductCard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { contests, allInfoUser } = useAppSelector((state) => state);

  return (
    <div
      className={`${styles.product_box}`}
      onClick={() => navigate(`${ROUTES.product}1`)}
    >
      <div className={styles.image}>
        <img src={product.image} alt="" />
      </div>

      <div className={styles.bold}>
        <div>{product.type}</div>
        <div>{product.name}</div>
      </div>
      <div>
        {product.desc.map((elem, i) => (
          <div key={i}>{elem}</div>
        ))}
      </div>

      <div className={styles.bold}>{product.price} &nbsp; USD</div>

      <button className="dark_green_button_100">{t("New.add")}</button>
    </div>
  );
};
export default ProductCard;
