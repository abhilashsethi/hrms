import { HeadText } from "components/core";
import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import moment from "moment";
import { DEFAULTPROFILE } from "assets/home";

const UpcomingLeaves = () => {
  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress size={80} variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }
  const [progress, setProgress] = React.useState(80);

  return (
    <section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
      <HeadText title="Employee Leaves" />
      <div className="flex justify-between items-center py-4 pt-4 px-4">
        <CircularProgressWithLabel value={progress} />
        <div className="flex gap-9 items-center">
          <div>
            <p className="font-semibold">20</p>
            <div className="flex gap-2 items-center">
              <div className="h-3 w-3 bg-emerald-500 rounded-sm"></div>
              <p>TAKEN</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">4</p>
            <div className="flex gap-2 items-center">
              <div className="h-3 w-3 bg-yellow-500 rounded-sm "></div>
              <p>LEFT</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="w-1/3 h-28 flex justify-center shadow-md items-center flex-col gap-3 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-200">
          <p className="text-lg font-semibold tracking-wide">12</p>
          <p className="text-sm font-semibold tracking-wide text-green-700">
            APPROVED
          </p>
        </div>
        <div className="w-1/3 h-28 flex justify-center shadow-md items-center flex-col gap-3 rounded-lg bg-gradient-to-br from-red-400 to-red-200">
          <p className="text-lg font-semibold tracking-wide">0</p>
          <p className="text-sm font-semibold tracking-wide text-red-700">
            REJECTED
          </p>
        </div>
        <div className="w-1/3 h-28 flex justify-center shadow-md items-center flex-col gap-3 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-200">
          <p className="text-lg font-semibold tracking-wide">1</p>
          <p className="text-sm font-semibold tracking-wide text-yellow-700">
            PENDING
          </p>
        </div>
      </div>
      <div className="mt-6 flex gap-4 items-center">
        <HeadText title="Today Absent" />
        <div className="h-8 w-8 bg-red-200 rounded-md flex justify-center items-center text-red-600 font-semibold">
          4
        </div>
      </div>
      <div className="h-[17rem] overflow-y-auto pr-2">
        <div className="w-full mt-4 flex flex-col gap-2">
          {cards?.map((item) => (
            <div className="h-32 w-full border-2 tracking-wide p-4 rounded-lg">
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 bg-slate-300 rounded-full overflow-hidden shadow-lg">
                  <img
                    className="h-full w-full object-cover"
                    src={DEFAULTPROFILE.src}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-sm">Developer</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm">
                  <p className="text-gray-400">4 Sep 2019</p>
                  <p className="font-semibold">Leave Date</p>
                </div>
                <span className="bg-green-200 text-green-600 border-[1px] border-green-400 px-3 py-1 rounded-md font-medium">
                  Approved
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingLeaves;

const cards = [1, 2, 3, 4];
