import styles from "./LayoutHome.module.scss";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "./HeaderHome";

const LayoutHome: FC = () => {
  return (
    <>
      <HeaderHome />
      <Outlet />
    </>
  );
};

export default LayoutHome;
