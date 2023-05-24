import dynamic from "next/dynamic";
import { useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const LeaveBarChart = ({
	type,
	text = "",
	series,
	categories,
}: {
	type: "bar" | "area" | "line";
	text?: string;
	series?: any;
	categories?: any;
}) => {
	const [monthlyData, setMonthlyData] = useState([]);

	let mounted = false;

	const options = {
		series,
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
			options={{
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
			}}
			series={options.series}
			type={type}
		/>
	);
};

export default LeaveBarChart;
