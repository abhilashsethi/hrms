import { HeadText } from "components/core";
import { Event, TaskAlt } from "@mui/icons-material";
import moment from "moment";

const EmployLeaves = () => {
  return (
    <section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
      <HeadText title="Employee Leave Credits" />
      <div className="flex gap-4 justify-center py-4">
        <div className="h-20 w-20 relative text-white overflow-hidden rounded-md bg-gradient-to-r from-blue-500 to-blue-400 shadow-md flex justify-center items-center text-4xl font-bold">
          1
          <div className="h-8 w-8 bg-black absolute right-[-2px] top-[-2px] rounded-md text-white text-sm shadow-md flex justify-center items-center tracking-wide">
            CL
          </div>
        </div>
        <div className="h-20 w-20 relative text-white overflow-hidden rounded-md bg-gradient-to-r from-purple-500 to-purple-400 shadow-md flex justify-center items-center text-4xl font-bold">
          0
          <div className="h-8 w-8 bg-black absolute right-[-2px] top-[-2px] rounded-md text-white text-sm shadow-md flex justify-center items-center tracking-wide">
            SL
          </div>
        </div>
      </div>
      <p className="text-center font-semibold tracking-wide text-sm mb-4">
        CREDITS LEFT
      </p>
      <HeadText title="Recent" />
      <div className="mt-2 flex flex-col gap-1 py-2 max-h-60 overflow-y-auto px-2">
        {leaves?.map((item) => (
          <div className="h-20 w-full border-2 rounded-md p-2 flex gap-4">
            <div className="h-14 w-14 rounded-full bg-slate-200 flex justify-center items-center shadow-md">
              <TaskAlt fontSize="large" />
            </div>
            <div className="w-3/4 flex flex-col justify-center gap-2">
              <p className="text-sm font-medium flex gap-2">
                <span>Leave on :</span>{" "}
                <span className="text-sm flex gap-2 items-center">
                  <Event fontSize="small" className="!text-slate-500" />{" "}
                  {moment(new Date().toISOString()).format("ll")}
                </span>
              </p>
              <span className="text-white text-xs px-4 py-1 bg-green-500 font-semibold rounded-md text-center">
                APPROVED
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmployLeaves;

const leaves = [1, 2, 3, 4];
