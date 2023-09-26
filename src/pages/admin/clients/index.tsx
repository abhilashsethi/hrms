import { DashboardSkeletonLoading } from "components/admin/assets";
import {
	ClientDashboardCard,
	ClientDashboardCharts,
} from "components/admin/clients";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { Client } from "types";

const index = () => {
	const { data: clientData, isLoading } = useFetch<Client>(
		`clients/dashboard/details`
	);
	console.log(clientData);
	return (
		<PanelLayout title="Clients Dashboard ">
			<div className="px-4 pt-4">
				<AdminBreadcrumbs links={links} />
			</div>
			{isLoading ? (
				<DashboardSkeletonLoading />
			) : (
				<>
					<div className="flex gap-2 py-4">
						<div className="w-full px-4 ">
							<ClientDashboardCard cards={clientData} />
							<ClientDashboardCharts cards={clientData} />
						</div>
					</div>
				</>
			)}
		</PanelLayout>
	);
};

export default index;
const links = [{ id: 1, page: "Clients", link: "/admin/clients" }];
