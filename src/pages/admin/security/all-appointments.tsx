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
import { BillGrid } from "components/admin/bills";
import { AppointmentsGrid } from "components/admin/security";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Bills } from "types";

const AllAppointments = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [clientName, setClientName] = useState<string | null>(null);
  const [billNumber, setBillNumber] = useState<string | null>(null);
  const [BillStatus, setBillStatus] = useState<string | null>(null);
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  console.log({ selectDate });
  const {
    data: billData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<Bills[]>(
    `bills?page=${pageNumber}&limit=6${
      clientName ? `&clientName=${clientName}` : ""
    }${BillStatus ? `&billType=${BillStatus}` : ""}${
      billNumber ? `&billNumber=${billNumber}` : ""
    }${selectDate ? `&dueDate=${selectDate}` : ""}${
      isOrderBy ? `&orderBy=${isOrderBy}` : ""
    }`
  );
  return (
    <>
      <PanelLayout title="Bills ">
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
                  setIsOrderBy(null);
                  setSelectDate(null);
                  setBillStatus(null);
                  setBillNumber(null);
                  setClientName(null);
                }}
              >
                <Tooltip
                  title={
                    selectDate != null ||
                    isOrderBy != null ||
                    BillStatus != null ||
                    clientName != null ||
                    billNumber != null
                      ? `Remove Filters`
                      : `Filter`
                  }
                >
                  {selectDate != null ||
                  isOrderBy != null ||
                  clientName != null ||
                  BillStatus != null ||
                  billNumber != null ? (
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
                id="invoiceNumber"
                placeholder="Invoice Number"
                value={billNumber ? billNumber : null}
                name="invoiceNumber"
                onChange={(e) => {
                  setPageNumber(1), setBillNumber(e.target.value);
                }}
              />

              <TextField
                fullWidth
                size="small"
                id="clientName"
                placeholder="Client Name"
                value={clientName ? clientName : null}
                name="clientName"
                onChange={(e) => {
                  setPageNumber(1), setClientName(e.target.value);
                }}
              />

              <TextField
                fullWidth
                select
                label="Bill Type"
                size="small"
                value={BillStatus ? BillStatus : null}
                onChange={(e) => {
                  setPageNumber(1), setBillStatus(e?.target?.value);
                }}
              >
                {status.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                size="small"
                id="date"
                label="Due Date"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Select Date"
                name="date"
                type="date"
                value={
                  selectDate ? moment(selectDate).format("YYYY-MM-DD") : null
                }
                onChange={(e) => {
                  {
                    setPageNumber(1),
                      setSelectDate(new Date(e.target.value).toISOString());
                  }
                }}
              />
              <TextField
                fullWidth
                select
                label="Ascending/Descending"
                size="small"
                value={isOrderBy ? isOrderBy : ""}
                onChange={(e) => {
                  setPageNumber(1), setIsOrderBy(e?.target?.value);
                }}
              >
                {short.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {billData?.length ? (
                <AppointmentsGrid data={billData} mutate={mutate} />
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
  { id: 1, page: "Bills", link: "/admin/bills" },
  { id: 2, page: "All Bills", link: "/admin/bills/all-bills" },
];
const short = [
  { id: 1, value: "name:asc", name: "Client Name Ascending" },
  { id: 2, value: "name:desc", name: "Client Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
