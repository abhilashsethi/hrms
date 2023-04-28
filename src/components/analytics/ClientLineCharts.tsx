import dynamic from "next/dynamic";
import { useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const ClientLineCharts = ({
  type,
  text = "",
}: {
  type: "bar" | "area" | "line";
  text?: string;
}) => {
  const options = {
    series: [
      {
        name: "Block",
        data: [31, 40, 28, 51, 42],
      },
      {
        name: "Unblock",
        data: [11, 32, 45, 32, 34],
      },
    ],
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    },
    tooltip: {
      x: {
        // format: "dd/MM/yy HH:mm",
      },
    },
    title: {
      text: text,
      floating: true,
      offsetY: 1,
      align: "center",
      style: {
        color: "#444",
      },
    },
  };

  return (
    <ApexCharts
      height={"500"}
      options={{
        series: [
          {
            name: "Block",
            data: [31, 40, 28, 51, 42],
          },
          {
            name: "Unblock",
            data: [11, 32, 45, 32, 34],
          },
        ],
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "category",
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        },
        tooltip: {
          x: {
            // format: "dd/MM/yy HH:mm",
          },
        },
        colors: ["#106EAD", "#C33C5E", "#25d366", "#BD33B5", "#E60023"],

        title: {
          text: text,
          floating: true,
          offsetY: 1,
          align: "center",
          style: {
            color: "#444",
          },
        },
      }}
      series={options.series}
      type={type}
    />
  );
};

export default ClientLineCharts;
