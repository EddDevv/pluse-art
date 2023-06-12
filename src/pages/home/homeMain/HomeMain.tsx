import React from "react";
import styles from "./HomeMain.module.scss";
import HomeStart from "../homeStart/HomeStart";
import About from "../about/About";
import Platform from "../platform/Platform";

const HomeMain = () => {
  return (
    <div>
      <HomeStart />
      <About />
      <Platform />
    </div>
  );
};

export default HomeMain;
