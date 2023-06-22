import {
  PendingActions,
  Groups,
  Engineering,
  AssignmentTurnedIn,
} from "@mui/icons-material";
import { CardAsset } from "assets/home";
import Link from "next/link";
interface Props {
  data?: any;
}
const MainHrDashboardCards = ({ data }: Props) => {
  console.log(data);
  const cards = [
    {
      id: 1,
      color: "bg-[#bbcbff]",
      icon: (
        <Groups
          fontSize="large"
          className="text-white group-hover:text-white"
        />
      ),
      name: "Total Employees",
      count: data?.totalEmployees || 0,
      link: "/admin/employees/all-employees",
    },
    {
      id: 2,
      color: "bg-[#b9e9fd]",
      icon: (
        <PendingActions
          fontSize="large"
          className="text-white group-hover:text-white"
        />
      ),
      name: "Pending Leave Request",
      count: data?.totalPendingLeaveRequest || 0,
      link: "/admin/leaves/leave-requests",
    },
    {
      id: 3,
      color: "bg-[#f6c8ff]",
      icon: (<AssignmentTurnedIn fontSize="large" className="text-white group-hover:text-white" />),
      name: "Today Total Attendance",
      count: data?.toDayTotalAttendance || 0,
      link: "/admin/attendances/today",
    },
    {
      id: 4,
      color: "bg-[#feb76f]",
      icon: (
        <Engineering fontSize="large" className="text-white group-hover:text-white" />
      ),
      name: "Total Guests",
      count: data?.totalGuest || 0,
      link: "/admin/guests/all-guests",
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
                  className="absolute right-[-35px] top-[-12px] h-24 object-contain"
                  src={CardAsset.src}
                  alt=""
                />
                <div className="bg-white h-12 w-12 rounded-lg flex items-center justify-center">
                  {item?.icon}
                </div>
                <span className="text-lg mt-6">{item?.count}</span>
                <span className="font-semibold tracking-wide text-sm ">
                  {item?.name}
                </span>
              </div>
              {/* <div
                className={`h-40 bg-gradient-to-br ${item?.color} w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
              >
                <div className="flex justify-around items-center">
                  <div>{item?.icon}</div>
                </div>
                <span className=" text-white font-semibold text-center tracking-wide text-lg">
                  {item?.name}
                </span>
                <span className="text-xl text-white text-center font-semibold">
                  {item?.count}
                </span>
              </div> */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainHrDashboardCards;
