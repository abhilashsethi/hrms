import MaterialTable from "@material-table/core";
import { Check, Close, Info, PendingActions } from "@mui/icons-material";
import { Button, CircularProgress, Paper } from "@mui/material";
import { HeadStyle, PhotoViewerSmall } from "components/core";
import { LeaveDocuments } from "components/drawer";
import { useChange } from "hooks";
import moment from "moment";
import { useState } from "react";
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

const LeavesColumnManager = ({ data, mutate }: Props) => {
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
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
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
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
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
                  name: _?.leave?.user?.name,
                  photo: _?.leave?.user?.photo ? _?.user?.photo : null,
                  role: _?.leave?.user?.role,
                  totalLeaveThisMonth: _?.leave?.totalLeaveThisMonth,
                  totalLeaveThisYear: _?.leave?.totalLeaveThisYear,
                }))
          }
          options={{
            ...MuiTblOptions(),
            paging: false,
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
              title: "Total approved leave",
              tooltip: "Total approved leave",
              field: "totalLeaveThisMonth",
              render: (item) => {
                {
                  return <div>{item?.totalLeaveThisMonth || "---"}</div>;
                }
              },
            },
            {
              title: "Total leaves this year",
              tooltip: "Total leaves this year",
              field: "totalLeaveThisYear",
              render: (item) => {
                {
                  return <div>{item?.totalLeaveThisYear || "---"}</div>;
                }
              },
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

export default LeavesColumnManager;
