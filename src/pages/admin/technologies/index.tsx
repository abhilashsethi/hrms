import {
  DashBoardCardTech,
  DashboardChartsTech,
} from "components/admin/Technology";
import { DashboardSkeletonLoading } from "components/admin/assets";
import { AdminBreadcrumbs, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const Technologies = () => {
  const { data: techDashboard, isLoading } = useFetch<any>(
    `technologies/dashboard/details`
  );
  return (
    <PanelLayout title="Technologies ">
      <section className="lg:px-8 px-4 py-4">
        <AdminBreadcrumbs links={links} />
        {isLoading ? (
          <DashboardSkeletonLoading />
        ) : (
          <>
            <DashBoardCardTech dashboardData={techDashboard} />
            <DashboardChartsTech dashboardData={techDashboard} />
          </>
        )}
      </section>
    </PanelLayout>
  );
};

export default Technologies;
const links = [{ id: 1, page: "Technologies", link: "/admin/technologies" }];
