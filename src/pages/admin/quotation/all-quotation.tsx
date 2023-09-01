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
import { QuotationGrid } from "components/admin/quotation";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Quotation } from "types";

const AllQuotation = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [clientName, setClientName] = useState<string | null>(null);
  const [quotationTitle, setQuotationTitle] = useState<string | null>(null);
  const [quotationNumber, setQuotationNumber] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const [quotationStatus, setQuotationStatus] = useState<string | null>(null);
  const {
    data: quotationData,
    mutate,
    pagination,
    isLoading,
  } = useFetch<Quotation[]>(
    `quotations?page=${pageNumber}&limit=6&orderBy=createdAt:desc${
      clientName ? `&clientName=${clientName}` : ""
    }${quotationTitle ? `&quotationTitle=${quotationTitle}` : ""}${
      quotationNumber ? `&quotationNumber=${quotationNumber}` : ""
    }${quotationStatus ? `&status=${quotationStatus}` : ""}${
      isOrderBy ? `&orderBy=${isOrderBy}` : ""
    }`
  );
  return (
    <>
      <PanelLayout title="All Quotation - Admin Panel">
        <section className="md:px-8 px-2">
          <div className="md:flex justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />
            <Link href={"/admin/quotation/create-quotation"}>
              <Button
                variant="contained"
                className="!bg-theme"
                startIcon={<Add />}
              >
                CREATE QUOTATION
              </Button>
            </Link>
          </div>

          <div className="md:flex grid gap-4 justify-between w-full py-2">
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
            >
              <IconButton
                onClick={() => {
                  setClientName(null);
                  setQuotationTitle(null);
                  setQuotationNumber(null);
                  setIsOrderBy(null);
                  setQuotationStatus(null);
                }}
              >
                <Tooltip
                  title={
                    clientName != null ||
                    quotationNumber != null ||
                    quotationStatus != null ||
                    isOrderBy != null ||
                    quotationTitle != null
                      ? `Remove Filters`
                      : `Filter`
                  }
                >
                  {clientName != null ||
                  quotationNumber != null ||
                  quotationStatus != null ||
                  isOrderBy != null ||
                  quotationTitle != null ? (
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
                value={quotationNumber ? quotationNumber : ""}
                name="quotationNumber"
                onChange={(e) => {
                  setPageNumber(1), setQuotationNumber(e.target.value);
                }}
              />

              <TextField
                fullWidth
                size="small"
                id="clientName"
                placeholder="Client Name"
                value={clientName ? clientName : ""}
                name="clientName"
                onChange={(e) => {
                  setPageNumber(1), setClientName(e.target.value);
                }}
              />

              <TextField
                fullWidth
                size="small"
                id="quotationTitle"
                placeholder="Quotation Title"
                value={quotationTitle ? quotationTitle : ""}
                name="quotationTitle"
                onChange={(e) => {
                  setPageNumber(1), setQuotationTitle(e.target.value);
                }}
              />
              <TextField
                fullWidth
                select
                label="Select Status"
                size="small"
                value={quotationStatus ? quotationStatus : null}
                onChange={(e) => {
                  setPageNumber(1), setQuotationStatus(e?.target?.value);
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
          <section className="mt-4">
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <>
                {quotationData?.length ? (
                  <QuotationGrid data={quotationData} mutate={mutate} />
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
const short = [
  { id: 1, value: "quotationTitle:asc", name: "Name Ascending" },
  { id: 2, value: "quotationTitle:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
const links = [
  { id: 1, page: "Quotation", link: "/admin/quotation" },
  { id: 2, page: "All Quotation", link: "/admin/quotation/all-quotation" },
];
