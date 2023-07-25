import React, { useEffect, useState } from "react";
import { UseYears } from "../../../hooks/useYears";
import instance, { BASEAPPURL } from "../../../api/instance";
// import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../store";
import { useTranslation } from "react-i18next";
import { MessagesType, ProfileType } from "../../../assets/types/Chat";
import { Loader } from "../../../api/Loader";

const Messages = () => {
  const { t } = useTranslation();

  const { auth, allInfoUser } = useAppSelector((state) => state);
  const [openEmoji, setOpenEmoji] = useState(false);
  // eslint-disable-next-line
  const [send, setSend] = useState(false);
  const [message, setMessage] = useState("");
  const [pic, setPic] = useState("");
  const [userProfile, setUserProfile] = useState<ProfileType | null>(null);
  const { text } = UseYears(userProfile?.yearsOld ?? 0);
  const [refresh, setRefresh] = useState(false);

  const { id, name } = useParams();

  const [messages, setMessages] = useState<MessagesType | null>(null);
  //   const messages: UseFetchresponseMessageType = useFetchWithTokenGet(
  //     `api/Chat/messages?chatRoomId=${id}`,
  //     { messages: { items: [] } },
  //     send
  //   );

  const [openMes, setOpenMes] = useState(false);

  const handlePush = (e: any) => {
    e.preventDefault();
    setOpenMes(!openMes);
  };

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

  // const getMessages = async () => {
  //   const res = await instance.get(`api/Chat/messages?chatRoomId=${id}`);
  // };

  const handleAddEmoji = (emoji: any) => {
    console.log("emoji", emoji);
    setMessage((prev) => prev + emoji.native);
    console.log("emoji from", String.fromCodePoint(+`0x${emoji.unified}`));
    // setMessage((prev) => prev + String.fromCodePoint(emoji.unified));
  };

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

  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpenEmoji(!openEmoji);
  };

  return (
    <>
      <div className="main_for_all_pages message_no_right_pad">
        {t("Platform.chats")}
        <div className="message_form_row">
          <div className="message_left_form">
            <div className="mes_send_button_container">
              <Link
                to="/chats"
                className="mes_send_button"
                style={{ width: "200px" }}
              >
                {" "}
                {"<< "}
                {t("Platform.chats_list")}
              </Link>
            </div>
            <div className="messageses">
              {/* <Loader loading={messages.loading} /> */}
              {/* {messages?.data?.messages?.items?.length > 0 &&
                messages.data.messages.items.map((item) =>
                  item.senderId === allInfoUser.value.id ? (
                    <LkMessagesMainYou
                      key={item.id}
                      // url={item.senderId}
                      text={item.text}
                      time={item.creationDate}
                    />
                  ) : (
                    <LkMessagesMainUser
                      key={item.id}
                      url={pic}
                      text={item.text}
                      time={item.creationDate}
                    />
                  )
                )} */}
            </div>

            <div className="message_left_form_navig">
              <form>
                <div className="message_left_form_navig_row">
                  <div className="mes_text">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("Platform.type_messege").toString()}
                    />
                  </div>

                  <div className="mes_send">
                    <button
                      style={{
                        color: "black",
                        borderRadius: "5px",
                        height: "45px",
                        fontWeight: 600,
                      }}
                      // href="/"
                      onClick={handleSend}
                      className="mes_send_button"
                      disabled={message?.length === 0}
                    >
                      {t("Platform.send")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="message_right_form">
            {/* ..............ОТПРАВКА СООБЩЕНИЙ....................... */}
            {/* <div style={{ position: "absolute", bottom: "0px", right: "20px" }}>
              <SendMessage
                status={openMes}
                id={61}
                modifyWrap={""}
                modifyEmoji={""}
                refresh={refresh}
                setRefresh={setRefresh}
                setOpenStatus={setOpenMes}
              />
            </div> */}
            <div className="message_user_right">
              <div className="gost_item" style={{ width: "100%" }}>
                <div className="gost_item_top">
                  <div
                    className="gost_item_logo"
                    style={{
                      backgroundImage:
                        pic !== ""
                          ? `url(${pic})`
                          : "url(../../../images/khan_black_big.png)",
                    }}
                  />

                  <div className="gost_item_top_right">
                    {/* <div className="gost_item_name">
                      {userProfile?.firstName
                        ? userProfile?.firstName
                        : messages?.data?.chatRoom?.recipientLogin
                        ? messages?.data?.chatRoom?.recipientLogin
                        : "no login"}
                    </div> */}
                    <div className="gost_item_year">
                      {userProfile?.yearsOld
                        ? userProfile.yearsOld + " " + text
                        : ""}
                    </div>
                    <div
                      className={
                        userProfile?.isOnline
                          ? "gost_item_online"
                          : "gost_item_offline"
                      }
                    >
                      {userProfile?.isOnline ? "Online" : "Offline"}
                    </div>
                  </div>
                </div>
                {/* <div className="gost_item_buttons">
                  <Link
                    to={
                      allInfoUser.value.login === "office"
                        ? `/admin/users/${messages?.data?.chatRoom?.recipientLogin}`
                        : `/user${name}`
                    }
                    // onClick={handlePush}
                    className="gost_item_profile"
                  >
                    <img src="/images/prof.png" alt="" />
                    <span>{t("Platform.user_profile")}</span>
                  </Link>
                </div> */}

                {/* {userProfile?.isBlocked === true && (
                  <UnBlockUserId
                    id={name}
                    name={
                      userProfile?.firstName
                        ? userProfile?.firstName
                        : messages?.data?.chatRoom?.recipientLogin
                    }
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                )}

                {userProfile?.isBlocked === false && (
                  <BlockUserId
                    id={name}
                    name={
                      userProfile?.firstName
                        ? userProfile?.firstName
                        : messages?.data?.chatRoom?.recipientLogin
                    }
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                )} */}
              </div>
            </div>
            <div
              style={{ color: "#fff" }}
              onClick={handlePush}
              className="technical_help"
            >
              {t("Platform.tech_support")}
            </div>
            {/* <div style={{ position: "absolute", bottom: "70px", left: "30px" }}>
              <SendMessage
                status={openMes}
                id={61}
                modifyWrap={""}
                modifyEmoji={""}
                refresh={refresh}
                setRefresh={setRefresh}
                setOpenStatus={setOpenMes}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
