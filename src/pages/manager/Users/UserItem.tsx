import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance, { BASEAPPURL } from "../../../api/instance";
import { Loader } from "../../../api/Loader";
import { useAppSelector } from "../../../store";
import { UserType } from "./UserList.types";
import { IconButton, useMediaQuery } from "@chakra-ui/react";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";
import { DeleteIcon } from "@chakra-ui/icons";

// const BrowserHistory = require('react-router/lib/BrowserHistory').default;

type IProps = {
  open: boolean;
  handleClose: () => void;
  chosenItem?: UserType | null;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  // setChosenItem?: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const UserItem = ({
  open,
  handleClose,
  chosenItem,
  refresh,
  setRefresh,
}: IProps) => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const { login } = useAppSelector((state) => state.userData.value.userInfo);
  const { auth } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<string[]>([]);
  const [isOpenDoc, setIsOpenDoc] = useState(false);
  const [document, setDocument] = useState<string>("");

  const sendMessage = async () => {
    setIsLoading(true);
    const mes = chosenItem?.verificationDate
      ? "You are unverified!"
      : "You are verified!";
    try {
      await fetch(`${BASEAPPURL}api/Chat/send-message/${chosenItem?.id}`, {
        method: "POST",
        body: JSON.stringify(mes),
        headers: {
          Authorization: `Bearer ${auth?.token}`,
          accept: "application/octet-stream",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("error>>>", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrCompleteVerificationHandler = async () => {
    setIsLoading(true);
    try {
      const res = await instance.post(
        `api/Manage/verify-user?partnerId=${chosenItem?.id}&verified=${
          chosenItem?.verificationDate ? "false" : "true"
        }`
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success(
          `Верификация успешно ${
            chosenItem?.verificationDate ? "отменена" : "подключена"
          } для ${chosenItem?.login}.`
        );
        await sendMessage();
        setRefresh(!refresh);
        handleClose();
      }
    } catch (e) {
      toast.error(`Ошибка верификации`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getDocuments = async () => {
    if (!chosenItem) return;
    setIsLoading(true);
    try {
      const res = await instance.get(
        `api/Manage/partner-document-list?partnerId=${chosenItem?.id}`
      );
      if (res.status >= 200 && res.status < 300) {
        setDocuments(res?.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDocumentHandler = async () => {
    setIsLoading(true);
    if (!chosenItem || !document) return;
    try {
      const res = await instance.delete(
        `api/Manage/delete-partner-document?partnerId=${chosenItem?.id}&photo=${document}`
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success(`Документ успешно удален`);
        setDocument("");
        setIsOpenDoc(false);
        getDocuments();
      }
    } catch (e) {
      toast.error(`Ошибка удаления документа`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenItem]);

  return (
    <>
      <ModalMain
        isOpen={isOpenDoc}
        title={``}
        handleClose={() => setIsOpenDoc(false)}
        width={isLargerThan500 ? "90%" : "95%"}
      >
        <div style={{ maxWidth: "1100px" }}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={deleteDocumentHandler}
          >
            <IconButton
              aria-label="Search database"
              icon={<DeleteIcon color={"teal"} />}
            />
            <div style={{ color: "red" }}>Удалить</div>
          </div>
          <img src={`${BASEAPPURL}assets/Img/${document}`} alt="" />
        </div>
      </ModalMain>
      <ModalMain
        isOpen={open}
        title={`Информация о пользователе с логином ${chosenItem?.login}`}
        handleClose={handleClose}
        width={isLargerThan500 ? "90%" : "95%"}
      >
        <div className="userinfo_container">
          <div className="column">
            <div className="column_item">
              <div className="column_item_title">ID: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.id}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">StoreId: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.storeId}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Логин: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.login}</div>
            </div>
            {login === "manager" && (
              <div className="column_item">
                <div className="column_item_title">password: &nbsp;</div>
                <div className="column_item_value">{chosenItem?.password}</div>
              </div>
            )}
            <div className="column_item">
              <div className="column_item_title">Имя: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.firstName}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Фамилия: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.lastName}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Отчество: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.middleName}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Телефон: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.phoneNumber}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">email: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.email}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">telegram : &nbsp;</div>
              <div className="column_item_value">{chosenItem?.telegram}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Логин инвайтера: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.inviterLogin}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Id инвайтера: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.inviterId}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Дата создания: &nbsp;</div>
              <div className="column_item_value">
                {" "}
                <Moment format="DD.MM.YYYY">{chosenItem?.creationDate}</Moment>
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Верификация: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.verificationDate && (
                  <Moment format="DD.MM.YYYY">
                    {chosenItem?.verificationDate}
                  </Moment>
                )}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Активирован: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.isActivated ? "да" : "нет"}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Страна: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.country}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Город: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.city}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">ConfirmationType: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.confirmationType}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="column_item">
              <div className="column_item_title">№ паспорта: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.passportNumber}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Серия: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.passportSerial}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Кем выдан: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.passportIssuer}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Дата выдачи: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.passportIssueDate && (
                  <Moment format="DD.MM.YYYY">
                    {chosenItem?.passportIssueDate}
                  </Moment>
                )}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Адрес регистрации: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.addressReg}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Баланс: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.balance}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Баланс бизнес: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.balanceBusiness}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Баланс Usdc: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.balanceUsdc}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Баланс Bitcoin: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.balanceBitcoin}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Баланс Ethereum: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.balanceEthereum}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Баланс Litecoin: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.balanceLitecoin}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">riskType: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.riskType}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">rang: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.rang}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Посетителей: &nbsp;</div>
              <div className="column_item_value">
                {chosenItem?.visitorsCount}
              </div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Аватарка: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.image}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">vkontakte : &nbsp;</div>
              <div className="column_item_value">{chosenItem?.vkontakte}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">OK: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.facebook}</div>
            </div>
            <div className="column_item">
              <div className="column_item_title">Язык: &nbsp;</div>
              <div className="column_item_value">{chosenItem?.language}</div>
            </div>
          </div>
        </div>
        <div style={{ margin: "20px" }} className="column_item_value">
          Документы
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {documents.length > 0 &&
            documents.map((elem) => (
              <div
                key={elem}
                style={{ width: "170px", cursor: "pointer" }}
                onClick={() => {
                  setDocument(elem);
                  setIsOpenDoc(true);
                }}
              >
                <img src={`${BASEAPPURL}assets/Img/${elem}`} alt="" />
              </div>
            ))}
        </div>
        <div
          className="deal_item_buttonGroup"
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            className="manager__button_close"
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
          <button
            className="manager__button_ok"
            onClick={cancelOrCompleteVerificationHandler}
            disabled={isLoading}
          >
            <div className="loader_for_button">
              <Loader loading={isLoading} />
            </div>
            {chosenItem?.verificationDate
              ? "Отменить верификацию"
              : "Верифицировать"}
          </button>
        </div>
      </ModalMain>
    </>
  );
};
export default UserItem;
