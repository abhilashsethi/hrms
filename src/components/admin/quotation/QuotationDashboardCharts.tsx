import { BranchBarChart, ClientLineCharts } from "components/analytics";
import React from "react";
interface Props {
	data?: any;
}
const QuotationDashboardCharts = ({ data }: Props) => {
	return (
		<div className="w-full">
			<div className="grid lg:grid-cols-2 content-between gap-6">
				<div className="px-2 py-4 w-full flex bg-white flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">
						Month-Wise Accepted Quotation Overview
					</p>
					<BranchBarChart
						labels={[
							"Jan",
							"Feb",
							"Mar",
							"Apr",
							"May",
							"Jun",
							"Jul",
							"Aug",
							"Sep",
							"Oct",
							"Nov",
							"Dec",
						]}
						data={[10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]}
						type="bar"
						text=""
					/>
				</div>
				<div className="px-2 py-4 pt-9 bg-white w-full gap-5 !border-grey-500 rounded-xl !shadow-xl">
					<p className="text-center text-lg font-bold">Quotation Overview</p>
					<ClientLineCharts
						labels={["Accepted", "Rejected", "Modified"]}
						series={[55, 20, 25]}
						text=""
						type="donut"
						colors={[
							"#106EAD",
							"#C33C5E",
							"#25d366",
							"#BD33B5",
							"#E60023",
							"#005d32",
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default QuotationDashboardCharts;
