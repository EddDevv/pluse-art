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
import ProductCard from "./ProductCard";
import ProductInfo from "./ProductInfo";
import ModalCart from "./ModalCart";
import { BusketIcon } from "../../../assets/icons/Busket";
import ModalSuccess from "./ModalSuccess";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../assets/consts/consts";

const Product = () => {
  const { t } = useTranslation();

  const { contests, allInfoUser } = useAppSelector((state) => state);
  const [isBusketOpen, setIsBusketOpen] = useState(false);

  return (
    <div className="page_container">
      <div className={`${styles.paper}`}>
        <div className={styles.title_flex}>
          <Diamand />
          <div className="page_title">
            {t("New.shop")} PULSE<b className={styles.orange_text}>ART</b>&nbsp;
          </div>
        </div>

        {/* <div style={{ display: "flex" }}>
          <Spacer />
          <div className={styles.settings}>
            <SettingsGreen />
          </div>
        </div> */}

        <div className={styles.link_back}>
          <Link to={ROUTES.shop}>
            {"<      "}&nbsp;
            {t("New.back_to_shop")}
          </Link>
        </div>

        <div className={styles.container}>
          {/* {contests?.active.map((elem) => (
            <Item elem={elem} key={elem.id} />
          ))}
          {contests?.past.map((elem) => (
            <Item elem={elem} key={elem.id} isPast={true} />
          ))} */}
          <ProductInfo />
        </div>

        <div className={styles.prod_container}>
          <div className="green_text_big">{t("New.ideal")}</div>
          <div className={styles.container}>
            <ProductCard />
            <ProductCard />
            <Spacer />
          </div>
          <div className="green_text_big">{t("New.recent")}</div>
          <div className={styles.container}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
      <div onClick={() => setIsBusketOpen(true)}>
        <BusketIcon color="#008080" />
      </div>

      <ModalCart
        isOpen={isBusketOpen}
        handleClose={() => setIsBusketOpen(false)}
      />
      {/* <ModalSuccess
        isOpen={isBusketOpen}
        handleClose={() => setIsBusketOpen(false)}
      /> */}
    </div>
  );
};
export default Product;
