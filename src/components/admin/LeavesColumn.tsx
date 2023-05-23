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
import { Button, CircularProgress, Menu, MenuItem, Paper } from "@mui/material";
import { HeadStyle, PhotoViewerSmall } from "components/core";
import { LeaveDocuments } from "components/drawer";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { useState, MouseEvent, useEffect } from "react";
import Swal from "sweetalert2";
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
  data?: any;
  mutate?: any;
}

const LeavesColumn = ({ data, mutate }: Props) => {
  const [activeData, setActiveData] = useState<any>({});
  const [isDetails, setIsDetails] = useState(false);

  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const [rloading, setRLoading] = useState(false);
  const [isDocuments, setIsDocuments] = useState(false);
  const approveLeave = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    }).then(async (result) => {
      if (result?.isConfirmed) {
        setLoading(true);
        try {
          const res = await change(`leaves/${id}`, {
            method: "PATCH",
            body: { status: "Approved" },
          });
          setLoading(false);
          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            setLoading(false);
            return;
          }
          Swal.fire(`Success`, `Status changed successfully!`, `success`);
          mutate();
          return;
        } catch (error) {
          console.log(error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    });
  };
  const rejectLeave = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject!",
    }).then(async (result) => {
      if (result?.isConfirmed) {
        setRLoading(true);
        try {
          const res = await change(`leaves/${id}`, {
            method: "PATCH",
            body: { status: "Rejected" },
          });
          setRLoading(false);
          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            setRLoading(false);
            return;
          }
          Swal.fire(`Success`, `Status changed successfully!`, `success`);
          mutate();
          return;
        } catch (error) {
          console.log(error);
          setRLoading(false);
        } finally {
          setRLoading(false);
        }
      }
    });
  };
  const renderStatus = (item: any) => {
    switch (item?.status) {
      case "Approved":
        return (
          <div className="flex justify-center">
            <span className="bg-green-600 text-white white rounded-full px-6 py-1 text-sm">
              {item?.status}
            </span>
          </div>
        );
      case "Pending":
        return (
          <>
            <div className="md:flex items-center justify-center mt-2 pt-2 space-x-3">
              <Button
                onClick={() => approveLeave(item?.id)}
                className="!bg-green-600"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Check />}
                size="small"
              >
                ACCEPT
              </Button>
              <Button
                onClick={() => rejectLeave(item?.id)}
                className="!bg-red-600"
                disabled={rloading}
                variant="contained"
                startIcon={
                  rloading ? <CircularProgress size={20} /> : <Close />
                }
                size="small"
              >
                DECLINE
              </Button>
            </div>
          </>
        );
      case "Rejected":
        return (
          <div className="flex justify-center">
            <span className="bg-red-600 text-white rounded-full px-6 py-1 text-sm">
              {item?.status}
            </span>
          </div>
        );
      default:
        return (
          <>
            <span>{item?.status}</span>
          </>
        );
    }
  };
  return (
    <>
      <LeaveDocuments
        data={activeData}
        open={isDetails}
        onClose={() => setIsDetails(false)}
      />
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
              : data?.map((_: any, i: number) => ({
                  ..._,
                  sn: i + 1,
                  name: _?.user?.name,
                  photo: _?.user?.photo ? _?.user?.photo : null,
                  role: _?.user?.role?.name,
                  thisMonth: getYearLeaves(_?.user?.id),
                }))
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
              field: "photo",
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
            // {
            //   title: "This Month Leaves",
            //   tooltip: "This Month Leaves",
            //   field: "thisMonth",
            // },
            // {
            //   title: "This Year Leaves",
            //   tooltip: "Role",
            //   field: "role",
            //   render: (item) => <span>{getYearLeaves(item?.user?.id)}</span>,
            // },
            {
              title: "Details",
              tooltip: "Details",
              field: "status",
              render: (item) => {
                {
                  return (
                    <div
                      onClick={() => {
                        setActiveData(item);
                        setIsDetails(true);
                      }}
                      className="h-7 w-7 bg-black text-white flex justify-center items-center rounded-md cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 shadow-lg"
                    >
                      <Info fontSize="small" />
                    </div>
                  );
                }
              },
            },
            // {
            //   title: "Approved by Manager",
            //   tooltip: "status",
            //   width: "3%",
            //   field: "status",
            //   render: (item) => (
            //     <>
            //       {item?.approvedByManager === "yes" ? (
            //         <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-green-500">
            //           <Check fontSize="small" className="" />
            //         </div>
            //       ) : item?.approvedByManager === "pending" ? (
            //         <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-blue-500">
            //           <HourglassBottomRounded fontSize="small" className="" />
            //         </div>
            //       ) : (
            //         <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-red-600">
            //           <Close fontSize="small" className="" />
            //         </div>
            //       )}
            //     </>
            //   ),
            // },
            // {
            //   title: "Approved by HR",
            //   tooltip: "status",
            //   field: "status",
            //   render: (item) => (
            //     <>
            //       {item?.approvedByHR === "yes" ? (
            //         <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-green-500">
            //           <Check fontSize="small" className="" />
            //         </div>
            //       ) : item?.approvedByHR === "pending" ? (
            //         <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-blue-500">
            //           <HourglassBottomRounded fontSize="small" className="" />
            //         </div>
            //       ) : (
            //         <div className="h-7 w-7 rounded-md flex justify-center items-center text-white shadow-md !bg-red-600">
            //           <Close fontSize="small" className="" />
            //         </div>
            //       )}
            //     </>
            //   ),
            // },
            {
              title: "Status",
              tooltip: "Status",
              field: "status",
              render: (item) => {
                {
                  return <div>{renderStatus(item)}</div>;
                }
              },
            },
            {
              title: "Total leaves this month",
              tooltip: "Total leaves this month",
              field: "totalLeaveThisMonth",
            },
            {
              title: "Total leaves this year",
              tooltip: "Total leaves this year",
              field: "totalLeaveThisYear",
            },
            {
              title: "Created At",
              tooltip: "Created At",
              field: "createdAt",
              render: (item) => (
                <span className="text-sm">
                  {moment(new Date(item?.createdAt).toISOString()).format(
                    "lll"
                  )}
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

const getYearLeaves = ({ id }: any) => {
  const { data: empLeaves } = useFetch<any>(`leaves/details/${id}`);
  return empLeaves?.totalLeavesCurrentYear
    ? empLeaves?.totalLeavesCurrentYear
    : 0;
};
