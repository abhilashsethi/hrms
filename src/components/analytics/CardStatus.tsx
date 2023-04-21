import React, { useState } from "react";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const CardStatus = ({
	type,
	text = "",
}: {
	type: "bar" | "area" | "line" | "pie" | "donut";
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
			text: "Scanned Users",
			floating: true,
			offsetY: 130,
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
				series: [44, 55, 41, 17, 15],
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

				labels: ["Blocked", "Un-Blocked"],

				// colors: ["#db2777", "#C04000", "#E97451", "#F2D2BD"],

				title: {
					text: "Scanned Users",
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

export default CardStatus;
