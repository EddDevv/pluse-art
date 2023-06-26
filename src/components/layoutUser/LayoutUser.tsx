import styles from "./LayoutUser.module.scss";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import HeaderUser from "./HeaderUser";
import FooterUser from "./FooterUser";

const LayoutUser: FC = () => {
  return (
    <>
      <div className={styles.layout_main}>
        <HeaderUser />
        <Outlet />
        <FooterUser />
      </div>
    </>
  );
};

export default LayoutUser;
