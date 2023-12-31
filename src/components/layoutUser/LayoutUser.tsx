import styles from "./LayoutUser.module.scss";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import HeaderUser from "./HeaderUser";
import FooterUser from "./FooterUser";
import { Flex, Grid, useMediaQuery } from "@chakra-ui/react";
import SideBarUser from "./SideBarUser";
import SideBarUserMobile from "./SideBarUserMobile";

const LayoutUser: FC = () => {
  const [isLagerThan1160] = useMediaQuery("(min-width: 1160px)");
  return (
    <>
      <div className={styles.layout_main}>
        {!isLagerThan1160 && (
          <div style={{ position: "fixed", right: "5px", top: "5px", zIndex: "1000" }}>
            <SideBarUserMobile />
          </div>
        )}
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
