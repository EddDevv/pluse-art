import React from "react";
import { motion } from "framer-motion";
import WordLeft from "../../../assets/images/WordLeft.png";
import WordRight from "../../../assets/images/WordRight.png";
import GifHouse from "../../../assets/images/GifHouse.png";
import GifRound from "../../../assets/images/GifRound.jpg";
import GifMonets from "../../../assets/images/GifMonets.svg";
import GifBooks from "../../../assets/images/GifBooks.png";

import styles from "./Platform.module.scss";
import { commonLeftShiftAnimation } from "../../../utils/animation/animations";
import { Text } from "@chakra-ui/react";

export const FadeOutAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

const Platform = () => {
  return (
    <div className={styles.container}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
      >
        <div className={styles.inner_container}>
          <div className={styles.title_block}>
            ПЛАТФОРМА <br />
            <b className="orange_text">PULSE</b>&nbsp; ART
          </div>

          <div className={styles.white_block}>
            <div className={styles.desc1}>
              <div>
                Pulse Art – надёжный партнёр на рынке инвестиций и венчурного
                капитала.
              </div>
              <div>
                В своей работе мы используем исключительно профессиональный,
                системный и технологичный подход, направленный на приумножение
                капитала клиентов.
              </div>
              <div>
                Мы всегда открыты для сотрудничества и будем полезны в решении
                вопросов, связанных с:
              </div>
              <div>• Привлечением финансирования в инвестиции; </div>
              <div>• Поиском и подбором активов для инвестирования;</div>
              <div>• Обучением финансовой грамотности. </div>
              <div>
                Надёжные инвестиционные продукты, высокий сервис и качество
                обслуживания, позволяют нам быть одной из передовых
                инвестиционных компаний на рынке Кыргызстана.
              </div>
              <div className={styles.info}>
                Инвестируя с нами –{" "}
                <Text className={styles.orange_text}>
                  вы инвестируете в будущее
                </Text>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Platform;
