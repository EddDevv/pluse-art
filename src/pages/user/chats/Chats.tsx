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
import { IconButton, Tooltip } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

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
    push(`/messages${id}/${name}`);
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
        <button className="dark_green_button" style={{alignSelf: "start"}}>
          {t("User_layout.write_to_tech")}
        </button>
      </div>
      <div className="main_for_all_pages">
        <div className="message_form_row">
          {chatrooms?.length > 0 &&
            chatrooms.map((item) => (
              <div className="chats_item" key={item.id}>
                {/* <ListItemIcon>
                  {!item.lastMessage.isRead &&
                  item.lastMessage.senderId !== allInfoUser.value.id ? (
                    <img src="../../../images/message_closed.png" alt="" />
                  ) : (
                    <img src="../../../images/message_open.png" alt="" />
                  )}
                </ListItemIcon> */}
                <div
                  onClick={() =>
                    handleOpen({ id: item.id, name: item.recipientId })
                  }
                  className="chats_item_inner"
                >
                  <div className="chats_item_login">
                    <Tooltip title={`Login: ${item?.recipientLogin}`}>
                      <div>
                        {item?.recipientName &&
                        item?.recipientName.trim().length > 0
                          ? item.recipientName
                          : item?.recipientLogin
                          ? item?.recipientLogin
                          : "no login"}
                      </div>
                    </Tooltip>
                  </div>

                  <div className="chats_item_date">
                    <Moment format="HH:mm DD.MM.YYYY">
                      {item?.lastMessage?.creationDate}
                    </Moment>
                  </div>
                  <div
                    style={{
                      color:
                        item?.lastMessage.senderId === allInfoUser.value.id
                          ? ""
                          : "#007aff",
                    }}
                  >
                    {item?.lastMessage.senderId === allInfoUser.value.id
                      ? "Вы: "
                      : "Вам: "}
                    {item.lastMessage.text}
                  </div>
                </div>
                {/* <IconButton
                    onClick={() =>
                      handleOpen({ id: item.id, name: item.recipientId })
                    }
                  >
                    <CommentIcon />
                  </IconButton> */}
              </div>
            ))}
          {/* </List> */}
        </div>
        <div>
          {chatrooms.length < totalCount && (
            <button
              className="subm_form"
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ color: "white" }}
            >
              {t("Platform.load_more")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
