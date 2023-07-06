import React, { useEffect, useState } from "react";
import styles from "./Market.module.scss";
import LineChartLittle from "./LineChartLittle";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../store";
import { IStock, IStockData, PeriodEnum } from "./Market";
import { MainApi } from "../../../api/main/mainApi";
import instance from "../../../api/instance";
import { toast } from "react-toastify";
import { Avatar, Fade, Tooltip } from "@chakra-ui/react";
import { getNumWithoutZeroToFixedN } from "../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";
import Moment from "react-moment";

interface IDataForChart {
  labels: string[];
  data: number[];
  color: string;
}

type PropsType = {
  stock: IStock;
  period: PeriodEnum;
}

const StockItem = ({ stock, period }: PropsType) => {
  const { t } = useTranslation();
  const [totalCount, setTotalCount] = useState<number | string>(0);
  const [totalSum, setTotalSum] = useState<number | string>(0);
  const [stockName, setStockName] = useState<string>("");
  const [stockCode, setStockCode] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [delta, setDelta] = useState(0);
  const [deltaInPercent, setDeltaInPercent] = useState(0);


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

    let array: IStockData[] = [];

    switch (period) {
      case PeriodEnum.week:
        array = stock?.stockQuoteObject?.stockQuoteDaysList;
        break;
      case PeriodEnum.month:
        array = stock?.stockQuoteObject?.stockQuoteWeeksList;
        break;
      case PeriodEnum.month:
        array = stock?.stockQuoteObject?.stockQuoteMonthsList;
        break;
    }

    if (!array) return;
    array.forEach(
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
    setDelta(array[array.length - 1]?.sellPrice - array[array.length - 2]?.sellPrice);
    setDeltaInPercent((array[array.length - 1]?.sellPrice / array[array.length - 2]?.sellPrice - 1) * 100);
    setDataForChart(tempArr);
  }, [stock]);

  // **********ЦВЕТ АВАТАРА***************
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
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
        `api/Stock/buy?code=${stock.code}&quantity=${totalCount}`
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
      {/* <Fade in={isOpenModal}>
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
      </Fade> */}
      <ModalMain
        isOpen={isOpenModal}
        title={t("History.buy_stocks")}
        handleClose={() => { setIsOpenModal(false) }}
        handleSubmit={() => { setIsOpenModal(false); setIsOpenConfirmModal(true) }}
      >
        <div className={styles.stock_body_modal}>
          <div><Moment format="DD/MM/YYYY HH:mm" locale="ru">{new Date()}</Moment></div>
          <div className={styles.stock_image}>
            <Avatar
              // {...stringAvatar(stock.code)} 
              name={`${stock.code.split("")[0]} ${stock.code.split("")[1]} ${stock.code.split("")[2]}`}
              bg={stringToColor(stock.code)}
            />
            <div style={{ fontSize: "20px" }}>{stock.objectName}</div>
            <div style={{ alignSelf: "start" }}>{stock.code}</div>
          </div>
          <div className={styles.modal_flex}>
            <div>{t("History.stock_simple")}</div>
            <div>{t("New.amount")}</div>
          </div>
          <div className={styles.modal_flex}>
            <div>{t("New.stock_price")}</div>
            <div>{stock.buyPrice}$</div>
          </div>
          <div className={styles.modal_flex}>
            <div>Доходность за год</div>
            <div>-</div>
          </div>
          <div className={styles.modal_flex}>
            <div>{t("New.input_amount")}</div>
            <div>
              <input value={totalCount} className={styles.input}
                onChange={(e) => setTotalCount(e.target.value)}
              />
            </div>
          </div>

          <div className="divider" />
          <div className={styles.modal_flex} style={{ color: "#000", margin: "20px 0" }}>
            <div>{t("New.input_sum")}</div>
            <div style={{ fontSize: "20px" }}>
              <input
                value={totalCount ? (+totalCount * stock.sellPrice).toFixed(2) : ""}
                className={styles.input}
                readOnly
              />
            </div>
          </div>

        </div>

      </ModalMain>
      {/* ***************************************************** */}
      <ModalMain
        isOpen={isOpenConfirmModal}
        title={t("New.operation_confirm")}
        handleClose={() => { setIsOpenConfirmModal(false) }}
        handleSubmit={() => byuStockHandler()}
      >
        <div className={styles.stock_body_modal}>
          <div><Moment format="DD/MM/YYYY HH:mm" locale="ru">{new Date()}</Moment></div>

          <div className={styles.main_text} style={{ margin: "20px 0" }}>{t("New.you_buy")}</div>

          <div className={styles.modal_flex}>
            <div>{t("MarketPage.name")}</div>
            <div className={styles.main_text}>{stock.objectName}</div>
          </div>

          <div className={styles.modal_flex}>
            <div>{t("History.stock_simple")}</div>
            <div className={styles.main_text}>{totalCount}</div>
          </div>

          <div className={styles.modal_flex} style={{ color: "#000", margin: "20px 0" }}>
            <div>{t("New.input_sum")}</div>
            <div style={{ fontSize: "20px" }}>
              <input
                value={totalCount ? (+totalCount * stock.sellPrice).toFixed(2) : ""}
                className={styles.input}
                readOnly
              />
            </div>
          </div>

        </div>

      </ModalMain>

      {/* **************ТАБЛИЦА******************** */}
      <div className={`table_row ${styles.table_main_text}`}>
        <div className="table_item_10">
          <Avatar
            // {...stringAvatar(stock.code)} 
            name={`${stock.code.split("")[0]} ${stock.code.split("")[1]} ${stock.code.split("")[2]}`}
            bg={stringToColor(stock.code)}
          />
        </div>

        {/* <Tooltip title={stock.objectName}> */}
        <div className="table_item_30" style={{ alignItems: "start" }}>
          <div>{stock.objectName}</div>
          <div className={styles.table_sub_text}>{stock.code}</div>
        </div>
        {/* </Tooltip> */}

        <div className="table_item_15">
          <div >{getNumWithoutZeroToFixedN(stock.sellPrice, 2)}$</div>
          <div className={styles.table_sub_text}>{t("History.stock_simple")}</div>
        </div>

        <div className="table_item_15" style={{ color: delta >= 0 ? "green" : "red" }}>
          <div>{delta?.toFixed(2)}$</div>
          <div className={styles.table_sub_text}
            style={{ color: delta >= 0 ? "green" : "red" }}
          >
            {deltaInPercent?.toFixed(2)}%
          </div>
        </div>

        <div className="table_item_15">
          <LineChartLittle
            color={dataForChart.color}
            labels={dataForChart?.labels}
            data={dataForChart?.data}
            title={stock?.code}
          />
        </div>

        {/* <div className="table_item_12_5">
          <input
            type="number"
            value={totalCount}
            onChange={(e) => {
              setTotalCount(e.target.value);
            }}
            className="gray_input_w100"
          />
        </div>

        <div className="table_item_12_5">
          <input
            type="number"
            readOnly
            value={totalSum}
            className="gray_input_w100"
          />
        </div> */}

        <div className="table_item_15">
          <button
            className="dark_green_button"
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
