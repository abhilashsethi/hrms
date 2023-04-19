import { Grid } from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";

const Cards = () => {
  return (
    <PanelLayout title="Cards Dashboard - SY HR MS">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="mt-4">
          <Grid container spacing={2}>
            <Grid item lg={3}>
              <div className="w-full h-40 bg-white shadow-lg rounded-xl">
                <div className=""></div>
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    </PanelLayout>
  );
};

export default Cards;

const links = [{ id: 1, page: "Cards", link: "/admin/cards" }];
