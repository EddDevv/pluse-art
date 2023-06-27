import styles from "./LayoutUser.module.scss";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { menuUserSubItems } from "../../assets/consts/consts";
import NavSubMenu from "./NavSubMenu";
const NavMenu: FC = () => {
  return (
    <>
      <div className={styles.lk}>Личный кабинет</div>
      <div className={styles.nav_cont}>
        {menuUserSubItems.map((elem) => (
          <div key={elem.id} style={{position: "relative"}}>
            {elem?.sub ?
              <NavSubMenu menuItem={elem} />
              : <NavLink
                to={elem?.to}
                className={({ isActive }) =>
                  isActive ? `${styles.active_nav} ${styles.collapse_item}` :
                    `${styles.inactive_nav} ${styles.collapse_item}`
                }
              >
                <div className={styles.collapse_item}>
                  {elem.title}
                </div>
              </NavLink>
            }
          </div>
        ))}
      </div>

    </>
  );
};

export default NavMenu;
