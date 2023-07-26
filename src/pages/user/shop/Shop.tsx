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
import ModalBusket from "./ModalBusket";
import { BusketIcon } from "../../../assets/icons/Busket";

const Shop = () => {
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

        <div style={{ display: "flex" }}>
          <Spacer />
          <div className={styles.settings}>
            <SettingsGreen />
          </div>
        </div>

        <div className={styles.container}>
          {/* {contests?.active.map((elem) => (
            <Item elem={elem} key={elem.id} />
          ))}
          {contests?.past.map((elem) => (
            <Item elem={elem} key={elem.id} isPast={true} />
          ))} */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />

          <ProductInfo />
        </div>
      </div>
      <div onClick={() => setIsBusketOpen(true)}>
        <BusketIcon color="#008080" />
      </div>

      <ModalBusket
        isOpen={isBusketOpen}
        handleClose={() => setIsBusketOpen(false)}
      />
    </div>
  );
};
export default Shop;
