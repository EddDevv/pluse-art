import React from "react";
import { motion } from "framer-motion";
import WordLeft from "../../../assets/images/WordLeft.png";
import WordRight from "../../../assets/images/WordRight.png";
import GifHouse from "../../../assets/images/GifHouse.png";
import GifRound from "../../../assets/images/GifRound.jpg";
import GifMonets from "../../../assets/images/GifMonets.svg";
import GifBooks from "../../../assets/images/GifBooks.png";

import styles from "./About.module.scss";
import { commonLeftShiftAnimation } from "../../../utils/animation/animations";
import { Text } from "@chakra-ui/react";

const tegs = [
  {
    id: 1,
    title: "ЮРИДИЧЕСКАЯ прозрачность",
    text: "ООО «Пульс АРТ» имеет полный пакет документов и лицензий для предоставления услуг на финансовом рынке",
    icon: (
      <div className="" >
        {/* <video src={GifHouse} /> */}
        {/* <img src={GifHouse} alt="" /> */}
        {/* <img src="../../../assets/images/GifBooks.mp4" alt="" />
        <video src="../../../assets/images/GifBooks.mp4" /> */}
        {/* <video
          id="example_video_1"
          width="100"
          height="100"
          src="../../../assets/images/GifBooks.mp4"
        >
          followed by:{" "}
        </video> */}
        <video width="50px" height="50px" autoPlay loop muted>
          <source src="./images/GifHouse.mp4" type="video/mp4" />
        </video>
      </div>
    ),
  },
  {
    id: 2,
    title: "100% ЗАЩИТА",
    text: "Ваши активы находятся в ЗАО «Центральный Депозитарий» Киргизской Республики",
    icon: (
      <div className="">
        {/* <img src={GifRound} alt="" /> */}
        <video width="50px" height="50px" autoPlay loop muted>
          <source src="./images/GifRound.mp4" type="video/mp4" />
        </video>
      </div>
    ),
  },
  {
    id: 3,
    title: "ОБЕСПЕЧЕНИЕ",
    text: "Ваши инвестиции обеспечены акциями, находящимися в вашей собственности",
    icon: (
      <div className="">
        {/* <img src={GifMonets} alt="" /> */}
        <video width="50px" height="50px" autoPlay loop muted>
          <source src="./images/GifMonets.mp4" type="video/mp4" />
        </video>
      </div>
    ),
  },
  {
    id: 4,
    title: "обучение",
    text: "Наша компания предоставляет вам бесплатное обучение",
    icon: (
      <div className="">
        {/* <img src={GifBooks} alt="" /> */}
        <video width="50px" height="50px" autoPlay loop muted>
          <source src="./images/GifBooks.mp4" type="video/mp4" />
        </video>
      </div>
    ),
  },
];

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

const About = () => {
  return (
    <div className={styles.container}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
      >
        <motion.div
          variants={FadeOutAnimation}
          className={styles.back_word_left}
        >
          <img src={WordLeft} alt="" />
        </motion.div>
        <motion.div
          variants={FadeOutAnimation}
          className={styles.back_word_right}
        >
          <img src={WordRight} alt="" />
        </motion.div>
        <div className={styles.inner_container}>
          <div className={styles.title_block}>
            ПОЧЕМУ <br />
            <b className="orange_text">ВЫБИРАЮТ</b>&nbsp; НАС
          </div>

          {tegs.map((elem) => (
            <motion.div
              className={styles.white_block}
              key={elem.id}
              variants={commonLeftShiftAnimation}
              custom={elem.id}
            >
              <div className={styles.white_block_icon}>{elem.icon}</div>
              <div className={styles.white_block_title}>{elem.title}</div>
              <div className={styles.white_block_text}>{elem.text}</div>
            </motion.div>
          ))}
          <button className={`orange_button ${styles.button_invest}`}>
            СТАТЬ ИНВЕСТОРОМ*
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
