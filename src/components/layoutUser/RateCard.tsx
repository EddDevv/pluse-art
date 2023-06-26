import React, { useState, useEffect } from "react";

import styles from "./LayoutUser.module.scss";
import { Spacer, useMediaQuery } from "@chakra-ui/react";
import BTC from "../../assets/images/Bitcoin.png";
import ETH from "../../assets/images/Ethereum.png";
import LTC from "../../assets/images/Litecoin.png";
import { CryptoCurrencyType } from "../../store/crypto/reducer";

type PropType = {
  rate: CryptoCurrencyType;
};

const RateCard = ({ rate }: PropType) => {
  const [isLagerThan1050] = useMediaQuery("(min-width: 1050px)");

  const getLogo = (rate: string) => {
    switch (rate) {
      case "BTC": // if (x === 'value1')
        return BTC;
      case "ETH": // if (x === 'value1')
        return ETH;
      case "LTC": // if (x === 'value1')
        return LTC;

      default:
        return BTC;
    }
  };

  return (
    <div className={styles.card_container}>
      <div className={styles.card_first}>
        <div className={styles.rate_name}>
          <div className={styles.rate_logo_box}>
            <img
              src={getLogo(rate.symbol)}
              alt=""
              className={styles.rate_logo}
            />
          </div>
          <Spacer />
          <div className={styles.rate_volume_text}>Объем</div>
        </div>

        <div className={styles.rate_name}>
          <div className={styles.rate_name_title}>{rate.name}</div>
          <div className={styles.rate_name_subtitle}>{rate.symbol}</div>
          <Spacer />
          <div className={styles.rate_volume}>
            {rate.volume24hUsd.toFixed(2)}
          </div>
        </div>
        <Spacer />
        <div className={styles.rate_runc}>
          <div className={styles.rate_amount}>{rate.price.toFixed(2)}</div>
          <div className={styles.rate_delta}>
            {rate.percentChange24h.toFixed(4)}%
          </div>
          <Spacer />
          <div className={styles.rate_rank}>TOP {rate.rank}</div>
        </div>
      </div>
    </div>
  );
};

export default RateCard;
