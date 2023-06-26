import React, { useState } from "react";
import "./style.scss";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../store";
// import { resetCaptchaError } from "../../features/auth/authSlice";

interface IProps {
  setVisibleCaptcha: (value: boolean) => void;
  visibleCaptcha: boolean;
  setSuccessCaptcha: (value: boolean) => void;
}

export const Captcha = ({
  setVisibleCaptcha,
  visibleCaptcha,
  setSuccessCaptcha,
}: IProps) => {
  const dispatch = useAppDispatch();
  const [fail, setFail] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSuccess = () => {
    setVisibleCaptcha(false);
    setSuccessCaptcha(true);
    // dispatch(resetCaptchaError());

    setTimeout(() => {
      setSuccessCaptcha(false);
    }, 1000);
  };

  const onFail = () => {
    setFail(true);
    setInterval(() => {
      setFail(false);
    }, 1000);
  };

  return (
    <>
      <Modal
        isOpen={true}
        onClose={onClose}
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay
          backdropBlur="5px"
          bg="blackAlpha.300"
          backdropFilter="blur(10px) "
        />
        <ModalContent>
          <ModalBody>
            <div
              className={
                fail
                  ? "modal__text captcha_wrapper captcha_fail"
                  : "modal__text captcha_wrapper"
              }
            >
              <HCaptcha
                sitekey="161df06d-8496-40b4-ac6b-5e921d7ff307"
                onVerify={(token, ekey) => onSuccess()}
                onError={() => onFail()}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
