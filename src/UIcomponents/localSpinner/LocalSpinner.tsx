import { Center } from "@chakra-ui/react";
import React, { FC } from "react";
import { ColorRing } from "react-loader-spinner";

interface ISpinnerProps {
  size: string;
}

export const LocalSpinner: FC<ISpinnerProps> = ({ size }) => {
  return (
    <Center w="100%">
      <ColorRing
        visible={true}
        height={size}
        width={size}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#78b9c4", "#64AECA", "#9ED3C6", "#E6CB8B", "#e3bac4"]}
      />
    </Center>
  );
};
