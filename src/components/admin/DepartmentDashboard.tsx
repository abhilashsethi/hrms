import { MoreVert } from "@mui/icons-material";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { DepartmentBarChart, DepartmentDonutChart } from "components/analytics";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import { useState, MouseEvent, useEffect } from "react";

const DepartmentDashboard = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [roleLabels, setRoleLabels] = useState<any>([]);
  const [dataValue, setDataValue] = useState<any>([]);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: departmentData } = useFetch<any>(`departments`);
  const { data: departmentDashboard } = useFetch<any>(`departments/dashboard`);

  const cards = [
    {
      id: 1,
      icon: <img className="w-16" src="/department.png" alt="dept icon" />,
      count: departmentData?.departments?.length,
      title: "Total Departments",
    },
    {
      id: 2,
      icon: <img className="" src="/coding.png" alt="Developer icon" />,
      count: "34",
      title: "AI & ML Department",
    },
    {
      id: 3,
      icon: <img className="" src="/hr.png" alt="" />,
      count: "34",
      title: "Web Development",
    },
    {
      id: 4,
      icon: <img src="/application.png" alt="" />,
      count: "34",
      title: "Application Development",
    },
    {
      id: 5,
      icon: <img src="/it_management.png" alt="" />,
      count: "34",
      title: "IT Management",
    },
    {
      id: 6,
      icon: <img src="/financial.png" alt="" />,
      count: "34",
      title: "Accounts Management",
    },
    {
      id: 7,
      icon: <img src="/businessman.png" alt="" />,
      count: "34",
      title: "Sales Management",
    },
    {
      id: 8,
      icon: <img src="/manager.png" alt="" />,
      count: "34",
      title: "Manager",
    },
  ];
  useEffect(() => {
    let reqLabel = departmentDashboard?.departmentWiseUsers?.map(
      (item: any) => item?.name
    );
    setRoleLabels(reqLabel);
    let reqVal = departmentDashboard?.departmentWiseUsers?.map((item: any) =>
      Number(item?._count)
    );
    setDataValue(reqVal);
  }, [departmentData]);

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
              labels={roleLabels?.length ? roleLabels : []}
              data={dataValue?.length ? dataValue : []}
              type="bar"
              text=""
            />
          </div>
          <div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
            <p className="text-lg font-bold text-center">Department Details</p>
            <DepartmentDonutChart
              labels={roleLabels?.length ? roleLabels : []}
              series={dataValue?.length ? dataValue : []}
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
