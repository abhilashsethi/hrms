import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const DailyAttendance = ({
  type,
  text = "",
  categories,
  series,
}: {
  type: "bar" | "area" | "line";
  text?: string;
  series?: any;
  categories?: any;
}) => {
  const options = {
    series,

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
      categories,
      // categories: data?.map((item: any) => item?._id),
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
  // console.log({ totalUsers });
  return (
    <ApexCharts
      height={"500"}
      options={{
        series,
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
          categories,
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

export default DailyAttendance;
