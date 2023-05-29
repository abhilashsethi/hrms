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
				text: "Meeting Counts",
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
						text: "Meeting Counts",
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
