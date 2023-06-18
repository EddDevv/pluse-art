import styles from "./LayoutHome.module.scss";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "./HeaderHome";
import FooterHome from "./FooterHome";

const LayoutHome: FC = () => {
  return (
    <>
      <div className={styles.layout_main}>
        <HeaderHome />
        <Outlet />
        <FooterHome />
      </div>
    </>
  );
};

export default LayoutHome;
