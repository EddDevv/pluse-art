import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Profile.module.scss";
import { useAppSelector } from "../../../../store";
import { Avatar } from "@chakra-ui/react";
import { AiFillStar, AiTwotoneSecurityScan } from "react-icons/ai";

const Profile = () => {
  const { t } = useTranslation();

  const { userData } = useAppSelector((state) => state);
  const { allInfoUser } = useAppSelector((state) => state);

  return (
    <div className={styles.page_container}>
      <div className={styles.box1}>
        <div className={styles.flex}>
          <Avatar
            src={
              // userData.value.userInfo.image
              `https://api.gk-pulse.com/assets/Img/${userData.value.userInfo.image}`
            }
            size="xl"
            name={userData.value.userInfo.fullName}
          />
          <div className={styles.column}>
            <div className={styles.name}>
              {userData.value.userInfo?.fullName
                ? userData.value.userInfo.fullName
                : allInfoUser.value.login
                ? allInfoUser.value.login
                : "User"}
            </div>
            <div className={styles.flex}>
              <div className={styles.email}>email</div>
              <div className={styles.email_val}>
                {allInfoUser.value.email
                  ? allInfoUser.value.email
                  : "Нет емэйла"}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.flex}>
          <AiTwotoneSecurityScan color={true ? "#008080" : "#FF0000"} />
          <div>
            {allInfoUser.value.verificationDate ? (
              <span>{t("PersonalArea.ver_true")}</span>
            ) : (
              <button
                className="blueButton"
                // onClick={() => setIsOpenVerificationModal(true)}
              >
                Пройти верификацию
              </button>
            )}
          </div>
        </div>

        {allInfoUser.value.rang === 3 && (
          <div className={styles.flex}>
            <AiFillStar color="#FF7F50" />
            <div>{t("PersonalArea.vip")}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
