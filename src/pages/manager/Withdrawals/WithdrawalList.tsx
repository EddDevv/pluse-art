import React, { FC, useEffect, useState } from "react";

import Moment from "react-moment";

import {
  ProcessingStatusEnum,
  StatusEnum,
  WithdrawalType,
} from "./Withdrawal.types";

import "../../../utils/pagination/pagination.scss";

import instance from "../../../api/instance";
import { toast } from "react-toastify";

import WithdrawalItem from "./WithdrawalItem";

import { FcCancel, FcSearch } from "react-icons/fc";
import PaginationManager from "../PaginationManager";
import { useAppSelector } from "../../../store";
import {
  Checkbox,
  IconButton,
  Input,
  MenuItem,
  Select,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { usePaginationNew } from "../../../utils/paginationNew/usePaginationNew";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";
import { ArrowBackIcon, CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";

const itemPerPage = 14;
export const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // bgcolor: "background.paper",
  bgcolor: "#f4f9ff",
  // bgcolor: "radial-gradient(circle, rgba(239,248,249,1) 0%, rgba(148,193,233,1) 100%)",
  color: "#6484AA",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  fontFamily: ["Montserrat", "sans-serif"].join(","),
};

export enum InneraccountToUsdt {
  Usdt = "Inner",
  Inner = "Usdt",
}

const WithdrawalList: FC = () => {
  const { login } = useAppSelector((state) => state.userData.value.userInfo);
  const [itemsList, setItemsList] = useState<WithdrawalType[]>([]);
  const [itemsTotalCount, setItemsTotalCount] = useState<number>(0);
  // eslint-disable-next-line
  const [dateFrom, setDateFrom] = useState("");
  // eslint-disable-next-line
  const [dateTo, setDateTo] = useState("");
  const [statusForSearch, setStatusForSearch] = useState("");
  const [is20days, setIs20days] = useState(false);

  // const [openTransfer, setOpenTransfer] = React.useState(false);
  const [openWithdrawal, setOpenWithdrawal] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);
  /* eslint-disable */
  const [loginForSearch, setLoginForSearch] = useState("");
  const [FullNameForSearch, setFullNameForSearch] = useState("");
  const [inviterLoginForSearch, setInviterLoginForSearch] = useState("");
  const [isExactForSearch, setIsExactForSearch] = useState(false);
  const [isActiveForSearch, setIsActiveForSearch] = useState(false);
  const [programForSearch, setProgramForSearch] = useState("");

  const [refresh, setRefresh] = useState<boolean>(false); //Переменная для обновления таблицы

  const [chosenItem, setChosenItem] = useState<WithdrawalType | null>(null);
  const [reasonIsCancel, setReasonIsCancel] = useState<boolean>(true);
  const [isBlockForSearch, setIsBlockForSearch] = useState(false);
  const [sort, setSort] = useState<string | number>(1);
  const [isNeedUpdate, setIsNeedUpdate] = useState(1);
  const [isAddComment, setIsAddComment] = useState(false);
  //   const [programs, setPrograms] = useState<IdNameType[]>([]);
  //   const [accounts, setAccounts] = useState<IdNameType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLargerThan850] = useMediaQuery("(min-width: 850px)");
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");

  // Pagination
  const { nextPage, prevPage, page, gaps, setPage, totalPages } =
    usePaginationNew({
      contentPerPage: itemPerPage,
      count: itemsTotalCount,
    });

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const {
  //   isOpen: isOpenBlockModal,
  //   onOpen: onOpenBlockModal,
  //   onClose: onCloseBlockModal,
  // } = useDisclosure();
  // const {
  //   isOpen: isOpenTransferModal,
  //   onOpen: onOpenTransferModal,
  //   onClose: onCloseTransferModal,
  // } = useDisclosure();

  // useEffect(() => {
  //   if (isAddComment) {
  //     onOpenBlockModal();
  //   }
  // }, [isAddComment]);

  const getAllWithdrawals = async () => {
    let url = `api/Manage/withdrawal-list?`;
    if (is20days) {
      const today = new Date();
      const days20 = +today - 3 * 24 * 60 * 60 * 1000;
      const start = dateFrom ? +new Date(dateFrom) : +new Date("2020.01.01");
      const end = dateTo ? +new Date(dateTo) : days20;
      const Created = `${start}-${end}`;
      url += `CreationDate=${Created}&processingStatus=${ProcessingStatusEnum.wait}`;
    }
    if (dateFrom || dateTo) {
      const start = dateFrom ? +new Date(dateFrom) : "";
      const end = dateTo ? +new Date(dateTo) : +new Date();
      const Created = `${start}-${end}`;
      if (url.endsWith("?")) {
        url += `CreationDate=${Created}`;
      } else {
        url += `&CreationDate=${Created}`;
      }
    }
    if (statusForSearch) {
      if (url.endsWith("?")) {
        url += `processingStatus=${statusForSearch}`;
      } else {
        url += `&processingStatus=${statusForSearch}`;
      }
    }

    if (loginForSearch) {
      if (url.endsWith("?")) {
        url += `login=${loginForSearch}`;
      } else {
        url += `&login=${loginForSearch}`;
      }
    }
    if (FullNameForSearch) {
      if (url.endsWith("?")) {
        url += `FullName=${FullNameForSearch}`;
      } else {
        url += `&FullName=${FullNameForSearch}`;
      }
    }
    if (inviterLoginForSearch) {
      if (url.endsWith("?")) {
        url += `ParentUserName=${inviterLoginForSearch}`;
      } else {
        url += `&ParentUserName=${inviterLoginForSearch}`;
      }
    }
    if (isActiveForSearch) {
      if (url.endsWith("?")) {
        url += `Status=${StatusEnum.Active}`;
      } else {
        url += `&Status=${StatusEnum.Active}`;
      }
    }
    if (isBlockForSearch) {
      if (url.endsWith("?")) {
        url += `Status=${StatusEnum.Blocked}`;
      } else {
        url += `&Status=${StatusEnum.Blocked}`;
      }
    }

    if (page > 0) {
      if (url.endsWith("?")) {
        url += `pageNumber=${page}&pageSize=${itemPerPage}`;
      } else {
        url += `&pageNumber=${page}&pageSize=${itemPerPage}`;
      }
    }

    try {
      const response = await instance.get(url);
      // console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        setItemsList(response?.data?.items);
        setItemsTotalCount(response?.data?.totalCount);
      }
    } catch (e) {
      console.error("Ошибка получения заявок", e);
    } finally {
      //   setIsEditOpen(false);
    }
  };

  useEffect(() => {
    getAllWithdrawals();
  }, [
    page,
    statusForSearch,
    is20days,

    loginForSearch,
    inviterLoginForSearch,
    isExactForSearch,
    isActiveForSearch,
    programForSearch,
    dateFrom,
    dateTo,
    isBlockForSearch,
    sort,
    isNeedUpdate,
    refresh,
  ]);

  // Функция отмены заявки отмены средств
  const cancelOrCompleteWithdrawHandler = async () => {
    setIsLoading(true);
    if (reasonIsCancel === true) {
      try {
        const response = await instance.post(
          `api/Manage/cancel-withdrawal?withdrawalOrderId=${chosenItem?.id}`
        );
        toast.success("Заявка успешно отменена");
        setRefresh(!refresh);
        handleClose();
        // console.log(response.data);
      } catch (e) {
        console.error("Ошибка отмены заявки", e);
        toast.error("Ошибка отмены заявки!");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await instance.post(
          `api/Manage/complete-withdrawal?withdrawalOrderId=${chosenItem?.id}`
        );
        toast.success("Заявка успешно проведена");
        setRefresh(!refresh);
        handleClose();
        // console.log(response.data);
      } catch (e) {
        console.error("Ошибка проведения заявки", e);
        toast.error("Ошибка проведения заявки!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getColor = (withdrawal: WithdrawalType) => {
    if (withdrawal?.processingStatus === ProcessingStatusEnum.done) {
      return "#00FF3833";
    } else if (withdrawal?.processingStatus === ProcessingStatusEnum.wait) {
      return "#FAFF004A";
    } else if (withdrawal?.processingStatus === ProcessingStatusEnum.cancel) {
      return "#FF000033";
    }
  };

  const getTdBlur = (id: string) => {
    if (!chosenItem) {
      return "";
    } else if (id === chosenItem.id) {
      return "";
    } else return "2px";
  };

  const handleClose = async () => {
    setChosenItem(null);
    setOpenCancel(false);
  };

  const copyAndNavigate = async (login: string) => {
    await window.navigator.clipboard.writeText(login);
    toast.success(`Логин ${login} успешно скопирован!`);
    const arr = window.location.href.split("/admin/");
    const fullPath = arr[0];
    const fullLink = `${fullPath}/admin/transfer-history/${login}`;
    window.open(fullLink);
    // navigate(`/admin/transfer-history/${login}`,);
  };

  return (
    <>
      <WithdrawalItem
        open={openWithdrawal}
        handleClose={() => setOpenWithdrawal(false)}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      {/* <TransferItem
        open={openTransfer}
        handleClose={() => setOpenTransfer(false)}
      /> */}

      <ModalMain
        isOpen={openCancel}
        title={`Подтвердите  ${
          reasonIsCancel === true ? "отмену" : "одобрение"
        } заявки на вывод №${chosenItem?.id}.`}
        handleClose={handleClose}
        handleSubmit={cancelOrCompleteWithdrawHandler}
        // isLoading={isLoading}
      />

      <div style={{ width: "100%" }}>
        <div className="manager__main">
          <div className="wrap">
            <div className="wrap" style={{ alignItems: "flex-end" }}>
              <Select
                onChange={(e) => {
                  setIs20days(false);
                  setStatusForSearch(e.target.value);
                  setPage(1);
                }}
                value={statusForSearch}
                placeholder="Статус"

                // style={{
                //   marginTop: "10px",
                //   marginLeft: "10px",
                // }}
              >
                <option value={" "}>Все</option>
                {Object.keys(ProcessingStatusEnum).map(
                  (elem: string, index: number) => (
                    <option
                      key={index}
                      value={Object(ProcessingStatusEnum)[elem]}
                    >
                      {Object(ProcessingStatusEnum)[elem]}
                    </option>
                  )
                )}
              </Select>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "#3786e5",
                  alignItems: "start",
                  marginLeft: "20px",
                }}
              >
                <div>Больше 3 дней</div>
                <Checkbox
                  checked={is20days}
                  // value={is20days}
                  onChange={(e) => {
                    setStatusForSearch("");
                    setIs20days(e.target.checked);
                  }}
                ></Checkbox>
              </div>
            </div>
          </div>
        </div>

        <div
          className="wrap"
          style={{
            margin: "20px",
            justifyContent: isLargerThan850 ? "space-between" : "start",
          }}
        >
          <div>
            <div className="manager_head">Заявки на вывод</div>
          </div>
          <div className="manager__total">
            {`Найдено заявок: `}
            {` ${itemsTotalCount} `}
          </div>
        </div>

        <div className="manager__table_part">
          <div className="admin__table">
            {isLargerThan850 && (
              <div className="admin__table--item">
                <div className="table__item--column7-5">ID</div>
                <div className="table__item--column10">Логин</div>
                <div className="table__item--column10">Кошелек/ реквизиты</div>
                {login === "manager" && (
                  <div className="table__item--column5"></div>
                )}
                <div className="table__item--column12-5">Назначение</div>
                <div className="table__item--column15">Дата</div>
                <div className="table__item--column10">Тип</div>
                <div className="table__item--column10">Статус</div>
                <div className="table__item--column10">Сумма</div>
                <div className="table__item--column10">Комиссия</div>
                <div className="table__item--column10">К выводу</div>
                <div className="table__item--column10">Счет</div>
                <div className="table__item--column15">Комментарий</div>
                {login === "manager" && (
                  <div className="table__item--column10">Действие</div>
                )}
              </div>
            )}

            {itemsList?.length > 0 &&
              itemsList.map((elem, index) => (
                <div
                  key={elem.id}
                  style={{
                    width: "100%",
                    background: getColor(elem),
                    color: "black",
                    borderBottom: "1px solid #dfdfdf",
                    position: "relative",
                  }}
                >
                  <div key={elem.id} className="admin__table--item">
                    <div
                      className="table__item--column7-5"
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      <div
                        onClick={() => {
                          window.navigator.clipboard.writeText(
                            elem?.id ? elem?.id.toString() : "-"
                          );
                          toast.success("Id пользователя успешно скопирован.");
                        }}
                      >
                        {elem?.id ? elem.id : ""}
                      </div>
                    </div>

                    <div
                      className="table__item--column10"
                      style={{
                        overflow: "hidden",
                        cursor: "pointer",
                        color: "blue",
                      }}
                      onClick={() => copyAndNavigate(elem.partnerLogin)}
                    >
                      {!isLargerThan850 && "Логин: "}
                      {elem?.partnerLogin}
                    </div>

                    <div
                      className="table__item--column10"
                      style={{
                        overflow: "hidden",
                        cursor: "pointer",
                        color: "blue",
                      }}
                    >
                      {!isLargerThan850 && "Кошелек/реквизиты: "}
                      {
                        <Tooltip title={elem?.cryptoRequisites?.cryptoWallet}>
                          <div
                            onClick={() => {
                              window.navigator.clipboard.writeText(
                                elem?.cryptoRequisites?.cryptoWallet
                                  ? elem?.cryptoRequisites?.cryptoWallet.toString()
                                  : "-"
                              );
                              toast.success(
                                "Кошелек/реквизиты успешно скопирован/ны."
                              );
                            }}
                          >
                            {elem?.cryptoRequisites?.cryptoWallet
                              ? isLargerThan850
                                ? `${elem?.cryptoRequisites?.cryptoWallet.slice(
                                    0,
                                    2
                                  )}..${elem?.cryptoRequisites?.cryptoWallet.slice(
                                    elem?.cryptoRequisites?.cryptoWallet
                                      .length - 3,
                                    elem?.cryptoRequisites?.cryptoWallet
                                      .length - 1
                                  )}`
                                : elem?.cryptoRequisites?.cryptoWallet
                              : elem?.cryptoRequisites.objectName}
                          </div>
                        </Tooltip>
                      }
                    </div>
                    {login === "manager" && (
                      <div className="table__item--column5">
                        <Tooltip title="Обозревать">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://tronscan.org/#/address/${elem?.cryptoRequisites?.cryptoWallet}`}
                            style={{
                              fontSize: "14px",
                              fontFamily: "dm-sans, sans-serif",
                            }}
                          >
                            <FcSearch size={20} />
                          </a>
                        </Tooltip>
                      </div>
                    )}

                    <div className="table__item--column12-5">
                      {!isLargerThan850 && "Назначение: "}
                      {elem.objectName}
                    </div>

                    <div className="table__item--column15">
                      {!isLargerThan850 && "Дата: "}
                      <Moment format="DD-MM-YY, hh:mm:ss">
                        {elem?.paymentDate}
                      </Moment>
                    </div>

                    <div className="table__item--column10">
                      {!isLargerThan850 && "Тип: "}
                      {elem.transferType ? elem.transferType : "-"}
                    </div>

                    <div className="table__item--column10">
                      {!isLargerThan850 && "Статус: "}
                      {elem?.processingStatus}
                    </div>

                    <div className="table__item--column10">
                      {!isLargerThan850 && "Сумма: "}
                      {elem?.debetSum ? elem?.debetSum : elem?.creditSum}
                    </div>

                    <div className="table__item--column10">
                      {!isLargerThan850 && "Комиссия: "}
                      {elem?.comissionSum}
                    </div>

                    <div className="table__item--column10">
                      {!isLargerThan850 && "К выводу: "}
                      {elem?.debetSum
                        ? +elem?.debetSum - +elem?.comissionSum
                        : +elem?.creditSum - +elem?.comissionSum}
                    </div>

                    <div className="table__item--column10">
                      {!isLargerThan850 && "Счет: "}
                      {elem?.accountName === InneraccountToUsdt.Usdt
                        ? InneraccountToUsdt.Inner
                        : elem?.accountName}
                    </div>

                    <div className="table__item--column15">
                      {!isLargerThan850 && elem?.comment && "Комментарий: "}
                      {elem?.comment}
                    </div>

                    {login === "manager" && (
                      <div className="table__item--column10">
                        {!isLargerThan850 &&
                          elem.processingStatus === ProcessingStatusEnum.wait &&
                          "Действия: "}
                        {elem.processingStatus ===
                          ProcessingStatusEnum.wait && (
                          <div
                            style={{
                              display: "flex",
                              position: isLargerThan850
                                ? "relative"
                                : "absolute",
                              top: isLargerThan850 ? "0px" : "5px",
                              right: "5px",
                              justifyContent: "center",
                            }}
                          >
                            <Tooltip
                              title="Отменить"
                              style={{ background: "#ED64A6" }}
                            >
                              <IconButton
                                onClick={() => {
                                  setReasonIsCancel(true);
                                  setChosenItem(elem);
                                  setOpenCancel(true);
                                }}
                                aria-label="Search database"
                                icon={<NotAllowedIcon color={"teal"} />}
                              />
                            </Tooltip>
                            <Tooltip
                              title="Провести"
                              style={{
                                background: "#319795",
                                marginLeft: "2px",
                              }}
                            >
                              <IconButton
                                onClick={() => {
                                  setReasonIsCancel(false);
                                  setChosenItem(elem);
                                  setOpenCancel(true);
                                }}
                                aria-label="Search database"
                                icon={<CheckIcon color={"teal"} />}
                              />
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

            {/* .......................ПАГИНАЦИЯ........................................ */}
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

export default WithdrawalList;
