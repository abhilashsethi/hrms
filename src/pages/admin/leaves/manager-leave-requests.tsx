import { Add, Close, FilterListRounded } from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { LeavesColumnManager, LeavesGrid } from "components/admin";
import {
  AdminBreadcrumbs,
  GridAndList,
  Loader,
  LoaderAnime,
} from "components/core";
import { CreateLeave } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { Leave } from "types";

const ManagerLeaveRequests = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [userName, setUsername] = useState<string | null>(null);
  const [empId, setEmpId] = useState<string | null>(null);
  const [leaveType, setLeaveType] = useState<string | null>(null);
  const [leaveStatus, setLeaveStatus] = useState<string | null>(null);
  const [isLeave, setIsLeave] = useState<boolean>(false);
  const {
    data: leavesData,
    mutate,
    pagination,
    isLoading,
  } = useFetch<Leave[]>(
    `leaves/manager/request?page=${pageNumber}&limit=8${
      userName ? `&employeeName=${userName}` : ""
    }${empId ? `&employeeID=${empId}` : ""}${
      leaveStatus ? `&status=${leaveStatus}` : ""
    }${leaveType ? `&type=${leaveType}` : ""}`
  );
  return (
    <PanelLayout title="Leave Requests - Admin Panel">
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
        <div className="md:flex gap-4 justify-between w-full py-2">
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
          >
            <IconButton
              onClick={() => {
                setEmpId(null);
                setLeaveType(null);
                setUsername(null);
                setLeaveStatus(null);
              }}
            >
              <Tooltip
                title={
                  empId != null ||
                  leaveStatus != null ||
                  leaveType != null ||
                  userName != null
                    ? `Remove Filters`
                    : `Filter`
                }
              >
                {empId != null ||
                leaveStatus != null ||
                leaveType != null ||
                userName != null ? (
                  <Close className={"!text-white"} />
                ) : (
                  <FilterListRounded className={"!text-white"} />
                )}
              </Tooltip>
            </IconButton>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              fullWidth
              size="small"
              value={empId ? empId : ""}
              placeholder="Employee Id"
              onChange={(e) => {
                setPageNumber(1), setEmpId(e.target.value);
              }}
            />
            <TextField
              fullWidth
              size="small"
              value={userName ? userName : ""}
              onChange={(e) => {
                setPageNumber(1), setUsername(e.target.value);
              }}
              placeholder="Employee Name"
            />
            <TextField
              fullWidth
              select
              label="Leave Type"
              size="small"
              value={leaveType ? leaveType : ""}
              onChange={(e) => {
                setPageNumber(1), setLeaveType(e?.target?.value);
              }}
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
              onChange={(e) => {
                setPageNumber(1), setLeaveStatus(e?.target?.value);
              }}
            >
              {statuses.map((option: any) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-[80vh]">
            <Loader />
          </div>
        ) : (
          <>
            {isGrid ? (
              <LeavesGrid data={leavesData} mutate={mutate} />
            ) : (
              <LeavesColumnManager data={leavesData} mutate={mutate} />
            )}
          </>
        )}

        {leavesData?.length === 0 && <LoaderAnime />}
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
  );
};

export default ManagerLeaveRequests;

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
];

const types = [
  { id: 1, value: "Casual", label: "Casual" },
  { id: 2, value: "Sick", label: "Sick" },
];
