import MaterialTable from "@material-table/core";
import {
  Check,
  Close,
  Done,
  HourglassBottomRounded,
  Info,
  KeyboardArrowDownRounded,
  PendingActions,
  RadioButtonChecked,
} from "@mui/icons-material";
import { Button, Menu, MenuItem, Paper } from "@mui/material";
import { HeadStyle, PhotoViewerSmall } from "components/core";
import { LeaveDocuments } from "components/drawer";
import moment from "moment";
import { useState, MouseEvent } from "react";
import { MuiTblOptions } from "utils";

interface Array {
  photo?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  status?: string | undefined;
  credit?: number | undefined;
  monthlyleft?: number | undefined;
  anuualleft?: number | undefined;
  approvedByManager?: string | undefined;
  approvedByHR?: string | undefined;
}
interface Props {
  data?: Array[];
}

const LeavesColumn = ({ data }: Props) => {
  const [isDetails, setIsDetails] = useState(false);
  const renderStatus = (status: any) => {
    switch (status) {
      case "Approved":
        return (
          <div className="">
            <span className="!bg-[#44bd44] w-32 text-sm shadow-md text-white px-4 rounded-full py-1 tracking-wide flex gap-2 items-center">
              <Done fontSize="small" /> {status}
            </span>
          </div>
        );
      case "Pending":
        return (
          <>
            <div className="md:flex items-center justify-center gap-2">
              <Button
                className="!bg-[#44bd44]"
                variant="contained"
                startIcon={<Check />}
                size="small"
              >
                ACCEPT
              </Button>
              <Button
                className="!bg-red-600"
                variant="contained"
                startIcon={<Close />}
                size="small"
              >
                DECLINE
              </Button>
            </div>
          </>
        );
      case "Decline":
        return (
          <div className="">
            <span className="!bg-red-600 w-28 text-sm shadow-md text-white px-4 rounded-full py-1 tracking-wide flex gap-2 items-center">
              <Close fontSize="small" /> {status}
            </span>
          </div>
        );
      default:
        return (
          <div className="">
            <span className="!bg-blue-500 w-28 text-sm shadow-md text-white px-4 rounded-full py-1 tracking-wide flex gap-2 items-center">
              <HourglassBottomRounded fontSize="small" /> Pending
            </span>
          </div>
        );
    }
  };
  return (
    <>
      <LeaveDocuments open={isDetails} onClose={() => setIsDetails(false)} />
      <div className="mt-6">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={<HeadStyle name="Leave Requests" icon={<PendingActions />} />}
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
              title: "Photo",
              tooltip: "Photo",
              searchable: true,
              field: "name",
              render: (item) => (
                <PhotoViewerSmall
                  name={item?.name}
                  photo={item?.photo}
                  size="2.5rem"
                />
              ),
            },
            {
              title: "Name",
              tooltip: "Employee Name",
              searchable: true,
              field: "name",
              render: (item) => (
                <span className="font-semibold">{item?.name}</span>
              ),
            },
            {
              title: "Role",
              tooltip: "Role",
              field: "role",
              render: (item) => (
                <span className="italic text-gray-600text-sm font-medium ">
                  {item?.role}
                </span>
              ),
            },
            {
              title: "Monthly Left",
              tooltip: "Role",
              field: "role",
              render: (item) => <span className="">{item?.monthlyleft}</span>,
            },
            {
              title: "Annual Left",
              tooltip: "Role",
              field: "role",
              render: (item) => <span className="">{item?.anuualleft}</span>,
            },
            {
              title: "Details",
              tooltip: "Details",
              field: "status",
              render: (item) => {
                {
                  return (
                    <div
                      onClick={() => setIsDetails(true)}
                      className="h-7 w-7 bg-black text-white flex justify-center items-center rounded-md cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 shadow-lg"
                    >
                      <Info fontSize="small" />
                    </div>
                  );
                }
              },
            },
            {
              title: "Approved by Manager",
              tooltip: "status",
              width: "3%",
              field: "status",
              render: (item) => (
                <>
                  {item?.approvedByManager === "yes" ? (
                    <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-green-500">
                      <Check fontSize="small" className="" />
                    </div>
                  ) : item?.approvedByManager === "pending" ? (
                    <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-blue-500">
                      <HourglassBottomRounded fontSize="small" className="" />
                    </div>
                  ) : (
                    <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-red-600">
                      <Close fontSize="small" className="" />
                    </div>
                  )}
                </>
              ),
            },
            {
              title: "Approved by HR",
              tooltip: "status",
              field: "status",
              render: (item) => (
                <>
                  {item?.approvedByHR === "yes" ? (
                    <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-green-500">
                      <Check fontSize="small" className="" />
                    </div>
                  ) : item?.approvedByHR === "pending" ? (
                    <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-blue-500">
                      <HourglassBottomRounded fontSize="small" className="" />
                    </div>
                  ) : (
                    <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-red-600">
                      <Close fontSize="small" className="" />
                    </div>
                  )}
                </>
              ),
            },
            {
              title: "Status",
              tooltip: "Status",
              field: "status",
              render: (item) => {
                {
                  return <div>{renderStatus(item.status)}</div>;
                }
              },
            },
            {
              title: "Created At",
              tooltip: "Created At",
              field: "status",
              render: (item) => (
                <span className="text-sm">
                  {moment(new Date().toISOString()).format("lll")}
                </span>
              ),
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
