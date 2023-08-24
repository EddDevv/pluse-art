// import Logo from "../../../../assets/images/Logo.png";
import styles from "./LayoutUser.module.scss";
import React, { FC, useRef } from "react";
import IconUser from "../../assets/images/avatar.png";

import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "../../assets/images/Logo.png";
import { COLORS, menuItems } from "../../assets/consts/consts";
import NavMenu from "./NavMenu";
import SideBarUser from "./SideBarUser";

const SideBarUserMobile: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Box>
        <Button
          height={12}
          width={12}
          onClick={onOpen}
          style={{background: COLORS.GREEN}}
          color="white"
          // ref={btnRef}
          as={IconButton}
          variant="solid"
          icon={<HamburgerIcon />}
        >
          Open
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          // size="md"
          closeOnEsc={true}
          closeOnOverlayClick={true}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color="teal" />

            <Box
              p={4}
              // bgColor={"rgba(128, 192, 192, 0.2)"}
              className={styles.drawer_body}
              fontFamily="Inter"
              overflowY="scroll"
              h="100%"
              color="black"
              fontSize={25}
            >
              <SideBarUser onClose={onClose} />
            </Box>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default SideBarUserMobile;
