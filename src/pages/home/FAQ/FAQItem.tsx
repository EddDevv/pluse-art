import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WordLeft from "../../../assets/images/WordLeft.png";
import WordRight from "../../../assets/images/WordRight.png";
import GifHouse from "../../../assets/images/GifHouse.png";
import GifRound from "../../../assets/images/GifRound.jpg";
import GifMonets from "../../../assets/images/GifMonets.svg";
import GifBooks from "../../../assets/images/GifBooks.png";

import styles from "./FAQ.module.scss";
import { commonLeftShiftAnimation } from "../../../utils/animation/animations";
import { Collapse, Text } from "@chakra-ui/react";
import { FadeOutAnimation } from "../about/About";
import { useTranslation } from "react-i18next";
import { instanceWithoutAuth } from "../../../api/instance";
import { FactType } from "./FAQ";
import { PlusIcon } from "../../../assets/icons/Plus";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const FAQItem = ({ item }: { item: FactType }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className={styles.item} onClick={() => setIsOpen(!isOpen)}>
        <div>{item.question}</div>
        <div className={isOpen ? styles.rotate : ""}>
          {isOpen? <CloseIcon color="teal.800" width={"12px"}/>:<AddIcon color="teal.800" width={"12px"}/>}
        </div>
      </div>
      <Collapse in={isOpen} className={styles.collapse}>
        <div>{item.answer}</div>
      </Collapse>
    </div>
  );
};

export default FAQItem;
