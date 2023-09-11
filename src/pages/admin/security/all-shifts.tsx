import MaterialTable from "@material-table/core";
import { BorderColor, Delete, MeetingRoom } from "@mui/icons-material";
import { Avatar, Pagination, Paper, Stack, Tooltip } from "@mui/material";
import { AdminBreadcrumbs, HeadStyle } from "components/core";
import { EditShift } from "components/dialogues";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { SHIFT } from "types";
import { MuiTblOptions } from "utils";

const AllShifts = () => {
  const [isLeave, setIsLeave] = useState<boolean>(false);
  const [editDetails, setEditDetails] = useState<boolean>(false);
  const [editShiftData, setEditShiftData] = useState<SHIFT>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const {
    data: shiftData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any>(`security/shift?page=${pageNumber}&limit=6`);
  console.log(shiftData);
  const { change } = useChange();
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const response = await change(`security/shift/${id}`, {
            method: "DELETE",
          });
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          Swal.fire("Success", "Deleted successfully!", "success");
          mutate();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const router = useRouter();

  return (
    <>
      <PanelLayout title="All Shifts ">
        <section className="md:px-8 px-2">
          <AdminBreadcrumbs links={links} />
          <EditShift
            open={editDetails}
            handleClose={() => setEditDetails(false)}
            shiftData={editShiftData}
            mutate={mutate}
          />
          <div className="mt-6">
            <MaterialTable
              components={{
                Container: (props) => <Paper {...props} elevation={5} />,
              }}
              title={<HeadStyle name="All Shifts" icon={<MeetingRoom />} />}
              // isLoading={!data}
              data={
                !shiftData?.length
                  ? []
                  : shiftData?.map((_: any, i: number) => ({
                      ..._,
                      sn: i + 1,
                      branchName: _?.branchData?.name,
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
                  // width: "2%",
                },
                {
                  title: "Branch",
                  tooltip: "Branch",
                  searchable: true,
                  field: "branchName",
                },
                {
                  title: "Shift",
                  tooltip: "Shift",
                  searchable: true,
                  field: "type",
                },
                {
                  title: "Start Time",
                  tooltip: "Start Time",
                  searchable: true,
                  field: "startTime",
                },
                {
                  title: "End TIme",
                  tooltip: "End Time",
                  searchable: true,
                  field: "endTime",
                },

                {
                  title: "Actions",
                  cellStyle: {
                    textAlign: "right",
                  },
                  export: true,
                  // width: "18%",
                  // field: "pick",
                  render: (item) => (
                    <>
                      <div className="flex">
                        <Tooltip title="Edit">
                          <Avatar
                            // onClick={() => setOpenAddCustomerDrawer(row)}
                            onClick={() => {
                              setEditDetails((prev) => !prev),
                                setEditShiftData(item);
                            }}
                            variant="rounded"
                            className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-theme !p-0"
                            sx={{
                              mr: ".1vw",
                              padding: "0px !important",
                              backgroundColor: "Highlight",
                              cursor: "pointer",
                              color: "",
                            }}
                          >
                            <BorderColor sx={{ padding: "0px !important" }} />
                          </Avatar>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Avatar
                            onClick={() => handleDelete(item?._id?.$oid)}
                            variant="rounded"
                            className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-700 !p-0"
                            sx={{
                              mr: "0.1vw",
                              padding: "0px !important",
                              backgroundColor: "Highlight",
                              cursor: "pointer",
                              color: "",
                            }}
                          >
                            <Delete sx={{ padding: "0px !important" }} />
                          </Avatar>
                        </Tooltip>
                      </div>
                    </>
                  ),
                },
              ]}
            />
          </div>
          <section className="mb-6">
            {Math.ceil(
              Number(pagination?.total || 1) / Number(pagination?.limit || 1)
            ) > 1 ? (
              <div className="flex justify-center md:py-8 py-4">
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(
                      Number(pagination?.total || 1) /
                        Number(pagination?.limit || 1)
                    )}
                    onChange={(e, v: number) => {
                      setPageNumber(v);
                    }}
                    page={pageNumber}
                    variant="outlined"
                  />
                </Stack>
              </div>
            ) : null}
          </section>
        </section>
      </PanelLayout>
    </>
  );
};

export default AllShifts;

const links = [
  { id: 1, page: "Meetings", link: "/admin/meetings" },
  { id: 2, page: "All Meetings", link: "/admin/meetings/all-meetings" },
];
