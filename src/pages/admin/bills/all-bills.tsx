import { Close, FilterListRounded } from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { BillGrid } from "components/admin/bills";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Bills } from "types";

const AllBills = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [open, setOpen] = useState(true);
  const [meetingPerson, setMeetingPerson] = useState<string | null>(null);
  const [meetingStatus, setMeetingStatus] = useState<string | null>(null);
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const {
    data: billData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<Bills[]>(`bills?page=${pageNumber}&limit=6`);
  console.log(billData);
  return (
    <>
      <PanelLayout title="Bills - Admin Panel">
        <section className="px-8">
          <div className="flex justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />
          </div>
          <div className="md:flex gap-4 justify-between w-full py-2">
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
            >
              <IconButton
                onClick={() => {
                  setSelectDate(null);
                  setMeetingStatus(null);
                  setMeetingPerson(null);
                }}
              >
                <Tooltip
                  title={
                    selectDate != null ||
                    meetingStatus != null ||
                    meetingPerson != null
                      ? `Remove Filters`
                      : `Filter`
                  }
                >
                  {selectDate != null ||
                  meetingStatus != null ||
                  meetingPerson != null ? (
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
                value={meetingPerson ? meetingPerson : null}
                name="invoiceNumber"
                onChange={(e) => setMeetingPerson(e.target.value)}
              />

              <TextField
                fullWidth
                size="small"
                id="clientName"
                placeholder="Client Name"
                value={meetingPerson ? meetingPerson : null}
                name="clientName"
                onChange={(e) => setMeetingPerson(e.target.value)}
              />

              <TextField
                fullWidth
                select
                label="Bill Type"
                size="small"
                value={meetingStatus ? meetingStatus : null}
                onChange={(e) => setMeetingStatus(e?.target?.value)}
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
                placeholder="Select Date"
                name="date"
                type="date"
                value={
                  selectDate ? moment(selectDate).format("YYYY-MM-DD") : null
                }
                onChange={(e) => {
                  setSelectDate(new Date(e.target.value).toISOString());
                }}
              />
            </div>
          </div>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {billData?.length ? (
                <BillGrid data={billData} mutate={mutate} />
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

export default AllBills;

const status = [
  { id: 1, value: "Unpaid" },
  { id: 2, value: "Advance" },
  { id: 3, value: "Paid" },
];

const links = [
  { id: 1, page: "Bills", link: "/admin/bills" },
  { id: 2, page: "All Bills", link: "/admin/bills/all-bills" },
];
