import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const GenderRation = ({
  type,
  text = "",
  series,
  labels,
}: {
  type: "bar" | "area" | "line" | "pie" | "donut";
  text?: string;
  data?: any;
  series?: any;
  labels?: any;
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
      offsetY: -4,
      offsetX: -50,
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
          offsetY: -4,
          offsetX: -50,
          align: "center",
          style: {
            color: "#444",
          },
        },
      }}
      series={options.series as any}
      type={type}
    />
  );
};

export default GenderRation;
