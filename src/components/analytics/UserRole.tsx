import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserRole = ({
  type,
  text = "",
}: {
  type: "bar" | "area" | "line";
  text?: string;
}) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const months: any = {
    1: "JAN",
    2: "FEB",
    3: "MAR",
    4: "APR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AUG",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC",
  };
  let mounted = false;

  const options = {
    series: [
      {
        name: "Patient  ",
        data: [100, 80, 90, 120, 150, 180, 100, 60, 90, 110, 140, 80],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      // formatter: function (val) {
      // 	return val + "%";
      // },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "top",
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
        // formatter: function (val) {
        // 	return val + "%";
        // },
      },
    },
    title: {
      text: "Registered Users",
      floating: true,
      offsetY: 130,
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
            name: "Patient",
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
          },
        ],
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          // formatter: function (val) {
          // 	return val + "%";
          // },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },

        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          position: "top",
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
            // formatter: function (val) {
            // 	return val + "%";
            // },
          },
        },
        colors: ["#106EAD", "#C33C5E", "#25d366", "#BD33B5", "#E60023"],

        title: {
          text: "Registered Users",
          floating: true,
          offsetY: 480,
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

export default UserRole;
