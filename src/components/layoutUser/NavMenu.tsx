import styles from "./LayoutUser.module.scss";
import React, { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { menuUserSubItems } from "../../assets/consts/consts";
import NavSubMenu from "./NavSubMenu";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store";
import { RoleEnum } from "../../store/allInfoUser";

type Propstype = {
  onClose?: any;
};
const NavMenu: FC<Propstype> = ({ onClose }: Propstype) => {
  const { t } = useTranslation();
  const { userData, allInfoUser } = useAppSelector((state) => state);

  return (
    <>
      <div className={styles.lk}>Личный кабинет</div>
      <div className={styles.nav_cont}>
        {menuUserSubItems.map((elem) => (
          <div key={elem.id} style={{ position: "relative" }}>
            {elem?.sub ? (
              <NavSubMenu menuItem={elem} onClose={onClose} />
            ) : (
              <NavLink
                to={elem?.to}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active_nav} ${styles.collapse_item}`
                    : `${styles.inactive_nav} ${styles.collapse_item}`
                }
                onClick={() => {
                  if (onClose) {
                    onClose();
                  }
                }}
              >
                <div className={styles.collapse_item}>
                  {t(`New.${elem.title}`)}
                </div>
              </NavLink>
            )}
          </div>
        ))}

        {userData?.value?.userInfo?.isManager === true && (
          <Link to="/admin/" className="us_menu_li">
            <div>
              <span className="text_li">{t("User_layout.Manager")}</span>
            </div>
          </Link>
        )}

        {allInfoUser.role === RoleEnum.Leader && (
          <Link to="/leader/" className="us_menu_li">
            <div>
              <span className="text_li">Leader</span>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default NavMenu;
