import { Center, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ColorRing } from "react-loader-spinner";

export const GlobalSpinner = () => {
  const { onClose } = useDisclosure();

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay backdropFilter="blur(1px)">
        <Center w="100%" h="100%">
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#78b9c4", "#64AECA", "#9ED3C6", "#E6CB8B", "#e3bac4"]}
          />
        </Center>
      </ModalOverlay>
    </Modal>
  );
};
