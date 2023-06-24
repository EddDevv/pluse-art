import React, { FC } from "react";
import Moment from "react-moment";

interface IDate {
  date: string;
  time?: boolean;
}

export const LocalMoment: FC<IDate> = ({ date, time = false }) => {
  return (
    <>
      {time ? (
        <Moment format="DD-MM-YYYY, hh:mm:ss">{date}</Moment>
      ) : (
        <Moment format="DD-MM-YYYY">{date}</Moment>
      )}
    </>
  );
};
