import { Add, Delete, Info } from "@mui/icons-material";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import { TENDERCARD } from "assets/home";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";

const AllTenders = () => {
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
          <Grid container spacing={1}>
            {members?.map((item) => (
              <Grid key={item?.id} item lg={3}>
                <div className="w-full rounded-lg overflow-hidden shadow-sleek">
                  <div className="h-28 bg-[#76DCC7] w-full flex justify-center items-center relative">
                    <div className="px-4 py-1 bg-yellow-400 rounded-r-full absolute top-[10px] left-0">
                      <span className="text-sm text-white tracking-wide">
                        OPEN
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
                      src={TENDERCARD.src}
                      alt=""
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

const members = [
  {
    id: 1,
    title: "Administrative Department - AIIMS Raipur",
    no: "18/EE/AIIMS/RPR/2023-24",
    icon: "TENDERCARD.src",
    category: "Works",
    submission: "Jun 8, 2023",
    bg: "#76DCC7",
  },
];
