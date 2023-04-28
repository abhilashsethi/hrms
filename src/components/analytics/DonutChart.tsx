import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  type?: "bar" | "area" | "line" | "pie" | "donut";
  text?: string;
  labels?: any;
  series?: any;
}

const DonutChart = ({ type, text = "Chart", labels, series }: Props) => {
  const options = {
    labels: ["Blocked", "Un-Blocked"],
    series: [120, 80],
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
      offsetY: -40,
      offsetX: -50,
      align: "center",
      style: {
        color: "#444",
      },
    },
  };

  return (
    <div className="">
      <p className="text-lg font-semibold pl-10">{text}</p>
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
          colors: ["#106EAD", "#C33C5E"],
          title: {
            text: text,
            floating: true,
            offsetY: -20,
            offsetX: -50,
            align: "center",
            style: {
              color: "#444",
            },
          },
        }}
        series={options.series}
        type={type}
      />
    </div>
  );
};

export default DonutChart;
