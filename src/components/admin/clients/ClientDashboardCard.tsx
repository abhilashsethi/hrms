import React from "react";
interface Props {
  cards?: any;
}
const ClientDashboardCard = ({ cards }: Props) => {
  return (
    <div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div>
          <div
            className={`hover:scale-105 cursor-pointer transition duration-500 ease-in-out w-full tracking-wide ${cards?.color} shadow-lg rounded-xl p-4 flex justify-between items-center h-36 `}
          >
            <div className="flex flex-col items-start gap-5">
              <p className="text-lg font-medium text-center text-white">
                {cards?.title}
              </p>
              <div className="flex justify-center items-center">
                {cards?.icon}
              </div>
            </div>

            <p className="text-2xl font-semibold text-white">{cards?.count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardCard;
