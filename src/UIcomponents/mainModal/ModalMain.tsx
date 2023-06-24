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

type IProps = {
  isOpen: boolean;
  title: string;
  handleClose: () => void;
  handleSubmit?: any;
  children?: React.ReactNode;
  width?: string;
  color?: string;
};

const ModalMain: FC<IProps> = ({
  isOpen,
  title,
  handleClose,
  handleSubmit,
  children,
  width,
  color,
}) => {
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

        <ModalFooter justifyContent={handleSubmit ? "space-between" : "center"}>
          <Button
            onClick={() => handleClose()}
            isDisabled={isLoading}
            style={{ backgroundColor: "#e6cb8b" }}
            minW={[32, 40]}
          >
            Закрыть
          </Button>
          {handleSubmit && (
            <Button
              isLoading={isLoading}
              spinner={<LocalSpinner size="lg" />}
              onClick={handleLocalSumbit}
              style={{ backgroundColor: "#85c7db" }}
              minW={[32, 40]}
            >
              Подтвердить
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalMain;
