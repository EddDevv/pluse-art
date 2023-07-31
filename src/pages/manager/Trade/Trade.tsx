import React, { useEffect, useState } from "react";
import instance from "../../../api/instance";
import { useAppSelector } from "../../../store";
import { IDataHistoryChart } from "../../../components/Okx/OkxLinePnl";
import { ChartBar } from "../../../components/chart/ChartBar";
import { ChartLinePnl } from "../../../components/chart/ChartLinePnl";

const tradeItems = 20;

export interface IDataChart {
  labels: string[];
  dataBuy: number[];
  dataSell: number[];
  feeCcy: string[];
  sums: string[];
}

interface IBalanceData {
  name: string;
  value: string;
}

// interface IPositionHistory {
//   pnl: string;
//   pnlRatio: string;
//   date: Date;
// }
const Trade = () => {
  const { auth } = useAppSelector((state) => state);
  const [dataForChart, setDataForChart] = useState<IDataChart | null>(null);
  const [dataForBalance, setDataForBalance] = useState<IBalanceData[]>([]);
  // const [dataForPositionHistory, setDataForPositionHistory] = useState<
  //   IPositionHistory[]
  // >([]);
  const [dataForHistoryChart, setDataForHistoryChart] =
    useState<IDataHistoryChart | null>(null);
  // const [dataForRisk, setDataForRisk] = useState<IBalanceData[]>([]);

  const getDataForChart = (data: any) => {
    // console.log("getDataForChart chosenDeposit", chosenDeposit);
    const labels: string[] = [];
    const dataBuy: number[] = [];
    const dataSell: number[] = [];
    const feeCcy: string[] = [];
    const sums: string[] = [];
    if (!data) return;
    let tempArr = [...data];
    if (tempArr?.length > tradeItems) {
      tempArr = tempArr.slice(0, tradeItems);
    }
    tempArr.sort((a, b) => +a.fillTime - +b.fillTime);

    tempArr.forEach((elem) => {
      const date = new Date(+elem.fillTime);
      //   labels.push(
      //     `${date.getDate()}.${date.getUTCMonth()}.${date.getFullYear()}`
      //   );
      // console.log("date", date.toLocaleString("ru"));
      // console.log("side", elem.side);
      // console.log("sz", elem.sz);
      labels.push(date.toLocaleString("ru"));
      feeCcy.push(elem?.feeCcy ?? "");
      sums.push(elem?.fillPx ?? "");
      if (elem.side === "buy") {
        dataBuy.push(elem.sz);
        dataSell.push(0);
      } else if (elem.side === "sell") {
        dataBuy.push(0);
        dataSell.push(elem.sz);
      }
    });
    // console.log("labels", labels);
    // console.log("dataSum", dataSum);
    // console.log("dataIncome", dataIncome);
    setDataForChart({
      labels: labels,
      dataBuy: dataBuy,
      dataSell: dataSell,
      feeCcy: feeCcy,
      sums: sums,
    });
  };

  const getDataForHistoryChart = (data: any) => {
    const labels: string[] = [];
    const dataPnl: number[] = [];
    const dataPnlRatio: number[] = [];
    const openAvgPx: string[] = [];
    const closeAvgPx: string[] = [];
    const closeTotalPos: string[] = [];
    const ccy: string[] = [];
    const instId: string[] = [];
    if (!data || data?.length === 0) return;
    let tempArr = [...data];
    tempArr.reverse();
    // tempArr.sort((a, b) => +a.uTime - +b.uTime);

    tempArr.forEach((elem) => {
      const date = new Date(+elem.cTime);
      labels.push(date.toLocaleString("ru"));
      dataPnl.push(+elem?.pnl);
      dataPnlRatio.push(+elem?.pnlRatio);
      openAvgPx.push(elem?.openAvgPx);
      closeAvgPx.push(elem?.closeAvgPx);
      closeTotalPos.push(elem?.closeTotalPos);
      ccy.push(elem?.ccy);
      instId.push(elem?.instId);
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
    });
  };

  const tryOKX = async () => {
    try {
      const res = await instance.get("/okx/trade/orders-history?instType=SPOT");
      if (res.status === 200 && res?.data?.data?.length > 0) {
        getDataForChart(res.data.data);
      }

      {
        const res = await instance.get("/okx/account/balance");
        let data: IBalanceData[] = [];
        if (res.status === 200) {
          res?.data?.data?.[0]?.details.forEach((elem: any) => {
            data.push({ name: elem.ccy, value: elem?.eq });
          });
          setDataForBalance(data);
        }
      }

      {
        // const today = new Date();
        // today.setUTCHours(0, 0, 0, 0);
        // console.log(today);
        const res = await instance.get(
          "/okx/account/positions-history?limit=50"
        );
        // let data: IPositionHistory[] = [];
        if (res.status === 200 && res?.data?.data?.length > 0) {
          getDataForHistoryChart(res?.data?.data);
          // res?.data?.data?.forEach((elem: any) => {
          //   data.push({
          //     pnl: elem.pnl,
          //     pnlRatio: elem?.pnlRatio,
          //     date: new Date(+elem.uTime),
          //   });
          // });
          // setDataForPositionHistory(data);
        }
      }

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
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    tryOKX();
  }, [auth?.token]);

  return (
    <div style={{ width: "100%" }}>
      <div className="manager__main">
        <div
          style={{
            margin: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "burlywood",
          }}
        >
          Trade
        </div>
        {dataForChart && <ChartBar dataCommon={dataForChart} />}
        <div
          style={{
            margin: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "burlywood",
          }}
        >
          PNL
        </div>
        {dataForHistoryChart && (
          <ChartLinePnl dataCommon={dataForHistoryChart} />
        )}
        <div
          style={{
            margin: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "burlywood",
          }}
        >
          Balances
        </div>
        {dataForBalance.map((elem) => (
          <div key={elem.name}>
            <text>{elem.name}</text>: &nbsp;
            <text style={{ color: "#669999", fontWeight: "bold" }}>
              {elem.value}
            </text>
          </div>
        ))}

        {/* <div
          style={{
            margin: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "burlywood",
          }}
        >
          Position History
        </div>
        {dataForPositionHistory.map((elem, index) => (
          <div key={index}>
            <text>{elem.pnl}</text>: &nbsp;
            <text style={{ color: "#669999", fontWeight: "bold" }}>
              {elem.pnlRatio}
            </text>
            : &nbsp;
            <text>
              <Moment format="DD-MM-YY, hh:mm:ss">
                {elem?.date.toISOString()}
              </Moment>
            </text>
          </div>
        ))} */}

        {/* <div
          style={{
            margin: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "burlywood",
          }}
        >
          Risks
        </div> */}
      </div>
    </div>
  );
};

export default Trade;
