import { Close, FilterListRounded, Send } from "@mui/icons-material";
import {
  Button,
  Card,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import { QuotationGrid } from "components/admin/quotation";
import { AdminBreadcrumbs, LoaderAnime } from "components/core";
import { UploadEmployData } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { DateRangePicker } from "materialui-daterange-picker";
import moment from "moment";
import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Quotation } from "types";



const AllQuotation = () => {
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [open, setOpen] = useState(true);
  const [meetingPerson, setMeetingPerson] = useState<string | null>(null);
  const [meetingStatus, setMeetingStatus] = useState<string | null>(null);
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const {
    data: quotationData,
    mutate,
    isLoading,
  } = useFetch<Quotation[]>(
    `quotations?page=${pageNumber}&limit=8`
  );
  console.log(quotationData);
  return (
    <>
      <PanelLayout title="Meetings - Admin Panel">
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
                id="quotationNumber"
                placeholder="Quotation Number"
                value={meetingPerson ? meetingPerson : null}
                name="quotationNumber"
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
                size="small"
                id="clientName"
                placeholder="Quotation Title"
                value={meetingPerson ? meetingPerson : null}
                name="clientName"
                onChange={(e) => setMeetingPerson(e.target.value)}
              />
              <TextField
                fullWidth
                select
                label="Select Status"
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
          {quotationData?.length ?
            <QuotationGrid data={quotationData} mutate={mutate} />
            : <LoaderAnime text="No data" />}
        </section>
      </PanelLayout>
    </>
  );
};

export default AllQuotation;

const status = [
  { id: 1, value: "Accepted" },
  { id: 2, value: "Rejected" },
  { id: 3, value: "Modified" },
];

const links = [
  { id: 1, page: "Quotation", link: "/admin/quotation" },
  { id: 2, page: "All Quotation", link: "/admin/quotation/all-quotation" },
];
