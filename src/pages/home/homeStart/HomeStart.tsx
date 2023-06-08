import React from "react";
import iconGraph from "../../../assets/images/iconGraph.png";
import iconBuild from "../../../assets/images/iconBuild.png";
import iconLoop from "../../../assets/images/iconLoop.png";

import styles from "./HomeStart.module.scss";

const HomeStart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.main_flex}>
          <div className={styles.main_left}>
            <div className={styles.title}>
              Инвестируй <text className={styles.orange_color}>правильно</text>{" "}
              и безопасно
            </div>
            <div className={styles.desc}>Зарабатывай с профессионалами</div>
            <div>
              <button className="orange_button">НАЧАТЬ ИНВЕСТИРОВАТЬ</button>
            </div>
            <div className={styles.small_text}>Капитал в управлении</div>
            <div className={styles.amount}>2 000 000, 00 $</div>
          </div>

          <div className={styles.main_right}>
            <div className={styles.green_block}>
              <div>
                <img src={iconGraph} alt="" />
              </div>
              <div>минимальный депозит от 50 $ </div>
            </div>
            <div className={styles.green_block}>
              <div>
                <img src={iconBuild} alt="" />
              </div>
              <div>актуальные рынки легально</div>
            </div>
            <div className={styles.green_block}>
              <div>
                <img src={iconLoop} alt="" />
              </div>
              <div>прозрачные комиссии</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStart;
