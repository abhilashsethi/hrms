import dynamic from "next/dynamic";
import { useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const ClientLineCharts = ({
	type,
	text = "",
}: {
	type: "bar" | "area" | "line" | "donut";
	text?: string;
}) => {
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
		legend: {
			position: "bottom",
		},
	};

	return (
		<ApexCharts
			height={"500"}
			options={{
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
				colors: ["#106ead", "#c33c5e"],
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
				legend: {
					position: "bottom",
				},
			}}
			series={options.series}
			type={type}
		/>
	);
};

export default ClientLineCharts;
