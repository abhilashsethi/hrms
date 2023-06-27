import { DashboardSkeletonLoading } from "components/admin/assets";
import {
	QuotationDashboardCard,
	QuotationDashboardCharts,
} from "components/admin/quotation";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const index = () => {
	const { data: branchDashboard, isLoading } = useFetch<any>(
		`branches/dashboardInfo/data`
	);
	const { data: dashboardData } = useFetch<any>(`assets/dashboard/details`);
	return (
		<PanelLayout title="All Branches - Admin Panel">
			<>
				<section className="lg:px-8 px-4 py-4">
					<AdminBreadcrumbs links={links} />
					{isLoading ? (
						<DashboardSkeletonLoading />
					) : (
						<>
							<QuotationDashboardCard
								data={dashboardData}
								branch={branchDashboard}
							/>
							<QuotationDashboardCharts data={dashboardData} />
						</>
					)}
				</section>
			</>
		</PanelLayout>
	);
};

export default index;
const links = [{ id: 1, page: "Quotation", link: "/admin/quotation" }];
