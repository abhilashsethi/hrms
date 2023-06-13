import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  type?: "bar" | "area" | "line";
  text?: string;
  series?: any;
  categories?: String[];
}

const LeaveBarChart = ({ type, text = "", series, categories }: Props) => {
  const values = {
    series,
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        // endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
    },
    yaxis: {
      title: {
        text: "Days",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val;
        },
      },
    },
  };

  return (
    <ApexCharts
      height={"500"}
      options={values as any}
      series={values?.series}
      type={type}
    />
  );
};

export default LeaveBarChart;
