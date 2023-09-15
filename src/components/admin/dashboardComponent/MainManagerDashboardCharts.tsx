import { GuestBarChart, GuestDonutChart } from "components/analytics";
import { NoDatas, PhotoViewer } from "components/core";
import { useAuth, useFetch } from "hooks";
import { ASSET } from "types";
interface Props {
	data?: any;
}
const MainManagerDashboardCharts = ({ data }: Props) => {
	const { user } = useAuth();
	const { data: dashboardData } = useFetch<any>(
		`dashboards/manager/dashboard?managerId=${user?.id}&branchId=${user?.employeeOfBranchId}`
	);
	console.log(dashboardData);
	const { data: assetsData } = useFetch<ASSET[]>(
		`assets?branchId=${user?.employeeOfBranchId}`
	);
	console.log(assetsData);
	return (
		<div className="w-full">
			<div className="grid lg:grid-cols-2 content-between gap-6">
				<div className="px-2 py-4 w-full bg-white  justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">
						This Year Leaves Overview
					</p>
					{dashboardData?.currentYearLeaveData?.length ? (
						<GuestBarChart
							labels={
								dashboardData?.currentYearLeaveData?.length
									? dashboardData?.currentYearLeaveData?.map(
											(item: any) => item?.month
									  )
									: []
							}
							data={
								dashboardData?.currentYearLeaveData?.length
									? dashboardData?.currentYearLeaveData?.map(
											(item: any) => item?.leaveCount
									  )
									: []
							}
							type="bar"
							text=""
						/>
					) : (
						<NoDatas title={"No Leaves This Year"} />
					)}
				</div>
				<div className="w-full px-2 py-4  bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Assets Overview</p>
					{dashboardData?.assetOverView?.length ? (
						<GuestDonutChart
							labels={
								dashboardData?.assetOverView?.length
									? dashboardData?.assetOverView?.map((item: any) => item?.type)
									: []
							}
							series={
								dashboardData?.assetOverView?.length
									? dashboardData?.assetOverView?.map(
											(item: any) => item?.count
									  )
									: []
							}
							text=""
							type="pie"
							colors={["#25d366", "#E60023", "#BD33B5"]}
						/>
					) : (
						<NoDatas title={"No Assets"} />
					)}
				</div>
				<div className="w-full px-2 py-4  bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">
						Current Year Asset Overview
					</p>
					{dashboardData?.currentYearAssetDetails?.length ? (
						<GuestBarChart
							labels={
								dashboardData?.currentYearAssetDetails?.length
									? dashboardData?.currentYearAssetDetails?.map(
											(item: any) => item?.month
									  )
									: []
							}
							data={
								dashboardData?.currentYearAssetDetails?.length
									? dashboardData?.currentYearAssetDetails?.map(
											(item: any) => item?.assetCount
									  )
									: []
							}
							type="bar"
							text=""
						/>
					) : (
						<NoDatas title={"No Assets"} />
					)}
				</div>
				<div className="px-2 py-4 w-full bg-white  justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">Resent Assets</p>

					<div className="px-2 bg-white w-full">
						<div className=" overflow-scroll grid grid-cols-3">
							{assetsData?.length ? (
								<>
									{assetsData
										?.slice(0, 4)
										?.sort(
											(a: any, b: any) =>
												(new Date(b?.createdAt) as any) -
												(new Date(a?.createdAt) as any)
										)
										?.map?.((item, i) => {
											return (
												<div key={i}>
													<div className="border border-1 shadow-lg rounded-lg p-5 mb-2">
														<div className="flex items-center gap-3">
															<div className="flex flex-col">
																<p className="font-medium text-sm">
																	Asset:{" "}
																	<span className="font-semibold text-sm">
																		{item?.assetType}
																	</span>
																</p>
															</div>
														</div>
														<div className="flex justify-between items-center mt-3">
															<div className="text-sm font-semibold "></div>
															<button
																className={`hover:scale-105 transition duration-500 ease-in-out text-xs font-medium ${
																	item?.isAssign
																		? `text-white bg-yellow-500`
																		: `text-white bg-green-500`
																} p-1 h-7 rounded-lg text-center`}
															>
																{item?.isAssign ? "Assigned" : "Not Assigned"}
															</button>
														</div>
													</div>
												</div>
											);
										})}
								</>
							) : (
								<NoDatas title={"No Leave Taken"} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainManagerDashboardCharts;
