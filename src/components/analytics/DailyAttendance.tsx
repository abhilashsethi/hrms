import dynamic from "next/dynamic";
import { useState } from "react";
import React from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const DailyAttendance = ({
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
				name: "Present",
				data: [31, 40, 28, 51, 42],
			},
			{
				name: "Absent",
				data: [11, 32, 45, 32, 34],
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
			categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
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

	return (
		<ApexCharts
			height={"500"}
			options={{
				series: [
					{
						name: "Present",
						data: [31, 40, 28, 51, 42],
					},
					{
						name: "Absent",
						data: [11, 32, 45, 32, 34],
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
					categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
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
			}}
			series={options.series}
			type={type}
		/>
	);
};

export default DailyAttendance;
