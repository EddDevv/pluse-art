import { Text } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./Timer.module.scss";

interface IProps {
  expiryTimestamp: Date;
  setIsButtonDisabled?: Dispatch<SetStateAction<boolean>>;
}

export const Timer: FC<IProps> = ({ expiryTimestamp, setIsButtonDisabled }) => {
  const onExpire = async () => {
    // const time = await new Date();
    // time.setSeconds(time.getSeconds() + 60);
    // restart(time, true);

    if (setIsButtonDisabled) {
      setIsButtonDisabled(false);
    }
    // resume;
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
    onExpire: () => onExpire(),
    autoStart: true,
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          {days.toString().length > 1 ? days.toString()[0] : "0"}
        </div>
        <div className={styles.item}>
          {days.toString().length > 1 ? days.toString()[1] : days.toString()[0]}
        </div>
        :
        <div className={styles.item}>
          {hours.toString().length > 1 ? hours.toString()[0] : "0"}
        </div>
        <div className={styles.item}>
          {hours.toString().length > 1
            ? hours.toString()[1]
            : hours.toString()[0]}
        </div>
        :{" "}
        <div className={styles.item}>
          {minutes.toString().length > 1 ? minutes.toString()[0] : "0"}
        </div>
        <div className={styles.item}>
          {minutes.toString().length > 1
            ? minutes.toString()[1]
            : minutes.toString()[0]}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.desc_item}>дни</div>
        <div className={styles.desc_item}>часы</div>
        <div className={styles.desc_item}>мин</div>
      </div>
    </>
  );
};
