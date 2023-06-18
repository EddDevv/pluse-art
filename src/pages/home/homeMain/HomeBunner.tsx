import styles from "./HomeMain.module.scss";

const HomeBunner = () => {
  return (
    <div className={styles.bunner}>
      <div className={styles.bunner_title}>
        хочешь новые &nbsp;
        <b className="orange_text">возможности?</b>
      </div>
      <div className={styles.bunner_flex}>
        <div className={styles.button_container}>
          <button className="green_button">ОСТАВИТЬ ВСЕ КАК ЕСТЬ</button>
          <div className={styles.button_desc}>
            Вероятностью в 90% вы продолжите совершать ДОРОГИЕ ОШИБКИ в сфере
            инвестирования, вместо того, чтобы зарабатывать
          </div>
        </div>
        <div className={styles.button_container}>
          <button className="orange_button_bshadow">СТАТЬ ИНВЕСТОРОМ</button>
          <div className={styles.button_desc}>
            Войти в сообщество УЖЕ СОСТОЯВЩИХСЯ ИНВЕСТОРОВ, которые помогут не
            совершать ошибок новичков
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBunner;
