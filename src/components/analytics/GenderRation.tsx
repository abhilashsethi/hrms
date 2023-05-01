import { useFetch } from "hooks";
import dynamic from "next/dynamic";
import { User, Gender } from "types";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const GenderRation = ({
	type,
	text = "",
}: {
	type: "bar" | "area" | "line" | "pie" | "donut";
	text?: string;
}) => {
	const { data: employeeData, mutate } = useFetch<any[]>(`users`);
	// console.log(employeeData);

	const options = {
		labels: ["Male", "Female"],
		series: [
			employeeData?.filter((item) => item?.gender === "Male")?.length || 0,
			employeeData?.filter((item) => item?.gender === "Female")?.length || 0,
		],
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
			offsetY: -4,
			offsetX: -50,
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

				labels: ["Male", "Female"],

				colors: ["#106EAD", "#C33C5E", "#25d366", "#BD33B5", "#E60023"],

				title: {
					text: text,
					floating: true,
					offsetY: -4,
					offsetX: -50,
					align: "center",
					style: {
						color: "#444",
					},
				},
			}}
			series={options.series as any}
			type={type}
		/>
	);
};

export default GenderRation;
