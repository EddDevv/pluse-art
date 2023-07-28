import React, { useEffect, useState } from "react";
import styles from "./Market.module.scss";
import instance from "../../../api/instance";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store";
import { LocalSpinner } from "../../../UIcomponents/localSpinner/LocalSpinner";
import { LocalSpinnerAbsolute } from "../../../UIcomponents/localSpinner/LocalSpinnerAbsolute";
import StockItem from "./StockItem";
import { IStock, PeriodEnum } from "../../../assets/types/StockTypes";
import { useMediaQuery } from "@chakra-ui/react";

const itemsPerPage = 10;

const Market = () => {
  const { t } = useTranslation();
  const [isLagerThan1260] = useMediaQuery("(min-width: 1260px)");

  const { token } = useAppSelector((state) => state.auth);
  const [isLagerThan480] = useMediaQuery("(min-width: 480px)");
  const [filter, setFilter] = useState("");
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [page, setPage] = useState(1);
  const [period, setPeriod] = useState(PeriodEnum.month);

  // const [totalCount, setTotalCount] = useState(0);

  // **********ФУНКЦИЯ ПОЛУЧЕНИЯ АКЦИЙ***************
  const getStocks = async () => {
    try {
      const response = await instance.get("/api/Stock/list");
      if (response.data) {
        const tempArr = response.data.filter((item: any, index: number) => {
          return item.sellPrice > 0;
        });

        setStocks(tempArr);
      }
    } catch (error) {
      console.error("stocks>>>", error);
    }
  };

  const getStocksWithFilter = async () => {
    if (!filter) return;
    try {
      const response = await instance.get(`/api/Stock/${filter}`);
      if (response.data) {
        setStocks([response.data]);
      }
    } catch (error) {
      console.error("stocks>>>", error);
    }
  };

  // **********ВЫЗОВ ФУНКЦИЯ ПОЛУЧЕНИЯ АКЦИЙ***************
  useEffect(() => {
    if (!token) {
      return;
    }

    getStocks();
  }, [token]);

  useEffect(() => {
    if (!token || !filter) return;
    getStocksWithFilter();
  }, [filter]);

  return (
    <div className="page_container">
      <div className={`${styles.paper}`}>
        <div className={styles.title_flex}>
          <div className="page_title">{t("MarketPage.market")}</div>
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
                      className={styles.table_item_10_logo}
                      style={{ alignItems: "start" }}
                    >
                      {t("MarketPage.name")}
                    </div>
                    <div className={styles.table_item_30_name}></div>
                    <div className={styles.table_item_15}>
                      {t("MarketPage.price")}
                    </div>
                    <div className={styles.table_item_15}>
                      <select
                        value={period}
                        onChange={(e) =>
                          setPeriod(e.target.value as PeriodEnum)
                        }
                        style={{ border: "none" }}
                      >
                        {Object.keys(PeriodEnum).map((elem) => (
                          <option key={elem} value={elem}>
                            {t(`New.per_${elem}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.table_item_15}>
                      {t("MarketPage.chart")}
                    </div>

                    {/* <div className="table_item_12_5">
                      {t("MarketPage.count")}
                    </div>
                    <div className="table_item_12_5">
                      {t("MarketPage.sum")}
                    </div> */}
                    {!isLagerThan1260 && (
                      <div className={styles.table_price_delta}>
                        {t("New.price_delta")}
                      </div>
                    )}
                    <div className={styles.table_but}>
                      {t("MarketPage.byu")}
                    </div>
                  </div>
                )}
                {stocks?.map((stock: IStock, index: number) => (
                  <StockItem key={stock.code} stock={stock} period={period} />
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

export default Market;
