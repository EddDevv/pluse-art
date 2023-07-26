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
import { useTranslation } from "react-i18next";
import { LocalSpinnerAbsolute } from "../../../UIcomponents/localSpinner/LocalSpinnerAbsolute";
import { BusketIcon } from "../../../assets/icons/Busket";

type IProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit?: any;
  children?: React.ReactNode;
  isDisabled?: boolean;
  width?: string;
  color?: string;
  isOrange?: boolean;
  isHideClose?: boolean;
};

const ModalBusket: FC<IProps> = ({
  isOpen,
  handleClose,
  handleSubmit,
  isDisabled,
  children,
  width,
  color,
  isOrange,
  isHideClose,
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
      size={width ? width : "lg"}
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
          <div
            className="green_text_big"
            style={{ display: "flex", gap: "20px" }}
          >
            <BusketIcon color="#008080" />
            корзина
          </div>
        </ModalHeader>

        {children && children}

        <div
          style={{
            display: "flex",
            justifyContent: handleSubmit ? "space-between" : "center",
            gap: "10px",
          }}
        >
          {!isHideClose && (
            <button
              onClick={() => handleClose()}
              className={
                isOrange ? "outline_black_button" : "outline_green_button"
              }
              style={{ width: "50%" }}
            >
              {t("New.close")}
            </button>
          )}
          {handleSubmit && (
            <div style={{ position: "relative", width: "50%" }}>
              {isLoading && <LocalSpinnerAbsolute size="70px" />}
              <button
                onClick={handleLocalSumbit}
                className={
                  isOrange ? "dark_orange_button" : "dark_green_button"
                }
                style={{ width: "100%" }}
                disabled={isLoading || isDisabled}
              >
                {t("Platform.confirm")}
              </button>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalBusket;
