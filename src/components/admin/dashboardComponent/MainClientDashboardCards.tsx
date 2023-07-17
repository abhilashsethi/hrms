import {
  FactCheck,
  AccountTree,
  QuestionAnswer,
  WebAsset,
  BugReport,
  PersonPin,
  RecentActors,
  EventAvailable,
  Email,
  Chat,
  SupportAgent,
} from "@mui/icons-material";
import { Grid, Tooltip } from "@mui/material";
import { CardAsset } from "assets/home";
import { useAuth, useFetch } from "hooks";
import Link from "next/link";
interface Props {
  data?: any;
}
const MainClientDashboardCards = ({ data }: Props) => {
  const { user } = useAuth();
  const { data: clientData, isLoading } = useFetch<any>(
    `dashboards/project/client/dashboard/info/${user?.id}`
  );
  const cards = [
    {
      id: 1,
      icon: <AccountTree fontSize="large" className="text-theme" />,
      name: "Total Projects",
      count: clientData?.totalProjectCount || 0,
      color: "bg-[#bbcbff]",
      link: "/admin",
    },
    {
      id: 2,
      icon: <WebAsset fontSize="large" className="text-theme" />,
      name: "On Going Projects",
      count: clientData?.totalOngoingProject || 0,
      color: "bg-[#b9e9fd]",
      link: "/admin",
    },
    {
      id: 3,
      icon: <FactCheck fontSize="large" className="text-theme" />,
      name: "Finished Projects",
      count: clientData?.totalFinishedProjectCount,
      color: "bg-[#f6c8ff]",
      link: "/admin",
    },
    {
      id: 4,
      icon: <BugReport fontSize="large" className="text-theme" />,
      name: "Total Bugs",
      count: clientData?.totalBugsCount,
      color: "bg-[#feb76f]",
      link: "/admin",
    },
  ];
  const Quick_Access = [
    {
      id: 1,
      icon: <PersonPin fontSize="medium" className="text-white" />,
      title: "My Profile",
      color: "bg-[#673ab7]",
      link: "/admin/employees/my-profile",
    },

    {
      id: 4,
      icon: <AccountTree fontSize="medium" className="text-white" />,
      title: "My Projects",
      color: "bg-[#00bcd4]",
      link: "/admin/meetings/my-meetings",
    },
    {
      id: 5,
      icon: <Email fontSize="medium" className="text-white" />,
      title: "Email",
      color: "bg-[#607d8b]",
      link: "/admin/email",
    },
    {
      id: 6,
      icon: <Chat fontSize="medium" className="text-white" />,

      title: "Chats",
      color: "bg-[#3f51b5]",
      link: "/admin/chat",
    },
    {
      id: 7,
      icon: <SupportAgent fontSize="medium" className="text-white" />,
      title: "Support",
      color: "bg-[#4caf50]",
      link: "/admin/admin/support/create-support",
    },
  ];
  return (
    <div className="">
      <div className=" ">
        <div className="grid xl:grid-cols-4 w-full lg:grid-cols-3 md:grid-cols-2 gap-4">
          {cards?.map((item, index) => (
            <Grid key={item?.id} item lg={3} md={6} sm={12} xs={12}>
              <Link href={item?.link}>
                <div
                  className={`h-40 ${item?.color} w-full p-4 flex flex-col rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-500 ease-in-out relative overflow-hidden`}
                >
                  <img
                    className="absolute right-[-20px] top-[-5px] h-24 object-contain"
                    src={CardAsset.src}
                    alt=""
                  />
                  <div className="bg-white h-10 w-10 rounded-lg flex items-center justify-center">
                    {item?.icon}
                  </div>
                  <span className="text-xl mt-6">{item?.count}</span>
                  <span className="font-semibold tracking-wide text-sm ">
                    {item?.name}
                  </span>
                </div>
              </Link>
            </Grid>
          ))}
        </div>
        <div className="w-full mt-5">
          <p className="font-semibold text-lg pb-5 ml-5">Quick Access</p>{" "}
          <div className="flex justify-between px-8 flex-wrap">
            {Quick_Access?.map((item, index) => {
              return (
                <Tooltip title={item?.title}>
                  <Link
                    href={item?.link}
                    // onClick={item?.onClick}
                    className="w-24 h-24 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-600 flex-col gap-2"
                  >
                    <div
                      className={`p-2 w-12 h-12 flex justify-center items-center ${item?.color} shadow-lg rounded-md transition-all ease-in-out duration-200`}
                    >
                      <span>{item?.icon}</span>
                    </div>
                    <p className="text-xs text-center font-semibold">
                      {item?.title}
                    </p>
                  </Link>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainClientDashboardCards;
