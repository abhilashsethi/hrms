import {
	AssetsDashboardCard,
	AssetsDashboardCharts,
	DashboardSkeletonLoading,
} from "components/admin/assets";
import { AdminBreadcrumbs, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const index = () => {
	const { data: branchDashboard, isLoading } = useFetch<any>(
		`branches/dashboardInfo/data`
	);
	const { data: dashboardData, isLoading: dashboardDataLoading } =
		useFetch<any>(`assets/dashboard/details`);
	console.log(dashboardData);
	return (
		<PanelLayout title="All Branches - Admin Panel">
			<>
				<section className="lg:px-8 px-4 py-4">
					<AdminBreadcrumbs links={links} />
					{isLoading ? (
						<DashboardSkeletonLoading />
					) : (
						<>
							<AssetsDashboardCard
								data={dashboardData}
								branch={branchDashboard}
							/>
							<AssetsDashboardCharts data={dashboardData} />
						</>
					)}
				</section>
			</>
		</PanelLayout>
	);
};

export default index;
const links = [{ id: 1, page: "Assets", link: "/admin/assets" }];
