import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Profile.module.scss";
import { useAppSelector } from "../../../../store";
import {
  Avatar,
  CircularProgress,
  CircularProgressLabel,
  Spacer,
} from "@chakra-ui/react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { AiFillStar, AiTwotoneSecurityScan } from "react-icons/ai";
import { UseYears } from "../../../../hooks/useYears";
import { getNumWithoutZeroToFixedN } from "../../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";

const Profile = () => {
  const { t } = useTranslation();

  const { userData } = useAppSelector((state) => state);
  const { allInfoUser } = useAppSelector((state) => state);
  const [age, setAge] = useState<null | number>(null);

  const [fieldsAmountForCircle, setfieldsAmountForCircle] = useState<any[]>([
    { name: allInfoUser.value.email },
    { name: allInfoUser.value.firstName },
    { name: allInfoUser.value.middleName },
    { name: allInfoUser.value.lastName },
    { name: allInfoUser.value.phoneNumber },
    { name: allInfoUser.value.country },
    { name: allInfoUser.value.city },
    { name: allInfoUser.value.birthDate },
    { name: allInfoUser.value.telegram },
    // { name: allInfoUser.value.instagram },
    { name: allInfoUser.value.vkontakte },
    { name: allInfoUser.value.facebook },
    // { name: allInfoUser.value.twitter },
    // { name: allInfoUser.value.youtube },
  ]);

  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    if (!allInfoUser.value) return;
    setfieldsAmountForCircle([
      { name: allInfoUser.value.email },
      { name: allInfoUser.value.firstName },
      { name: allInfoUser.value.middleName },
      { name: allInfoUser.value.lastName },
      { name: allInfoUser.value.phoneNumber },
      { name: allInfoUser.value.country },
      { name: allInfoUser.value.city },
      { name: allInfoUser.value.birthDate },
      { name: allInfoUser.value.telegram },
      // { name: allInfoUser.value.instagram },
      { name: allInfoUser.value.vkontakte },
      { name: allInfoUser.value.facebook },
      // { name: allInfoUser.value.twitter },
      // { name: allInfoUser.value.youtube },
    ]);
    const filledFieldsAmount = fieldsAmountForCircle.filter(
      (item) =>
        item.name !== "" && item.name !== null && item.name !== undefined
    );

    filledFieldsAmount.length > 0 &&
      fieldsAmountForCircle.length > 0 &&
      setPercent(
        (filledFieldsAmount.length / fieldsAmountForCircle.length) * 100
      );

    let age: number | null = null;
    if (allInfoUser.value.birthDate) {
      age = Math.floor(
        (+new Date() - +new Date(allInfoUser.value.birthDate)) /
          (1000 * 60 * 60 * 24 * 365)
      );
      setAge(age);
    }
  }, [userData, allInfoUser]);

  const { text } = UseYears(age ?? 0);

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

        <div className={styles.flex} style={{marginTop: "25px"}}>
          <AiTwotoneSecurityScan color={true ? "#008080" : "#FF0000"} />
          <div>
            {allInfoUser.value.verificationDate ? (
              <span>{t("PersonalArea.ver_true")}</span>
            ) : (
              <button
                className="blueButton"
                // onClick={() => setIsOpenVerificationModal(true)}
              >
                {t("New.verify")}
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

      {/* ************ */}
      <div className={styles.box2}>
        <div>
          <CircularProgress
            value={percent}
            color="#008080"
            size="200px"
            thickness="4px"
          >
            <CircularProgressLabel>
              <div>
                <div className={styles.perc_text}>
                  {t("New.percent_profile")}
                </div>
                <div className={styles.perc_val}>{percent?.toFixed(0)}%</div>
              </div>
            </CircularProgressLabel>
          </CircularProgress>
        </div>
      </div>

      {/* ************ */}
      <div className={styles.box3}>
        <div className={styles.y_balance}>{t("New.y_balance")}</div>
        <div className={styles.balance}>
          {getNumWithoutZeroToFixedN(
            allInfoUser.value.balance,
            2
          ).toLocaleString()}{" "}
          &nbsp; USD
        </div>
        <Spacer />
        <div className={styles.agent}>
          <BsFillPersonCheckFill color="#828282" size="20" />
          <div>{t("New.agent")}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
