import dynamic from "next/dynamic";
import { useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const CommonBarChart = ({
  type,
  text = "",
  labels,
  data,
}: {
  type: "bar" | "area" | "line";
  text?: string;
  labels?: any;
  data?: any;
}) => {
  const values = {
    series: [
      {
        name: "",
        data,
      },
    ],
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val + "";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: labels,
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val: any) {
          return val + "";
        },
      },
    },

    title: {
      text: text,
      floating: true,
      offsetY: 475,
      align: "center",
      style: {
        color: "#444",
      },
    },
  };

  return (
    <ApexCharts
      height={"500"}
      options={values as any}
      series={values.series}
      type={type}
    />
  );
};

export default CommonBarChart;