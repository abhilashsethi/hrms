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
				name: "Cards Assigned",
				data: [31, 40, 28, 51, 42, 109, 100],
			},
			{
				name: "Scanned Cards",
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
			type: "category",
			categories: [
				"JAN",
				"FEB",
				"MAR",
				"APR",
				"MAY",
				"JUN",
				"JUL",
				"AUG",
				"SEP",
				"OCT",
				"NOV",
				"DEC",
			],
		},
		tooltip: {
			x: {
				//    format: "dd/MM/yy HH:mm",
			},
		},
	};

	return (
		<ApexCharts
			height={"500"}
			options={{
				series: [
					{
						name: "Cards Assigned",
						data: [31, 40, 28, 51, 42, 109, 100],
					},
					{
						name: "Scanned Cards",
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
					type: "category",
					categories: [
						"JAN",
						"FEB",
						"MAR",
						"APR",
						"MAY",
						"JUN",
						"JUL",
						"AUG",
						"SEP",
						"OCT",
						"NOV",
						"DEC",
					],
				},
				colors: ["#106EAD", "#C33C5E", "#25d366", "#BD33B5", "#E60023"],

				tooltip: {
					x: {
						//   format: "dd/MM/yy HH:mm",
					},
				},
			}}
			series={options.series}
			type={type}
		/>
	);
};

export default CardsAreaChart;
