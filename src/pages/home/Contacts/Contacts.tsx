import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Contacts.module.scss";
import { useTranslation } from "react-i18next";
import { instanceWithoutAuth } from "../../../api/instance";
import { useMediaQuery } from "@chakra-ui/react";

const pageSize = 20;
const mapsUrl = "42.876260, 74.613088";

const Contacts = () => {
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
          <div className={styles.title_block}>контакты</div>

          <div className={styles.main_flex}>
            <div className={styles.left}>
              <div className={styles.flex}>
                <div className={styles.column}>
                  <div className={styles.title}>КИРГИЗИЯ</div>
                  <div className={styles.subtitle}>
                    Бишкек Усенбаева, 106 офис 507
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.title}>связаться с нами</div>
                  <div className={styles.subtitle}>
                    +996 999 083 083,
                    <br />
                    +996 999 038 038 Центральный
                    <br />
                    info@gk-pulse.com
                  </div>
                </div>
              </div>

              <div className={styles.map}>
                <iframe
                  height="400"
                  width="100%"
                  src={`https://maps.google.com/maps?q=${mapsUrl}&z=15&output=embed`}
                  // title={city}
                />
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.ask}>
                у вас остались вопросы? Напишите нам и мы оперативно вам ответим
              </div>
              <div className={styles.contact}>
                Техподдержка : tech@gk-pulse.com <br />
                (Время работы операторов с 10 - 18 по бишкекскому времени)
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contacts;
