import {
  Add,
  Close,
  FilterListRounded,
  GridViewRounded,
  TableRowsRounded,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { HolidayColumn, HolidayGrid } from "components/admin/holiday";
import {
  AdminBreadcrumbs,
  Loader,
  LoaderAnime,
  SkeletonLoader,
} from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Branch, HOLIDAY } from "types";

const AllHolidays = () => {
  const { user } = useAuth();
  const [isGrid, setIsGrid] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [holidayName, setHolidayName] = useState<string | null>(null);
  const [isBranchId, setBranchId] = useState<string | null>(null);
  const [monthName, setMonthName] = useState<string | null>(null);
  const [selectStartDate, setSelectStartDate] = useState<string | null>("");
  const { data: branchData } = useFetch<Branch[]>(`branches`);
  const {
    data: holidayData,
    mutate,
    pagination,
    isLoading,
  } = useFetch<HOLIDAY[]>(
    `holidays?page=${pageNumber}&limit=6&orderBy=createdAt:desc${
      holidayName ? `&title=${holidayName}` : ""
    }${selectStartDate ? `&startDate=${selectStartDate}` : ""}${
      monthName ? `&month=${monthName}` : ""
    }${isBranchId ? `&branchId=${isBranchId}` : ""}${
      user?.role?.name === "CEO" ||
      user?.role?.name === "COO" ||
      user?.role?.name === "DIRECTOR"
        ? ``
        : `&branchId=${user?.employeeOfBranchId}`
    }`
  );
  return (
    <>
      <PanelLayout title="All Holiday ">
        <section className="md:px-8 py-4 px-2">
          <div className="md:flex justify-between items-center py-4">
            <div className="md:flex gap-4 items-center">
              <AdminBreadcrumbs links={links} />
            </div>
            <div className="flex gap-1  items-center justify-end">
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

              {user?.role?.name === "CEO" ||
              user?.role?.name === "COO" ||
              user?.role?.name === "HR" ||
              user?.role?.name === "DIRECTOR" ? (
                <Link href={"/admin/holiday/create-holiday"}>
                  <Button
                    variant="contained"
                    className="!bg-theme"
                    startIcon={<Add />}
                  >
                    ADD HOLIDAY
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>

          <div className="md:flex grid gap-4 md:justify-between w-full py-2">
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
            >
              <IconButton
                onClick={() => {
                  setHolidayName(null);
                  setSelectStartDate("");
                  setBranchId(null);
                  setMonthName(null);
                }}
              >
                <Tooltip
                  title={
                    selectStartDate != "" ||
                    holidayName != null ||
                    monthName != null ||
                    isBranchId != null
                      ? `Remove Filters`
                      : `Filter`
                  }
                >
                  {selectStartDate != "" ||
                  holidayName != null ||
                  monthName != null ||
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
                id="holidayName"
                placeholder="Holiday Name"
                value={holidayName ? holidayName : ""}
                name="holidayName"
                onChange={(e) => {
                  setPageNumber(1), setHolidayName(e.target.value);
                }}
              />
              <TextField
                fullWidth
                size="small"
                id="date"
                placeholder="Select Start Date"
                name="date"
                type="date"
                value={
                  selectStartDate
                    ? moment(selectStartDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => {
                  setSelectStartDate(new Date(e.target.value).toISOString());
                }}
              />
              <Autocomplete
                fullWidth
                size="small"
                id="monthName"
                options={month || []}
                onChange={(e: React.ChangeEvent<{}>, r: any | null) => {
                  setMonthName(r?.value || "");
                }}
                value={
                  monthName
                    ? month?.find((option: any) => option.value === monthName)
                    : null
                }
                getOptionLabel={(option: any) => option.name || ""} // Ensure a string is always returned
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Role"
                    placeholder="Month"
                  />
                )}
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
          {holidayData?.length ? (
            <section className="mt-4">
              {isGrid ? (
                <>
                  {isLoading && <SkeletonLoader />}
                  <HolidayGrid data={holidayData} mutate={mutate} />
                </>
              ) : (
                <>
                  {isLoading && <Loader />}
                  <HolidayColumn data={holidayData} mutate={mutate} />
                </>
              )}
              <section className="mb-6">
                {Math.ceil(
                  Number(pagination?.total || 1) /
                    Number(pagination?.limit || 1)
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
          ) : (
            <LoaderAnime text="No Holidays Available" />
          )}
        </section>
      </PanelLayout>
    </>
  );
};

export default AllHolidays;

const links = [
  { id: 2, page: "All Holidays", link: "/admin/holiday/all-holidays" },
];

const month = [
  {
    name: "January",
    value: 1,
    id: "jan",
  },
  {
    name: "February",
    value: 2,
    id: "feb",
  },
  {
    name: "March",
    value: 3,
    id: "mar",
  },
  {
    name: "April",
    value: 4,
    id: "apr",
  },
  {
    name: "May",
    value: 5,
    id: "may",
  },
  {
    name: "June",
    value: 6,
    id: "jun",
  },
  {
    name: "July",
    value: 7,
    id: "jul",
  },
  {
    name: "August",
    value: 8,
    id: "aug",
  },
  {
    name: "September",
    value: 9,
    id: "sep",
  },
  {
    name: "October",
    value: 10,
    id: "oct",
  },
  {
    name: "November",
    value: 11,
    id: "nov",
  },
  {
    name: "December",
    value: 12,
    id: "dec",
  },
];
