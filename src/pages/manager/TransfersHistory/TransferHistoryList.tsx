import React, { FC, useEffect, useState } from "react";
import instance, { BASEAPPURL } from "../../../api/instance";

import { SortEnum, TransferType } from "./TransferHistory.types";

import Moment from "react-moment";
import "../../../utils/pagination/pagination.scss";
import { AiFillCloseCircle } from "react-icons/ai";

import PaginationManager from "../PaginationManager";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AccountEnum } from "../Withdrawals/Withdrawal.types";
import {
  Input,
  MenuItem,
  Select,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { usePaginationNew } from "../../../utils/paginationNew/usePaginationNew";
import { InfoIcon } from "@chakra-ui/icons";
import { getNumWithoutZeroToFixedN } from "../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";

const itemPerPage = 25;

const TransferHistoryList: FC = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [item, setItem] = useState<TransferType>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chosenItem, setChosenItem] = useState<TransferType | null>(null);
  const [isLargerThan850] = useMediaQuery("(min-width: 850px)");
  const [itemsList, setItemsList] = useState<TransferType[]>([]);
  const [itemsTotalCount, setItemsTotalCount] = useState<number>(0);

  const [loginForSearch, setLoginForSearch] = useState(id ?? "");

  /* eslint-disable */
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [articleForSearch, setArticleForSearch] = useState<string>("");
  const [statusForSearch, setStatusForSearch] = useState<string>("");
  // const [objectNameForSearch, setObjectNameForSearch] = useState<string>("");
  const [diarectionForSearch, setDiarectionForSearch] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [sort, setSort] = useState<string | number>(1);
  const isLargerThan500 = useMediaQuery("(min-width: 500px)");

  const [isCorrectTransfer, setIsCorrectTransfer] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false); //Переменная для обновления таблицы
  const [articles, setArticles] = useState<string[]>([]);

  // Pagination
  const { nextPage, prevPage, page, gaps, setPage, totalPages } =
    usePaginationNew({
      contentPerPage: itemPerPage,
      count: itemsTotalCount,
    });

  const getAllTransfers = async () => {
    let url = `api/Manage/transfer-list?`;

    if (dateFrom || dateTo) {
      const start = dateFrom
        ? +new Date(dateFrom)
        : +new Date("2020-01-01T00:00:00");
      const end = dateTo ? +new Date(dateTo) : +new Date();
      const Created = `${start}-${end}`;
      if (url.endsWith("?")) {
        url += `CreationDate=${Created}`;
      } else {
        url += `&CreationDate=${Created}`;
      }
    }

    if (loginForSearch && isFinite(+loginForSearch)) {
      if (url.endsWith("?")) {
        url += `partnerId=${loginForSearch}`;
      } else {
        url += `&partnerId=${loginForSearch}`;
      }
    } else if (loginForSearch) {
      if (url.endsWith("?")) {
        url += `filterKey=${loginForSearch}`;
      } else {
        url += `&filterKey=${loginForSearch}`;
      }
    }

    if (articleForSearch) {
      if (url.endsWith("?")) {
        url += `Article=${articleForSearch}`;
      } else {
        url += `&Article=${articleForSearch}`;
      }
    }

    if (account) {
      if (url.endsWith("?")) {
        url += `AccountName=${account}`;
      } else {
        url += `&AccountName=${account}`;
      }
    }

    // if (objectNameForSearch) {
    //   if (url.endsWith("?")) {
    //     url += `ObjectName=${objectNameForSearch}`;
    //   } else {
    //     url += `&ObjectName=${objectNameForSearch}`;
    //   }
    // }

    if (diarectionForSearch) {
      if (url.endsWith("?")) {
        url += `TransferDirection=${diarectionForSearch}`;
      } else {
        url += `&TransferDirection=${diarectionForSearch}`;
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
      }
    } catch (e) {
      console.error("Ошибка получения трансферов", e);
    }
  };

  useEffect(() => {
    if (id) {
      setLoginForSearch(id);
    }
  }, [id]);

  useEffect(() => {
    getAllTransfers();
  }, [
    page,
    loginForSearch,
    articleForSearch,
    refresh,
    // objectNameForSearch,
    dateFrom,
    dateTo,
    diarectionForSearch,
    account,
  ]);

  const getArticles = async () => {
    try {
      const res = await instance.get(
        `${BASEAPPURL}api/Finance/payment-articles`
      );
      if (res.status === 200) {
        setArticles(res?.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const handleClose = async () => {
    setChosenItem(null);
    // setOpenGA(false);
    // setOpenVER(false);
  };

  const SplitLogin = ({ objectName }: { objectName: string }) => {
    if (!objectName) return <p></p>;
    if (objectName.includes("Реферальное вознаграждение")) {
      const arr = objectName.split("(");
      // console.log(arr);
      let login = "";
      if (arr?.[1]) {
        login = arr[1].slice(0, arr[1].length - 1);
      }
      return (
        <>
          {arr[0]} (
          <text
            style={{ color: "blue", cursor: "pointer" }}
            // onClick={() => {
            //   setLoginForSearch(login);
            //   setPage(1);
            // }}
            onClick={() => copyAndNavigate(login)}
          >
            {login}
          </text>
          )
        </>
      );
    } else {
      return <>{objectName}</>;
    }
  };

  const copyAndNavigate = async (login: string) => {
    await window.navigator.clipboard.writeText(login);
    toast.success(`Логин ${login} успешно скопирован!`);
    navigate(`/admin/transfer-history/${login}`);
  };

  return (
    <>
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
                  placeholder="Поиск по логину/id"
                  // style={{
                  //   marginTop: "10px",
                  //   marginLeft: "10px",
                  //   position: "relative",
                  // }}
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
                    onClick={() => {
                      setLoginForSearch("");
                      setPage(1);
                    }}
                  />
                )}
              </div>

              <Select
                onChange={(e) => {
                  setAccount(e.target.value);
                  setPage(1);
                }}
                value={account}
                placeholder="Счет"
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <MenuItem value={""}>Все</MenuItem>
                {Object.entries(AccountEnum).map((elem) => (
                  <MenuItem value={elem[0]} key={elem[0]}>
                    {elem[1]}
                  </MenuItem>
                ))}
              </Select>

              <Select
                onChange={(e) => {
                  setArticleForSearch(e.target.value);
                  setPage(1);
                }}
                value={articleForSearch}
                placeholder="Статья"
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <MenuItem value={""}>Все</MenuItem>
                {articles?.length > 0 &&
                  articles.map((elem) => (
                    <MenuItem value={elem} key={elem}>
                      {elem}
                    </MenuItem>
                  ))}
              </Select>

              {/* <div
                style={{
                  position: "relative",
                }}
              >
                <BlueField
                  label="Назначение"
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    position: "relative",
                  }}
                  value={objectNameForSearch}
                  onChange={(e) => {
                    setObjectNameForSearch(e.target.value);
                    setPage(1);
                  }}
                />
                {objectNameForSearch && (
                  <AiFillCloseCircle
                    style={{
                      position: "absolute",
                      top: "30px",
                      right: "10px",
                      color: "#3786e5",
                    }}
                    size={15}
                    onClick={() => {
                      setObjectNameForSearch("");
                      setPage(1);
                    }}
                  />
                )}
              </div> */}

              <div
                style={{
                  position: "relative",
                }}
              >
                <Input
                  placeholder="Дата от"
                  type="date"
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    position: "relative",
                    // transform: "translate3d(0,0,0)",
                    // minHeight: "53px",
                    // minWidth: "250px"
                  }}
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value);
                    setPage(1);
                  }}
                  // onfocus={()=>(this.type='date')}
                  // onblur="if(!this.value)this.type='text'"
                ></Input>
                {dateFrom && (
                  <AiFillCloseCircle
                    style={{
                      position: "absolute",
                      top: "30px",
                      right: "10px",
                      color: "#3786e5",
                    }}
                    size={15}
                    onClick={() => {
                      setDateFrom("");
                      setPage(1);
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  position: "relative",
                }}
              >
                <Input
                  placeholder="Дата до"
                  type="date"
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    position: "relative",
                    transform: "translate3d(0,0,0)",
                  }}
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value);
                    setPage(1);
                  }}
                ></Input>
                {dateTo && (
                  <AiFillCloseCircle
                    style={{
                      position: "absolute",
                      top: "30px",
                      right: "10px",
                      color: "#3786e5",
                    }}
                    size={15}
                    onClick={() => {
                      setDateTo("");
                      setPage(1);
                    }}
                  />
                )}
              </div>

              <Select
                onChange={(e) => {
                  setDiarectionForSearch(e.target.value);
                  setPage(1);
                }}
                value={diarectionForSearch}
                placeholder="Направление"
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <MenuItem value={""}>Все</MenuItem>
                <MenuItem value={"0"}>Приход</MenuItem>
                <MenuItem value={"1"}>Расход</MenuItem>
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
          <div className="manager_head">История операций</div>
          <div className="manager__total">
            {`Найдено операций: `}
            {` ${itemsTotalCount} `}
          </div>
        </div>

        {/* **********************************************************************************TABLE HEAD */}
        <div className="manager__table_part">
          <div className="admin__table">
            {isLargerThan850 && (
              <div className="admin__table--item">
                {/* <div className="table__item--column2-5">Меню</div> */}
                <div className="table__item--column10">Дата операции</div>
                <div className="table__item--column5">Логин</div>
                <div className="table__item--column5">ID</div>
                <div className="table__item--column20">Статья</div>
                <div className="table__item--column30">Назначение</div>
                <div className="table__item--column10">Сумма</div>
                <div className="table__item--column10">Счет</div>
                <div className="table__item--column10">Баланс</div>
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
                    className="admin__table--item"
                    style={{
                      padding: "4px",
                      backgroundColor:
                        elem.processingStatus === "На проверке"
                          ? "#FAFF004A"
                          : elem.creditSum
                          ? "#FF000033"
                          : "#00FF3833",
                    }}
                  >
                    <div className="table__item--column10">
                      {!isLargerThan850 && "Дата Операции: "}
                      <Moment format="DD-MM-YY, hh:mm:ss">
                        {elem?.paymentDate}
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
                        // onClick={() => {
                        //   setLoginForSearch(elem.partnerLogin);
                        //   setPage(1);
                        // }}
                        onClick={() => copyAndNavigate(elem.partnerLogin)}
                        // onClick={() => {
                        //   window.navigator.clipboard.writeText(
                        //     elem?.partnerId ? elem?.partnerId : "-"
                        //   );
                        //   toast.success("Id пользователя успешно скопирован.");
                        // }}
                      >
                        {!isLargerThan850 && "Логин: "}
                        {elem.partnerLogin}
                      </div>
                    </div>

                    <div className="table__item--column5">
                      {" "}
                      {!isLargerThan850 && "ID: "}
                      {elem.id}
                    </div>

                    <div className="table__item--column20">
                      {!isLargerThan850 && "Статья: "}
                      {elem.paymentArticle}
                    </div>

                    <div className="table__item--column30">
                      <div
                        onClick={() => {
                          if (sort === SortEnum.LoginAsc) {
                            setSort(SortEnum.LoginDesc);
                          } else {
                            setSort(SortEnum.LoginAsc);
                          }
                        }}
                      >
                        {!isLargerThan850 && "Назначение: "}
                        <SplitLogin objectName={elem?.objectName} />
                        {elem?.comment && (
                          <Tooltip title={elem.comment} placement="top">
                            <InfoIcon color="primary" />
                          </Tooltip>
                        )}
                      </div>
                    </div>

                    <div
                      className="table__item--column10"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {!isLargerThan850 && "Сумма: "}
                      {elem?.debetSum ? (
                        <Tooltip title={elem.debetSum.toString()}>
                          <div>
                            {getNumWithoutZeroToFixedN(+elem.debetSum, 3)}$
                          </div>
                        </Tooltip>
                      ) : elem?.creditSum ? (
                        <Tooltip title={`-${elem.creditSum}`}>
                          <div>
                            {getNumWithoutZeroToFixedN(-elem?.creditSum, 3)}$
                          </div>
                        </Tooltip>
                      ) : (
                        ""
                      )}
                    </div>

                    <div
                      className="table__item--column10"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {!isLargerThan850 && "Счет: "}
                      {elem?.accountName}
                    </div>

                    <div
                      className="table__item--column10"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {/* {!isLargerThan850 && elem.email && "Телефон: "} */}
                      {!isLargerThan850 && "Баланс: "}
                      {elem?.accountBalance && (
                        <Tooltip title={elem.accountBalance.toString()}>
                          <div>
                            {getNumWithoutZeroToFixedN(+elem.accountBalance, 3)}
                            $
                          </div>
                        </Tooltip>
                      )}
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

export default TransferHistoryList;
