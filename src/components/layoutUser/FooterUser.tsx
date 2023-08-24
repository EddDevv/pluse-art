import Logo from "../../assets/images/Logo.png";

import styles from "./LayoutUser.module.scss";
import { NavLink } from "react-router-dom";
import { Spacer, Text } from "@chakra-ui/react";
import { menuItems } from "../../assets/consts/consts";
import { LogoIcon } from "../../assets/icons/Logo";

const FooterUser = () => {
  return (
    <div className={styles.container_footer}>
      <div className={styles.footer_logo}>
        <NavLink to="/">
          <div className={styles.logo_container}>
            <div>PUSLE</div>
            <div className={styles.logo_svg}>
              {/* <img src={Logo} alt=""  /> */}
              <LogoIcon />
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
            Инвестируй{" "}
            <Text className={styles.orange_text}>{" правильно "}</Text> и
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

export default FooterUser;
