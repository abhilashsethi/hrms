import dynamic from "next/dynamic";
import { useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const DailyAttendance = ({
	type,
	text = "",
	data,
}: {
	type: "bar" | "area" | "line";
	text?: string;
	data?: any;
}) => {
	console.log(data);
	const options = {
		series: [
			{
				name: "Present",
				data: data?.map((item: any) => item?.count),
			},
			// {
			// 	name: "Absent",
			// 	data: [11, 32, 45, 32, 34],
			// },
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
			categories: data?.map((item: any) => item?._id),
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
						data: data?.map((item: any) => item?.count),
					},
					// {
					// 	name: "Absent",
					// 	data: [11, 32, 45, 32, 34],
					// },
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
					categories: data?.map((item: any) => item?._id),
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
