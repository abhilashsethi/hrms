import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const TaskOverview = ({
  type,
  text = "",
}: {
  type: "bar" | "area" | "line" | "pie" | "donut";
  text?: string;
}) => {
  const options = {
    labels: [
      "Completed Task",
      "Inprogress Tasks",
      "On Hold Tasks",
      "Pending Tasks",
      "Review Tasks",
    ],
    series: [166, 115, 31, 47, 27],
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
      offsetY: -5,
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
        series: [166, 115, 31, 47, 27],
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

        labels: [
          "Completed Task",
          "Inprogress Tasks",
          "On Hold Tasks",
          "Pending Tasks",
          "Review Tasks",
        ],

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
      }}
      series={options.series}
      type={type}
    />
  );
};

export default TaskOverview;
