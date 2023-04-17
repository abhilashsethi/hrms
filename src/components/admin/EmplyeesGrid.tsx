import { HomeRepairServiceRounded } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { DEFAULTIMG } from "assets/home";

const EmplyeesGrid = () => {
  return (
    <section className="mt-8">
      <Grid container spacing={3}>
        {cards?.map((item) => (
          <Grid key={item?.id} item lg={3}>
            <div className="h-60 w-full rounded-xl flex flex-col gap-2 tracking-wide items-center justify-center shadow-xl">
              <div className="h-24 w-24 border-2 rounded-full overflow-hidden">
                <img
                  className="h-full object-cover"
                  src={DEFAULTIMG.src}
                  alt=""
                />
              </div>
              <span className="mt-2">{item?.name}</span>
              <div className="flex gap-2 items-center font-semibold text-slate-600">
                <HomeRepairServiceRounded /> {item?.designation}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default EmplyeesGrid;

const cards = [
  { id: 1, name: "John Doe", designation: "Web Developer" },
  { id: 2, name: "David", designation: "IOS Developer" },
  { id: 3, name: "Rohit", designation: "Android Developer" },
  { id: 4, name: "Rahul", designation: "Team Lead" },
];
