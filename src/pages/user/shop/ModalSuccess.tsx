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
import ProductForCart from "./ProductForCart";
import styles from "./Shop.module.scss";

type IProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const ModalSuccess: FC<IProps> = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={false}
      // scrollBehavior="inside"
      motionPreset="slideInRight"
      isCentered={true}
      size={"lg"}
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        bg="#FFFFFF"
        borderRadius="5px"
        padding={["20px 15px", "20px 15px", "40px"]}
        boxShadow="0px 4px 50px rgba(178, 200, 215, 0.46)"
      >
        <ModalCloseButton onClick={handleClose} />
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            Спасибо за оформление заказа!{" "}
          </div>
          <div>
            В ближайшее время с Вами свяжется наш консультант для уточнения
            деталей заказа.
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalSuccess;
