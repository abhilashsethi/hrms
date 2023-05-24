import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const MeetingAnalytics = ({
	type,
	text = "",
	series,
	labels,
}: {
	type: "bar" | "area" | "line" | "pie" | "donut";
	text?: string;
	series?: any;
	labels?: any;
}) => {
	const options = {
		series,
		chart: {
			height: 350,
			type: "line",
			stacked: false,
		},
		stroke: {
			width: [0, 2, 5],
			curve: "smooth",
		},
		plotOptions: {
			bar: {
				columnWidth: "50%",
			},
		},

		fill: {
			opacity: [0.85, 0.25, 1],
			gradient: {
				inverseColors: false,
				shade: "light",
				type: "vertical",
				opacityFrom: 0.85,
				opacityTo: 0.55,
				stops: [0, 100, 100, 100],
			},
		},
		labels,
		markers: {
			size: 0,
		},
		xaxis: {
			type: "category",
		},
		yaxis: {
			title: {
				text: "Points",
			},
			min: 0,
		},
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: function (y: any) {
					if (typeof y !== "undefined") {
						return y.toFixed(0) + "";
					}
					return y;
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
						name: "Upcoming Meetings",
						type: "column",
						data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 30],
					},
					{
						name: "Completed Meetings",
						type: "area",
						data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 42],
					},
					{
						name: "Others",
						type: "line",
						data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 20],
					},
				],
				chart: {
					height: 350,
					type: "line",
					stacked: false,
				},
				stroke: {
					width: [0, 2, 5],
					curve: "smooth",
				},
				plotOptions: {
					bar: {
						columnWidth: "50%",
					},
				},

				fill: {
					opacity: [0.85, 0.25, 1],
					gradient: {
						inverseColors: false,
						shade: "light",
						type: "vertical",
						opacityFrom: 0.85,
						opacityTo: 0.55,
						stops: [0, 100, 100, 100],
					},
				},
				labels,
				markers: {
					size: 0,
				},
				xaxis: {
					type: "category",
				},
				yaxis: {
					title: {
						text: "Points",
					},
					min: 0,
				},
				tooltip: {
					shared: true,
					intersect: false,
					y: {
						formatter: function (y) {
							if (typeof y !== "undefined") {
								return y.toFixed(0) + "";
							}
							return y;
						},
					},
				},
			}}
			series={options.series}
			type={type}
		/>
	);
};

export default MeetingAnalytics;
