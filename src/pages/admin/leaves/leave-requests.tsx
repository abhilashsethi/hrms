import { Add, RadioButtonChecked } from "@mui/icons-material";
import { Button, MenuItem, Pagination, Stack, TextField } from "@mui/material";
import { LeavesColumn, LeavesGrid } from "components/admin";
import {
  AdminBreadcrumbs,
  FiltersContainer,
  GridAndList,
  Loader,
  LoaderAnime,
} from "components/core";
import { CreateLeave } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { Leave } from "types";

const LeaveRequests = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [userName, setUsername] = useState<string | null>(null);
  const [empId, setEmpId] = useState<string | null>(null);
  const [leaveType, setLeaveType] = useState<string>("");
  const [leaveStatus, setLeaveStatus] = useState<string>("");
  const [isLeave, setIsLeave] = useState<boolean>(false);
  const {
    data: leavesData,
    mutate,
    pagination,
    isLoading,
  } = useFetch<Leave[]>(
    `leaves?page=${pageNumber}&limit=8${userName ? `&name=${userName}` : ""}${
      empId ? `&employeeID=${empId}` : ""
    }${leaveStatus ? `&status=${leaveStatus}` : ""}${
      leaveType ? `&type=${leaveType}` : ""
    }`
  );
  return (
    <PanelLayout title="Leaves - Admin Panel">
      <section className="md:px-8 px-4 py-2">
        <CreateLeave
          mutate={mutate}
          open={isLeave}
          handleClose={() => setIsLeave(false)}
        />
        <div className="flex justify-between items-center py-4 md:flex-row flex-col">
          <AdminBreadcrumbs links={links} />
          <div className="flex gap-4 items-center">
            <GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
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
        <FiltersContainer>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              fullWidth
              size="small"
              placeholder="Employee Id"
              onChange={(e) => setEmpId(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Employee Name"
            />
            <TextField
              fullWidth
              select
              label="Leave Type"
              size="small"
              value={leaveType ? leaveType : ""}
              onChange={(e) => setLeaveType(e?.target?.value)}
            >
              {types.map((option: any) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Leave Status"
              size="small"
              value={leaveStatus ? leaveStatus : ""}
              onChange={(e) => setLeaveStatus(e?.target?.value)}
            >
              {statuses.map((option: any) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </FiltersContainer>
        {isLoading ? (
          <div className="w-full h-[80vh]">
            <Loader />
          </div>
        ) : (
          <>
            {" "}
            {isGrid ? (
              <LeavesGrid data={leavesData} mutate={mutate} />
            ) : (
              <LeavesColumn data={leavesData} mutate={mutate} />
            )}
          </>
        )}

        {!leavesData?.length && <LoaderAnime />}
        <section className="mb-6">
          {leavesData?.length ? (
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
                  variant="outlined"
                />
              </Stack>
            </div>
          ) : null}
        </section>
      </section>
    </PanelLayout>
  );
};

export default LeaveRequests;

const links = [
  { id: 1, page: "Leaves", link: "/admin/leaves" },
  { id: 2, page: "Leave Requests", link: "/admin/leaves/leave-requests" },
];

const statuses = [
  {
    id: 1,
    value: "Pending",
    label: "Pending",
  },
  {
    id: 2,
    value: "Approved",
    label: "Approved",
  },
  {
    id: 3,
    value: "Rejected",
    label: "Rejected",
  },
  {
    id: 4,
    value: null,
    label: "All",
  },
];

const types = [
  { id: 1, value: "Casual", label: "Casual" },
  { id: 2, value: "Sick", label: "Sick" },
  { id: 2, value: null, label: "All" },
];

const leavData = [
  {
    photo: "https://source.unsplash.com/100x100/?portrait?0",
    name: "Srinu Redy",
    role: "Visual Designer",
    status: "Approved",
    credit: 0,
    monthlyleft: 2,
    anuualleft: 8,
    approvedByManager: "yes",
    approvedByHR: "yes",
  },
  {
    photo: "https://source.unsplash.com/100x100/?portrait?1",
    name: "Kumara Gourav",
    role: "Web Developer",
    status: "Decline",
    credit: 6,
    monthlyleft: 2,
    anuualleft: 8,
    approvedByManager: "no",
    approvedByHR: "no",
  },
  {
    photo: "https://source.unsplash.com/100x100/?portrait?2",
    name: "Sunil Mishra",
    role: "Back-End Developer",
    status: "Semi",
    credit: 10,
    monthlyleft: 2,
    anuualleft: 8,
    approvedByManager: "pending",
    approvedByHR: "pending",
  },
  {
    photo: "https://source.unsplash.com/100x100/?portrait?3",
    name: "Abhilash Sethi",
    role: "Web Developer",
    status: "Pending",
    credit: 3,
    monthlyleft: 2,
    anuualleft: 8,
    approvedByManager: "yes",
    approvedByHR: "pending",
  },
];
