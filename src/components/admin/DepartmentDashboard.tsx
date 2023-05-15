import { Grid } from "@mui/material";
import { DepartmentBarChart, DepartmentDonutChart } from "components/analytics";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
const DepartmentDashboard = () => {
  const { data: departmentDashboard } = useFetch<any>(`departments/dashboard`);
  return (
    <>
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="flex gap-2 py-4">
          <div className="w-full px-4 ">
            <Grid container spacing={2}>
              {departmentDashboard?.departmentWiseUsers?.map((item: any) => (
                <Grid key={item?.id} item lg={3}>
                  <div className="group hover:scale-105 transition duration-500 ease-in-out bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer">
                    <div className="flex justify-around items-center pb-3">
                      <div className="p-3 bg-theme rounded-full">
                        <div className="w-16">
                          <img
                            className="w-16"
                            src="/department.png"
                            alt="dept icon"
                          />
                        </div>
                      </div>
                    </div>
                    <span className=" text-theme font-semibold text-center tracking-wide text-md">
                      {item?.name}
                    </span>
                    <span className="text-xl text-theme text-center font-semibold ">
                      {item?._count}
                    </span>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
        <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
          <div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-7 !border-gray-500 rounded-xl !shadow-xl">
            <p className="font-bold text-lg text-center">Department Overview</p>
            <DepartmentBarChart
              labels={
                departmentDashboard?.departmentWiseUsers?.length
                  ? departmentDashboard?.departmentWiseUsers?.map(
                      (item: any) => item.name
                    )
                  : []
              }
              data={
                departmentDashboard?.departmentWiseUsers?.length
                  ? departmentDashboard?.departmentWiseUsers?.map(
                      (item: any) => item._count
                    )
                  : []
              }
              type="bar"
              text=""
            />
          </div>
          <div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
            <p className="text-lg font-bold text-center">Department Details</p>
            <DepartmentDonutChart
              labels={
                departmentDashboard?.departmentWiseUsers?.length
                  ? departmentDashboard?.departmentWiseUsers?.map(
                      (item: any) => item.name
                    )
                  : []
              }
              series={
                departmentDashboard?.departmentWiseUsers?.length
                  ? departmentDashboard?.departmentWiseUsers?.map(
                      (item: any) => item._count
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

export default DepartmentDashboard;
const links = [{ id: 1, page: "Departments", link: "/admin/department" }];
