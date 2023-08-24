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
import { Text } from "@chakra-ui/react";
import { FadeOutAnimation } from "../about/About";
import { useTranslation } from "react-i18next";
import { instanceWithoutAuth } from "../../../api/instance";
import FAQItem from "./FAQItem";

export type FactType = {
  answer: string;
  question: string;
  category: string;
  isOpen: boolean;
};

const pageSize = 10;

const FAQ = () => {
  const { t } = useTranslation();

  const [facts, setFacts] = useState<FactType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getFacts = async () => {
    try {
      const res = await instanceWithoutAuth.get(
        `api/Main/faq-list?pageNumber=${currentPage}&pageSize=${pageSize}`
      );
      if (res.status === 200 && res.data?.items?.length > 0) {
        const items = res.data?.items;
        items.forEach((element: FactType) => {
          element.isOpen = false;
        });
        if (currentPage <= 1) {
          setFacts(items);
        } else {
          setFacts([...facts, ...items]);
        }

        setTotalCount(res.data?.totalCount);
        setCurrentPage(res.data?.currentPage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getFacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
      >
        <div className={styles.inner_container}>
          <div className={styles.title_block}>FAQ</div>

          {/* {tegs.map((elem) => (
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
          ))} */}
          <div className={styles.white_block}>
            {facts.map((elem, i) => (
              <FAQItem key={i} item={elem} />
            ))}
          </div>
          {currentPage * pageSize < totalCount && (
            <div className={styles.loadMore_row}>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="loadmore"
                // style={{ color: "white" }}
              >
                {t("FaqPage.show_more")}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
