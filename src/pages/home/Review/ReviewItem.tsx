import React, { useState, useEffect } from "react";

import styles from "./Review.module.scss";
import { Collapse, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import Moment from "react-moment";
import { BASEAPPURL } from "../../../api/instance";

export type ReviewType = {
  text: string;
  creationDate: string;
  partnerId: number;
  partnerName: string;
  partnerImage: string;
};

const ReviewItem = ({ item }: { item: ReviewType }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.item}>
      <div className={styles.item_flex}>
        <div className={styles.item_img}>
          <img src={`${BASEAPPURL}assets/Img/${item.partnerImage}`} alt="" />
        </div>
        <div className={styles.item_title}>
          <div>{item.partnerName}</div>
          <div className={styles.item_data}>
            <Moment format="DD MMMM YYYY" locale="ru">
              {item.creationDate}
            </Moment>
          </div>
        </div>
      </div>
      <div>{item.text}</div>
    </div>
  );
};

export default ReviewItem;
