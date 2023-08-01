import React, { useState } from "react";
import styles from "./MyStocks.module.scss";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store";
import { MainApi } from "../../../api/main/mainApi";
import instance from "../../../api/instance";
import { toast } from "react-toastify";
import { getNumWithoutZeroToFixedN } from "../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";
import Moment from "react-moment";
import { ISellStock, PeriodEnum } from "../../../assets/types/StockTypes";
import MainAvatar from "../../../UIcomponents/mainAvatar/MainAvatar";
import { useMediaQuery } from "@chakra-ui/react";

interface IDataForChart {
  labels: string[];
  data: number[];
  color: string;
}

type PropsType = {
  period: PeriodEnum;
  stock: ISellStock;
  refreshStocks: boolean;
  setRefreshStocks: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyStockItem = ({
  stock,
  period,
  refreshStocks,
  setRefreshStocks,
}: PropsType) => {
  const { t } = useTranslation();
  const { value } = useAppSelector((state) => state.stockRates);
  const [isLagerThan480] = useMediaQuery("(min-width: 480px)");
  const [isLagerThan760] = useMediaQuery("(min-width: 760px)");

  const [totalCount, setTotalCount] = useState<number | string>(0);
  const [totalSum, setTotalSum] = useState<number | string>(0);
  const [stockName, setStockName] = useState<string>("");
  const [stockCode, setStockCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [sellPrice, setSellPrice] = useState<any>(0);
  const dispatch = useAppDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  // useEffect(() => {
  //   if (sellPrice) {
  //     setTotalSum((+totalCount * sellPrice).toFixed(3));
  //   }
  // }, [totalCount, stock]);

  // *******ПОЛУЧЕНИЕ ЦЕНЫ ПРОДАЖИ АКЦИИ ИЗ РЕДАКС***************
  // useEffect(() => {
  //   if (stock.stockCode) {
  //     const sellPrice = value?.find((item) => item.code === stock.stockCode);
  //     setSellPrice(sellPrice?.buyPrice.toFixed(3));
  //   }
  // }, [value, stock]);

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

  const getSum = (count: number) => {
    const sellPrice = value?.find((item) => item.code === stock.stockCode);
    if (sellPrice) {
      return (count * sellPrice.buyPrice).toFixed(2);
    } else {
      return 0;
    }
  };

  const getPrice = (): number => {
    const sellPrice = value?.find((item) => item.code === stock.stockCode);
    if (sellPrice) {
      return +sellPrice.buyPrice.toFixed(2);
    } else {
      return 0;
    }
  };

  // **********ЗАКРЫТИЕ МОДАЛКИ***************
  const closeModalHandler = () => {
    setTotalCount(0);
    // setStockName("");
    // setStockCode("");
    setIsOpenModal(false);
    setIsOpenConfirmModal(false);
  };

  // **********ОТКРЫТИЕ МОДАЛКИ***************
  const openModalHandler = () => {
    setStockName(stock.stockName);
    setStockCode(stock.stockCode);
    setIsOpenModal(true);
  };

  // *********ПРОДАЖА АКЦИЙ***************
  const sellStockHandler = async () => {
    setIsLoading(true);

    try {
      await instance.post(
        `api/Stock/sell?code=${stockCode}&quantity=${totalCount}`
      );
      toast.success(t("MarketPage.sell_success"));
      closeModalHandler();

      await MainApi.getInitialMainReduxInfo();
      setRefreshStocks(!refreshStocks);
    } catch (error: any) {
      toast.error(error.response.data);
      closeModalHandler();
      console.error("stockSell>>>", error);
    }
  };
  return (
    <>
      <ModalMain
        isOpen={isOpenModal}
        title={t("New.stock_seil")}
        handleClose={() => {
          setIsOpenModal(false);
        }}
        handleSubmit={() => {
          setIsOpenModal(false);
          setIsOpenConfirmModal(true);
        }}
        isOrange={true}
      >
        <div className={styles.stock_body_modal}>
          <div>
            <Moment format="DD/MM/YYYY HH:mm" locale="ru">
              {new Date()}
            </Moment>
          </div>
          <div className={styles.stock_image}>
            <MainAvatar
              text={stock?.stockCode.slice(0, 3)}
              bg={stringToColor(stock.stockCode)}
            />
            <div style={{ fontSize: "20px" }}>{stock.stockName}</div>
            <div style={{ alignSelf: "start" }}>{stock.stockCode}</div>
          </div>
          <div className={styles.modal_flex}>
            <div>{t("History.stock_simple")}</div>
            <div>{t("New.amount")}</div>
          </div>
          <div className={styles.modal_flex}>
            <div>{t("New.stock_price")}</div>
            <div className={styles.medium}>{getPrice()}$</div>
          </div>
          {/* <div className={styles.modal_flex}>
            <div>Доходность за год</div>
            <div className={styles.medium}>-</div>
          </div> */}
          <div className={styles.modal_flex}>
            <div>{t("New.input_amount")}</div>
            <div>
              <input
                value={totalCount}
                className={styles.input}
                style={{ backgroundColor: "#F8F8F8", width: "100px" }}
                onChange={(e) => setTotalCount(e.target.value)}
              />
            </div>
          </div>

          <div className="divider" />
          <div
            className={styles.modal_flex}
            style={{ color: "#000", margin: "20px 0" }}
          >
            <div className={styles.medium}>{t("New.input_sum")}</div>
            <div style={{ fontSize: "20px" }}>
              <input
                value={totalCount ? (+totalCount * getPrice()).toFixed(2) : ""}
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
        handleClose={() => {
          setIsOpenConfirmModal(false);
        }}
        handleSubmit={() => sellStockHandler()}
        isOrange={true}
      >
        <div className={styles.stock_body_modal}>
          <div>
            <Moment format="DD/MM/YYYY HH:mm" locale="ru">
              {new Date()}
            </Moment>
          </div>

          <div className={styles.main_text} style={{ margin: "20px 0" }}>
            {t("New.you_buy")}
          </div>

          <div className={styles.modal_flex}>
            <div>{t("MarketPage.name")}</div>
            <div className={styles.main_text}>{stock.stockName}</div>
          </div>

          <div className={styles.modal_flex}>
            <div>{t("History.stock_simple")}</div>
            <div className={styles.main_text}>{totalCount}</div>
          </div>

          <div
            className={styles.modal_flex}
            style={{ color: "#000", margin: "20px 0" }}
          >
            <div>{t("New.input_sum")}</div>
            <div style={{ fontSize: "20px" }}>
              <input
                value={totalCount ? (+totalCount * getPrice()).toFixed(2) : ""}
                className={styles.input}
                readOnly
              />
            </div>
          </div>
        </div>
      </ModalMain>

      {/* **************ТАБЛИЦА******************** */}
      <div
        className={`table_row ${styles.table_main_text}`}
        onClick={() => {
          !isLagerThan480 && openModalHandler();
        }}
      >
        <div className={styles.table_item_logo}>
          <MainAvatar
            text={stock?.stockCode.slice(0, 3)}
            bg={stringToColor(stock.stockCode)}
          />
        </div>

        {/* <Tooltip title={stock.objectName}> */}
        <div
          className={styles.table_item_name}
          style={{ alignItems: "start", textAlign: "start" }}
        >
          <div>{stock.stockName}</div>
          <div className={styles.table_sub_text}>{stock.stockCode}</div>
        </div>
        {/* </Tooltip> */}

        <div className={styles.table_item_price} style={{ alignItems: "end" }}>
          <div>{getNumWithoutZeroToFixedN(stock.quantity, 2)}$</div>
          <div className={styles.table_sub_text}>
            {isLagerThan760 ? (
              t("History.stock_simple")
            ) : (
              <>
                {stock.quantity.toLocaleString()} {t("New.count")}
              </>
            )}
          </div>
        </div>

        <div className={styles.table_item_15} style={{ alignItems: "end" }}>
          {stock.quantity.toLocaleString()}
        </div>

        <div className={styles.table_item_15} style={{ alignItems: "end" }}>
          {getSum(stock.quantity)}$
        </div>

        <div className={styles.table_item_but}>
          <button
            className="orange_button_s"
            onClick={() => openModalHandler()}
          >
            {t("MarketPage.sell")}
          </button>
        </div>
      </div>
    </>
  );
};

export default MyStockItem;
