import React, { useEffect, useState } from "react";
import styles from "./Cabinet.module.scss";
import { useTranslation } from "react-i18next";
import Profile from "../settings/profile/Profile";
import Operations from "../operations/Operations";

const Cabinet = () => {
  const { t } = useTranslation();

  return (
    <div className="page_container">
      <Profile />
      <Operations />
    </div>
  );
};

export default Cabinet;
