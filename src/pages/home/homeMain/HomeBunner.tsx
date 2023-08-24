import { Text } from "@chakra-ui/react";
import styles from "./HomeMain.module.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../assets/consts/consts";

const HomeBunner = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.bunner}>
      <div className={styles.bunner_title}>
        что выбираешь &nbsp;
        <Text className="orange_text">ты?</Text>
      </div>
      <div className={styles.bunner_flex}>
        <div className={styles.button_container}>
          <button className="green_button">ОСТАВИТЬ ВСЕ КАК ЕСТЬ</button>
          <div className={styles.button_desc}>
            Вероятностью в 90% вы продолжите совершать ДОРОГИЕ ОШИБКИ в
            финансовой сфере и нвестициях
          </div>
        </div>
        <div className={styles.button_container}>
          <button
            className="orange_button_bshadow"
            onClick={() => {
              navigate(ROUTES.signup);
            }}
          >
            СТАТЬ ЛУЧШЕ
          </button>
          <div className={styles.button_desc}>
            Войти в сообщество финансово грамотных и разумных людей, которые
            помогут освоиться в мире финансов
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBunner;
