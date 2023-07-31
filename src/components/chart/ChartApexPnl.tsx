import React from "react";
import Chart from "react-apexcharts";
import { IDataForApex, IDataHistoryChart } from "../Okx/OkxLinePnl";

interface Iprops {
  dataCommon: IDataHistoryChart;
  dataForApexChart: IDataForApex[];
  // dataForApexChart: any;
}

export function ChartApexPnl({ dataCommon, dataForApexChart }: Iprops) {
  // console.log("dataForApexChart", dataForApexChart);
  const state: any = {
    series: [
      {
        name: "Pnl",
        data: dataForApexChart,
        color: "#00BAEC",
        // colors: [
        //   function ({ value, seriesIndex, w }: any) {
        //     // console.log("value", value);
        //     if (value < 0) {
        //       return "#D9534F";
        //     } else {
        //       return "#2fd12c";
        //     }
        //   },
        // ],
      },
    ],
    options: {
      // colors: [
      //   function ({ value, seriesIndex, w, series, dataPointIndex }: any) {
      //     console.log("w", w);
      //     console.log("value", value);
      //     console.log("seriesIndex", seriesIndex);
      //     console.log("series", series);
      //     console.log("dataPointIndex", dataPointIndex);

      //     if (value >= 0) {
      //       return "#00BAEC";
      //     } else if (value < 0) {
      //       return "#D9534F";
      //     }
      //     return "#2fd12c";
      //     if (w?.config?.series?.[0]?.data?.[seriesIndex]?.y > 0) {
      //       return "#00BAEC";
      //     } else {
      //       return "#D9534F";
      //     }
      //   },
      // ],

      // fill: {
      //   colors: [
      //     function ({ value, seriesIndex, w }: any) {
      //       // console.log("w", w);
      //       if (value > 0) {
      //         return "#00BAEC";
      //       } else {
      //         return "#D9534F";
      //       }
      //     },
      //   ],
      // },
      // fill: {
      //   gradient: {
      //     enabled: true,
      //     opacityFrom: 0.55,
      //     opacityTo: 0
      //   }
      // },
      chart: {
        type: "area",
        height: 350,
        stacked: true,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        // curve: "straight",
        curve: "smooth",
        width: 2,
      },

      title: {
        text: "PNL",
        align: "center",
        style: {
          fontSize: "14px",
          color: "white",
        },
      },
      xaxis: {
        labels: {
          style: {
            // colors: "#8e8da4",
            colors: "white",
          },
        },
        type: "datetime",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        tickAmount: 4,
        floating: false,
        maxWidth: 10,

        labels: {
          style: {
            // colors: "#8e8da4",
            colors: "white",
          },
          offsetY: -7,
          offsetX: 0,
          maxWidth: 50,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        lines: {
          show: false,
        },
      },
      fill: {
        opacity: 0.7,
      },
      // tooltip: {
      //   x: {
      //     format: "dd MMMM, hh:ss ",
      //   },
      //   fixed: {
      //     enabled: false,
      //     position: "topRight",
      //   },
      //   y: {
      //     formatter: undefined,
      //     title: {
      //       formatter: (seriesName: any) => seriesName + "=",
      //     },
      //   },
      // },
      tooltip: {
        x: {
          format: "dd MMMM, HH:mm ",
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          return (
            '<div class="arrow_box">' +
            "<div>Pnl" +
            " " +
            series[seriesIndex][dataPointIndex] +
            // "</div><div>Название: " +
            // dataCommon.instId[dataPointIndex] +
            "</div><div>Цена открытия: " +
            dataCommon.openAvgPx[dataPointIndex] +
            " " +
            dataCommon.ccy[dataPointIndex] +
            "</div><div>Цена закрытия: " +
            dataCommon.closeAvgPx[dataPointIndex] +
            " " +
            dataCommon.ccy[dataPointIndex] +
            "</div><div>Количество: " +
            dataCommon.closeTotalPos[dataPointIndex] +
            "</div><div>Instrument id: " +
            dataCommon.instId[dataPointIndex] +
            "</div><div>Position id: " +
            dataCommon.posId?.[dataPointIndex] +
            "</div><div>Created time: " +
            dataCommon.cTime?.[dataPointIndex] +
            "</div><div>Updated time: " +
            dataCommon.uTime?.[dataPointIndex] +
            "</div><div>Direction: " +
            dataCommon.direction?.[dataPointIndex] +
            "</div>" +
            "</div>"
          );
        },
      },
      // grid: {
      //   yaxis: {
      //     lines: {
      //       offsetX: -30,
      //     },
      //   },
      //   padding: {
      //     left: 20,
      //   },
      // },

      grid: {
        borderColor: "#555",
        clipMarkers: false,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      // markers: {
      //   size: 5,
      //   colors: ["#555"],
      //   strokeColor: "#00BAEC",
      //   strokeWidth: 3
      // },
    },
  };

  return (
    <div id="chart" className="chart_body">
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        height={150}
      />
    </div>
  );
}
