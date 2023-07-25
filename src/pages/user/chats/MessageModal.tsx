import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";
import { useAppSelector } from "../../../store";
import styles from "./Chats.module.scss";
import { BASEAPPURL } from "../../../api/instance";
import { toast } from "react-toastify";
import { UserIds } from "../../../assets/consts/consts";

type PropsType = {
  id: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh?: boolean;
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageModal = ({
  id,
  isOpen,
  setIsOpen,
  refresh,
  setRefresh,
}: PropsType) => {
  const { t } = useTranslation();

  const { auth } = useAppSelector((state) => state);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!id) return;
    try {
      const response = await fetch(`${BASEAPPURL}api/Chat/send-message/${id}`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          Authorization: `Bearer ${auth.token}`,
          accept: "application/octet-stream",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 422) {
        toast.error(t("Platform.user_block_messages"));
      } else if (response.status >= 200 && response.status < 300) {
        toast.success(t("Platform.messege_sended"));
        setMessage("");
        setRefresh && setRefresh(!refresh);
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const getName = (id: string) => {
    const name = UserIds.find((elem) => elem.id == id);
    if (name) {
      return name.name;
    } else {
      return "";
    }
  };
  return (
    <>
      <ModalMain
        title={`${t("New.send_to")} ${getName(id)} `}
        isOpen={isOpen}
        handleClose={() => {
          setMessage("");
          setIsOpen(false);
        }}
        handleSubmit={handleSend}
      >
        <textarea
          className={`gray_input_w100 ${styles.textarea}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("Platform.type_messege").toString()}
          style={{ marginBottom: "30px" }}
        />
      </ModalMain>
    </>
  );
};
export default MessageModal;
