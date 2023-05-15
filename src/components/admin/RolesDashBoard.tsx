import { RoleBarChart, RoleDonutChart } from "components/analytics";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent, useEffect } from "react";
import { useFetch } from "hooks";
import {
  ContentPasteGo,
  AssignmentTurnedIn,
  PendingActions,
  Pending,
  MoreVert,
} from "@mui/icons-material";
import { AdminBreadcrumbs } from "components/core";

const RolesDashBoard = () => {
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

  const { data: roleData } = useFetch<any>(`roles`);
  const { data: roleDashboard } = useFetch<any>(`roles/dashboard`);

  const cards = [
    {
      id: 1,
      icon: (
        <ContentPasteGo
          fontSize="large"
          className="text-theme group-hover:text-white"
        />
      ),
      count: roleDashboard?.totalRoles,
      title: "Total Roles",
    },
    {
      id: 2,
      icon: <PendingActions fontSize="large" className="text-theme" />,
      count: "34",
      title: "Developer",
    },
    {
      id: 3,
      icon: <AssignmentTurnedIn fontSize="large" className="text-theme" />,
      count: "34",
      title: "HR",
    },
    {
      id: 4,
      icon: <Pending fontSize="large" className="text-theme" />,
      count: "34",
      title: "Sales Executive",
    },
  ];
  useEffect(() => {
    let reqLabel = roleDashboard?.roleWiseUsers?.map((item: any) => item?.name);
    setRoleLabels(reqLabel);
    let reqVal = roleData?.roles?.map((item: any) =>
      Number(item?._count?.users)
    );
    setDataValue(reqVal);
  }, [roleData]);

  return (
    <>
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="flex gap-2 py-4">
          <div className="w-full px-4 ">
            <Grid container spacing={2}>
              {cards?.map((item) => (
                <Grid key={item?.id} item lg={3}>
                  <div className="border-4 border-b-theme h-32 bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
                    <div className="flex justify-around items-center">
                      <div>{item?.icon}</div>
                    </div>
                    <span className=" text-theme font-semibold text-center tracking-wide text-lg">
                      {item?.title}
                    </span>
                    <span className="text-xl text-theme text-center font-semibold">
                      {item?.count}
                    </span>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
        <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
          <div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-7 !border-gray-500 rounded-xl !shadow-xl">
            <p className="font-bold text-lg text-center">Role Overview</p>
            <RoleBarChart
              labels={roleLabels?.length ? roleLabels : []}
              data={dataValue?.length ? dataValue : []}
              type="bar"
              text=""
            />
          </div>
          <div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
            <p className="text-lg font-bold text-center">Role Details</p>
            <RoleDonutChart
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

export default RolesDashBoard;
const links = [{ id: 1, page: "Roles", link: "/admin/roles" }];
