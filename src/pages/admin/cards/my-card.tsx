import { MeetingRoomRounded } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { DEFAULTPROFILE, ID, QRIMAGE } from "assets/home";
import {
  AdminBreadcrumbs,
  LoaderAnime,
  SkeletonLoaderLarge,
} from "components/core";
import { RoomAccessDrawer } from "components/drawer";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useState } from "react";
import { Card } from "types";

const MyCard = () => {
  const { user } = useAuth();
  const links = [{ id: 1, page: "My Cards", link: "/admin/cards/my-card" }];
  const [isAccess, setIsAccess] = useState<{
    dialogue?: boolean;
    cardId?: string | null;
  }>({ dialogue: false, cardId: null });
  const {
    data: cardData,
    isLoading,
    mutate,
  } = useFetch<Card[]>(`cards?${user?.id ? `&userId=${user?.id}` : ""}`);
  return (
    <PanelLayout title="My Card - Admin Panel">
      <section className="md:px-8 px-2 md:py-4 py-2">
        <div className="flex justify-between md:items-center md:flex-row flex-col items-start">
          <AdminBreadcrumbs links={links} />
        </div>
        <div>
          {isLoading ? (
            <SkeletonLoaderLarge />
          ) : (
            <>
              <div className="mt-2">
                <Grid
                  container
                  spacing={{
                    xs: 1,
                    sm: 2,
                    md: 3,
                  }}
                >
                  {cardData?.map((item: any) => (
                    <Grid key={item?.id} item lg={4} xl={3} md={2} sm={12}>
                      <RoomAccessDrawer
                        mutate={mutate}
                        open={isAccess?.dialogue}
                        onClose={() => setIsAccess({ dialogue: false })}
                        cardId={isAccess?.cardId}
                      />
                      <div className="flex items-center justify-center w-full h-full cursor-pointer">
                        <div
                          className="w-[18rem] h-[29.5rem] bg-contain group bg-no-repeat shadow-lg rounded-xl overflow-hidden"
                          style={{
                            backgroundImage: `url(${ID.src})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                          }}
                        >
                          <div className="flex flex-col !h-full relative">
                            <div className="w-full absolute top-[6.48rem] translate-x-[0%] flex justify-center items-center">
                              <img
                                src={item?.user?.photo || DEFAULTPROFILE.src}
                                alt="User Photo"
                                className="w-32 h-32 rounded-full object-cover"
                              />
                            </div>
                            <div className="h-1/2 w-full"></div>
                            <div className="w-full flex flex-col !h-1/2 items-start justify-start gap-2">
                              <div className="w-full flex flex-col items-center justify-center">
                                <div className="py-4">
                                  <p className="text-center text-theme tracking-wide font-semibold">
                                    {item?.user?.name}
                                  </p>
                                  <p className="text-center text-sm font-medium tracking-wide">
                                    {item?.user?.role?.name}
                                  </p>
                                </div>
                              </div>
                              {item?.userId ? (
                                <>
                                  <div className="w-full flex justify-between items-start gap-4 px-4 py-2">
                                    <div className="w-[30%] flex items-center">
                                      <img
                                        src={QRIMAGE.src}
                                        alt="QR Code"
                                        className="h-12 object-contain"
                                      />
                                    </div>
                                    <div className="w-[70%] flex flex-col items-end text-right tracking-wide">
                                      <p className="text-xs text-blue-900 font-semibold">
                                        <span>EMP ID : </span>
                                        {item?.user?.employeeID}
                                      </p>
                                      <p className="text-xs text-blue-900 font-semibold">
                                        <span>CARD ID : </span> {item?.cardId}
                                      </p>
                                      <p className="text-xs text-blue-900 tracking-wide">
                                        {item?.user?.email}
                                      </p>
                                      <p className="text-xs text-blue-900">
                                        {/* {item?.user?.bloodGroup} */}
                                        {item?.user?.bloodGroup &&
                                          SwitchBloodgroup(
                                            item?.user?.bloodGroup
                                          )}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="absolute w-full h-40 translate-y-[100%] hidden group-hover:block group-hover:translate-y-[0%] bottom-0 transition-all ease-in-out duration-300 bg-slate-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-gray-100">
                                    <div className="flex justify-center pt-2">
                                      <div className="w-12 bg-white rounded-full px-2 py-[0.2rem]">
                                        <div className="border-b-2 border-black"></div>
                                      </div>
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center gap-2 mt-2">
                                      <div className="flex items-center gap-4">
                                        <Tooltip title="Room Access">
                                          <div className="h-10 w-10 bg-white shadow-lg rounded-full">
                                            <IconButton
                                              onClick={() => {
                                                setIsAccess({
                                                  dialogue: true,
                                                  cardId: item?.cardId,
                                                });
                                              }}
                                            >
                                              <MeetingRoomRounded className="!text-black" />
                                            </IconButton>
                                          </div>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : item?.guestId ? (
                                <>
                                  <div className="w-full flex justify-between items-start gap-4 px-4 py-2">
                                    <div className="w-[30%] flex items-center">
                                      <img
                                        src={QRIMAGE.src}
                                        alt="QR Code"
                                        className="h-12 object-contain"
                                      />
                                    </div>
                                    <div className="w-[70%] flex flex-col items-end text-right tracking-wide">
                                      <p className="text-xs text-blue-900 font-semibold">
                                        <span>GUEST NAME : </span>{" "}
                                        {item?.guest?.name}
                                      </p>
                                      <p className="text-xs text-slate-900 font-semibold">
                                        {item?.guest?.designation}
                                      </p>
                                      <p className="text-xs text-blue-900 tracking-wide">
                                        {item?.guest?.email}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="absolute bottom-0 w-full h-40 translate-y-[100%] group-hover:translate-y-[0%] transition-all ease-in-out duration-300 bg-slate-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-gray-100">
                                    <div className="flex justify-center pt-2">
                                      <div className="w-12 bg-white rounded-full px-2 py-[0.2rem]">
                                        <div className="border-b-2 border-black"></div>
                                      </div>
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center gap-2 mt-2">
                                      <div className="flex items-center gap-4">
                                        <Tooltip title="Room Access">
                                          <div className="h-10 w-10 bg-white shadow-lg rounded-full">
                                            <IconButton
                                              onClick={() =>
                                                setIsAccess({
                                                  dialogue: true,
                                                  cardId: item?.cardId,
                                                })
                                              }
                                            >
                                              <MeetingRoomRounded className="!text-black" />
                                            </IconButton>
                                          </div>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-4 flex gap-4 w-full">
                                    <h1 className="text-xs w-1/2 text-blue-900 tracking-wide flex flex-col">
                                      <span className="font-semibold text-slate-800 underline">
                                        Valid From
                                      </span>
                                      <span>
                                        {moment(item?.validFrom).format("ll")}
                                      </span>
                                      <span>
                                        {moment(item?.validFrom).format(
                                          "HH:MM A"
                                        )}
                                      </span>
                                    </h1>
                                    <h1 className="text-xs w-1/2 text-blue-900 tracking-wide flex flex-col">
                                      <span className="font-semibold text-slate-800 underline">
                                        Valid Till
                                      </span>
                                      <span>
                                        {moment(item?.validTill).format("ll")}
                                      </span>
                                      <span>
                                        {moment(item?.validTill).format(
                                          "HH:MM A"
                                        )}
                                      </span>
                                    </h1>
                                  </div>
                                </>
                              ) : (
                                <p>No card Available</p>
                              )}
                            </div>
                            <div className="w-full flex items-center justify-center gap-2"></div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </>
          )}
        </div>
        {cardData?.length === 0 ? <LoaderAnime /> : null}
      </section>
    </PanelLayout>
  );
};

export default MyCard;
const SwitchBloodgroup = (bloodGroup: any) => {
  return (
    <p>
      Blood Group :{` `}
      {bloodGroup === "A_Positive"
        ? "A+"
        : bloodGroup === "A_Negative"
        ? "A-"
        : bloodGroup === "B_Negative"
        ? "B-"
        : bloodGroup === "B_Positive"
        ? "B+"
        : bloodGroup === "AB_Positive"
        ? "AB+"
        : bloodGroup === "AB_Negative"
        ? "AB-"
        : bloodGroup === "O_Positive"
        ? "O+"
        : bloodGroup === "O_Negative"
        ? "0-"
        : ""}
    </p>
  );
};
