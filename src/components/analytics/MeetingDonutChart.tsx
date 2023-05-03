import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const MeetingDonutChart = ({
	type,
	text = "",
}: {
	type: "bar" | "area" | "line" | "pie" | "donut";
	text?: string;
}) => {
	const options = {
		labels: ["Scheduled Meeting", "Rescheduled Meeting", "Cancelled Meeting"],
		series: [166, 115, 31],
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
				series: [166, 115, 31],
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

				labels: [
					"Scheduled Meeting",
					"Rescheduled Meeting",
					"Cancelled Meeting",
				],

				colors: ["#106EAD", "#C33C5E", "#25d366", "#E60023"],

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

export default MeetingDonutChart;
