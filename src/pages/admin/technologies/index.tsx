import {
  DashBoardCardTech,
  DashboardChartsTech,
} from "components/admin/Technology";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const Technologies = () => {
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const { data: roleDataCard } = useFetch<any>(
    `roles?page=${pageNumber}&limit=3`
  );
  const { data: roleDashboard } = useFetch<any>(`roles/dashboard`);

  return (
    <PanelLayout title="Technologies - HRMS Searchingyard">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <DashBoardCardTech
          dashboardData={roleDashboard}
          roleCard={roleDataCard}
        />
        <DashboardChartsTech
          dashboardData={roleDashboard}
          roleCard={roleDataCard}
        />
      </section>
    </PanelLayout>
  );
};

export default Technologies;
const links = [{ id: 1, page: "Technologies", link: "/admin/technologies" }];
