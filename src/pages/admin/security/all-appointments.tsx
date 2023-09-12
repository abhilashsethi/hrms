import { Add, Close, FilterListRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  IconButton,
  Link,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { AppointmentsGrid } from "components/admin/security";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { APPOINTMENT, Branch } from "types";

const AllAppointments = () => {
  const { user } = useAuth();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isBranchId, setBranchId] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState<string | null>(null);
  const [isStatus, setStatus] = useState<string | null>(null);
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const { data: branchData } = useFetch<Branch[]>(`branches`);
  const {
    data: appointmentData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<APPOINTMENT[]>(
    `appointments?page=${pageNumber}&limit=6${
      isStatus ? `&status=${isStatus}` : ""
    }${searchTitle ? `&searchTitle=${searchTitle}` : ""}${
      selectDate ? `&startDate=${new Date(selectDate).getTime()}` : ""
    }${isOrderBy ? `&orderBy=${isOrderBy}` : ""}${
      isBranchId ? `&branchId=${isBranchId}` : ""
    }${
      user?.role?.name === "CEO" ||
      user?.role?.name === "DIRECTOR" ||
      user?.role?.name === "COO"
        ? ``
        : `&branchId=${isBranchId}`
    }`
  );
  return (
    <>
      <PanelLayout title="All - Appointments ">
        <section className="md:px-8 px-4 py-4">
          <div className="md:flex grid md:justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />
            <Link href="/admin/security/create-appointment">
              <Button
                size="small"
                className="!bg-theme"
                variant="contained"
                startIcon={<Add />}
              >
                CREATE APPOINTMENT
              </Button>
            </Link>
          </div>
          <div className="md:flex grid gap-4 md:justify-between w-full py-2">
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
            >
              <IconButton
                onClick={() => {
                  setSearchTitle(null);
                  setStatus(null);
                  setSelectDate(null);
                  setIsOrderBy(null);
                  setBranchId(null);
                }}
              >
                <Tooltip
                  title={
                    searchTitle != null ||
                    isStatus != null ||
                    selectDate != null ||
                    isOrderBy != null ||
                    isBranchId != null
                      ? `Remove Filters`
                      : `Filter`
                  }
                >
                  {searchTitle != null ||
                  isStatus != null ||
                  selectDate != null ||
                  isOrderBy != null ||
                  isBranchId != null ? (
                    <Close className={"!text-white"} />
                  ) : (
                    <FilterListRounded className={"!text-white"} />
                  )}
                </Tooltip>
              </IconButton>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <TextField
                fullWidth
                size="small"
                id="searchTitle"
                placeholder="Title"
                value={searchTitle ? searchTitle : null}
                name="searchTitle"
                onChange={(e) => {
                  setPageNumber(1), setSearchTitle(e.target.value);
                }}
              />
              <TextField
                fullWidth
                select
                label="Status"
                id="status"
                size="small"
                value={isStatus ? isStatus : null}
                onChange={(e) => {
                  setPageNumber(1), setStatus(e?.target?.value);
                }}
              >
                {Status_Type.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                size="small"
                id="date"
                label="Date"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Select Date"
                name="date"
                type="date"
                value={
                  selectDate ? moment(selectDate).format("YYYY-MM-DD") : ""
                }
                onChange={(e) => {
                  {
                    setPageNumber(1),
                      setSelectDate(new Date(e.target.value).toISOString());
                  }
                }}
              />
              {user?.role?.name === "CEO" ||
              user?.role?.name === "COO" ||
              user?.role?.name === "DIRECTOR" ? (
                <Autocomplete
                  fullWidth
                  size="small"
                  id="branchId"
                  options={branchData || []}
                  onChange={(e: React.ChangeEvent<{}>, r: Branch | null) => {
                    setBranchId(r?.id || "");
                  }}
                  value={
                    isBranchId
                      ? branchData?.find(
                          (option: any) => option.id === isBranchId
                        )
                      : null
                  }
                  getOptionLabel={(option: Branch) => option.name || ""} // Ensure a string is always returned
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="Role"
                      placeholder="Branch"
                    />
                  )}
                />
              ) : null}
            </div>
          </div>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {appointmentData?.length ? (
                <AppointmentsGrid data={appointmentData} mutate={mutate} />
              ) : (
                <LoaderAnime text="No data" />
              )}
            </>
          )}
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

export default AllAppointments;

const Status_Type = [
  {
    id: 1,
    name: "Completed",
    value: "Completed",
  },
  {
    id: 2,
    name: "Pending",
    value: "Pending",
  },
];

const links = [
  { id: 1, page: "Appointments", link: "/admin/security" },
  { id: 2, page: "All Appointments", link: "/admin/security/all-appointments" },
];
const short = [
  { id: 1, value: "name:asc", name: "Client Name Ascending" },
  { id: 2, value: "name:desc", name: "Client Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
