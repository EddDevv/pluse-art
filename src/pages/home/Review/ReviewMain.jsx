import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Review.module.scss";
import { useTranslation } from "react-i18next";
import { instanceWithoutAuth } from "../../../api/instance";
import ReviewItem from "./ReviewItem";

const pageSize = 20;

const ReviewMain = () => {
  const { t } = useTranslation();

  const [reviews, setReviews] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getReviews = async () => {
    try {
      const res = await instanceWithoutAuth.get(
        `api/Main/review-list?pageNumber=0&pageSize=${pageSize}`
      );
      if (res.status === 200 && res.data?.items?.length > 0) {
        setReviews(res.data.items);
        setTotalCount(res.data?.totalCount);
        setCurrentPage(res.data?.currentPage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getReviews();
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
          <div className={styles.title_block}>
            <div>
              ОТЗЫВЫ О &nbsp;<b className="orange_text">PULSE</b>&nbsp; ART
            </div>
            <div className={styles.title_text}>
              Познакомьтесь с нашей компанией. Мы команда профессионалов на
              рынке инвестиций. Многолетний опыт и практика современных
              финасовых инструментов даёт нам полное понимание, как приумножать
              капитал.
            </div>
          </div>

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
          <div className={styles.wrap}>
            {reviews.map((elem, i) => (
              <ReviewItem item={elem} key={i} classMy="wrap_item" />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewMain;
