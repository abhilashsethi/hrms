import { BranchBarChart, ClientLineCharts } from "components/analytics";
import React from "react";
import { Quotation } from "types";
interface Props {
	data?: Quotation;
}
const QuotationDashboardCharts = ({ data }: Props) => {
	return (
		<div className="w-full">
			<div className="grid lg:grid-cols-2 grid-cols-1 content-between gap-6">
				<div className="px-2 py-4 w-full flex bg-white flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">
						This Year Quotation Overview
					</p>
					<BranchBarChart
						labels={
							data?.acceptedQuotationOfCurrentYear?.length
								? data?.acceptedQuotationOfCurrentYear?.map(
										(item) => item?.month
								  )
								: null
						}
						data={
							data?.acceptedQuotationOfCurrentYear?.length
								? data?.acceptedQuotationOfCurrentYear?.map(
										(item) => item?.count
								  )
								: null
						}
						type="bar"
						text=""
					/>
				</div>
				<div className="px-2 py-4 pt-9 bg-white w-full gap-5 !border-grey-500 rounded-xl !shadow-xl">
					<p className="text-center text-lg font-bold">Quotation Overview</p>
					<ClientLineCharts
						labels={
							data?.allQuotationStatus?.length
								? data?.allQuotationStatus?.map((item) => item?.status)
								: null
						}
						series={
							data?.allQuotationStatus?.length
								? data?.allQuotationStatus?.map((item) => item?._count)
								: null
						}
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
