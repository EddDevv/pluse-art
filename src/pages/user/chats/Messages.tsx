import React, { useEffect, useState } from "react";
import { UseYears } from "../../../hooks/useYears";
import instance, { BASEAPPURL } from "../../../api/instance";
// import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../store";
import { useTranslation } from "react-i18next";
import {
  MessagesType,
  ProfileType,
  ResponseMessageType,
} from "../../../assets/types/Chat";
import { Loader } from "../../../api/Loader";
import styles from "./Chats.module.scss";
import { ROUTES, UserIdsEnum } from "../../../assets/consts/consts";
import { Avatar } from "@chakra-ui/react";
import Moment from "react-moment";
import MessageModal from "./MessageModal";

const Messages = () => {
  console.log("messages");
  const { t } = useTranslation();

  const { auth, allInfoUser } = useAppSelector((state) => state);
  const [send, setSend] = useState(false);
  const [message, setMessage] = useState("");
  const [pic, setPic] = useState("");
  const [userProfile, setUserProfile] = useState<ProfileType | null>(null);
  const { text } = UseYears(userProfile?.yearsOld ?? 0);
  const [refresh, setRefresh] = useState(false);

  const { id, name } = useParams();

  const [messages, setMessages] = useState<ResponseMessageType | null>(null);
  const [isOpenMesToSupport, setIsOpenMesToSuppor] = useState(false);

  const getMessages = async () => {
    try {
      const res = await instance.get(`api/Chat/messages?chatRoomId=${id}`);
      if (res.status >= 200 && res.status < 300) {
        setMessages(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!auth?.token) return;
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token, send]);

  // const getImage = async (image) => {
  //   const picture = await MainApi.getImage(image);
  //   if (picture) {
  //     setPic(picture);
  //   }
  // };

  // const getProfile = async () => {
  //   try {
  //     const response = await instance.get(`api/Profile/view-profile/${name}`);
  //     if (response?.status >= 200 && response.status <= 300) {
  //       setValue(response?.data);
  //       if (response?.data?.image) {
  //         const res = await getImage(response.data.image);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    // if (messages?.id === 0) return;
    if (auth.token && name) {
      fetch(`${BASEAPPURL}api/Profile/view-profile/${name}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => res.json())
        .then((body) => {
          setUserProfile(body);
          if (!body.image) return;
          fetch(`${BASEAPPURL}assets/Img/${body.image}`, {
            method: "GET",
            headers: {
              accept: "application/octet-stream",
            },
          }).then((res) => setPic(res.url));
        })
        .catch((error) => console.error(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    auth.token,
    // messages.id,
    refresh,
  ]);

  const getReadChatroom = async () => {
    try {
      await instance.put(`api/Chat/read-chatroom/${id}`);
    } catch (error: any) {
      if (error.response) {
        console.error("error.response:", error.response);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getReadChatroom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token, send]);

  // const getSendMessage = async () => {
  //   try {
  //     // const response = await instance.post(`api/Chat/send-message/${name}`, message);
  //     const response = await axios.post(
  //       `api/Chat/send-message/${name}`,
  //       message,
  //       {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${auth.token}`,
  //         // 'accept': 'application/octet-stream',
  //       }
  //     );
  //     // if (response?.status >=200 && response.status <= 300){

  //     // }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("error.response:", error.response);
  //     } else {
  //       console.error(error);
  //     }
  //   } finally {
  //     setMessage("");
  //     setSend(!send);
  //   }
  // };

  const handleSend = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASEAPPURL}api/Chat/send-message/${name}`,
        {
          method: "POST",
          body: JSON.stringify(message),
          headers: {
            Authorization: `Bearer ${auth.token}`,
            accept: "application/octet-stream",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 422) {
        toast.error(t("Platform.user_block_messages"));
      } else if (response.status >= 200 && response.status < 300) {
        toast.success(t("Platform.messege_sended"));
        setSend(!send);
      }
    } catch (error) {
      console.error("error>>>", error);
    } finally {
      setMessage("");
      // setTimeout(() => window.location.reload(), 2500);
    }
  };

  return (
    <>
      <MessageModal
        id={UserIdsEnum.techSupport}
        isOpen={isOpenMesToSupport}
        setIsOpen={setIsOpenMesToSuppor}
      />
      <div className={styles.paper}>
        <div className={styles.title_flex}>
          <div className="page_title">{t("New.my_mes")} </div>
          <button
            className="dark_green_button"
            style={{ alignSelf: "start" }}
            onClick={() => setIsOpenMesToSuppor(true)}
          >
            {t("User_layout.write_to_tech")}
          </button>
        </div>
        <div className={styles.link_back}>
          <Link to={ROUTES.chats}>
            {"<      "}&nbsp;
            {t("New.back_to_chats")}
          </Link>
        </div>

        <div className={styles.chat_column}>
          {messages &&
            // userProfile &&
            messages.messages.items.map((elem) => (
              <div key={elem.id} className={styles.message_flex}>
                <div style={{ width: "10%" }}>
                  {elem.senderId === allInfoUser.value.id ? (
                    <>
                      <Avatar
                        name={allInfoUser.value.login}
                        src={allInfoUser.avatar}
                      />
                    </>
                  ) : (
                    <>
                      {userProfile && (
                        <Avatar
                          name={messages.chatRoom.recipientName}
                          src={userProfile?.image}
                        />
                      )}
                    </>
                  )}
                </div>

                <div className={styles.login_time}>
                  <div>
                    {elem.senderId === allInfoUser.value.id ? (
                      <>{t("New.you")}</>
                    ) : (
                      <>
                        {messages.chatRoom.recipientName
                          ? messages.chatRoom.recipientName
                          : messages.chatRoom.recipientLogin}
                      </>
                    )}
                  </div>

                  <div className={styles.time}>
                    <Moment format="HH:mm DD.MM.YYYY">
                      {elem.creationDate}
                    </Moment>
                  </div>
                </div>

                <div
                  style={{
                    flexGrow: 1,
                    wordBreak: "break-all",
                  }}
                >
                  {elem.text}
                </div>
              </div>
            ))}

          <textarea
            className={`gray_input_w100 ${styles.textarea}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("Platform.type_messege").toString()}
          />

          <div className={styles.button_flex}>
            <button
              onClick={handleSend}
              className="dark_orange_button"
              disabled={message?.length === 0}
            >
              {t("Platform.send")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
