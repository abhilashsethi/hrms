import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const RoleDonutChart = ({
	type,
	text = "",
	labels,
	series,
	colors,
}: {
	type: "bar" | "area" | "line" | "pie" | "donut";
	text?: string;
	labels?: any;
	series?: any;
	colors?: any;
}) => {
	const options = {
		labels,
		series,
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
		colors,
		title: {
			text: text,
			floating: true,
			offsetY: -5,
			offsetX: -80,
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
				series,
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
				labels,
				colors,

				title: {
					text: text,
					floating: true,
					offsetY: -5,
					offsetX: -80,
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

export default RoleDonutChart;
