import React from "react";
import { motion } from "framer-motion";

import styles from "./Products.module.scss";
import { fadeAnimation, scaleAnimation } from "../../../utils/animation/animations";

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

const products = [
  {id:1, title: "брокерский счет", text: "Торговля на фондовом рынке Кыргызстана Европы и Америки"},
  {id:2, title: "портфельное инвестирование", text: "Готовые портфельные решения для различныхных стратегийи"},
  {id:3, title: "ВЕНЧУРНЫЕ ИНВЕСТИЦИИ", text: "Возможность венчурного инвестирования в стартапы"},
]

const Products = () => {
  return (
    <div className={styles.container}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
      >
        <div className={styles.inner_container}>
          <motion.div className={styles.title_block} variants={scaleAnimation}>наши продукты </motion.div>

          <motion.div className={styles.green_blocks} variants={fadeAnimation}>
            {products.map(elem=>(
              <div className={styles[`green_block_${elem.id}`]} key={elem.id}>
                <div className={styles.green_block_title}>{elem.title}</div>
                <div className={styles.green_block_text}>{elem.text}</div>
              </div>
            ))}
            
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Products;
