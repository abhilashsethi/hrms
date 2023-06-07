import { Grid } from "@mui/material";
import { AdminBreadcrumbs, PhotoViewer } from "components/core";
import PanelLayout from "layouts/panel";

const Members = () => {
  return (
    <PanelLayout title="Tender Members">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <section className="mt-4">
          <Grid container spacing={2}>
            <Grid item lg={3}>
              <div className="w-full border-[1px] border-blue-400 bg-gradient-to-b from-blue-100 to-blue-300all-emplo rounded-md flex flex-col items-center py-4">
                <PhotoViewer name="Srinu Reddy" />
                <h1>Srinu Reddy</h1>
                <h1>srinu@sy.com</h1>
              </div>
            </Grid>
          </Grid>
        </section>
      </section>
    </PanelLayout>
  );
};

export default Members;

const links = [
  { id: 1, page: "Tenders", link: "/admin/tenders/all-tenders" },
  {
    id: 2,
    page: "Members",
    link: "/admin/tenders/members",
  },
];
