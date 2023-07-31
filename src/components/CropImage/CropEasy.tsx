import React, { useState, useCallback } from "react";

import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";

import { toast } from "react-toastify";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import instance from "../../api/instance";
import { MainApi } from "../../api/main/mainApi";

type PropsType = {
  file: any;
  setFile: any;
  setOpenCrop: React.Dispatch<React.SetStateAction<boolean>>;
  openCrop: boolean;
  myCropShape: any;
};

export const CropEasy = ({
  file,
  setFile,
  setOpenCrop,
  openCrop,
  myCropShape,
}: PropsType) => {
  // const [closeCrop, setCloseCrop] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const uploadFile = async (croppedImage: any) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      let formData = new FormData();
      formData.append("avatarImage", croppedImage, "cropped.jpeg");

      const response = await instance.post(
        "api/Profile/upload-avatar",
        formData,
        config
      );

      if (response.status === 200) {
        await MainApi.getInitialMainReduxInfo();
      }
      toast.success("Аватар успешно изменен!");
    } catch (error) {
      console.error(error);
    }
  };

  const cropImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        file,
        croppedAreaPixels,
        rotation
      );

      if (myCropShape === "round") {
        await uploadFile(croppedImage);
        setFile(null);
      }

      setOpenCrop(false);
    } catch (e: any) {
      console.error(e.message);
      setOpenCrop(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels, rotation]);

  const onCancelHandler = () => {
    setFile(null);

    setOpenCrop(false);
  };

  return (
    <>
      <Modal isOpen={openCrop} onClose={onCancelHandler} size={"lg"}>
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <Box w="300px" h="500px" bg="white">
            <Cropper
              image={file}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              cropShape={myCropShape}
            />
          </Box>
          <ModalFooter>
            <Flex gap={4}>
              <Button onClick={onCancelHandler}>Отменить</Button>
              <Button onClick={cropImage}>Сохранить</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
