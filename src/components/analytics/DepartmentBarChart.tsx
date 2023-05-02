import dynamic from "next/dynamic";
import { useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const DepartmentBarChart = ({
	type,
	text = "",
}: {
	type: "bar" | "area" | "line";
	text?: string;
}) => {
	const [monthlyData, setMonthlyData] = useState([]);

	let mounted = false;

	const options = {
		series: [
			{
				name: "Projects",
				data: [5, 8, 9, 10, 10, 8, 5],
			},
		],
		chart: {
			height: 350,
			type: "bar",
		},
		plotOptions: {
			bar: {
				columnWidth: "40%",
				borderRadius: 10,
				dataLabels: {
					position: "top", // top, center, bottom
				},
			},
		},
		dataLabels: {
			enabled: true,
			// formatter: function (val) {
			//   return val + "%";
			// },
			offsetY: 475,
			style: {
				fontSize: "12px",
				colors: ["#304758"],
			},
		},

		xaxis: {
			categories: [
				"AI & ML",
				"Web Dev.",
				"App Dev.",
				"IT Mang.",
				"Accounts Mang.",
				"Sales Mang.",
				"Manager",
			],
			position: "bottom",
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
				// show: false,
				// formatter: function (val) {
				//   return val + "%";
				// }
			},
		},
		colors: ["#106EAD", "#C33C5E", "#25d366", "#BD33B5", "#E60023"],

		title: {
			text: text,
			floating: true,
			offsetY: 470,
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
						name: "Person",
						data: [5, 8, 9, 10, 10, 8, 5],
					},
				],
				chart: {
					height: 350,
					type: "bar",
				},
				plotOptions: {
					bar: {
						columnWidth: "40%",
						borderRadius: 10,
						dataLabels: {
							position: "top", // top, center, bottom
						},
					},
				},
				dataLabels: {
					enabled: true,
					formatter: function (val) {
						return val + "";
					},
					offsetY: -20,
					style: {
						fontSize: "12px",
						colors: ["#304758"],
					},
				},

				xaxis: {
					categories: [
						"AI & ML",
						"Web Dev.",
						"App Dev.",
						"IT Mang.",
						"Accounts Mang.",
						"Sales Mang.",
						"Manager",
					],
					position: "bottom",
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
						formatter: function (val) {
							return val + "";
						},
					},
				},
				title: {
					text: text,
					floating: true,
					offsetY: 475,
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

export default DepartmentBarChart;
