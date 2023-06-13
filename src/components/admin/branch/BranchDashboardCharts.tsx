import { BranchBarChart, BranchBarChartDetails } from "components/analytics";
import React from "react";
interface Props {
	data?: any;
}
const BranchDashboardCharts = ({ data }: Props) => {
	console.log(data?.countryWiseBranchCount?.length);
	return (
		<div className="w-full">
			<div className="grid lg:grid-cols-3 grid-cols-1 content-between gap-6">
				<div className="px-2 py-4 w-full flex bg-white flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">
						Country Wise Branch Overview
					</p>
					<BranchBarChart
						labels={
							data?.countryWiseBranchCount?.length
								? data?.countryWiseBranchCount?.map((item: any) => item.country)
								: []
						}
						data={
							data?.countryWiseBranchCount?.length
								? data?.countryWiseBranchCount?.map((item: any) => item.count)
								: []
						}
						type="bar"
						text=""
					/>
				</div>
				<div className="w-full lg:col-span-2 px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">
						Branch Wise Employee Overview
					</p>
					<BranchBarChartDetails
						labels={
							data?.branchWiseEmployeeCount?.length
								? data?.branchWiseEmployeeCount?.map((item: any) => item.branchName)
								: []
						}
						data={
							data?.branchWiseEmployeeCount?.length
								? data?.branchWiseEmployeeCount?.map(
									(item: any) => item.employeesCount
								)
								: []
						}
						type="bar"
						text=""
					/>
				</div>
			</div>
		</div>
	);
};

export default BranchDashboardCharts;
