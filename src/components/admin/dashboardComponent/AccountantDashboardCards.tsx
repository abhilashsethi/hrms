import {
  AccountTree,
  Assessment,
  Chat,
  CoPresent,
  Email,
  EventAvailable,
  Output,
  People,
  PersonPin,
  RecentActors,
  SupportAgent
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { CardAsset } from "assets/home";
import Link from "next/link";
interface Props {
  data?: any;
}
const AccountantDashboardCards = ({ data }: Props) => {
  const cards = [
    {
      id: 1,
      color: "bg-[#bbcbff]",
      icon: (
        <People
          fontSize="large"
          className="text-theme"
        />
      ),
      name: "Total Employees",
      count: data?.GuestInfo?.totalGuest || 0,
      link: "/admin",
    },
    {
      id: 2,
      color: "bg-[#b9e9fd]",
      icon: (
        <Output
          fontSize="large"
          className="text-theme"
        />
      ),
      name: "Total Leaves This Month",
      count: data?.GuestInfo?.blockedGuestCount || 0,
      link: "/admin",
    },
    {
      id: 3,
      color: "bg-[#f6c8ff]",
      icon: (
        <CoPresent
          fontSize="large"
          className="text-theme"
        />
      ),
      name: "Total Attendance This Month",
      count: data?.GuestInfo?.guestCountByGender[0]?._count || 0,
      link: "/admin",
    },
    {
      id: 4,
      color: "bg-[#feb76f]",
      icon: (
        <Assessment
          fontSize="large"
          className="text-theme"
        />
      ),
      name: "Total Assets",
      count: data?.GuestInfo?.guestCountByGender[1]?._count || 0,
      link: "/admin",
    },
  ];
  const Quick_Access = [
    {
      id: 1,
      icon: <PersonPin fontSize="medium" className="text-white" />,
      title: "My Profile",
      color: "bg-[#673ab7]",
      link: "/admin/leaves/all-leaves",
    },
    {
      id: 2,
      icon: <RecentActors fontSize="medium" className="text-white" />,
      title: "My Cards",
      color: "bg-[#e91e63]",
      link: "/admin/roles/all-roles",
    },
    {
      id: 3,
      icon: <EventAvailable fontSize="medium" className="text-white" />,
      title: "My Attendance",
      color: "bg-[#ff9800]",
      link: "/admin/department/all-department",
    },
    {
      id: 4,
      icon: <AccountTree fontSize="medium" className="text-white" />,
      title: "My Projects",
      color: "bg-[#00bcd4]",
      link: "/admin/meetings/all-meetings",
    },
    {
      id: 5,
      icon: <Email fontSize="medium" className="text-white" />,
      title: "Email",
      color: "bg-[#607d8b]",
      link: "/admin/clients/all-clients",
    },
    {
      id: 6,
      icon: <Chat fontSize="medium" className="text-white" />,
      title: "Chats",
      color: "bg-[#3f51b5]",
      link: "/admin/technologies/all-technologies",
    },
    {
      id: 7,
      icon: <SupportAgent fontSize="medium" className="text-white" />,
      title: "Support",
      color: "bg-[#4caf50]",
      link: "/admin/support",
    },
  ];
  return (
    <div className="flex gap-2 py-4">
      <div className="w-full ">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {cards?.map((item) => (
            <Link href={item?.link} key={item?.id}>
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

export default AccountantDashboardCards;