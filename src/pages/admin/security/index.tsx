import { DashboardSkeletonLoading } from "components/admin/assets";
import {
	QuotationDashboardCard,
	QuotationDashboardCharts,
} from "components/admin/quotation";
import {
	SecurityDashboardCard,
	SecurityDashboardCharts,
} from "components/admin/security";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { Quotation } from "types";

const index = () => {
	const { data: dashboardData, isLoading } = useFetch<Quotation>(
		`quotations/dashboard/info`
	);
	return (
		<PanelLayout title="Security Dashboard">
			<>
				<section className="lg:px-8 px-4 py-4">
					<AdminBreadcrumbs links={links} />
					{isLoading ? (
						<DashboardSkeletonLoading />
					) : (
						<>
							<SecurityDashboardCard data={dashboardData} />
							<SecurityDashboardCharts data={dashboardData} />
						</>
					)}
				</section>
			</>
		</PanelLayout>
	);
};

export default index;
const links = [{ id: 1, page: "Security", link: "/admin/security" }];
