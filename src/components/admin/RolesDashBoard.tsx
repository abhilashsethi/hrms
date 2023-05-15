import { RoleBarChart, RoleDonutChart } from "components/analytics";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useFetch } from "hooks";
import { ContentPasteGo, AssignmentTurnedIn } from "@mui/icons-material";
import { AdminBreadcrumbs } from "components/core";

const RolesDashBoard = () => {
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const { data: roleDataCard } = useFetch<any>(
    `roles?page=${pageNumber}&limit=3`
  );
  const { data: roleDashboard } = useFetch<any>(`roles/dashboard`);

  return (
    <>
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="flex gap-2 py-4">
          <div className="w-full px-4 ">
            <Grid container spacing={2}>
              <Grid item lg={3}>
                <div className="border-4 border-b-theme h-32 bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
                  <div className="flex justify-around items-center">
                    <div>
                      <ContentPasteGo
                        fontSize="large"
                        className="text-theme group-hover:text-white"
                      />
                    </div>
                  </div>
                  <span className=" text-theme font-semibold text-center tracking-wide text-lg">
                    Total Roles
                  </span>
                  <span className="text-xl text-theme text-center font-semibold">
                    {roleDashboard?.totalRoles}
                  </span>
                </div>
              </Grid>

              {roleDataCard?.roles?.map((item: any) => (
                <>
                  <Grid key={item?.id} item lg={3}>
                    <div className="border-4 border-b-theme h-32 bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
                      <div className="flex justify-around items-center">
                        <div>
                          <AssignmentTurnedIn
                            fontSize="large"
                            className="text-theme"
                          />
                        </div>
                      </div>
                      <span className=" text-theme font-semibold text-center tracking-wide text-lg">
                        {item?.name}
                      </span>
                      <span className="text-xl text-theme text-center font-semibold">
                        {item?._count?.users}
                      </span>
                    </div>
                  </Grid>
                </>
              ))}
            </Grid>
          </div>
        </div>
        <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
          <div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-7 !border-gray-500 rounded-xl !shadow-xl">
            <p className="font-bold text-lg text-center">Role Overview</p>
            <RoleBarChart
              labels={
                roleDashboard?.roleWiseUsers?.length
                  ? roleDashboard?.roleWiseUsers?.map((item: any) => item?.name)
                  : []
              }
              data={
                roleDashboard?.roleWiseUsers?.length
                  ? roleDashboard?.roleWiseUsers?.map(
                      (item: any) => item?._count
                    )
                  : []
              }
              type="bar"
              text=""
            />
          </div>
          <div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
            <p className="text-lg font-bold text-center">Role Details</p>
            <RoleDonutChart
              labels={
                roleDashboard?.roleWiseUsers?.length
                  ? roleDashboard?.roleWiseUsers?.map((item: any) => item?.name)
                  : []
              }
              series={
                roleDashboard?.roleWiseUsers?.length
                  ? roleDashboard?.roleWiseUsers?.map(
                      (item: any) => item?._count
                    )
                  : []
              }
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
      </section>
    </>
  );
};

export default RolesDashBoard;
const links = [{ id: 1, page: "Roles", link: "/admin/roles" }];
