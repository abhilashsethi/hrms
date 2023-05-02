import { HeadText } from "components/core";
import moment from "moment";
import { AccountTreeRounded } from "@mui/icons-material";

const ClientProjects = () => {
  return (
    <section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
      <HeadText title="Projects" />
      <div className="flex flex-col gap-1 mt-4 max-h-[15rem] overflow-y-auto">
        {cards?.map((item) => (
          <div className="flex gap-1 py-3 border-b-[1px]">
            <div className="w-1/5 flex justify-center items-center">
              <div className="h-12 w-12 bg-theme-100 rounded-full flex justify-center items-center">
                <AccountTreeRounded className="!text-secondary" />
              </div>
            </div>
            <div className="w-4/5 h-12">
              <div className="flex justify-between pr-3 items-center">
                <p className="text-sm font-semibold tracking-wide">
                  HRMS for SY
                </p>
                <span className="py-1 px-3 rounded-md bg-emerald-100 tracking-wide border-green-400 border-[1px] text-green-500 text-xs font-semibold">
                  COMPLETED
                </span>
              </div>
              <p className="text-sm tracking-wide">
                Deadline : {moment(new Date()).format("ll")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientProjects;

const cards = [1, 2, 3, 4];
