import React, { FC } from "react";
import { ColorRing } from "react-loader-spinner";

interface ISpinnerProps {
  size: string;
  top?: string;
}

export const LocalSpinnerAbsolute: FC<ISpinnerProps> = ({ size, top }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: top ? top : "-20px",
        left: "45%",
        zIndex: "1000",
      }}
    >
      <ColorRing
        visible={true}
        height={size}
        width={size}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#78b9c4", "#64AECA", "#9ED3C6", "#E6CB8B", "#e3bac4"]}
      />
    </div>
  );
};
