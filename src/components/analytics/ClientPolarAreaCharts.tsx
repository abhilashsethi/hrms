import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const ClientPolarAreaCharts = ({
  type,
  text = "",
}: {
  type: "bar" | "area" | "line" | "pie" | "donut" | "polarArea";
  text?: string;
}) => {
  const options = {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    chart: {
      type: "polarArea",
    },
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },
    title: {
      text: text,
      floating: true,
      offsetY: 1,
      align: "left",
      style: {
        color: "#000",
      },
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
  };

  return (
    <ApexCharts
      height={"500"}
      options={{
        series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
        chart: {
          type: "polarArea",
        },
        stroke: {
          colors: ["#fff"],
        },
        fill: {
          opacity: 0.8,
        },
        colors: ["#106EAD", "#C33C5E", "#25d366", "#BD33B5", "#E60023"],
        title: {
          text: text,
          floating: true,
          offsetY: 1,
          align: "left",
          style: {
            color: "#000",
          },
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
      }}
      series={options.series}
      type={type}
    />
  );
};

export default ClientPolarAreaCharts;
