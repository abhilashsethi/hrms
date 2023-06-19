import {
  PendingActions,
  Groups,
  AccountTree,
  WebAsset,
} from "@mui/icons-material";
import Link from "next/link";
interface Props {
  data?: any;
}
const MainDirectorDashboardCards = ({ data }: Props) => {
  console.log(data);
  const cards = [
    {
      id: 1,
      color: "from-green-600 to-green-400",
      icon: (
        <Groups
          fontSize="large"
          className="text-white group-hover:text-white"
        />
      ),
      name: "Total Employees",
      count: data?.GuestInfo?.totalGuest || 0,
      link: "/admin",
    },
    {
      id: 2,
      color: "from-red-600 to-red-400",
      icon: (
        <PendingActions
          fontSize="large"
          className="text-white group-hover:text-white"
        />
      ),
      name: "Pending Leave Request",
      count: data?.GuestInfo?.blockedGuestCount || 0,
      link: "/admin",
    },
    {
      id: 3,
      color: "from-blue-600 to-blue-400",
      icon: (<WebAsset fontSize="large" className="text-white group-hover:text-white" />),
      name: "Total Assets",
      count: data?.GuestInfo?.guestCountByGender[0]?._count || 0,
      link: "/admin",
    },
    {
      id: 4,
      color: "from-[#ff5874] to-[#ff8196]",
      icon: (
        <AccountTree fontSize="large" className="text-white group-hover:text-white" />
      ),
      name: "Total Projects",
      count: data?.GuestInfo?.guestCountByGender[1]?._count || 0,
      link: "/admin",
    },
  ];
  return (
    <div className="flex gap-2 py-4">
      <div className="w-full ">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {cards?.map((item) => (
            <Link href={item?.link} key={item?.id}>
              <div
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDirectorDashboardCards;
