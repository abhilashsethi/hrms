import { Add, Delete, Info } from "@mui/icons-material";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import { TENDERCARD, TENDERCARD2, TENDERCARD3, TENDERCARD4 } from "assets/home";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";
import Swal from "sweetalert2";

const AllTenders = () => {
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
          <h1 className="text-theme font-semibold mt-4">All Tenders</h1>
          <Button
            size="small"
            className="!bg-theme"
            variant="contained"
            startIcon={<Add />}
          >
            CREATE TENDER
          </Button>
        </div>
        <section className="mt-4">
          <Grid container spacing={2}>
            {tenders?.map((item) => (
              <Grid key={item?.id} item lg={3}>
                <div className="w-full h-full rounded-lg overflow-hidden shadow-sleek">
                  <div
                    className={`h-28 w-full flex justify-center items-center relative ${
                      item?.bg ? item?.bg : "bg-[#76DCC7]"
                    }`}
                  >
                    <div
                      className={`px-4 py-0.5 rounded-r-full absolute top-[10px] left-0 ${
                        item?.status === "OPEN"
                          ? `bg-yellow-400`
                          : `bg-green-500`
                      }`}
                    >
                      <span className="text-xs text-white tracking-wide">
                        {item?.status}
                      </span>
                    </div>
                    <div className=" px-4 py-1 bg-white absolute right-0 bottom-[-15px] rounded-l-md flex gap-2 items-center">
                      <Tooltip title="Details">
                        <IconButton size="small">
                          <Info />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small">
                          <Delete className="!text-youtube" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <img
                      className="h-12 object-contain "
                      src={item?.icon}
                      alt="icon"
                    />
                  </div>
                  <div className="bg-white p-4">
                    <h1 className="font-semibold text-sm">{item?.title}</h1>
                    <h1 className="mt-2 text-sm font-semibold">Tender No :</h1>
                    <span className="text-sm text-gray-600">{item?.no}</span>
                    <h1 className="mt-2 text-sm font-semibold">Category :</h1>
                    <span className="text-sm text-gray-600">
                      {item?.category}
                    </span>
                    <h1 className="mt-2 text-sm font-semibold">
                      Submission Date :
                    </h1>
                    <span className="text-sm text-gray-600">
                      {item?.submission}
                    </span>
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

const tenders = [
  {
    id: 1,
    title: "Administrative Department - AIIMS Raipur",
    no: "18/EE/AIIMS/RPR/2023-24",
    icon: TENDERCARD.src,
    category: "IT/ITES",
    submission: "Jun 8, 2023",
    bg: "bg-[#76DCC7]",
    status: "OPEN",
  },
  {
    id: 2,
    title: "Centre for High Technology",
    no: "18/EE/AIIMS/RPR/2023-24",
    icon: TENDERCARD2.src,
    category: "Manpower",
    submission: "Jun 8, 2023",
    bg: "bg-[#FC71A2]",
    status: "SUBMITTED",
  },
  {
    id: 3,
    title: "Development Commissioner(MSME)",
    no: "18/EE/AIIMS/RPR/2023-24",
    icon: TENDERCARD3.src,
    category: "Peripheral",
    submission: "Jun 8, 2023",
    bg: "bg-[#F9E16B]",
    status: "SUBMITTED",
  },
  {
    id: 4,
    title: "Indian Institute of Management Indore",
    no: "18/EE/AIIMS/RPR/2023-24",
    icon: TENDERCARD4.src,
    category: "AMC",
    submission: "Jun 8, 2023",
    bg: "bg-[#52C7E0]",
    status: "SUBMITTED",
  },
];
