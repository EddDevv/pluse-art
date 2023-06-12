import styles from "./LayoutHome.module.scss";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "./HeaderHome";

const LayoutHome: FC = () => {
  return (
    <>
      <div className={styles.layout_main}>
        <HeaderHome />
        <Outlet />
      </div>
    </>
  );
};

export default LayoutHome;
