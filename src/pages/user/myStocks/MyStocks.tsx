import React, { useEffect, useState } from "react";
import styles from "./MyStocks.module.scss";
import instance from "../../../api/instance";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useMediaQuery } from "@chakra-ui/react";
import {
  ISellStock,
  IStock,
  PeriodEnum,
} from "../../../assets/types/StockTypes";
import MyStockItem from "./MyStockItem";
import { stockRatesAction } from "../../../store/stockRates/actions";

const itemsPerPage = 10;

const MyStocks = () => {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.auth);
  const [isLagerThan760] = useMediaQuery("(min-width: 760px)");
  const [isLagerThan480] = useMediaQuery("(min-width: 480px)");

  const [filter, setFilter] = useState("");
  const [stocks, setStocks] = useState<ISellStock[]>([]);
  const [page, setPage] = useState(1);
  const [period, setPeriod] = useState(PeriodEnum.month);

  const dispatch = useAppDispatch();
  const [refreshStocks, setRefreshStocks] = useState(false);

  // const [totalCount, setTotalCount] = useState(0);

  // **********ФУНКЦИЯ ПОЛУЧЕНИЯ АКЦИЙ ЮЗЕРА***************
  const getStocks = async () => {
    try {
      const response = await instance.post("/api/Stock/stock-contracts");
      if (response.data) {
        setStocks(response.data);
      }
    } catch (error) {
      console.error("stocks-contracts>>>", error);
    }
  };

  // **********ПОЛУЧЕНИЕ ВСЕх АКЦИЙ В РЕДАКС***************
  const getStocksToRedux = async () => {
    try {
      const response = await instance.get("/api/Stock/list");
      if (response?.status >= 200 && response.status < 300) {
        dispatch(stockRatesAction(response.data));
      }
    } catch (error) {
      console.error("stocks>>>", error);
    }
  };

  // **********ОБЩАЯЯ ФУНКЦИЯ ОБЕРТКА***************
  const getAllRates = async () => {
    await getStocks();
    await getStocksToRedux();
  };

  // **********ВЫЗОВ ФУНКЦИЯ ПОЛУЧЕНИЯ АКЦИЙ***************
  useEffect(() => {
    if (!token) {
      return;
    }

    getAllRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, refreshStocks]);

  // const getStocksWithFilter = async () => {
  //   if (!filter) return;
  //   try {
  //     const response = await instance.get(`/api/Stock/${filter}`);
  //     if (response.data) {
  //       setStocks([response.data]);
  //     }
  //   } catch (error) {
  //     console.error("stocks>>>", error);
  //   }
  // };

  // useEffect(() => {
  //   if (!token || !filter) return;
  //   getStocksWithFilter();
  // }, [filter]);

  return (
    <div className="page_container">
      <div className={`${styles.paper}`}>
        <div className={styles.title_flex}>
          <div className="page_title">{t("New.you_stocks")}</div>
        </div>

        <div className={styles.filter_container}>
          <div>{t("New.search")}</div>
          <div className={styles.filter_flex}>
            <input
              className="gray_input"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              // readOnly
              // placeholder="Поиск временно недоступен"
            />

            <select
              className="gray_input"
              placeholder={t("New.choose_currency")}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              {["KKTM", "ORGT", "KADM"].map((elem) => (
                <option key={elem} value={elem}>
                  {elem}
                </option>
              ))}
            </select>
          </div>
          <div>
            {t("New.total")} {stocks.length} {t("New.stocks")}
          </div>

          <div className={styles.items_container}>
            {stocks?.length > 0 ? (
              <>
                {isLagerThan480 && (
                  <div className="table_row ">
                    <div
                      className={styles.table_item_logo}
                      style={{ alignItems: "start" }}
                    ></div>
                    <div className={styles.table_item_name}>
                      {t("MarketPage.name")}
                    </div>
                    <div
                      className={styles.table_item_price}
                      style={{ alignItems: "end" }}
                    >
                      {isLagerThan760
                        ? t("MarketPage.price")
                        : t("New.price_count")}
                    </div>
                    <div
                      className={styles.table_item_15}
                      style={{ alignItems: "end" }}
                    >
                      {t("MarketPage.in_stock")}
                    </div>
                    <div
                      className={styles.table_item_15}
                      style={{ alignItems: "end" }}
                    >
                      {t("New.in_sum")}
                    </div>
                    <div className={styles.table_item_but}></div>
                  </div>
                )}
                {stocks?.map((stock) => (
                  <MyStockItem
                    key={stock.stockCode}
                    stock={stock}
                    period={period}
                    refreshStocks={refreshStocks}
                    setRefreshStocks={setRefreshStocks}
                  />
                ))}

                {/* {page * itemsPerPage < stocks.length && (
                  <div
                    className={styles.load_cont}
                    onClick={() => setPage(page + 1)}
                  >
                    <div className="loadmore">{t("New.loadmore")}</div>
                  </div>
                )} */}
              </>
            ) : (
              <div>{t("New.no_found")}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStocks;
