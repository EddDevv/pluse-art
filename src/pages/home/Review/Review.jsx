import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Review.module.scss";
import { useTranslation } from "react-i18next";
import { instanceWithoutAuth } from "../../../api/instance";
import ReviewItem from "./ReviewItem";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useMediaQuery } from "@chakra-ui/react";

const pageSize = 20;

const Review = () => {
  const { t } = useTranslation();
  const [isLagerThan760] = useMediaQuery("(min-width: 760px)");
  const [isLagerThan480] = useMediaQuery("(min-width: 480px)");

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
          <div style={{ width: "100%" }}>
            <Swiper
              className={styles.slider}
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={20}
              slidesPerView={isLagerThan760 ? 2 : isLagerThan480 ? 1 : 1}
              // navigation
              // pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {reviews.map((elem) => (
                <SwiperSlide key={elem.creationDate}>
                  <ReviewItem item={elem} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Review;
