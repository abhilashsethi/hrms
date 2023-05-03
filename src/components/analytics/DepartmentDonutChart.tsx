import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const DepartmentDonutChart = ({
	type,
	text = "",
}: {
	type: "bar" | "area" | "line" | "pie" | "donut";
	text?: string;
}) => {
	const options = {
		labels: [
			"AI & ML",
			"Web Dev.",
			"App Dev.",
			"IT Mang.",
			"Accounts Mang.",
			"Sales Mang.",
			"Manager",
		],
		series: [166, 115, 31, 47, 27, 20, 30],
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
				series: [166, 115, 31, 47, 27, 20, 30],
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
					"AI & ML",
					"Web Dev.",
					"App Dev.",
					"IT Mang.",
					"Accounts Mang.",
					"Sales Mang.",
					"Manager",
				],

				colors: [
					"#106EAD",
					"#C33C5E",
					"#25d366",
					"#BD33B5",
					"#E60023",
					"#005d32",
					"#c6ff00",
				],

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

export default DepartmentDonutChart;
