import React, { useEffect, useState } from "react";
import styles from "./Operations.module.scss";
import instance, { instanceWithoutAuth } from "../../../api/instance";
import { usePagination } from "../../../utils/pagination/usePagination";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store";
import IconSettings from "../../../assets/images/IconSettings.svg";
import Moment from "react-moment";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { LocalSpinner } from "../../../UIcomponents/localSpinner/LocalSpinner";
import { getNumWithoutZeroToFixedN } from "../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";
import { LocalSpinnerAbsolute } from "../../../UIcomponents/localSpinner/LocalSpinnerAbsolute";

export type FinanceItemType = {
  accountBalance: number;
  accountName: string;
  comissionSum: number;
  comment: string;
  creditSum: number;
  currencyCode: string | null;
  debetSum: number;
  id: number;
  objectName: string;
  partnerId: number;
  paymentDate: string;
  processingStatus: string;
  transferType: string;
};
export type FinanceListType = {
  items: FinanceItemType[];
  totalCount: number;
  currentPage: number;
};

export const frases = {
  interest_payment: "Выплата процентов",
  from: " от ",
  buy_invest: "Покупка инвестиционного портфеля",
  refill: "Пополнение счета",
  ref_rewards: "Партнерское вознаграждение",
  comunity_rewards: "Вознаграждение с комьюнити",
  transfer: "Перевод между счетами",
  withdrawal: "Вывод средств",
  portfolio_return: "Возврат суммы портфеля",
  binar_rewards: "Бинарное вознаграждение",
  percents: "Проценты по договору",
  acc_correction: "Корректировка счета",
  automatisation: "Оплата автоматизации",
  insurance: "Покупка страхования",
  place: "Оплата места в ленте",
  contest: "Оплата за участие в конкурсе",
  trade: "Торговля акциями",
  option_auto: "Оплата опции автоматизации",
  to: " до ",
  option_insure: "Оплата опции страхования",
  buy_stocks: "Покупка акций",
  rate: "курс",
  stock_simple: "акция простая",
  count: "количество",
  price: "цена",
  return_for_canceled: "Возврат средств по отменённой заявке",
  month: "/мес",
};

export enum AccountEnum {
  Inner = "Inner",
  Business = "Business",
}

const itemsPerPage = 10;

const Operations = () => {
  const { t } = useTranslation();
  const { language } = useAppSelector((state) => state.allInfoUser.value);
  const { businessBalance } = useAppSelector((state) => state.allInfoUser);
  const { auth, userData } = useAppSelector((state) => state);

  const [directionForFilter, setDirectionForFilter] = useState("");
  const [articleForFilter, setArticleForFilter] = useState("");
  const [account, setAccount] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [articles, setArticles] = useState<string[]>([]);
  // const [totalItems, setTotalItems] = useState();
  const [historyItems, setHistoryItems] = useState<FinanceItemType[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const totalItems: resFinanceApiType = useFetchWithTokenGet(url, {
  //   items: [],
  // });

  const getHistory = async () => {
    const start = dateFrom ? +new Date(dateFrom) : "1577866914"; // 01/01/2020
    const end = dateTo ? +new Date(dateTo) + 24 * 60 * 60 * 1000 : +new Date(); // сейчас
    const Created = `${start}-${end}`;
    let newUrl = `api/Finance/list?&CreationDate=${Created}&pageNumber=${page}&pageSize=${itemsPerPage}`;
    if (account) {
      newUrl = newUrl + `&AccountName=${account}`;
    }
    if (articleForFilter) {
      newUrl = newUrl + `&Article=${articleForFilter}`;
    }
    if (directionForFilter) {
      newUrl = newUrl + `&TransferDirection=${directionForFilter}`;
    }

    setIsLoading(true);
    try {
      const response = await instance.get(newUrl);
      if (response.status === 200 && response?.data) {
        const items = response.data.items;
        items.forEach((element: FinanceItemType) => {
          Object.entries(frases).forEach((frase) => {
            if (element.objectName.includes(frase[1])) {
              element.objectName = element.objectName.replace(
                frase[1],
                t(`History.${frase[0]}`)
              );
            }
          });
        });
        if (page === 1) {
          setHistoryItems(items);
        } else {
          setHistoryItems([...historyItems, ...items]);
        }

        setTotalCount(response?.data.totalCount);
      }
    } catch (error: any) {
      if (error?.response) {
        console.error("error.response:", error.response);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      await getArticles();
    }
  };

  const getArticles = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get(`api/Finance/payment-articles`);
      if (res.status === 200) {
        const tempArr = [...res.data];
        const filterArr = tempArr.filter(
          (elem) =>
            elem !== "Бинарное вознаграждение" &&
            elem !== "Перевод между счетами"
        );
        setArticles(filterArr);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  // Pagination
  // const { nextPage, prevPage, page, gaps, setPage, totalPages } = usePagination(
  //   {
  //     contentPerPage: itemsPerPage,
  //     count: totalCount,
  //   }
  // );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (auth.token && auth.token?.length > 0) {
      getHistory();
      // getArticles();
    }
  }, [
    auth.token,
    page,
    // directionForFilter,
    // articleForFilter,
    // dateFrom,
    // dateTo,
    // language,
    // account,
  ]);

  // useEffect(() => {
  //   getArticles();
  // }, []);

  const Status = ({ financeItem }: { financeItem: FinanceItemType }) => {
    if (financeItem.processingStatus === "Отменен") {
      return <div style={{ color: "#F00" }}>{t("History.canceled")}</div>;
    } else if (financeItem.processingStatus === "На проверке") {
      return (
        <div style={{ color: "#828282", border: "1px" }}>
          {t("History.pending")}
        </div>
      );
    } else if (financeItem.processingStatus === "Выполнен") {
      return <div style={{ color: "#1EC145" }}>{t("History.completed")}</div>;
    } else return <div></div>;
  };

  return (
    <div className="page_container">
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnOverlayClick={false}
        // scrollBehavior="inside"
        motionPreset="slideInRight"
        isCentered={true}
        // size={width ? "full" : "lg"}
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent
          bg="#FFFFFF"
          borderRadius="5px"
          padding={["20px 15px", "20px 15px", "40px"]}
          boxShadow="0px 4px 50px rgba(178, 200, 215, 0.46)"
        >
          <ModalCloseButton onClick={() => setIsOpen(false)} />

          <div className="modal_title"> {t("User_layout.history")}</div>

          <div className={styles.filter_title}>{t("DopItem2.account")}</div>
          <div className={styles.filter}>
            <select
              onChange={(e) => {
                setPage(1);
                setAccount(e.target.value);
              }}
              value={account}
              className="gray_input_w100"
            >
              <option value={""}> {t("Finance.all")}</option>
              {Object.keys(AccountEnum).map(
                (elem, index) =>
                  (index === 0 ||
                    businessBalance === 1 ||
                    userData.value.balanceBusiness > 0) && (
                    <option key={elem} value={elem}>
                      {t(`DopItem2.${elem}`)}: &nbsp;{" "}
                      {elem === AccountEnum.Inner
                        ? getNumWithoutZeroToFixedN(+userData.value.balance, 2)
                        : getNumWithoutZeroToFixedN(
                            +userData.value.balanceBusiness,
                            2
                          )}
                      $
                    </option>
                  )
              )}
            </select>
          </div>

          <div className={styles.filter_title}>{t("Finance.stat")}</div>
          <div className={styles.filter}>
            <select
              onChange={(e) => {
                setPage(1);
                setArticleForFilter(e.target.value);
              }}
              value={articleForFilter}
              className="gray_input_w100"
            >
              <option value={""}> {t("Finance.all")}</option>
              {articles.length > 0 &&
                articles.map((elem: string, index: number) => (
                  <option key={elem} value={elem}>
                    {elem}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.filter_flex}>
            <div style={{ width: "45%" }}>
              <div className={styles.filter_title}>{t("New.period")}</div>
              <div className={styles.filter}>
                <input
                  type="date"
                  className="gray_input_w100"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.filter_title}>{t("New.to")}</div>
            <div className={styles.filter} style={{ width: "45%" }}>
              <input
                type="date"
                className="gray_input_w100"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <button
              className={styles.filter_apply}
              style={{ marginTop: "20px" }}
              // isLoading={isLoading}
              // spinner={<LocalSpinner size="lg" />}
              onClick={() => {
                setPage(1);
                getHistory();
              }}
              disabled={isLoading}
              // style={{ backgroundColor: "#85c7db" }}
            >
              {t("New.apply")}
            </button>
            {isLoading && <LocalSpinnerAbsolute size="100px" />}
          </div>
        </ModalContent>
      </Modal>

      <div className="page_inner_container">
        <div className={styles.title_flex}>
          <div className="page_title">{t("User_layout.history")}</div>
          <div onClick={() => setIsOpen(true)}>
            <img src={IconSettings} alt="" />
          </div>
        </div>

        <div className={styles.items_container}>
          {historyItems?.length > 0 ? (
            <>
              {historyItems.map((elem) => (
                <div className={styles.operation_item} key={elem.id}>
                  <div className={`table_item_15 ${styles.hesh}`}>
                    {elem.id}
                  </div>
                  <div className={`table_item_15 ${styles.hesh}`}>
                    <div className={styles.in_out}>
                      {elem.debetSum
                        ? t("History.withdrawal")
                        : t("History.refill")}
                    </div>
                    <div>
                      <Moment format="DD.MM.YYYY HH:mm" locale="ru">
                        {elem.paymentDate}
                      </Moment>
                    </div>
                  </div>
                  <div className={`table_item_30 ${styles.desc}`}>
                    {elem.objectName}
                  </div>
                  <div className={`table_item_15 ${styles.sum}`}>
                    <div>
                      {elem.creditSum ? elem?.creditSum : elem?.debetSum}
                      &nbsp;{" "}
                      <b style={{ fontSize: "14px" }}>{elem.currencyCode}</b>
                    </div>
                  </div>
                  <div className={`table_item_15`}>
                    <Status financeItem={elem} />
                  </div>
                </div>
              ))}

              {page * itemsPerPage < totalCount && (
                <div
                  className={styles.load_cont}
                  onClick={() => setPage(page + 1)}
                >
                  <div className="loadmore">{t("New.loadmore")}</div>
                </div>
              )}
            </>
          ) : (
            <div>{t("New.no_found")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Operations;
