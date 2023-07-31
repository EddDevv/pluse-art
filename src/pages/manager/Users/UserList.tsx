import React, { FC, useEffect, useState } from "react";
import instance from "../../../api/instance";

import { GoogleAuthEnum, UserType } from "./UserList.types";
import Moment from "react-moment";
import "../../../utils/pagination/pagination.scss";
import { toast } from "react-toastify";
import { AiFillCloseCircle } from "react-icons/ai";
import UserMenu from "./UserMenu";
import TransferItem from "../Withdrawals/TransferItem";
import WithdrawalItem from "../Withdrawals/WithdrawalItem";
import PaginationManager from "../PaginationManager";
import UserItem from "./UserItem";
import { useParams } from "react-router-dom";
import { Input, MenuItem, Select, useMediaQuery } from "@chakra-ui/react";
import { usePaginationNew } from "../../../utils/paginationNew/usePaginationNew";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";

const itemPerPage = 25;

const UserList: FC = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [item, setItem] = useState<UserType>();
  const [chosenItem, setChosenItem] = useState<UserType | null>(null);
  const [isLargerThan850] = useMediaQuery("(min-width: 850px)");
  const [itemsList, setItemsList] = useState<UserType[]>([]);
  const [itemsTotalCount, setItemsTotalCount] = useState<number>(0);

  const [loginForSearch, setLoginForSearch] = useState("");
  /* eslint-disable */
  const [FullNameForSearch, setFullNameForSearch] = useState("");
  const [inviterLoginForSearch, setInviterLoginForSearch] = useState("");
  const [isExactForSearch, setIsExactForSearch] = useState(false);
  const [isActiveForSearch, setIsActiveForSearch] = useState(false);
  const [programForSearch, setProgramForSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusForSearch, setStatusForSearch] = useState<number | string>("");

  const [isBlockForSearch, setIsBlockForSearch] = useState(false);
  const [sort, setSort] = useState<string | number>(1);
  const [isNeedUpdate, setIsNeedUpdate] = useState(1);
  const [isAddComment, setIsAddComment] = useState(false);
  const isLargerThan500 = useMediaQuery("(min-width: 500px)");
  const isLargerThan980 = useMediaQuery("(min-width: 980px)");

  const [openTransfer, setOpenTransfer] = React.useState(false);
  const [openWithdrawal, setOpenWithdrawal] = React.useState(false);
  const [isCorrectTransfer, setIsCorrectTransfer] = useState(false);
  const [openGA, setOpenGA] = React.useState(false);
  const [openVER, setOpenVER] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [refresh, setRefresh] = useState<boolean>(false); //Переменная для обновления таблицы

  // Pagination
  const { nextPage, prevPage, page, gaps, setPage, totalPages } =
    usePaginationNew({
      contentPerPage: itemPerPage,
      count: itemsTotalCount,
    });

  const getAllUsers = async () => {
    let url = `api/Manage/user-list?`;
    if (dateFrom || dateTo) {
      const start = dateFrom ? +new Date(dateFrom) : "";
      const end = dateTo ? +new Date(dateTo) : +new Date();
      const Created = `${start}-${end}`;
      if (url.endsWith("?")) {
        url += `Created=${Created}`;
      } else {
        url += `&Created=${Created}`;
      }
    }
    if (loginForSearch) {
      if (url.endsWith("?")) {
        url += `login=${loginForSearch}`;
      } else {
        url += `&login=${loginForSearch}`;
      }
    }

    if (statusForSearch === 1) {
      if (url.endsWith("?")) {
        url += `isVerified=true`;
      } else {
        url += `&isVerified=true`;
      }
    }

    if (statusForSearch === 2) {
      if (url.endsWith("?")) {
        url += `isActivated=true`;
      } else {
        url += `&isActivated=true`;
      }
    }

    if (page > 0) {
      if (url.endsWith("?")) {
        url += `PageNumber=${page}&PageSize=${itemPerPage}`;
      } else {
        url += `&PageNumber=${page}&PageSize=${itemPerPage}`;
      }
    }

    try {
      const response = await instance.get(url);
      if (response.status >= 200 && response.status < 300) {
        setItemsList(response?.data?.items);
        setItemsTotalCount(response?.data?.totalCount);
        if (response.data.items.length > 0 && id === loginForSearch) {
          const id = await setTimeout(() => {
            setItemsList(response?.data?.items);
            setItemsTotalCount(response?.data?.totalCount);
            setChosenItem(response.data.items[0]);
            setOpenInfo(true);
          }, 1000);
        }
      }
    } catch (e) {
      console.error("Ошибка получения пользователей", e);
    }
  };

  useEffect(() => {
    if (id) {
      setLoginForSearch(id);
    }
  }, [id]);

  useEffect(() => {
    getAllUsers();
  }, [page, loginForSearch, statusForSearch, refresh]);

  const getTdColor = (user: UserType) => {
    if (user.id === item?.id) {
      return "#00FF3833";
    } else return "";
    return "";
  };
  const getTdBlur = (id: string) => {
    if (!chosenItem) {
      return "";
    } else if (id === chosenItem.id) {
      return "";
    } else return "2px";
  };

  const cancelOrCompleteGAAuthHandler = async () => {
    setIsLoading(true);
    try {
      const res = await instance.post(
        `api/Manage/disable-ga?partnerId=${chosenItem?.id}`
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success(
          `Google аутентификация успешно отменена для ${chosenItem?.login}.`
        );
        setRefresh(!refresh);
        handleClose();
      }
    } catch (e) {
      console.error(e);
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

  const handleClose = async () => {
    setChosenItem(null);
    setOpenGA(false);
    setOpenVER(false);
  };

  return (
    <>
      <TransferItem
        open={openTransfer}
        handleClose={() => setOpenTransfer(false)}
        chosenItem={chosenItem}
        setChosenItem={setChosenItem}
        refresh={refresh}
        setRefresh={setRefresh}
        isCorrectTransfer={isCorrectTransfer}
        setIsCorrectTransfer={setIsCorrectTransfer}
      />
      <WithdrawalItem
        open={openWithdrawal}
        handleClose={() => setOpenWithdrawal(false)}
        refresh={refresh}
        setRefresh={setRefresh}
        chosenItem={chosenItem}
        setChosenItem={setChosenItem}
      />
      <UserItem
        open={openInfo}
        handleClose={() => setOpenInfo(false)}
        chosenItem={chosenItem}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      {/* ************************************************************************* GOOGLE AUTH MODAL */}
      <ModalMain
        isOpen={openGA}
        title={`Подтвердите  ${
          chosenItem?.confirmationType === GoogleAuthEnum.GA
            ? "отмену"
            : "одобрение"
        } Google аутентификации для  ${chosenItem?.login}.`}
        handleClose={handleClose}
        handleSubmit={cancelOrCompleteGAAuthHandler}
        // isLoading={isLoading}
      />

      {/* ************************************************************************* VERIFICATION MODAL */}

      <ModalMain
        isOpen={openVER}
        title={`Подтвердите  ${
          chosenItem?.verificationDate ? "отмену верификации" : "верификацию"
        } для ${chosenItem?.login}.`}
        handleClose={handleClose}
        handleSubmit={cancelOrCompleteVerificationHandler}
        // isLoading={isLoading}
      />

      <div style={{ width: "100%" }}>
        <div className="manager__main">
          <div className="wrap">
            <div className="wrap" style={{ alignItems: "flex-end" }}>
              <div
                style={{
                  position: "relative",
                }}
              >
                <Input
                  placeholder="Поиск по логину"
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    position: "relative",
                  }}
                  value={loginForSearch}
                  onChange={(e) => {
                    setLoginForSearch(e.target.value);
                    setPage(1);
                  }}
                ></Input>
                {loginForSearch && (
                  <AiFillCloseCircle
                    style={{
                      position: "absolute",
                      top: "30px",
                      right: "10px",
                      color: "#3786e5",
                    }}
                    size={15}
                    onClick={() => setLoginForSearch("")}
                  />
                )}
              </div>

              <Select
                onChange={(e) => {
                  setStatusForSearch(e.target.value);
                  setPage(1);
                }}
                value={statusForSearch}
                placeholder="Статус пользователя"
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <MenuItem value={""}>Все</MenuItem>
                <MenuItem value={1}>Верифицированные</MenuItem>
                <MenuItem value={2}>Активированные</MenuItem>
              </Select>
            </div>
          </div>
        </div>

        <div
          className="wrap"
          style={{
            margin: "20px",
            justifyContent: isLargerThan500 ? "space-between" : "start",
          }}
        >
          <div className="manager_head">Партнеры</div>
          <div className="manager__total">
            {`Найдено пользователей: `}
            {` ${itemsTotalCount} `}
          </div>
        </div>

        {/* **********************************************************************************TABLE HEAD */}
        <div className="manager__table_part">
          <div className="admin__table">
            {isLargerThan850 && (
              <div className="admin__table--item">
                <div className="table__item--column2-5">Меню</div>
                <div className="table__item--column7-5">Дата регистрации</div>
                <div className="table__item--column2-5">ID</div>
                <div className="table__item--column5">GA</div>
                <div className="table__item--column7-5">Дата верификации</div>
                <div className="table__item--column7-5">Логин</div>
                <div className="table__item--column10">ФИО</div>
                <div className="table__item--column15">Емэйл</div>
                <div className="table__item--column15">Телефон</div>
                <div className="table__item--column7-5">Родитель</div>
                <div className="table__item--column7-5">Город</div>
                <div className="table__item--column7-5">Баланс</div>
              </div>
            )}

            {/* *************************************************************************TABLE DATA */}

            {itemsList?.length > 0 &&
              itemsList.map((elem, index) => (
                <div
                  key={elem.id}
                  style={{
                    width: "100%",
                    color: "black",
                    borderBottom: "1px solid #dfdfdf",
                    filter: item && elem?.id !== item?.id ? "blur(4px)" : "",
                  }}
                >
                  <div
                    key={elem.id}
                    className={
                      elem?.isActivated
                        ? "admin__table--item--green"
                        : "admin__table--item"
                    }
                    style={{ padding: "4px" }}
                  >
                    <div
                      className={
                        isLargerThan850
                          ? "table__item--column2-5"
                          : "myAbsoluteLeft"
                      }
                    >
                      <UserMenu
                        item={elem}
                        setItem={setItem}
                        setChosenItem={setChosenItem}
                        setOpenTransfer={setOpenTransfer}
                        setOpenGA={setOpenGA}
                        setOpenWithdrawal={setOpenWithdrawal}
                        setIsCorrectTransfer={setIsCorrectTransfer}
                        setOpenVER={setOpenVER}
                        setOpenInfo={setOpenInfo}
                      />
                    </div>

                    <div className="table__item--column7-5">
                      {!isLargerThan850 && "Дата регистрации: "}
                      <Moment format="DD-MM-YY, hh:mm:ss">
                        {elem?.creationDate}
                      </Moment>
                    </div>

                    <div
                      className="table__item--column5"
                      style={{
                        cursor: "pointer",
                        color: "#3786E5",
                        fontWeight: "bold",
                      }}
                    >
                      <div
                        onClick={() => {
                          window.navigator.clipboard.writeText(
                            elem?.id ? elem?.id : "-"
                          );
                          toast.success("Id пользователя успешно скопирован.");
                        }}
                      >
                        {elem?.id ? elem.id : ""}
                      </div>
                    </div>
                    <div className="table__item--column2-5">
                      {!isLargerThan850 && elem?.confirmationType && "GA: "}
                      {elem?.confirmationType ? "+" : " "}
                    </div>

                    <div className="table__item--column7-5">
                      {!isLargerThan850 &&
                        elem?.verificationDate &&
                        "Дата верификации: "}
                      {elem?.verificationDate && (
                        <Moment format="DD-MM-YY">
                          {elem?.verificationDate}
                        </Moment>
                      )}
                    </div>

                    <div
                      className="table__item--column7-5"
                      style={{
                        cursor: "pointer",
                        color: "#3786E5",
                        fontWeight: "bold",
                      }}
                    >
                      <div
                        // onClick={() => {
                        //   if (sort === SortEnum.LoginAsc) {
                        //     setSort(SortEnum.LoginDesc);
                        //   } else {
                        //     setSort(SortEnum.LoginAsc);
                        //   }
                        // }}
                        onClick={() => {
                          window.navigator.clipboard.writeText(
                            elem.login ? elem.login : "-"
                          );
                          toast.success(
                            `Логин ${elem.login} успешно скопирован.`
                          );
                        }}
                      >
                        {!isLargerThan850 && "Логин: "}
                        {elem.login}
                      </div>
                    </div>

                    <div
                      className="table__item--column10"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {!isLargerThan850 &&
                        (elem?.firstName ||
                          elem?.middleName ||
                          elem?.lastName) &&
                        "Имя: "}
                      {elem?.lastName}
                      {elem?.firstName}
                    </div>

                    <div
                      className="table__item--column15"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {!isLargerThan850 && elem.email && "Почта: "}
                      {elem.email}
                    </div>

                    <div
                      className="table__item--column15"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {!isLargerThan850 && elem.email && "Телефон: "}
                      {elem.phoneNumber}
                    </div>

                    <div
                      className="table__item--column7-5"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {!isLargerThan850 && "Родитель: "}
                      {elem.inviterLogin}
                    </div>

                    <div
                      className="table__item--column7-5"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {!isLargerThan850 && "Город: "}
                      {elem.city}
                    </div>

                    <div className="table__item--column7-5">
                      {!isLargerThan850 && "Баланс: "}
                      {elem?.balance?.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}

            {/* ................ПАГИНАЦИЯ......................................... */}
            {itemsTotalCount > itemPerPage && (
              <PaginationManager
                page={page}
                prevPage={prevPage}
                nextPage={nextPage}
                setPage={setPage}
                gaps={gaps}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
