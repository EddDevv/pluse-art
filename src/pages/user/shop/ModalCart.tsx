import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useMediaQuery,
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
  handleSubmit?: any;
  children?: React.ReactNode;
  isDisabled?: boolean;
  width?: string;
  color?: string;
  isOrange?: boolean;
  isHideClose?: boolean;
};

const ModalCart: FC<IProps> = ({
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
  const [isLagerThan600] = useMediaQuery("(min-width: 600px)");

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
      size={width ? width : "4xl"}
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

        <ProductForCart />
        <ProductForCart />

        <div className={styles.comment}>Комментарий к заказу</div>
        <textarea className={`gray_input_w100 ${styles.textarea}`} />

        <div className={styles.button_modal_flex}>
          <button
            onClick={() => handleClose()}
            className={
              isOrange ? "outline_black_button" : "outline_green_button"
            }
          >
            {t("New.consult")}
          </button>
          {/* <div>*/}
            {isLoading && <LocalSpinnerAbsolute size="70px" />} 
            <button
              onClick={handleLocalSumbit}
              className={isOrange ? "dark_orange_button" : "dark_green_button"}
              disabled={isLoading || isDisabled}
            >
              {t("Programs.pay")}
            </button>
          {/* </div> */}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalCart;
