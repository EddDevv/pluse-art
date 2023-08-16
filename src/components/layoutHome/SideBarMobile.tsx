// import Logo from "../../../../assets/images/Logo.png";
import styles from "./LayoutHome.module.scss";
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
import { menuItems } from "../../assets/consts/consts";
import { LanguageSwitcher } from "../LangSwitcher/LangSwitcher";

const SideBarMobile: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Box>
        <Button
          height={12}
          width={12}
          onClick={onOpen}
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
            <DrawerCloseButton color="white" />

            <Box
              p={4}
              // bgColor={"rgba(128, 192, 192, 0.2)"}
              className={styles.drawer_body}
              fontFamily="Inter"
              // overflowY="scroll"
              h="100%"
              color="black"
              fontSize={25}
            >
              <NavLink to="/">
                <div
                  className={styles.logo_container}
                  style={{
                    fontSize: "30px",
                    textAlign: "center",
                    width: "100%",
                    padding: "30px 20px 50px 20px",
                  }}
                  onClick={onClose}
                >
                  <div>PUSLE</div>
                  <div>
                    <img src={Logo} alt="" />
                  </div>
                  <div className={styles.orange_color}>ART</div>
                </div>
              </NavLink>

              <Box className={styles.container_double} m={2}>
                <img
                  src={IconUser}
                  alt="IconUser"
                  style={{ width: "20px", height: "20px" }}
                />
                <div
                  className="orange_text"
                  style={{
                    fontWeight: "bold",
                    textShadow: "2px 2px 2px teal",
                  }}
                >
                  <NavLink to="/login" onClick={onClose}>
                    {" "}
                    Личный кабинет
                  </NavLink>
                </div>
              </Box>

              <Flex
                onClick={onClose}
                ml={12}
                direction="column"
                justifyContent="space-between"
                align="flex-start"
              >
                {menuItems.map((elem) => (
                  <Text m={"2"} fontSize="16px" key={elem.id}>
                    <NavLink
                      to={elem.to}
                      className={({ isActive }) =>
                        isActive ? styles.active_item : styles.item
                      }
                    >
                      {elem.name}
                    </NavLink>
                  </Text>
                ))}
              </Flex>

              <Box className={styles.container_double} m={2}>
                <div className={styles.lang}>
                  <LanguageSwitcher />
                </div>
              </Box>
            </Box>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default SideBarMobile;
