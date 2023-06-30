import { Add, Delete, FilterListRounded, Info } from "@mui/icons-material";
import { Button, Grid, IconButton, MenuItem, Pagination, Stack, TextField, Tooltip } from "@mui/material";
import { TENDERCARD, TENDERCARD2, TENDERCARD3, TENDERCARD4 } from "assets/home";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";

const AllTenders = () => {
  const { change } = useChange();
  const [userName, setUsername] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const {
    data: tenderData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<Tender[]>(
    `tenders?page=${pageNumber}&limit=8${userName ? `&title=${userName}` : ""}${isOrderBy ? `&orderBy=${isOrderBy}` : ""}`
  );
  // & tenderNo=1 & category= & portal
  console.log("tenderData", { tenderData });
  const handleDelete = (item: Tender) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`tenders/${item?.id}`, {
            method: "DELETE",
          });
          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            return;
          }
          Swal.fire(`Success`, "Deleted Successfully!", "success");
          mutate();
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PanelLayout title="All Tenders - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="flex justify-end items-center">
          <Link href="/admin/tenders/create-tender">
            <Button
              size="small"
              className="!bg-theme"
              variant="contained"
              startIcon={<Add />}
            >
              CREATE TENDER
            </Button>
          </Link>
        </div>
        <div className="md:flex gap-4 justify-between w-full py-2 mt-2">
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
          >
            <IconButton>
              <Tooltip title={`Filter`}>
                <FilterListRounded className={"!text-white"} />
              </Tooltip>
            </IconButton>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              fullWidth
              size="small"
              id="name"
              value={userName ? userName : ""}
              onChange={(e) => {
                setPageNumber(1), setUsername(e.target.value);
              }}
              placeholder="Tender Name"
              name="name"
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
        <section className="mt-4">
          {isLoading && <SkeletonLoader />}
          <Grid container spacing={2}>
            {tenderData?.map((item) => (
              <Grid key={item?.id} item lg={3}>
                <div className="w-full h-full rounded-lg overflow-hidden shadow-sleek">
                  <div
                    className={`h-28 w-full flex justify-center items-center relative bg-[#76DCC7]`}
                  >
                    <div
                      className={`px-4 py-0.5 rounded-r-full absolute top-[10px] left-0 ${item?.status === "Open"
                        ? `bg-yellow-400`
                        : `bg-green-500`
                        }`}
                    >
                      <span className="text-xs text-white tracking-wide">
                        {item?.status}
                      </span>
                    </div>
                    <div className=" px-4 py-1 bg-white absolute right-0 bottom-[-15px] rounded-l-md flex gap-2 items-center">
                      <Link href={`/admin/tenders/tender-details?id=${item?.id}`}>
                        <Tooltip title="Details">
                          <IconButton size="small">
                            <Info />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => handleDelete(item)}>
                          <Delete className="!text-youtube" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <img
                      className="h-12 object-contain "
                      src={TENDERCARD.src}
                      alt="icon"
                    />
                  </div>
                  <div className="bg-white p-4">
                    <h1 className="font-semibold text-sm">{item?.title}</h1>
                    <h1 className="mt-2 text-sm font-semibold">Tender No :</h1>
                    <span className="text-sm text-gray-600">{item?.tenderNo}</span>
                    <h1 className="mt-2 text-sm font-semibold">Category :</h1>
                    <span className="text-sm text-gray-600">
                      {item?.category}
                    </span>
                    <h1 className="mt-2 text-sm font-semibold">
                      Submission Date :
                    </h1>
                    <span className="text-sm text-gray-600">
                      {item?.submissionDate ? (
                        moment(item?.submissionDate).format("ll")
                      ) : (
                        <p className="text-gray-500 font-medium">Not Specified</p>
                      )}
                    </span>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
          {tenderData?.length === 0 ? <LoaderAnime /> : null}
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
  );
};

export default AllTenders;

const links = [
  { id: 1, page: "Tenders", link: "/admin/tenders/all-tenders" },
  {
    id: 2,
    page: "All Tenders",
    link: "/admin/tenders/all-tenders",
  },
];
const short = [
  { id: 1, value: "name:asc", name: "Name Ascending" },
  { id: 2, value: "name:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];

