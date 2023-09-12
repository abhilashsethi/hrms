import { BranchBarChart, ClientLineCharts } from "components/analytics";
import { useAuth, useFetch } from "hooks";

interface CARD_DATA {
	totalSecurities: number;
	totalAppointment: number;
	pendingAppointment: number;
	completedAppointment: number;
}
interface STAT_DATA {
	appointmentCount: number;
	month: string;
}
type DASHBOARD_CHART = {
	dashboardData: STAT_DATA[];
};

const SecurityDashboardCharts = () => {
	const { user } = useAuth();

	const { data: dashboardData } = useFetch<DASHBOARD_CHART[]>(
		`security/appointment-overview?branchId=${user?.employeeOfBranchId}`
	);
	const { data: dashboardDataDonut } = useFetch<CARD_DATA>(
		`security/dashboard-stat?branchId=${user?.employeeOfBranchId}`
	);

	return (
		<div className="w-full">
			<div className="grid lg:grid-cols-2 grid-cols-1 content-between gap-6">
				<div className="px-2 py-4 w-full flex bg-white flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">
						This Year Appointments Overview
					</p>
					<BranchBarChart
						labels={
							dashboardData?.length
								? dashboardData?.map((item: any) => item?.month)
								: null
						}
						data={
							dashboardData?.length
								? dashboardData?.map((item: any) => item?.appointmentCount)
								: null
						}
						type="bar"
						text=""
					/>
				</div>
				<div className="px-2 py-4 pt-9 bg-white w-full gap-5 !border-grey-500 rounded-xl !shadow-xl">
					<p className="text-center text-lg font-bold">Appointments Overview</p>
					<ClientLineCharts
						labels={["Completed Appointments", "Pending Appointments"]}
						series={[
							dashboardDataDonut?.completedAppointment
								? dashboardDataDonut?.completedAppointment
								: null,
							dashboardDataDonut?.pendingAppointment
								? dashboardDataDonut?.pendingAppointment
								: null,
						]}
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

export default SecurityDashboardCharts;
