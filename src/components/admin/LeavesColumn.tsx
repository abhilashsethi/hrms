import MaterialTable from "@material-table/core";
import {
  KeyboardArrowDownRounded,
  MedicalInformationRounded,
  RadioButtonChecked,
} from "@mui/icons-material";
import { Menu, MenuItem, Paper } from "@mui/material";
import { SAMPLEDP } from "assets/home";
import { HeadStyle } from "components/core";
import { useState, MouseEvent } from "react";
import { MuiTblOptions } from "utils";

const LeavesColumn = () => {
  const [isLeave, setIsLeave] = useState<boolean>(false);

  return (
    <>
      <div className="mt-6">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <HeadStyle name="Leaves" icon={<MedicalInformationRounded />} />
          }
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
          ]}
        />
      </div>
    </>
  );
};

export default LeavesColumn;
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
