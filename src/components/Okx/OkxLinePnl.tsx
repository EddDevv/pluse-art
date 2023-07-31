import React, { useEffect, useState } from "react";
// import { ChartLinePnl } from "../../../components/Lk/chart/ChartLinePnl";
import { useTranslation } from "react-i18next";
import { ChartApexPnl } from "../chart/ChartApexPnl";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../store";
import instance from "../../api/instance";

export interface IDataHistoryChart {
  labels: string[];
  dataPnl: number[];
  dataPnlRatio: number[];
  openAvgPx: string[];
  closeAvgPx: string[];
  closeTotalPos: string[];
  ccy: string[];
  instId: string[];
  labelsTool?: string[];
  posId?: string[];
  cTime?: string[];
  uTime?: string[];
  direction?: string[];
}

export interface IDataForApex {
  x: any;
  y: number;
  date: string;
}

// interface IBalanceData {
//   name: string;
//   value: string;
// }

const OkxLinePnl = () => {
  const { t } = useTranslation();

  const { auth } = useAppSelector((state) => state);
  // const [dataForBalance, setDataForBalance] = useState<IBalanceData[]>([]);
  // const [dataForPositionHistory, setDataForPositionHistory] = useState<
  //   IPositionHistory[]
  // >([]);
  const [dataForHistoryChart, setDataForHistoryChart] =
    useState<IDataHistoryChart | null>(null);
  // const [dataForRisk, setDataForRisk] = useState<IBalanceData[]>([]);
  const [dataForApexChart, setDataForApexChart] = useState<IDataForApex[]>([]);

  const getDataForHistoryChart = (data: any) => {
    const labels: string[] = [];
    const labelsTool: string[] = [];
    const dataPnl: number[] = [];
    const dataPnlRatio: number[] = [];
    const openAvgPx: string[] = [];
    const closeAvgPx: string[] = [];
    const closeTotalPos: string[] = [];
    const ccy: string[] = [];
    const instId: string[] = [];
    const posId: string[] = [];
    const cTime: string[] = [];
    const uTime: string[] = [];
    const direction: string[] = [];

    const dataForApex: IDataForApex[] = [];
    if (!data || data?.length === 0) return;
    let tempArr = [...data];
    tempArr.reverse();
    tempArr.sort((a, b) => +a.cTime - +b.cTime);

    tempArr.forEach((elem) => {
      const date = new Date(+elem.cTime);
      labels.push("");
      labelsTool.push(date.toLocaleString("ru"));
      dataPnl.push(+elem?.pnl);
      dataPnlRatio.push(+elem?.pnlRatio);
      openAvgPx.push(elem?.openAvgPx);
      closeAvgPx.push(elem?.closeAvgPx);
      closeTotalPos.push(elem?.closeTotalPos);
      ccy.push(elem?.ccy);
      instId.push(elem?.instId);
      posId.push(elem?.posId);

      const t1 = new Date(+elem?.cTime);
      t1 && cTime.push(t1.toLocaleDateString() + " " + t1.toLocaleTimeString());

      const t2 = new Date(+elem?.uTime);
      t2 && uTime.push(t2.toLocaleDateString() + " " + t2.toLocaleTimeString());
      direction.push(elem?.direction);

      // dataForApex.push({ x: date.toLocaleString("ru"), y: +elem?.pnl });
      dataForApex.push({
        x: +date,
        y: +elem?.pnl,
        date: date.toLocaleString("ru"),
      });
    });
    setDataForHistoryChart({
      labels: labels,
      dataPnl: dataPnl,
      dataPnlRatio: dataPnlRatio,
      openAvgPx: openAvgPx,
      closeAvgPx: closeAvgPx,
      closeTotalPos: closeTotalPos,
      ccy: ccy,
      instId: instId,
      labelsTool: labelsTool,
      posId: posId,
      cTime: cTime,
      uTime: uTime,
      direction: direction,
    });
    setDataForApexChart(dataForApex);
  };

  const tryOKX = async () => {
    try {
      // {
      //   const res = await instance.get("/okx/account/balance");
      //   let data: IBalanceData[] = [];
      //   if (res.status === 200) {
      //     res?.data?.data?.[0]?.details.forEach((elem: any) => {
      //       data.push({ name: elem.ccy, value: elem?.eq });
      //     });
      //     setDataForBalance(data);
      //   }
      // }

      // const today = new Date();
      // today.setUTCHours(0, 0, 0, 0);
      // console.log(today);
      const res = await instance.get("/okx/account/positions-history?limit=50");
      if (res.status === 200 && res?.data?.data?.length > 0) {
        getDataForHistoryChart(res?.data?.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    tryOKX();
  }, [auth]);

  return (
    <div style={{ width: "100%" }}>
      <div
        className="lider_top_chart"
        style={{
          display: "block",
        }}
      >
        <div
          className="lider_top_title"
          style={{ textAlign: "center", padding: "15px" }}
        >
          {t("DopItem2.birga")}
        </div>
        {/* {dataForHistoryChart && (
          <ChartLinePnl dataCommon={dataForHistoryChart} />
        )} */}
        {dataForApexChart.length > 0 && dataForHistoryChart && (
          <ChartApexPnl
            dataCommon={dataForHistoryChart}
            dataForApexChart={dataForApexChart}
          />
        )}
      </div>
    </div>
  );
};

export default OkxLinePnl;
