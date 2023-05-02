import dynamic from "next/dynamic";
import { useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const LeaveBarChart = ({
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
				name: "Sick Leave",
				data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
			},
			{
				name: "Paid Leave",
				data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
			},
			{
				name: "Casual Leave",
				data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
			},
		],
		chart: {
			type: "bar",
			height: 350,
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: "55%",
				endingShape: "rounded",
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
			categories: [
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
			],
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
			options={{
				series: [
					{
						name: "Sick Leave",
						data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
					},
					{
						name: "Paid Leave",
						data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
					},
					{
						name: "Casual Leave",
						data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
					},
				],
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
					categories: [
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
					],
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
			}}
			series={options.series}
			type={type}
		/>
	);
};

export default LeaveBarChart;
