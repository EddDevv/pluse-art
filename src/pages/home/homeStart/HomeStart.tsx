import React, { useEffect, useState } from "react";
import iconGraph from "../../../assets/images/iconGraph.png";
import iconBuild from "../../../assets/images/iconBuild.png";
import iconLoop from "../../../assets/images/iconLoop.png";
import { motion } from "framer-motion";
import LogoBig from "../../../assets/images/LogoBig.png";
import Word from "../../../assets/images/Word.png";

import styles from "./HomeStart.module.scss";
import { fadeOutAnimation } from "../../../utils/animation/animations";
import { Text } from "@chakra-ui/react";
import { useAppSelector } from "../../../store";
import { MainApi } from "../../../api/main/mainApi";

export const scaleHeaderAnimation = {
  hidden: {
    scale: 0.1,
    rotate: 180,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 1.5,
    },
  },
};

const HomeStart = () => {
  const [dopInfo, setDopInfo] = useState("");
  const getFund = async () => {
    const etherFund = await MainApi.getEtherFund();
    etherFund && setDopInfo(etherFund.toLocaleString("ru-RU"));
  };
  useEffect(() => {
    getFund();
  }, []);
  // const { dopInfo } = useAppSelector((state) => state);
  return (
    <>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={styles.inner_container}>
            {/* *************глобус*/}
            <div className={styles.word}>
              <img src={Word} alt="" />
            </div>
            {/* start*************для анимации, потом скроется */}
            <div className={styles.init_title_container}>
              <div className={styles.init_title}>
                <div>PULSE</div>
                <div className={styles.init_logo}>
                  <img src={LogoBig} alt="" />
                </div>
                <div className={styles.orange_color}>ART</div>
              </div>
              <div className={styles.init_subtitle}>
                Самые доходные портфели инвестирования без скрытых комиссий
              </div>
            </div>

            <div className={styles.init_header}>
              Инвестируй правильно и безопасно
            </div>

            {/* <div className={styles.init_button}> */}
            <div className={`${styles.desc} ${styles.init_desc}`}>
              Зарабатывай с профессионалами
            </div>
            <div className={styles.init_button}>
              <button className="orange_button">СТАТЬ ИНВЕСТОРОМ*</button>
            </div>
            {/* </div> */}
            {/* end*************для анимации, потом скроется */}

            <div className={styles.main_flex}>
              <div className={styles.main_left}>
                <div className={styles.title}>
                  Инвестируй{" "}
                  <Text className={styles.orange_color}>правильно</Text> и
                  безопасно
                </div>
                <div className={styles.desc}>Зарабатывай с профессионалами</div>
                <div>
                  <button className="orange_button">СТАТЬ ИНВЕСТОРОМ*</button>
                </div>
                <div className={styles.small_text}>
                  БАЛАНС ИНВЕСТИЦИОННОГО ФОНДА
                </div>
                <div className={styles.amount}>
                  <div>
                    {/* 2 000 000, 00 $ */}
                    {dopInfo} &nbsp; $
                  </div>
                </div>
              </div>

              <div className={styles.main_right}>
                <motion.div
                  className={styles.green_block}
                  variants={fadeOutAnimation}
                  custom={1}
                >
                  <div>
                    <img src={iconGraph} alt="" />
                  </div>
                  <div>минимальный депозит от 50 $ </div>
                </motion.div>
                <motion.div
                  className={styles.green_block}
                  variants={fadeOutAnimation}
                  custom={2}
                >
                  <div>
                    <img src={iconBuild} alt="" />
                  </div>
                  <div>актуальные рынки легально</div>
                </motion.div>
                <motion.div
                  className={styles.green_block}
                  variants={fadeOutAnimation}
                  custom={3}
                >
                  <div>
                    <img src={iconLoop} alt="" />
                  </div>
                  <div>прозрачные комиссии</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HomeStart;
