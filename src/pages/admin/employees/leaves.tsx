import MaterialTable from "@material-table/core";
import {
  Add,
  KeyboardArrowDownRounded,
  PeopleAlt,
  RadioButtonChecked,
  Search,
} from "@mui/icons-material";
import { Button, Grid, Menu, MenuItem, Paper, TextField } from "@mui/material";
import { SAMPLEDP } from "assets/home";
import { AdminBreadcrumbs, HeadStyle } from "components/core";
import PanelLayout from "layouts/panel";
import React from "react";
import { MuiTblOptions } from "utils";

const Leaves = () => {
  return (
    <PanelLayout title="Leaves - Admin Panel">
      <section className="px-8 py-6">
        <AdminBreadcrumbs links={links} />
        <div className="flex justify-end mb-4">
          <Button startIcon={<Add />} variant="contained" className="!bg-theme">
            ADD LEAVE
          </Button>
        </div>
        <Grid container spacing={3}>
          {cards?.map((item) => (
            <Grid key={item?.id} item lg={3}>
              <div className="w-full h-32 bg-gradient-to-b from-theme-50 via-white to-white tracking-wide border-b-4 border-theme shadow-md rounded-xl flex justify-center items-center flex-col gap-4">
                <p className="font-semibold">{item?.title}</p>
                <p className="flex gap-1.5 items-end">
                  <span className="text-xl pb-0.5 font-bold">
                    {item?.value}
                  </span>
                  <span className="text-sm">Today</span>
                </p>
              </div>
            </Grid>
          ))}
        </Grid>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <TextField
            fullWidth
            size="small"
            id="employeeId"
            placeholder="Employee Id"
            name="employeeId"
          />
          <TextField
            fullWidth
            size="small"
            id="employeeName"
            placeholder="Leave Type"
            name="employeeName"
          />
          <TextField
            fullWidth
            size="small"
            id="employeeName"
            placeholder="Leave Status"
            name="employeeName"
          />
          <Button
            fullWidth
            startIcon={<Search />}
            variant="contained"
            className="!bg-theme"
          >
            Search
          </Button>
        </div>
        <div className="mt-6">
          <MaterialTable
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Leaves" icon={<PeopleAlt />} />}
            isLoading={!data}
            data={
              !data?.length
                ? []
                : data?.map((_: any, i: number) => ({ ..._, sn: i + 1 }))
            }
            options={{
              ...MuiTblOptions(),
            }}
            columns={[
              {
                title: "#",
                field: "sn",
                editable: "never",
                width: "2%",
              },
              {
                title: "Employee",
                tooltip: "Employee",
                searchable: true,
                field: "name",
                render: (item) => (
                  <div className="flex gap-3 items-center">
                    <div className="h-12 w-12 rounded-full bg-slate-300 overflow-hidden shadow-lg">
                      <img
                        className="h-full object-cover"
                        src={SAMPLEDP.src}
                        alt=""
                      />
                    </div>
                    <p className="font-semibold">{item?.name}</p>
                  </div>
                ),
              },
              {
                title: "Leave Type",
                tooltip: "Leave Type",
                searchable: true,
                field: "type",
              },
              {
                title: "From",
                tooltip: "From",
                searchable: true,
                field: "from",
              },
              {
                title: "To",
                tooltip: "To",
                searchable: true,
                field: "to",
              },
              {
                title: "No of Days",
                tooltip: "No of Days",
                searchable: true,
                field: "days",
              },
              {
                title: "Reason",
                tooltip: "Reason",
                searchable: true,
                field: "reason",
              },
              {
                title: "Status",
                tooltip: "Status",
                field: "status",
                render: (item) => <LeaveStatus />,
              },
              // {
              //   title: "Status",
              //   tooltip: "Status",
              //   field: "status",
              //   lookup: {
              //     ACTIVE: "ACTIVE",
              //     PENDING: "PENDING",
              //     BLOCK: "BLOCK",
              //   },
              // },
            ]}
            // cellEditable={{
            //   isCellEditable: (_, columnDef) => columnDef.field === "status",
            //   onCellEditApproved: async (status, oldValue, rowData) => {
            //     console.log(status, oldValue, rowData);
            //   },
            // }}
          />
        </div>
      </section>
    </PanelLayout>
  );
};

export default Leaves;

const LeaveStatus = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="flex gap-3 items-center bg-white px-4 py-1.5 rounded-full font-medium shadow-lg"
      >
        <span className="flex gap-2 items-center">
          <RadioButtonChecked fontSize="small" className="!text-blue-500" />
          Pending
        </span>
        <div>
          <KeyboardArrowDownRounded fontSize="small" />
        </div>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {status?.map((item) => (
          <MenuItem
            key={item?.id}
            className="flex gap-2 items-center"
            onClick={handleClose}
          >
            {item?.icon}
            {item?.value}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const links = [
  { id: 1, page: "Employees", link: "/admin/employees" },
  { id: 2, page: "Leaves", link: "/admin/employees/leaves" },
];

const cards = [
  { id: 1, title: "Today Presents", value: "12/20" },
  { id: 2, title: "Planned Leaves", value: "8" },
  { id: 3, title: "Unplanned Leaves", value: "0" },
  { id: 4, title: "Pending Requests", value: "12" },
];

const data = [
  {
    id: 1,
    name: "Srinu reddy",
    type: "Medical Leave",
    from: "27 Feb 2023",
    to: "27 Feb 2019",
    days: "1 day",
    reason: "Going to Hospital",
    status: "PENDING",
  },
];

const status = [
  {
    id: 1,
    value: "Pending",
    icon: <RadioButtonChecked fontSize="small" className="!text-blue-500" />,
  },
  {
    id: 2,
    value: "Approved",
    icon: <RadioButtonChecked fontSize="small" className="!text-green-500" />,
  },
  {
    id: 3,
    value: "Declined",
    icon: <RadioButtonChecked fontSize="small" className="!text-red-500" />,
  },
];
