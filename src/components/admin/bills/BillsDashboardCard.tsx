import {
  ADVANCE_BILLS,
  PAID_BILLS,
  TOTAL_BILLS,
  UNPAID_BILLS,
} from "assets/dashboard_Icons";
import Link from "next/link";
import { Bills } from "types";

interface Props {
  data?: Bills;
}
const BillsDashboardCard = ({ data }: Props) => {
  const cards = [
    {
      id: 1,
      name: "Total Bills",
      count: data?.totalBillCount || 0,
      icon: <img src={TOTAL_BILLS.src} className="w-16" alt="" />,
      color: "bg-gradient-to-br from-blue-600 to-cyan-400",
      link: "/admin/bills/all-bills",
    },
    {
      id: 2,
      name: "Total Unpaid Bills",
      count: data?.totalUnpaidBillCount || 0,
      icon: <img src={UNPAID_BILLS.src} className="w-16" alt="" />,
      color: "bg-gradient-to-br from-green-500 to-emerald-400",
      link: "/admin/bills/all-bills",
    },
    {
      id: 3,
      name: "Total Advance Bills",
      count: data?.totalAdvanceBillCount || 0,
      icon: <img src={ADVANCE_BILLS.src} className="w-16" alt="" />,
      color: "bg-gradient-to-br from-orange-500 to-yellow-400",
      link: "/admin/bills/all-bills",
    },
    {
      id: 4,
      name: "Total Paid Bills",
      count: data?.totalPaidBillCount || 0,
      icon: <img src={PAID_BILLS.src} className="w-16" alt="" />,
      color: "bg-gradient-to-br from-[#ff5874] to-[#ff8196]",
      link: "/admin/bills/all-bills",
    },
  ];
  return (
    <>
      <div className="flex gap-2 py-4">
        <div className="w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
            {cards?.map((item, i) => (
              <Link key={i} href={item?.link}>
                <div
                  className={`group hover:scale-105 transition duration-500 ease-in-out ${item?.color} w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer`}
                >
                  <div className="flex justify-around items-center pb-3">
                    <div className="p-3 rounded-full">
                      <div className="w-16">{item?.icon}</div>
                    </div>
                  </div>
                  <span className="text-white font-semibold text-center tracking-wide text-md">
                    {item?.name}
                  </span>
                  <span className="text-white text-xl text-center font-semibold ">
                    {item?.count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BillsDashboardCard;
