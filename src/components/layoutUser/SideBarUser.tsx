import { Avatar } from "@chakra-ui/react";
import Logo from "../../assets/images/Logo.png";
import { useAppSelector } from "../../store";
import styles from "./LayoutUser.module.scss";
import React, { FC } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { MdExitToApp } from "react-icons/md";
import { ROUTES, menuUserItems } from "../../assets/consts/consts";
import NavMenu from "./NavMenu";
import { getNumWithoutZeroToFixedN } from "../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";
import { useTranslation } from "react-i18next";
import { AuthApi } from "../../api/auth/auth";

type Propstype = {
  onClose?: any;
};

const SideBarUser: FC<Propstype> = ({ onClose }: Propstype) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { auth, userData, allInfoUser, dopInfo } = useAppSelector(
    (state) => state
  );

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await AuthApi.logOutApi();
    navigate("/login");
  };

  return (
    <div className={styles.navbar_container}>
      <NavLink
        to="/"
        onClick={() => {
          if (onClose) {
            onClose();
          }
        }}
      >
        <div className={styles.logo_container}>
          <div>PUSLE</div>
          <div>
            <img src={Logo} alt="" />
          </div>
          <div className={styles.orange_color}>ART</div>
        </div>
      </NavLink>
      <div className={styles.hi}>{t("User_layout.good_day")}</div>
      <div className={styles.hi_name}>
        <Avatar
          name={userData.value.userInfo?.fullName ?? "NN"}
          src={allInfoUser.avatar}
        />
        <div>{userData.value.userInfo?.fullName ?? "NN"}</div>
      </div>
      <div className={styles.icons_cont}>
        <Link to={ROUTES.promo}>
          <div className={styles.icon_block}>
            <AiOutlineGift size={24} color="#4F4F4F" />
          </div>
        </Link>
        <Link to={ROUTES.chats}>
          <div className={styles.icon_block}>
            <BiMessageDetail size={24} color="#4F4F4F" />
            {allInfoUser.value.messagesCount > 0 && (
              <div className={styles.notificate_count}>
                {allInfoUser.value.messagesCount}
              </div>
            )}
          </div>
        </Link>
        <div className={styles.icon_block}>RU</div>
        <div className={styles.icon_block}>
          <MdExitToApp size={24} color="#4F4F4F" onClick={handleLogout} />
        </div>
      </div>

      <div className={styles.balance}>
        <div>{t("New.y_balance")}</div>
        <div className={styles.balance_amount}>
          {getNumWithoutZeroToFixedN(
            allInfoUser.value.balance,
            2
          ).toLocaleString()}{" "}
          &nbsp; USD
        </div>
      </div>

      {/* <div className={styles.lk}>Личный кабинет</div> */}
      {/* <div className={styles.nav_cont}>
        {menuUserItems.map((elem) => (
          <div key={elem.id} style={{ position: "relative" }}>
            <NavLink
              to={elem.to}
              className={({ isActive }) =>
                isActive ? styles.active_nav : styles.inactive_nav
              }
            >
              {elem.name}
            </NavLink>
          </div>
        ))}
      </div> */}

      <NavMenu onClose={onClose} />

      <div className={styles.image_for_balance}>
        <div className={styles.balance_amount}>{dopInfo.fund} &nbsp; USD</div>
      </div>
      <div className={styles.balance_title}>{t("New.inv_balance")}</div>
    </div>
  );
};

export default SideBarUser;
