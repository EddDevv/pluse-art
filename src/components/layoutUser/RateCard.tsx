import React, { useState, useEffect } from "react";

import styles from "./LayoutUser.module.scss";
import { Spacer, useMediaQuery } from "@chakra-ui/react";
import BTC from "../../assets/images/Bitcoin.png";
import ETH from "../../assets/images/Ethereum.png";
import LTC from "../../assets/images/Litecoin.png";
import BTCm from "../../assets/images/BitcoinM.png";
import ETHm from "../../assets/images/EthereumM.png";
import LTCm from "../../assets/images/LitecoinM.png";
import { CryptoCurrencyType } from "../../store/crypto/reducer";
import { getNumWithoutZeroToFixedN } from "../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";

type PropType = {
  rate: CryptoCurrencyType;
};

const RateCard = ({ rate }: PropType) => {
  const [isLagerThan760] = useMediaQuery("(min-width: 760px)");

  const getLogo = (rate: string) => {
    if (isLagerThan760) {
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
    } else {
      switch (rate) {
        case "BTC": // if (x === 'value1')
          return BTCm;
        case "ETH": // if (x === 'value1')
          return ETHm;
        case "LTC": // if (x === 'value1')
          return LTCm;

        default:
          return BTCm;
      }
    }
  };

  return (
    <div className={styles.card_container}>
      <div className={styles.card_first}>
        <div className={styles.rate_logo}>
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
          {isLagerThan760 && (
            <div className={styles.rate_name_subtitle}>{rate.symbol}</div>
          )}
          <Spacer />
          {isLagerThan760 ? (
            <div className={styles.rate_volume}>
              {rate.volume24hUsd.toFixed(2)}
            </div>
          ) : (
            <div className={styles.rate_amount}>
              {getNumWithoutZeroToFixedN(rate.price, 2)}
            </div>
          )}
        </div>

        <Spacer />

        <div className={styles.rate_runc}>
          {isLagerThan760 ? (
            <div className={styles.rate_amount}>
              {getNumWithoutZeroToFixedN(rate.price, 2)}
            </div>
          ) : (
            <>
              <div className={styles.rate_name_subtitle}>{rate.symbol}</div>
              <Spacer />
            </>
          )}
          <div
            className={
              rate && +rate?.percentChange24h >= 0
                ? styles.rate_delta
                : styles.rate_delta_minus
            }
          >
            {rate.percentChange24h.toFixed(4)}%
          </div>
          {isLagerThan760 && (
            <>
              <Spacer />
              <div className={styles.rate_rank}>TOP {rate.rank}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateCard;
