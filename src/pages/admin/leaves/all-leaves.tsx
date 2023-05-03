import MaterialTable from "@material-table/core";
import {
  Add,
  GridViewRounded,
  KeyboardArrowDownRounded,
  MedicalInformationRounded,
  PeopleAlt,
  RadioButtonChecked,
  Search,
  TableRowsRounded,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { SAMPLEDP } from "assets/home";
import { LeavesColumn, LeavesGrid } from "components/admin";
import { AdminBreadcrumbs, HeadStyle } from "components/core";
import { CreateLeave } from "components/dialogues";
import PanelLayout from "layouts/panel";
import { useState, MouseEvent } from "react";
import { MuiTblOptions } from "utils";

const Leaves = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isLeave, setIsLeave] = useState<boolean>(false);
  return (
    <PanelLayout title="Leaves - Admin Panel">
      <section className="px-8 py-6">
        <CreateLeave open={isLeave} handleClose={() => setIsLeave(false)} />
        <div className="flex justify-between items-center py-4">
          <AdminBreadcrumbs links={links} />
          <div className="flex gap-4 items-center">
            <div className="flex gap-1">
              <IconButton onClick={() => setIsGrid(true)} size="small">
                <div
                  className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                    isGrid && `border-2 border-theme`
                  }`}
                >
                  <GridViewRounded className={`${isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
              <IconButton onClick={() => setIsGrid(false)} size="small">
                <div
                  className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                    !isGrid && `border-2 border-theme`
                  }`}
                >
                  <TableRowsRounded className={`${!isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
            </div>
            <Button
              onClick={() => setIsLeave((prev) => !prev)}
              startIcon={<Add />}
              variant="contained"
              className="!bg-theme"
            >
              ADD LEAVE
            </Button>
          </div>
        </div>

        {/* <Grid container spacing={3}>
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
        </Grid> */}
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
        {isGrid ? <LeavesGrid /> : <LeavesColumn />}
      </section>
    </PanelLayout>
  );
};

export default Leaves;

const LeaveStatus = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
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