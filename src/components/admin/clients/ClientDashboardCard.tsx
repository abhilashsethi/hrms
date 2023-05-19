import { BLOCK, HANDSHAKE } from "assets/dashboard_Icons";
import React from "react";
interface Props {
  cards?: any;
}
const ClientDashboardCard = ({ cards }: Props) => {
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {/* ------Total Client-------- */}
        <div
          className={`hover:scale-105 grid justify-center justify-items-center cursor-pointer transition duration-500 ease-in-out w-full tracking-wide bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg rounded-xl p-4 h-36 `}
        >
          <div className="">
            <img src={HANDSHAKE.src} className="w-16" alt="" />
          </div>
          <p className="text-lg font-medium text-white">
            {cards?.clients?.totalClient}
          </p>
          <p className="text-lg font-semibold text-white">Total Client</p>
        </div>
        {/* ------Total Blocked ------- */}
        <div
          className={`hover:scale-105 grid justify-center justify-items-center cursor-pointer transition duration-500 ease-in-out w-full tracking-wide bg-gradient-to-br from-[#ff5874] to-[#ff8196] shadow-lg rounded-xl p-4 h-36 `}
        >
          <div className="">
            <img src={BLOCK.src} className="w-12" alt="" />
          </div>
          <p className="text-lg font-medium text-white">
            {cards?.clients?.blockedClients}
          </p>
          <p className="text-lg font-semibold text-white">Total Block Client</p>
        </div>
      </div>
    </>
  );
};

export default ClientDashboardCard;
