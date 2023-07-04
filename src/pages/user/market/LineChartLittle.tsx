import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./Market.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartLittle = (props: any) => {
  const options = {
    plugins: {
      legend: {
        labels: {
          // usePointStyle: true,
          // pointStyle: "triangle",
          boxWidth: 10,
        },
      },
    },

    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },

    responsive: true,

    hoverBorderColor: "yellow",
    elements: {
      line: {
        tension: 0, // smooth lines
        borderWidth: 0.5,
        fill: "origin", //
        // borderJoinStyle: "bevel",//
        // stepped: true
      },
      point: {
        radius: 0.5,
      },
    },
  };

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.title,
        data: props.data,
        borderColor: props.color === "red" ? "#ff7170" : "#78d292",
        backgroundColor: props.color === "red" ? "#ff7170" : "#78d292",
        fill: false,
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChartLittle;
