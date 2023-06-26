import styles from "./LayoutUser.module.scss";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import HeaderUser from "./HeaderUser";
import FooterUser from "./FooterUser";
import { Flex, Grid } from "@chakra-ui/react";
import SideBarUser from "./SideBarUser";

const LayoutUser: FC = () => {
  return (
    <>
      <div className={styles.layout_main}>
          <div className={styles.layout_side}>
            <SideBarUser />
          </div>
          <div className={styles.layout_user}>
            <HeaderUser />
            <Outlet />
            {/* <FooterUser /> */}
          </div>
      </div>
    </>
  );
};

export default LayoutUser;
