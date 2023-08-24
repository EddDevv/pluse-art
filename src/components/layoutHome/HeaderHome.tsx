import React from "react";
import Logo from "../../assets/images/Logo.png";
import LogoFull from "../../assets/images/LogoFull.png";

import Avatar from "../../assets/images/avatar.png";

import styles from "./LayoutHome.module.scss";
import { Link, NavLink } from "react-router-dom";
import { menuItems } from "../../assets/consts/consts";
import { useMediaQuery } from "@chakra-ui/react";
import SideBarMobile from "./SideBarMobile";
import { LanguageSwitcher } from "../LangSwitcher/LangSwitcher";
import { LogoIcon } from "../../assets/icons/Logo";

const HeaderHome = () => {
  const [isLagerThan1050] = useMediaQuery("(min-width: 1050px)");

  return (
    <div
      className={
        window.location.pathname === "/"
          ? // ? `${styles.container} ${styles.container_main}`
            // : styles.container
            `${styles.container} ${styles.container_main}`
          : styles.container
      }
    >
      <NavLink to="/">
        <div className={styles.logo_container}>
          {/* <img src={LogoFull} alt="" /> */}
          <div>PUSLE</div>
          <div className={styles.logo_svg}>
              {/* <img src={Logo} alt=""  /> */}
              <LogoIcon/>
            </div>
          <div className={styles.orange_color}>ART</div>
        </div>
      </NavLink>

      {isLagerThan1050 ? (
        <>
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

          <div className={styles.personal_container}>
            <Link to="/login">
              <div className={styles.link_to_pa}>Личный кабинет</div>
            </Link>
            <Link to="/login">
              <div>
                <img src={Avatar} alt="" />
              </div>
            </Link>
            <div>|</div>
            <LanguageSwitcher />
          </div>
        </>
      ) : (
        <SideBarMobile />
      )}
    </div>
  );
};

export default HeaderHome;
