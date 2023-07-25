import React, { useEffect, useState } from "react";
import instance, { BASEAPPURL } from "../../../api/instance";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Moment from "react-moment";
import { useAppSelector } from "../../../store";
import styles from "./Chats.module.scss";
import { ChatType } from "../../../assets/types/Chat";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";
import { IconButton, Spacer } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { LetterClosed } from "../../../assets/icons/LetterClosed";
import { LetterOpen } from "../../../assets/icons/LetterOpen";
import { ROUTES, UserIdsEnum } from "../../../assets/consts/consts";
import MessageModal from "./MessageModal";

const Chats = () => {
  const { t } = useTranslation();
  const { allInfoUser } = useAppSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const push = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [chatrooms, setChatrooms] = useState<ChatType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [chosenChat, setChosenChat] = useState<ChatType | null>(null);
  const [isOpenDeleteChatModal, setIsOpenDeleteChatModal] = useState(false);

  const [isOpenMesToSupport, setIsOpenMesToSuppor] = useState(false);

  const getChats = async () => {
    try {
      const res = await instance.get(
        `${BASEAPPURL}api/Chat/chatrooms?pageNumber=${currentPage}&pageSize=20`
      );
      if (res.status === 200) {
        if (currentPage <= 1) {
          setChatrooms(res.data?.items);
        } else {
          setChatrooms([...chatrooms, ...res.data?.items]);
        }
        setTotalCount(res.data?.totalCount);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getChats();
  }, [refresh, currentPage]);

  const handleOpen = ({ id, name }: any) => {
    push(`${ROUTES.chat}${id}/${name}`);
  };

  const handleDelete = async () => {
    if (!chosenChat) return;
    setIsLoading(true);
    try {
      await instance.delete(`api/Chat/delete-chatroom/${chosenChat?.id}`);
      setChosenChat(null);
      setIsOpenDeleteChatModal(false);
      setRefresh(!refresh);
    } catch (error: any) {
      console.error(error);
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error(t("DopItems.chats_deleting_error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.paper}>
      <MessageModal
        id={UserIdsEnum.techSupport}
        isOpen={isOpenMesToSupport}
        setIsOpen={setIsOpenMesToSuppor}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <ModalMain
        isOpen={isOpenDeleteChatModal}
        title={`${t("DopItems.confirm_chat_deleting")} ${
          chosenChat?.recipientLogin
        }`}
        handleClose={() => {
          setIsOpenDeleteChatModal(false);
          setChosenChat(null);
        }}
        handleSubmit={() => handleDelete()}
      />
      <div className={styles.title_flex}>
        <div className="page_title">{t("Platform.chats_list")} </div>
        <button
          className="dark_green_button"
          style={{ alignSelf: "start" }}
          onClick={() => setIsOpenMesToSuppor(true)}
        >
          {t("User_layout.write_to_tech")}
        </button>
      </div>

      <div className={styles.chats_column}>
        {chatrooms?.length > 0 &&
          chatrooms.map((item) => (
            <div
              className={
                !item.lastMessage.isRead &&
                item.lastMessage.senderId !== allInfoUser.value.id
                  ? styles.chact_block_gray
                  : styles.chact_block
              }
              key={item.id}
            >
              <div
                className={styles.inner}
                onClick={() =>
                  handleOpen({ id: item.id, name: item.recipientId })
                }
              >
                <div>
                  {!item.lastMessage.isRead &&
                  item.lastMessage.senderId !== allInfoUser.value.id ? (
                    <LetterClosed />
                  ) : (
                    <LetterOpen />
                  )}
                </div>
                <div className={styles.login_time}>
                  <div>
                    {item?.recipientName &&
                    item?.recipientName.trim().length > 0
                      ? item.recipientName
                      : item?.recipientLogin
                      ? item?.recipientLogin
                      : "no login"}
                  </div>

                  <div className={styles.time}>
                    <Moment format="HH:mm DD.MM.YYYY">
                      {item?.lastMessage?.creationDate}
                    </Moment>
                  </div>
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    color:
                      item?.lastMessage.senderId === allInfoUser.value.id
                        ? ""
                        : "teal",
                  }}
                >
                  {item?.lastMessage.senderId === allInfoUser.value.id
                    ? t("New.you")
                    : t("New.to_you")}
                  {item.lastMessage.text}
                </div>
              </div>
              <IconButton
                onClick={() => {
                  setChosenChat(item);
                  setIsOpenDeleteChatModal(true);
                }}
                aria-label="Search database"
                className={styles.delete}
                icon={<DeleteIcon color={"teal"} />}
              />
            </div>
          ))}
        <Spacer />

        {chatrooms.length < totalCount && (
          <button
            className="loadmore"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {t("Platform.load_more")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Chats;
