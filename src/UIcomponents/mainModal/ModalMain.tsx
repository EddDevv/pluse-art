import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { LocalSpinner } from "../localSpinner/LocalSpinner";
import { useTranslation } from "react-i18next";

type IProps = {
  isOpen: boolean;
  title: string;
  handleClose: () => void;
  handleSubmit?: any;
  children?: React.ReactNode;
  width?: string;
  color?: string;
  isOrange?: boolean;
};

const ModalMain: FC<IProps> = ({
  isOpen,
  title,
  handleClose,
  handleSubmit,
  children,
  width,
  color,
  isOrange
}) => {
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleLocalSumbit = async () => {
    setLoading(true);
    await handleSubmit();
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={false}
      // scrollBehavior="inside"
      motionPreset="slideInRight"
      isCentered={width ? false : true}
      size={width ? "full" : "lg"}
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        bg="#FFFFFF"
        borderRadius="5px"
        padding={["20px 15px", "20px 15px", "40px"]}
        boxShadow="0px 4px 50px rgba(178, 200, 215, 0.46)"
      >
        <ModalCloseButton onClick={handleClose} />

        <ModalHeader
          w="100%"
          textAlign="center"
          fontSize="20px"
          lineHeight="28px"
          fontWeight="500"
        >
          <Text style={{ color: color ? color : "#284c63" }}> {title}</Text>
        </ModalHeader>

        {children && children}

        <div style={{ display: "flex", justifyContent: handleSubmit ? "space-between" : "center", gap: "10px" }}>
          <button
            onClick={() => handleClose()}
            className={isOrange ? "outline_black_button" : "outline_green_button"}
            style={{ width: "50%" }}
          >
            {t("New.close")}
          </button>
          {handleSubmit && (
            <button
              onClick={handleLocalSumbit}
              className={isOrange ? "dark_orange_button" : "dark_green_button"}
              style={{ width: "50%" }}
            >
              {t("Platform.confirm")}
            </button>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalMain;
