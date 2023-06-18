import Logo from "../../assets/images/Logo.png";

import styles from "./LayoutHome.module.scss";
import { NavLink } from "react-router-dom";
import { Spacer } from "@chakra-ui/react";
import { menuItems } from "../../assets/consts/consts";

const FooterHome = () => {
  return (
    <div className={styles.container_footer}>
      <div className={styles.footer_logo}>
        <NavLink to="/">
          <div className={styles.logo_container}>
            <div>PUSLE</div>
            <div>
              <img src={Logo} alt="" />
            </div>
            <div className={styles.orange_color}>ART</div>
          </div>
        </NavLink>

        <div className={styles.personal_container}>
          <div>|</div>
          <div>RU</div>
        </div>
      </div>

      <div className={styles.footer_main_flex}>
        <div className={styles.footer_column}>
          <div
            className={styles.footer_sub_title}
            style={{ maxWidth: "200px" }}
          >
            Инвестируй <b className={styles.orange_text}>{" правильно "}</b> и
            безопасно
          </div>
          <Spacer />
          <div className={styles.birga}>Кыргызская фондовая биржа</div>
        </div>
        <div className={styles.footer_column}>
          <div className={styles.footer_sub_title}>меню</div>
          {menuItems
            .filter((elem) => elem.id !== 3 && elem.id !== 5)
            .map((elem) => (
              <div className={styles.item} key={elem.id}>
                <NavLink
                  to={elem.to}
                  className={({ isActive }) =>
                    isActive ? styles.active_item : styles.item
                  }
                >
                  {elem.name}
                </NavLink>
              </div>
            ))}
        </div>
        <div className={styles.footer_column}>
          <div className={styles.footer_sub_title}>контакты</div>
          {menuItems
            .filter((elem) => elem.id === 3 || elem.id === 5)
            .map((elem) => (
              <div className={styles.item} key={elem.id}>
                <NavLink
                  to={elem.to}
                  className={({ isActive }) =>
                    isActive ? styles.active_item : styles.item
                  }
                >
                  {elem.name}
                </NavLink>
              </div>
            ))}
        </div>
        <div className={styles.footer_column}>
          <div className={styles.footer_sub_title}>Документы</div>
          {[
            "Свидетельство",
            "Лицензия БД №0004, рег. №05 от 29.04.2022",
            "Квалификационное свидетельство",
            "Уведомление",
          ].map((elem) => (
            <div className={styles.item} key={elem}>
              {elem}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterHome;
