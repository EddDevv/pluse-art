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
import { Bar } from "react-chartjs-2";
import { IDataChart } from "../../pages/manager/Trade/Trade";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const footer = (tooltipItems: any) => {
  let feeCcy = "=";
  let sum = "";
  // console.log("tooltipItems", tooltipItems);

  tooltipItems.forEach(function (tooltipItem: any) {
    // console.log("tooltipItem", tooltipItem);
    // console.log("dataIndex", tooltipItem.dataIndex);
    // console.log("raw", tooltipItem.raw);
    // sum = tooltipItem.chart.data.type;
    feeCcy = tooltipItem.dataset.feeCcy[tooltipItem.dataIndex];
    sum = tooltipItem.dataset.sums[tooltipItem.dataIndex];
  });
  return "Название: " + feeCcy + "\nЦена: " + sum;
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
  dataCommon: IDataChart;
}

export function ChartBar({ dataCommon }: Iprops) {
  const data = {
    labels: dataCommon.labels,
    datasets: [
      {
        label: "Покупка",
        data: dataCommon.dataBuy,
        backgroundColor: "#669999",
        tooltipTemplate: "<>",
        feeCcy: dataCommon.feeCcy,
        sums: dataCommon.sums,
      },
      {
        label: "Продажа",
        data: dataCommon.dataSell,
        backgroundColor: "#ff8080",
        tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
        feeCcy: dataCommon.feeCcy,
        sums: dataCommon.sums,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
