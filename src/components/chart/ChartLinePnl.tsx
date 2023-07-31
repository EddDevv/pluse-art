import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IDataHistoryChart } from "../Okx/OkxLinePnl";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const footer = (tooltipItems: any) => {
  let openAvgPx = "";
  let closeAvgPx = "";
  let closeTotalPos = "";
  let ccy = "";
  let instId = "";
  let data = "";
  // console.log("tooltipItems", tooltipItems);

  tooltipItems.forEach(function (tooltipItem: any) {
    // console.log("tooltipItem", tooltipItem);
    // console.log("dataIndex", tooltipItem.dataIndex);
    // console.log("raw", tooltipItem.raw);
    openAvgPx = tooltipItem?.dataset?.openAvgPx?.[tooltipItem.dataIndex];
    closeAvgPx = tooltipItem?.dataset?.closeAvgPx?.[tooltipItem.dataIndex];
    closeTotalPos =
      tooltipItem?.dataset?.closeTotalPos?.[tooltipItem.dataIndex];
    ccy = tooltipItem?.dataset?.ccy?.[tooltipItem.dataIndex];
    instId = tooltipItem?.dataset?.instId?.[tooltipItem.dataIndex];
    data = tooltipItem?.dataset?.labelsTool?.[tooltipItem.dataIndex] ?? "";
  });

  return (
    data +
    "\nНазвание: " +
    instId +
    "\nЦена открытия: " +
    openAvgPx +
    " " +
    ccy +
    "\nЦена закрытия: " +
    closeAvgPx +
    " " +
    ccy +
    "\nКоличество: " +
    closeTotalPos
  );
};

export const options = {
  responsive: true,
  // tooltips: {
  //   callbacks: {
  //     label: function (tooltipItem: any, data: any) {
  //       return tooltipItem.yLabel;
  //     },
  //   },
  // },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      // display: false,
      text: "lala",
    },
    tooltip: {
      callbacks: {
        footer: footer,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  interaction: {
    intersect: false,
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Начисления",
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: "#E6CB8B",
//     },
//     {
//       label: "Доход",
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: "#9ED3C6",
//     },
//   ],
// };

interface Iprops {
  dataCommon: IDataHistoryChart;
}

export function ChartLinePnl({ dataCommon }: Iprops) {
  const data = {
    labels: dataCommon.labels,
    datasets: [
      {
        label: "Pnl",
        data: dataCommon.dataPnl,
        // backgroundColor: "#669999",
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
        lineTension: 0.3,
        openAvgPx: dataCommon.openAvgPx,
        closeAvgPx: dataCommon.closeAvgPx,
        closeTotalPos: dataCommon.closeTotalPos,
        ccy: dataCommon.ccy,
        instId: dataCommon.instId,
        labelsTool: dataCommon?.labelsTool,
      },
      // {
      //   label: "PnlRatio",
      //   data: dataCommon.dataPnlRatio,
      //   backgroundColor: "#ff8080",
      //   // feeCcy: dataCommon.feeCcy,
      //   // sums: dataCommon.sums,
      //   borderColor: "#ff8080",
      // },
    ],
    // responsive: true,
    // maintainAspectRatio: false,
    height: "200px",
    width: "800px",
    aspectRatio: 4,
  };
  return <Line options={options} data={data} />;
}
