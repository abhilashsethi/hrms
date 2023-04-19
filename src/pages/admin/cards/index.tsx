import { CreditCardRounded } from "@mui/icons-material";
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
            {cards?.map((item) => (
              <Grid key={item?.id} item lg={3}>
                <div className="w-full tracking-wide border-b-4 border-theme h-full bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 justify-center items-center">
                  <div className="h-16 w-16 bg-gradient-to-br from-theme-300 via-theme-50 shadow-xl to-secondary-300 rounded-full flex justify-center items-center">
                    <CreditCardRounded
                      fontSize="large"
                      className="!text-white"
                    />
                  </div>
                  <p className="text-base font-semibold text-center">
                    {item?.title}
                  </p>
                  <p className="text-lg font-bold text-gray-600">
                    {item?.value}
                  </p>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </section>
    </PanelLayout>
  );
};

export default Cards;

const links = [{ id: 1, page: "Cards", link: "/admin/cards" }];

const cards = [
  {
    id: 1,
    title: "Total Cards",
    value: "12",
    icon: <CreditCardRounded fontSize="large" className="!text-white" />,
  },
  {
    id: 2,
    title: "Cards Assigned",
    value: "1",
    icon: <CreditCardRounded fontSize="large" className="!text-white" />,
  },
  {
    id: 3,
    title: "Blocked Cards",
    value: "2",
    icon: <CreditCardRounded fontSize="large" className="!text-white" />,
  },
  {
    id: 4,
    title: "Scanned Cards",
    value: "4",
    icon: <CreditCardRounded fontSize="large" className="!text-white" />,
  },
];
