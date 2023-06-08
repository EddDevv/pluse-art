import React from "react";
import Logo from "../../assets/images/Logo.png";
import styles from "./LayoutHome.module.scss";
import { NavLink } from "react-router-dom";

export const menuItems = [
  { id: 1, name: "О нас", to: "/about" },
  { id: 2, name: "Наши продукты", to: "/products" },
  { id: 3, name: "Отзывы", to: "/reviews" },
  { id: 4, name: "FAQ", to: "/faq" },
  { id: 5, name: "Контакты", to: "/contacts" },
];

const HeaderHome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <div>PUSLE</div>
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className={styles.orange_color}>ART</div>
      </div>

      <div className={styles.nav_container}>
      {menuItems.map((elem) => (
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
    </div>
  );
};

export default HeaderHome;
