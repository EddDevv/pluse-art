import { Text } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./Timer.module.scss";

interface IProps {
  expiryTimestamp: Date;
  setIsButtonDisabled?: Dispatch<SetStateAction<boolean>>;
  callBack?: any;
}

export const TimerMinSec: FC<IProps> = ({
  expiryTimestamp,
  setIsButtonDisabled,
  callBack,
}) => {
  // const onExpire = async () => {
  //   // const time = await new Date();
  //   // time.setSeconds(time.getSeconds() + 60);
  //   // restart(time, true);

  //   if (setIsButtonDisabled) {
  //     setIsButtonDisabled(false);
  //   }
  //   // resume;
  // };

  const onExpire = async () => {
    if (!callBack) return;
    await callBack();
    restart(expiryTimestamp, true);
  };

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.log("onExpire");
      onExpire();
    },
    autoStart: true,
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          {minutes.toString().length > 1 ? minutes.toString()[0] : "0"}
        </div>
        <div className={styles.item}>
          {minutes.toString().length > 1
            ? minutes.toString()[1]
            : minutes.toString()[0]}
        </div>
        :{" "}
        <div className={styles.item}>
          {seconds.toString().length > 1 ? seconds.toString()[0] : "0"}
        </div>
        <div className={styles.item}>
          {seconds.toString().length > 1
            ? seconds.toString()[1]
            : seconds.toString()[0]}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.desc_item}>мин</div>
        <div className={styles.desc_item}>сек</div>
      </div>
    </>
  );
};
