import React, { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./DashBoard.scss";
import DashBoardNavBar from "./DashBoardNavBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "../../store/userData/actions";
import { useAppSelector } from "../../store";
import getRefresh from "../../api/getRefresh";
import { Box, Drawer, useMediaQuery } from "@chakra-ui/react";
import { MainApi } from "../../api/main/mainApi";

const LayoutAdminDashboard: FC = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  // const btnRef = useRef<HTMLButtonElement>(null);

  // const isMobile = useMediaQuery("(max-width: 767px)");
  const [isLargerThan850] = useMediaQuery("(min-width: 850px)");
  const state: any = useSelector((state) => state);
  const { auth } = useAppSelector((state) => state);

  const dispatch = useDispatch();
  const push = useNavigate();

  const authRefresh = async () => {
    const isOK = await getRefresh();
    if (!isOK) {
      push("/login");
    }
  };

  // const setTimer = async () => {
  //   timerId && (await clearTimeout(timerId));
  //   const interval = await setInterval(authRefresh, 900000);
  //   if (interval) {
  //     setTimerid(interval);
  //   }
  // };

  useEffect(() => {
    // console.log("auth", auth);
    if (auth?.token === undefined) {
      push("/login");
    }
    if (auth?.token === null) {
      authRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  const checkIsManager = async () => {
    if (!state?.userData?.value?.userInfo?.isManager) {
      const resMain = await MainApi.getMainInfo();
      if (resMain?.status >= 200 && resMain.status < 300) {
        dispatch(UserData(resMain.data));
        if (!resMain?.data?.userInfo?.isManager === true) {
          push("/login");
        }
      }
    }
  };

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      checkIsManager();
    }
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        style={{ background: "#F4F9FF", minHeight: "100vh", minWidth: "350px" }}
        // minW={[400, 600]}
        // w="100%"
        // bg="#F4F9FF"
        // minH="100vh"
      >
        {isLargerThan850 ? (
          <div
            style={{ display: "flex", minHeight: "100vh" }}
            // flex
            // minH="100vh"
          >
            <div style={{ background: "#3786e5", position: "relative" }}>
              <div
                style={{
                  background: "#3786e5",
                  minWidth: "300px",
                  top: "0",
                  left: "0",
                  position: "sticky",
                }}
                // bg="#3786e5"
                // minW={[300, 300]}
                // top="0"
                // left="0"
                // position="sticky"
              >
                <DashBoardNavBar />
              </div>
            </div>

            <div
              style={{
                paddingLeft: "6px",
                background: "#F4F9FF",
                width: "100%",
              }}
              // pl="2" bg="#F4F9FF" w="100%"
            >
              <Outlet />
            </div>
          </div>
        ) : (
          <div
          // style={{ position: "relative", width: "100%" }}
          >
            <button
              // bg="#3786e5"
              // borderRadius="3xl"
              // w="20"
              // h="20"
              // ref={btnRef}
              // onClick={onOpen}
              // position="fixed"
              // right={8}
              // zIndex="modal"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: "#3786e5",
                borderRadius: "8px",
                top: "5px",
                left: "5px",
                position: "sticky",
                border: "none",
                boxShadow: "5px 5px 5px gray",
                zIndex: 5000,
              }}
            >
              <GiHamburgerMenu size={50} color={"white"} />
            </button>
            <Drawer
              // anchor="left"
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <Box background="rgb(38, 86, 207)" width="100%" height="100%">
                <DashBoardNavBar onClose={() => setIsOpen(false)} />
              </Box>
            </Drawer>
            {/* <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="lg"
              >
                <DrawerOverlay />
                <DrawerContent bg="#3786e5">
                  <DrawerCloseButton />

                  <DrawerBody>
                    <DashBoardNavBar onClose={onClose} />
                  </DrawerBody>
                </DrawerContent>
              </Drawer> */}
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};

export default LayoutAdminDashboard;
