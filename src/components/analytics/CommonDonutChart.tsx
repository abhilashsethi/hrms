import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const CommonDonutChart = ({
  type,
  text = "Graph",
  labels,
  series,
  colors,
}: {
  type: "bar" | "area" | "line" | "pie" | "donut";
  text?: string;
  labels?: string[];
  series?: number[];
  colors?: string[];
}) => {
  const values = {
    series,
    chart: {
      type,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels,
    colors,

    title: {
      text: text,
      floating: true,
      offsetY: -50,
      offsetX: -80,
      align: "center",
      style: {
        color: "#444",
      },
    },
    legend: {
      position: "bottom",
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

export default CommonDonutChart;
