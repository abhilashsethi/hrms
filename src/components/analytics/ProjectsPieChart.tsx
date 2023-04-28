import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});
type Props = {
	pieLabel: string[];
	pieSeries: number[];
	title: string;
	className?: string;
};
const HomePieChart = ({ pieLabel, pieSeries, title, className }: Props) => {
	return (
		<div className={`${className}`}>
			<h3 className="font-semibold w-full text-left tracking-wide text-black text-lg">
				{title}
			</h3>
			<ReactApexChart
				type="pie"
				height={"400"}
				// width={100%}
				series={pieSeries}
				options={{
					chart: {
						width: 380,
						type: "pie",
					},
					legend: {
						position: "bottom",
					},
					colors: [
						"#702963",
						"#ff4560",
						"#8d4781",
						"#c634eb",
						"#C43C5C",
						"#6fadde",
						"#5B50A1",
						"#DE3163",
					],
					labels: pieLabel,
					responsive: [
						{
							breakpoint: 1500,
							options: {
								chart: {
									width: 350,
								},
								legend: {
									position: "bottom",
								},
							},
						},
						{
							breakpoint: 1200,
							options: {
								chart: {
									width: 300,
								},
								legend: {
									position: "bottom",
								},
							},
						},
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
				}}
			/>
		</div>
	);
};

export default HomePieChart;
