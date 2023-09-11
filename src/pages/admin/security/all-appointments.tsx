import { Add, Close, FilterListRounded } from "@mui/icons-material";
import {
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
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { APPOINTMENT } from "types";

const AllAppointments = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [clientName, setClientName] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState<string | null>(null);
  const [BillStatus, setBillStatus] = useState<string | null>(null);
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const {
    data: appointmentData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<APPOINTMENT[]>(
    `appointments?page=${pageNumber}&limit=6${
      clientName ? `&clientName=${clientName}` : ""
    }${BillStatus ? `&billType=${BillStatus}` : ""}${
      searchTitle ? `&searchTitle=${searchTitle}` : ""
    }${selectDate ? `&dueDate=${selectDate}` : ""}${
      isOrderBy ? `&orderBy=${isOrderBy}` : ""
    }`
  );
  return (
    <>
      <PanelLayout title="All - Appointments ">
        <section className="px-8">
          <div className="flex justify-between items-center py-4">
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
          <div className="md:flex gap-4 justify-between w-full py-2">
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
            >
              <IconButton
                onClick={() => {
                  setSearchTitle(null);
                }}
              >
                <Tooltip
                  title={searchTitle != null ? `Remove Filters` : `Filter`}
                >
                  {searchTitle != null ? (
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

const status = [
  { id: 1, value: "Unpaid" },
  { id: 2, value: "Advance" },
  { id: 3, value: "Paid" },
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
