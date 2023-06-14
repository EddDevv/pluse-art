import { motion } from "framer-motion";

import styles from "./Team.module.scss";
import photo_director from "../../../assets/images/photo_director.png";
import photo_zam_director from "../../../assets/images/photo_zam_director.png";
import photo_spec from "../../../assets/images/photo_spec.png";

import {
  fadeAnimation,
  scaleAnimation,
} from "../../../utils/animation/animations";
import { useState } from "react";

export const changeColorAnimation = {
  hidden: {
    color: "#000000",
  },
  visible: {
    color: "#FF7F50",
    transition: {
      duration: 2,
    },
  },
};
export const changeColorRevertAnimation = {
  hidden: {
    color: "#FF7F50",
  },
  visible: {
    color: "#000000",
    transition: {
      duration: 2,
    },
  },
};
const team = [
  {
    id: 0,
    name: "Цупиков Вячеслав Николаевич",
    title: "Генеральный директор",
    text: [
      "Наша платформа оказывает полный спектр финансовых услуг на рынке Кыргызской Республики.",
      "Наша штаб-квартира находится в городе Бишкек. На данный момент мы с командой хотим внести свой вклад в развитие инвестиционной отрасли республики.",
      "В чем заключается наша работа? - Мы формируем для наших клиентов инвестиционный портфель, обучаем финансовой грамотности и даем возможность пассивного дохода - без необходимости торговать.",
    ],
    img: photo_director,
  },
  {
    id: 1,
    name: "Ерихов Денис Александрович",
    title: "Заместитель генерального директора",
    text: [
      "Торговля финансовыми инструментами и криптовалютами сопряжена с высокими рисками, включая риск потери части или всей суммы инвестиций, поэтому подходит не всем инвесторам.",
      "Цены на криптовалюты чрезвычайно волатильны и могут изменяться под действием внешних факторов, таких как финансовые новости, законодательные решения или политические события. ",
      "Маржинальная торговля приводит к повышению финансовых рисков.",
    ],
    img: photo_zam_director,
  },
  {
    id: 2,
    name: "Aлeкcaндp Гepчик",
    title:
      "Автop уникaльнoй cиcтeмы тopгoвли, кoтopaя пoзвoляeт тopгoвaть нa любыx pынкax мaкcимaльнo эффeктивнo",
    text: [
      "Успешный трейдер из Нью-Йорка с опытом более 24 лет и самый безопасный трейдер по версии Mojo Wall Street Warriors.",
      "Самое главное, чему ты должен учиться с первого дня — это учиться не терять. Когда научишься не терять — дальше начнешь учиться зарабатывать.",
      "Человек, который смог с абсолютного нуля (нищего иммигранта) подняться до статуса управляющего партнера одной из крупнейших трейдерских компаний.",
    ],
    img: photo_spec,
  },
];

const Team = () => {
  const [current, setCurrent] = useState(0);
  return (
    <div className={styles.container}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
      >
        <div className={styles.inner_container}>
          <motion.div className={styles.title_block}>
            <motion.div variants={changeColorRevertAnimation}>наша</motion.div>{" "}
            <motion.div variants={changeColorAnimation}>команда</motion.div>
          </motion.div>

          <div className={styles.relative}>
            <motion.div
              variants={fadeAnimation}
              className={styles.slider_block}
            />

            {team.map((elem) => (
              <div
                className={
                  current === elem.id
                    ? styles.main_block
                    : Math.abs(elem.id - current) === 2
                    ? styles.main_block_2
                    : current === 1 && elem.id === 2
                    ? styles.main_block_2
                    : styles.main_block_1
                }
                onClick={() => setCurrent(elem.id)}
              >
                <div
                  className={
                    current === elem.id
                    ? styles.main_block_img
                    : styles.main_block_img_next
                  }
                >
                  <img src={elem.img} alt="" />
                </div>
                <div className={styles.main_block_info}>
                  <div className={styles.main_block_name}>{elem.name}</div>
                  <div className={styles.main_block_title}>{elem.title}</div>
                  {elem.text.map((el, i) => (
                    <div className={styles.main_block_text} key={i}>
                      {el}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* <div
              className={
                current === 0 ? styles.main_block : styles.main_block_1
              }
              onClick={() => setCurrent(0)}
            >
              <div
                className={
                  current === 0
                    ? styles.main_block_img
                    : styles.main_block_img_1
                }
              >
                <img src={team[0].img} alt="" />
              </div>
              <div className={styles.main_block_info}>
                <div className={styles.main_block_name}>{team[0].name}</div>
                <div className={styles.main_block_title}>{team[0].title}</div>
                {team[0].text.map((elem, i) => (
                  <div className={styles.main_block_text} key={i}>
                    {elem}
                  </div>
                ))}
              </div>
            </div>

            <div
              className={
                current === 0 ? styles.main_block_1 : styles.main_block
              }
              onClick={() => setCurrent(1)}
            >
              <div
                className={
                  current === 0
                    ? styles.main_block_img_1
                    : styles.main_block_img
                }
              >
                <img src={team[1].img} alt="" />
              </div>
              <div className={styles.main_block_info}>
                <div className={styles.main_block_name}>{team[1].name}</div>
                <div className={styles.main_block_title}>{team[1].title}</div>
                {team[1].text.map((elem, i) => (
                  <div className={styles.main_block_text} key={i}>
                    {elem}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.main_block_2}>
              <div className={styles.main_block_img_2}>
                <img src={team[2].img} alt="" />
              </div>
              <div className={styles.main_block_info}>
                <div className={styles.main_block_name}>{team[2].name}</div>
                <div className={styles.main_block_title}>{team[2].title}</div>
                {team[2].text.map((elem, i) => (
                  <div className={styles.main_block_text} key={i}>
                    {elem}
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Team;
