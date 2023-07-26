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

const ProductInfo = () => {
  const { t } = useTranslation();

  const { contests, allInfoUser } = useAppSelector((state) => state);

  return (
    <div className={styles.product_info_box}>
      <div className={styles.info_image}>
        <img src={product.image} alt="" />
        <div className={styles.small_img_cont}>
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
      </div>

      <div className={styles.info_main}>
        <div className={styles.art}>Арт. J12208</div>
        <div className={styles.bold} style={{ display: "flex" }}>
          <div>{product.type}</div> &nbsp;
          <div>{product.name}</div>
        </div>

        <div className={styles.bold}>
          <b>{product.price}</b> &nbsp; USD
        </div>

        <div>Выберите подходящий размер</div>
        <select placeholder="Ваш размер" className="gray_input_w100">
          <option value={1}>1</option>
        </select>
        <div className="main_link" style={{ alignSelf: "flex-end" }}>
          Таблица размеров
        </div>

        <div className={styles.bold}>Характеристики</div>
        <div>
          {product.desc.map((elem, i) => (
            <div key={i}>{elem}</div>
          ))}
        </div>

        <Spacer />
        <div className={styles.button_flex}>
          <button className="outline_green_button_100">
            {t("New.consult")}
          </button>
          <button className="dark_green_button_100">{t("New.add")}</button>
        </div>
      </div>
    </div>
  );
};
export default ProductInfo;
