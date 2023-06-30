import { Add, Delete, FilterListRounded, Info } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import { TENDERCARD, TENDERCARD2, TENDERCARD3, TENDERCARD4 } from "assets/home";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";

const AllTenders = () => {
  const [isGrid, setIsGrid] = useState(true);
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
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Tender deleted successfully.", "success");
      }
    });
  };
  return (
    <PanelLayout title="All Tenders - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="flex justify-between items-center">
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
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 gap-2">
            <TextField fullWidth size="small" placeholder="Tender No" />
            <TextField fullWidth size="small" placeholder="Tender Name" />
            <TextField fullWidth size="small" placeholder="Tender Category" />
          </div>
        </div>
        <section className="mt-4">
          <Grid container spacing={2}>
            {tenderData?.map((item) => (
              <Grid key={item?.id} item lg={3}>
                <div className="w-full h-full rounded-lg overflow-hidden shadow-sleek">
                  <div
                    className={`h-28 w-full flex justify-center items-center relative bg-[#76DCC7]`}
                  >
                    {/* <div
                      className={`px-4 py-0.5 rounded-r-full absolute top-[10px] left-0 ${item?.status === "OPEN"
                        ? `bg-yellow-400`
                        : `bg-green-500`
                        }`}
                    >
                      <span className="text-xs text-white tracking-wide">
                        {item?.status}
                      </span>
                    </div> */}
                    <div className=" px-4 py-1 bg-white absolute right-0 bottom-[-15px] rounded-l-md flex gap-2 items-center">
                      <Link href="/admin/tenders/tender-details">
                        <Tooltip title="Details">
                          <IconButton size="small">
                            <Info />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Tooltip title="Delete">
                        <IconButton size="small">
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
                    {/* <span className="text-sm text-gray-600">{item?.no}</span> */}
                    <h1 className="mt-2 text-sm font-semibold">Category :</h1>
                    <span className="text-sm text-gray-600">
                      {item?.category}
                    </span>
                    <h1 className="mt-2 text-sm font-semibold">
                      Submission Date :
                    </h1>
                    {/* <span className="text-sm text-gray-600">
                      {item?.submission}
                    </span> */}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
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


