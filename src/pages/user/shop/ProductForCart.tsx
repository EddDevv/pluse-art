import React, { useEffect, useState } from "react";
import { IconButton, Spacer, useMediaQuery } from "@chakra-ui/react";
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
import { CheckIcon } from "../../../assets/icons/Check";
import { DeleteIcon } from "@chakra-ui/icons";

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

const ProductForCart = () => {
  const { t } = useTranslation();
  const [isLagerThan600] = useMediaQuery("(min-width: 600px)");

  const { contests, allInfoUser } = useAppSelector((state) => state);

  return (
    <>
      <div className={styles.product_cart_box}>
        {isLagerThan600 && (
          <div style={{ alignSelf: "center" }}>
            <CheckIcon />
          </div>
        )}

        <div className={styles.cart_image}>
          <img src={product.image} alt="" />
        </div>

        <div className={styles.cart_main}>
          {!isLagerThan600 && (
            <div>
              <div className={styles.art}>Арт. J12208</div>
              <div className={styles.bold} style={{ textAlign: "left" }}>
                <div>{product.type}</div>
                <div>{product.name}</div>
              </div>
            </div>
          )}

          {isLagerThan600 && (
            <>
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
            </>
          )}
        </div>

        {isLagerThan600 && (
          <div className={styles.cart_end}>
            <div className={styles.art}>Арт. J12208</div>
            <Spacer />
            <div className="main_link">Удалить</div>
            <div className="main_link">Отложить</div>
          </div>
        )}

        {!isLagerThan600 && (
          <IconButton
            onClick={() => {
              // window.navigator.clipboard.writeText(gaResCode);
            }}
            color="secondary"
            aria-label="copy"
          >
            <DeleteIcon color={"teal"} />
          </IconButton>
        )}
      </div>

      <div className={styles.cart_price}>
        {product.price} &nbsp; <b>USD</b>
      </div>
    </>
  );
};
export default ProductForCart;
