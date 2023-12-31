import { Avatar, Collapse, SlideFade, useDisclosure } from "@chakra-ui/react";
import Logo from "../../assets/images/Logo.png";
import { useAppSelector } from "../../store";
import styles from "./LayoutUser.module.scss";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Propstype = {
  onClose?: any;
  menuItem: any;
};
const NavSubMenu: FC<Propstype> = ({ onClose, menuItem }: Propstype) => {
  const { t } = useTranslation();
  const { auth, userData, allInfoUser, dopInfo } = useAppSelector(
    (state) => state
  );
  const { isOpen, onToggle } = useDisclosure();
  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={onToggle}
        className={
          isOpen
            ? `${styles.active_nav} ${styles.collapse_item}`
            : `${styles.inactive_nav} ${styles.collapse_item}`
        }
      >
        {t(`New.${menuItem.title}`)}
      </div>
      <Collapse in={isOpen} animateOpacity>
        <div className={styles.collapse}>
          {menuItem?.sub?.map((elem: any) => (
            <NavLink
              to={elem.to}
              key={elem.name}
              // className={({ isActive }) =>
              //   isActive ? styles.active_nav : styles.inactive_nav
              // }
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
            >
              <div className={styles.collapse_item}>
                {t(`New.${elem.name}`)}
              </div>
            </NavLink>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default NavSubMenu;
