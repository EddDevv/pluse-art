import React, { useEffect, useState } from "react";
import styles from "./Market.module.scss";
import LineChartLittle from "./LineChartLittle";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../store";
import { IStockData } from "./Market";
import { MainApi } from "../../../api/main/mainApi";
import instance from "../../../api/instance";
import { toast } from "react-toastify";
import { Avatar, Fade, Tooltip } from "@chakra-ui/react";
import { getNumWithoutZeroToFixedN } from "../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";

interface IDataForChart {
  labels: string[];
  data: number[];
  color: string;
}

const StockItem = ({ stock }: any) => {
  const { t } = useTranslation();
  const [totalCount, setTotalCount] = useState<number | string>(0);
  const [totalSum, setTotalSum] = useState<number | string>(0);
  const [stockName, setStockName] = useState<string>("");
  const [stockCode, setStockCode] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const [dataForChart, setDataForChart] = useState<IDataForChart>({
    labels: [],
    data: [],
    color: "red",
  });

  useEffect(() => {
    setTotalSum((+totalCount * stock.sellPrice).toFixed(2));
  }, [totalCount, stock]);

  // **********ПОЛУЧЕНИЕ ДАННЫх ДЛЯ ГРАФИКА***************
  useEffect(() => {
    const tempArr: IDataForChart = {
      labels: [],
      data: [],
      color: "green",
    };

    stock?.stockQuoteObject?.stockQuoteDaysList.forEach(
      (stockData: IStockData, index: number) => {
        tempArr.data.push(stockData.sellPrice);
        tempArr.labels.push(stockData.date.split("T")[0]);
        if (
          tempArr?.data[tempArr.data.length - 1] >=
          tempArr?.data[tempArr.data.length - 2]
        ) {
          tempArr.color = "green";
        } else {
          tempArr.color = "red";
        }
      }
    );

    setDataForChart(tempArr);
  }, [stock]);

  // **********ЦВЕТ АВАТАРА***************
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  // **********ПЕРВЫЕ БУКВЫ АВАТАРА***************
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        fontSize: "14px",
      },
      children: `${name.split("")[0]}${name.split("")[1]}${name.split("")[2]}`,
    };
  }

  // **********ЗАКРЫТИЕ МОДАЛКИ***************
  const closeModalHandler = () => {
    setTotalCount(0);
    setStockName("");
    setStockCode("");
    setIsOpenModal(false);
  };

  // **********ОТКРЫТИЕ МОДАЛКИ***************
  const openModalHandler = () => {
    setStockName(stock.objectName);
    setStockCode(stock.code);
    setIsOpenModal(true);
  };

  // **********ОБНОВЛЕНИЕ ДАННЫх ПОЛЬЗОВАТЕЛЯ В РЕДАКС***************
  const getMainInfo = async () => {
    await MainApi.getInitialMainReduxInfo();
  };

  // **********ПОКУПКА АКЦИЙ***************
  const byuStockHandler = async () => {
    setIsLoading(true);

    try {
      await instance.post(
        `api/Stock/buy?code=${stockCode}&quantity=${totalCount}`
      );
      toast.success(t("MarketPage.byu_success"));
      closeModalHandler();
      await getMainInfo();
    } catch (error: any) {
      toast.error(error.response.data);
      closeModalHandler();
      console.error("stockBuy>>>", error);
    }
  };

  return (
    <>
      {/* ............МОДАЛКА ПОДТВЕРЖДЕНИЯ ПОКУПКИ АКЦИЙ................. */}
      <Fade in={isOpenModal}>
        <div className="modal__wrapper">
          <div className="modal__text withdraw__modalWrapper">
            <div>{t("MarketPage.success")}</div>

            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                width: "100%",
                textAlign: "center",
                color: "red",
              }}
            >
              {t("MarketPage.get")}
              {stockName} {t("MarketPage.in_count")} {totalCount}
              {t("MarketPage.in_sum")} {totalSum}$!
            </div>

            <div
              style={{
                marginTop: "10px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={() => closeModalHandler()}
                className="form_sbmOpen texp_button_modal deal_button_Confirm"
                style={{
                  background: "#EE4B2B",
                }}
              >
                {t("MarketPage.cancel")}
              </button>
              <button
                onClick={() => byuStockHandler()}
                className="form_sbmOpen texp_button_modal deal_button_Confirm"
              >
                {t("MarketPage.accept")}
              </button>
            </div>
          </div>
        </div>
      </Fade>

      {/* **************ТАБЛИЦА******************** */}
      <div className={styles.item}>
        <div className={styles.item__logo}>
          <Avatar {...stringAvatar(stock.code)} />
        </div>

        <Tooltip title={stock.objectName}>
          <div className={styles.item__name}>
            {stock.objectName.slice(0, 25)}...
          </div>
        </Tooltip>

        <div className={styles.item__price}>
          {getNumWithoutZeroToFixedN(stock.sellPrice, 2)}$
        </div>

        <div className={styles.item__chart}>
          <LineChartLittle
            color={dataForChart.color}
            labels={dataForChart?.labels}
            data={dataForChart?.data}
            title={stock?.code}
          />
        </div>

        <div className={styles.item__count}>
          <input
            type="number"
            value={totalCount}
            onChange={(e) => {
              setTotalCount(e.target.value);
            }}
            className={styles.count__input}
          />
        </div>

        <div className={styles.item__sum}>
          <input
            type="number"
            readOnly
            value={totalSum}
            className={styles.count__input}
          />
        </div>

        <div className={styles.item__buy}>
          <button
            className={styles.byu__btn}
            onClick={() => openModalHandler()}
            // disabled={totalCount < 1}
          >
            {t("MarketPage.byu")}
          </button>
        </div>
      </div>
    </>
  );
};

export default StockItem;
