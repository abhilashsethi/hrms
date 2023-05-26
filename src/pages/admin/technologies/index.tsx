import {
  DashBoardCardTech,
  DashboardChartsTech,
} from "components/admin/Technology";
import { AdminBreadcrumbs, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const Technologies = () => {
  const { data: techDashboard, isLoading } = useFetch<any>(
    `technologies/dashboard/details`
  );
  const { data: tech } = useFetch<any[]>(`technologies?page=1&limit=3`);
  return (
    <PanelLayout title="Technologies - Admin Panel">
      <section className="lg:px-8 px-4 py-4">
        <AdminBreadcrumbs links={links} />
        {isLoading && <Loader />}
        <DashBoardCardTech dashboardData={techDashboard} tech={tech} />
        <DashboardChartsTech dashboardData={techDashboard} />
      </section>
    </PanelLayout>
  );
};

export default Technologies;
const links = [{ id: 1, page: "Technologies", link: "/admin/technologies" }];
