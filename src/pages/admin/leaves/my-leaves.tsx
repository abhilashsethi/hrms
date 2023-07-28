import {
  Add,
  Close,
  FilterListRounded,
  KeyboardArrowLeftRounded,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  AdminBreadcrumbs,
  Loader,
  LoaderAnime,
  PhotoViewer,
} from "components/core";
import { CreateLeaveUser } from "components/dialogues";
import { LeaveDocuments } from "components/drawer";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { Leave } from "types";

const MyLeaves = () => {
  const { user } = useAuth();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [leaveType, setLeaveType] = useState<string | null>(null);
  const [leaveStatus, setLeaveStatus] = useState<string | null>(null);
  const [isLeave, setIsLeave] = useState<boolean>(false);
  const {
    data: leavesData,
    mutate,
    pagination,
    isLoading,
  } = useFetch<Leave[]>(
    `leaves/all?page=${pageNumber}&limit=8${
      leaveStatus ? `&status=${leaveStatus}` : ""
    }${leaveType ? `&type=${leaveType}` : ""}${
      user?.id ? `&userId=${user?.id}` : ""
    }&orderBy=createdAt:asc`
  );
  return (
    <PanelLayout title="My Leaves - Admin Panel">
      <section className="md:px-8 px-4 py-2">
        <CreateLeaveUser
          mutate={mutate}
          open={isLeave}
          handleClose={() => setIsLeave(false)}
        />
        <div className="flex justify-between items-center py-4 md:flex-row flex-col">
          <AdminBreadcrumbs links={links} />
          <div className="flex gap-4 items-center">
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
          {" "}
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
          >
            <IconButton
              onClick={() => {
                setLeaveType(null);
                setLeaveStatus(null);
              }}
            >
              <Tooltip
                title={
                  leaveStatus != null || leaveType != null
                    ? `Remove Filters`
                    : `Filter`
                }
              >
                {leaveStatus != null || leaveType != null ? (
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
            <section className="md:py-2 py-2">
              <Grid container spacing={3}>
                {leavesData
                  ?.sort(
                    (a: any, b: any) =>
                      (new Date(b?.createdAt) as any) -
                      (new Date(a?.createdAt) as any)
                  )
                  ?.map((item: any) => (
                    <CardComponent item={item} mutate={mutate} key={item?.id} />
                  ))}
              </Grid>
            </section>
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

export default MyLeaves;
interface Props {
  item?: any;
  mutate?: any;
}
const CardComponent = ({ item, mutate }: Props) => {
  const [isDocuments, setIsDocuments] = useState(false);
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
            <span className="bg-yellow-600 text-white rounded-full px-6 py-1 text-sm">
              {item?.status}
            </span>
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
            <div className="pt-4"></div>
          </>
        );
    }
  };

  return (
    <Grid item lg={3} sm={12} xs={12}>
      <div
        className={`relative h-full mt-7 flex flex-col px-2 justify-center justify-items-center w-full pt-4 text-center rounded-md shadow-xl drop-shadow-lg bg-gradient-to-r from-rose-100 to-teal-100 hover:scale-105 ease-in-out transition-all duration-200 md:mt-0`}
      >
        <LeaveDocuments
          data={item}
          open={isDocuments}
          onClose={() => setIsDocuments(false)}
        />
        <span className="absolute right-[8px] top-[8px]">
          <Tooltip title="Details">
            <IconButton onClick={() => setIsDocuments(true)}>
              <KeyboardArrowLeftRounded />
            </IconButton>
          </Tooltip>
        </span>

        <div className="flex justify-center ">
          <PhotoViewer name={item?.user?.name} photo={item?.user?.photo} />
        </div>
        <div className="flex-1 my-4">
          <p className="text-base font-semibold leading-snug">
            {item?.user?.name}
          </p>
          <p className="mb-2 text-sm">{item?.user?.role}</p>
          <div className="mb-2 text-sm group flex items-center justify-center gap-2 pb-2">
            <div className="flex w-full justify-center gap-2">
              <div className="text-xs cursor-pointer bg-[#bbcbff] rounded-lg shadow-lg py-1 px-2">
                <p className="font-semibold">This Month Leaves</p>
                <p>{item?.totalLeaveThisMonth | 0}</p>
              </div>
              <div className="text-xs cursor-pointer bg-[#bbcbff] rounded-lg shadow-lg py-1 px-2">
                <p className="font-semibold">This Year Leaves</p>
                <p>{item?.totalLeaveThisYear | 0}</p>
              </div>
            </div>
          </div>
          <div className="">{renderStatus(item)}</div>
        </div>
      </div>
    </Grid>
  );
};

const links = [{ id: 2, page: "My Leaves", link: "/admin/leaves/my-leaves" }];

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
