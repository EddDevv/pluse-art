import React, { useEffect, useState } from "react";
import styles from "./Market.module.scss";
import instance, { instanceWithoutAuth } from "../../../api/instance";
import { usePagination } from "../../../utils/pagination/usePagination";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store";
import IconSettings from "../../../assets/images/IconSettings.svg";
import Icon_item from "../../../assets/images/Icon_item.png";
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
  useMediaQuery,
} from "@chakra-ui/react";
import { LocalSpinner } from "../../../UIcomponents/localSpinner/LocalSpinner";
import { getNumWithoutZeroToFixedN } from "../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";
import { LocalSpinnerAbsolute } from "../../../UIcomponents/localSpinner/LocalSpinnerAbsolute";
import StockItem from "./StockItem";

const itemsPerPage = 10;

export interface IStockData {
  buyPrice: number;
  date: string;
  sellPrice: number;
}

export interface IStock {
  buyPrice: number;
  code: string;
  objectName: string;
  sellPrice: number;
  stockExchange: string;
  stockQuoteObject: {
    stockQuoteDaysList: IStockData[];
    stockQuoteMonthsList: IStockData[];
    stockQuoteWeeksList: IStockData[];
  };
}

const Market = () => {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.auth);
  const isLargesThan850 = useMediaQuery("(min-width:850px)");
  const [filter, setFilter] = useState("KSE");
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

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

  // **********ВЫЗОВ ФУНКЦИЯ ПОЛУЧЕНИЯ АКЦИЙ***************
  useEffect(() => {
    if (!token) {
      return;
    }

    getStocks();
  }, [token]);

  const handleFilter = (e: any) => {
    setFilter(e.value);
  };

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
              readOnly
              placeholder="Поиск временно недоступен"
            />

            <select
              className="gray_input"
              placeholder={t("New.choose_currency")}
              value={filter}
              onChange={(e) => handleFilter(e.target)}
            >
              <option value="active">KSE</option>
            </select>
          </div>
          <div>{t("New.total")} {totalCount} {t("New.stocks")}</div>
        </div>

        <div className={styles.items_container}>
          {stocks?.length > 0 ? (
            <>
              <div className={styles.table__container}>
                {isLargesThan850 && (
                  <div className={styles.table__header}>
                    <div className={styles.item__logo}>
                      {t("MarketPage.logo")}
                    </div>
                    <div className={styles.item__name}>
                      {t("MarketPage.name")}
                    </div>
                    <div className={styles.item__price}>
                      {t("MarketPage.price")}
                    </div>
                    <div className={styles.item__chart}>
                      {t("MarketPage.chart")}
                    </div>
                    <div className={styles.item__count}>
                      {t("MarketPage.count")}
                    </div>
                    <div className={styles.item__sum}>
                      {t("MarketPage.sum")}
                    </div>
                    <div className={styles.item__buy}>
                      {t("MarketPage.byu")}
                    </div>
                  </div>
                )}
                {stocks?.map((stock: IStock, index: number) => (
                  <StockItem key={stock.code} stock={stock} />
                ))}
              </div>

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

export default Market;
