import { useFetch } from "hooks";
import dynamic from "next/dynamic";
import { Card } from "types";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const CardStatus = ({
  type,
  text = "",
  labels,
  series,
}: {
  type: "bar" | "area" | "line" | "pie" | "donut";
  text?: string;
  labels?: any;
  series?: any;
}) => {
  const options = {
    labels,
    series,
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#b00b13", "#005d32"],
    title: {
      text: text,
      floating: true,
      offsetY: 130,
      align: "center",
      style: {
        color: "#444",
      },
    },
    legend: {
      position: "bottom",
      // offsetX: 0,
      // offsetY: 50,
    },
  };

  return (
    <ApexCharts
      height={"500"}
      options={{
        series,
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        labels,
        colors: ["#106EAD", "#C33C5E", "#25d366", "#BD33B5", "#E60023"],
        title: {
          text: text,
          floating: true,
          offsetY: -5,
          offsetX: -50,
          align: "center",
          style: {
            color: "#444",
          },
        },
        legend: {
          position: "bottom",
          // offsetX: 0,
          // offsetY: 50,
        },
      }}
      series={options.series as any}
      type={type}
    />
  );
};

export default CardStatus;
