import React from "react";
import styles from "./HomeMain.module.scss";
import HomeStart from "../homeStart/HomeStart";
import About from "../about/About";
import Platform from "../platform/Platform";
import Products from "../products/Products";

const HomeMain = () => {
  return (
    <div className={styles.main_container}>
      <HomeStart />
      <About />
      <Platform />
      <Products/>
    </div>
  );
};

export default HomeMain;
