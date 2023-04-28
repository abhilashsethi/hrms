import dynamic from "next/dynamic";
import { useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const CardsAreaChart = ({
	type,
	text = "",
}: {
	type: "bar" | "area" | "line";
	text?: string;
}) => {
	const [monthlyData, setMonthlyData] = useState([]);
	const months: any = {
		1: "JAN",
		2: "FEB",
		3: "MAR",
		4: "APR",
		5: "MAY",
		6: "JUN",
		7: "JUL",
		8: "AUG",
		9: "SEP",
		10: "OCT",
		11: "NOV",
		12: "DEC",
	};
	let mounted = false;

	const options = {
		series: [
			{
				name: "series1",
				data: [31, 40, 28, 51, 42, 109, 100],
			},
			{
				name: "series2",
				data: [11, 32, 45, 32, 34, 52, 41],
			},
		],
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
			type: "datetime",
			categories: [
				"2018-09-19T00:00:00.000Z",
				"2018-09-19T01:30:00.000Z",
				"2018-09-19T02:30:00.000Z",
				"2018-09-19T03:30:00.000Z",
				"2018-09-19T04:30:00.000Z",
				"2018-09-19T05:30:00.000Z",
				"2018-09-19T06:30:00.000Z",
			],
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
	};

	return (
		<ApexCharts
			height={"500"}
			options={{
				series: [
					{
						name: "series1",
						data: [31, 40, 28, 51, 42, 109, 100],
					},
					{
						name: "series2",
						data: [11, 32, 45, 32, 34, 52, 41],
					},
				],
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
					type: "datetime",
					categories: [
						"2018-09-19T00:00:00.000Z",
						"2018-09-19T01:30:00.000Z",
						"2018-09-19T02:30:00.000Z",
						"2018-09-19T03:30:00.000Z",
						"2018-09-19T04:30:00.000Z",
						"2018-09-19T05:30:00.000Z",
						"2018-09-19T06:30:00.000Z",
					],
				},
				tooltip: {
					x: {
						format: "dd/MM/yy HH:mm",
					},
				},
			}}
			series={options.series}
			type={type}
		/>
	);
};

export default CardsAreaChart;
