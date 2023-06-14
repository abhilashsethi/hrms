import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  type: "bar" | "area" | "line" | "pie" | "donut";
  text?: string;
  series?: number[];
  labels?: string[];
}

const LeaveDonutChart = ({ type, text = "", series, labels }: Props) => {
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
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels,
    colors: ["#106EAD", "#C33C5E", "#25d366", "#BD33B5", "#E60023", "#005d32"],
    title: {
      text: text,
      floating: true,
      offsetY: -5,
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

export default LeaveDonutChart;
