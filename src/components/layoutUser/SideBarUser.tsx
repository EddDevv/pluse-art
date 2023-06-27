import { Avatar } from "@chakra-ui/react";
import Logo from "../../assets/images/Logo.png";
import { useAppSelector } from "../../store";
import styles from "./LayoutUser.module.scss";
import React, { FC } from "react";

import { NavLink } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { MdExitToApp } from "react-icons/md";
import { menuUserItems } from "../../assets/consts/consts";
import NavMenu from "./NavMenu";

const SideBarUser: FC = () => {
  const { auth, userData, allInfoUser, dopInfo } = useAppSelector((state) => state);

  return (
    <div className={styles.navbar_container}>
      <NavLink to="/">
        <div className={styles.logo_container}>
          <div>PUSLE</div>
          <div>
            <img src={Logo} alt="" />
          </div>
          <div className={styles.orange_color}>ART</div>
        </div>
      </NavLink>
      <div className={styles.hi}>Добрый день</div>
      <div className={styles.hi_name}>
        <Avatar
          name={userData.value.userInfo?.fullName ?? "NN"}
          src={allInfoUser.avatar}
        />
        <div>{userData.value.userInfo?.fullName ?? "NN"}</div>
      </div>
      <div className={styles.icons_cont}>
        <div className={styles.icon_block}>
          <AiOutlineGift size={24} color="#4F4F4F" />
        </div>
        <div className={styles.icon_block}>
          <BiMessageDetail size={24} color="#4F4F4F" />
          {allInfoUser.value.messagesCount > 0 && (
            <div className={styles.notificate_count}>
              {allInfoUser.value.messagesCount}
            </div>
          )}
        </div>
        <div className={styles.icon_block}>RU</div>
        <div className={styles.icon_block}>
          <MdExitToApp size={24} color="#4F4F4F" />
        </div>
      </div>

      <div className={styles.balance}>
        <div>Ваш баланс:</div>
        <div className={styles.balance_amount}>
          {allInfoUser.value.balance} &nbsp; $
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

      <NavMenu />

      <div className={styles.image_for_balance}>
        <div className={styles.balance_amount}>{dopInfo.fund} &nbsp; USD</div>
      </div>
      <div className={styles.balance_title}>баланс инвестиционного фонда</div>
    </div>
  );
};

export default SideBarUser;
