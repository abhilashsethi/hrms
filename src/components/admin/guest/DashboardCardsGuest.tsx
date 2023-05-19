import { AssignmentTurnedIn, ContentPasteGo } from "@mui/icons-material";
interface Props {
  data?: any;
}
const DashboardCardsGuest = ({ data }: Props) => {
  return (
    <div className="flex gap-2 py-4">
      <div className="w-full ">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
          <div>
            <div className="border-4 border-b-theme h-32 bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
              <div className="flex justify-around items-center">
                <div>
                  <ContentPasteGo
                    fontSize="large"
                    className="text-theme group-hover:text-white"
                  />
                </div>
              </div>
              <span className=" text-theme font-semibold text-center tracking-wide text-lg">
                Total Guest
              </span>
              <span className="text-xl text-theme text-center font-semibold">
                {data?.GuestInfo?.totalGuest}
              </span>
            </div>
          </div>
          <div>
            <div className="border-4 border-b-theme h-32 bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
              <div className="flex justify-around items-center">
                <div>
                  <ContentPasteGo
                    fontSize="large"
                    className="text-theme group-hover:text-white"
                  />
                </div>
              </div>
              <span className=" text-theme font-semibold text-center tracking-wide text-lg">
                Total Blocked Guest
              </span>
              <span className="text-xl text-theme text-center font-semibold">
                {data?.GuestInfo?.blockedGuestCount}
              </span>
            </div>
          </div>
          <div>
            <div className="border-4 border-b-theme h-32 bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
              <div className="flex justify-around items-center">
                <div>
                  <ContentPasteGo
                    fontSize="large"
                    className="text-theme group-hover:text-white"
                  />
                </div>
              </div>
              <span className=" text-theme font-semibold text-center tracking-wide text-lg">
                Total Male Guest
              </span>
              <span className="text-xl text-theme text-center font-semibold">
                {data?.GuestInfo?.blockedGuestCount}
              </span>
            </div>
          </div>
          <div>
            <div className="border-4 border-b-theme h-32 bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
              <div className="flex justify-around items-center">
                <div>
                  <ContentPasteGo
                    fontSize="large"
                    className="text-theme group-hover:text-white"
                  />
                </div>
              </div>
              <span className=" text-theme font-semibold text-center tracking-wide text-lg">
                Total Female Guest
              </span>
              <span className="text-xl text-theme text-center font-semibold">
                {data?.GuestInfo?.blockedGuestCount}
              </span>
            </div>
          </div>

          {/* {data?.roles?.map((item: any) => (
            <>
              <div key={item?.id}>
                <div className="border-4 border-b-theme h-32 bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
                  <div className="flex justify-around items-center">
                    <div>
                      <AssignmentTurnedIn
                        fontSize="large"
                        className="text-theme"
                      />
                    </div>
                  </div>
                  <span className=" text-theme font-semibold text-center tracking-wide text-lg">
                    {item?.name}
                  </span>
                  <span className="text-xl text-theme text-center font-semibold">
                    {item?._count?.users}
                  </span>
                </div>
              </div>
            </>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default DashboardCardsGuest;
