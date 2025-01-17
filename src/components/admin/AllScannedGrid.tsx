import {
  AddCardRounded,
  Delete,
  MeetingRoomRounded,
  PersonRemoveRounded,
} from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { DEFAULTPROFILE, ID, QRIMAGE } from "assets/home";
import { IOSSwitch } from "components/core";
import { CardAssign, RoomAccessDrawer } from "components/drawer";
import { useAuth, useChange } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { Card, User } from "types";

interface Props {
  data?: Card[];
  mutate?: any;
  user?: any;
}

const AllScannedGrid = ({ data, user, mutate }: Props) => {
  return (
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
          {data?.map((item: any) => (
            <Grid key={item?.id} item lg={4} xl={3} md={2} sm={12}>
              <CardComponent item={item} mutate={mutate} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default AllScannedGrid;

interface Props {
  item?: any;
  mutate?: any;
}

const CardComponent = ({ item, mutate }: Props) => {
  const { user } = useAuth();
  const [isAccess, setIsAccess] = useState<{
    dialogue?: boolean;
    cardId?: string | null;
  }>({ dialogue: false, cardId: null });
  const [isAssign, setIsAssign] = useState<{
    drawer?: boolean;
    activeCardId?: string | null;
  }>({
    drawer: false,
    activeCardId: null,
  });
  const { change } = useChange();
  const handleBlock = async (e: any, cardId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await change(`cards/${cardId}`, {
          method: "PATCH",
          body: { isBlocked: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "Status updated successfully!!", "success");
        return;
      }
    });
  };
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const response = await change(`cards/delete/${id}`, {
            method: "DELETE",
          });
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          Swal.fire("Success", "Deleted successfully!", "success");
          mutate();
        }
      } catch (error) {
        if (error instanceof Error) {
          Swal.fire(`Error`, error?.message, `error`);
        } else {
          Swal.fire(`Error`, "Something Went Wrong", `error`);
        }
      }
    });
  };
  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove employee!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const response = await change(`cards/${id}`, {
            method: "DELETE",
          });
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          Swal.fire("Success", "Removed successfully!", "success");
          mutate();
        }
      } catch (error) {
        if (error instanceof Error) {
          Swal.fire(`Error`, error?.message, `error`);
        } else {
          Swal.fire(`Error`, "Something Went Wrong", `error`);
        }
      }
    });
  };
  return (
    <>
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
                          SwitchBloodGroup(item?.user?.bloodGroup)}
                      </p>
                    </div>
                  </div>
                  <div className="absolute w-full h-40 translate-y-[100%] hidden group-hover:block group-hover:translate-y-[0%] bottom-0 transition-all ease-in-out duration-300 bg-slate-700 bg-clip-padding  bg-opacity-20 border-gray-100">
                    <div className="flex justify-center pt-2">
                      <div className="w-12 bg-white rounded-full px-2 py-[0.2rem]">
                        <div className="border-b-2 border-black"></div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-2 mt-2">
                      <div className="flex items-center gap-4">
                        {user?.role?.name === "CEO" ||
                        user?.role?.name === "HR" ||
                        user?.role?.name === "DIRECTOR" ||
                        user?.role?.name === "COO" ? (
                          <>
                            <Tooltip title="Delete Card">
                              <div className="h-10 w-10 bg-white shadow-lg rounded-full">
                                <IconButton
                                  onClick={() => handleDelete(item?.id)}
                                >
                                  <Delete className="!text-youtube" />
                                </IconButton>
                              </div>
                            </Tooltip>
                            <Tooltip title="Remove Person">
                              <div className="h-10 w-10 bg-white shadow-lg rounded-full">
                                <IconButton
                                  onClick={() => handleRemove(item?.cardId)}
                                >
                                  <PersonRemoveRounded className="!text-theme" />
                                </IconButton>
                              </div>
                            </Tooltip>
                          </>
                        ) : null}
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
                      {user?.role?.name === "CEO" ||
                      user?.role?.name === "HR" ||
                      user?.role?.name === "DIRECTOR" ||
                      user?.role?.name === "COO" ? (
                        <div className="flex flex-col items-center gap-1">
                          <p className="font-semibold tracking-wide text-sm">
                            Unblock/Block
                          </p>
                          <IOSSwitch
                            checked={item?.isBlocked}
                            onChange={(e) => handleBlock(e, item?.cardId)}
                          />
                        </div>
                      ) : null}
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
                        <span>GUEST NAME : </span> {item?.guest?.name}
                      </p>
                      <p className="text-xs text-slate-900 font-semibold">
                        {item?.guest?.designation}
                      </p>
                      <p className="text-xs text-blue-900 tracking-wide">
                        {item?.guest?.email}
                      </p>
                    </div>
                  </div>
                  <div className="absolute w-full h-40 translate-y-[100%] hidden group-hover:block group-hover:translate-y-[0%] bottom-0 transition-all ease-in-out duration-300 bg-slate-700 bg-clip-padding bg-opacity-20 border-gray-100">
                    <div className="flex justify-center pt-2">
                      <div className="w-12 bg-white rounded-full px-2 py-[0.2rem]">
                        <div className="border-b-2 border-black"></div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-2 mt-2">
                      <div className="flex items-center gap-4">
                        {user?.role?.name === "CEO" ||
                        user?.role?.name === "HR" ||
                        user?.role?.name === "DIRECTOR" ||
                        user?.role?.name === "COO" ? (
                          <>
                            <Tooltip title="Delete Card">
                              <div className="h-10 w-10 bg-white shadow-lg rounded-full">
                                <IconButton
                                  onClick={() => handleDelete(item?.id)}
                                >
                                  <Delete className="!text-youtube" />
                                </IconButton>
                              </div>
                            </Tooltip>
                            <Tooltip title="Remove Person">
                              <div className="h-10 w-10 bg-white shadow-lg rounded-full">
                                <IconButton
                                  onClick={() => handleRemove(item?.cardId)}
                                >
                                  <PersonRemoveRounded className="!text-theme" />
                                </IconButton>
                              </div>
                            </Tooltip>
                          </>
                        ) : null}
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
                      <div className="flex flex-col items-center gap-1">
                        <p className="font-semibold tracking-wide text-sm">
                          Unblock/Block
                        </p>
                        <IOSSwitch
                          checked={item?.isBlocked}
                          onChange={(e) => handleBlock(e, item?.cardId)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 flex gap-4 w-full">
                    <h1 className="text-xs w-1/2 text-blue-900 tracking-wide flex flex-col">
                      <span className="font-semibold text-slate-800 underline">
                        Valid From
                      </span>
                      <span>{moment(item?.validFrom).format("ll")}</span>
                      <span>{moment(item?.validFrom).format("HH:MM A")}</span>
                    </h1>
                    <h1 className="text-xs w-1/2 text-blue-900 tracking-wide flex flex-col">
                      <span className="font-semibold text-slate-800 underline">
                        Valid Till
                      </span>
                      <span>{moment(item?.validTill).format("ll")}</span>
                      <span>{moment(item?.validTill).format("HH:MM A")}</span>
                    </h1>
                  </div>
                </>
              ) : (
                <div className="w-full">
                  <p className="text-center font-semibold text-sm tracking-wide">
                    CARD ID : <span>{item?.cardId}</span>
                  </p>
                  <p className="text-center text-red-500 font-semibold tracking-wide">
                    Card is not assigned!
                  </p>
                  <div className="flex gap-2 justify-center items-center">
                    <div className="flex items-center gap-3">
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(item?.id)}>
                          <Delete className="!text-youtube" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title="Assign User">
                        <IconButton
                          onClick={() => {
                            setIsAssign({
                              drawer: true,
                              activeCardId: item?.cardId,
                            });
                          }}
                        >
                          <AddCardRounded
                            className="!text-theme"
                            fontSize="large"
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full flex items-center justify-center gap-2"></div>
          </div>
        </div>
      </div>
      <CardAssign
        cardId={isAssign?.activeCardId}
        open={isAssign?.drawer}
        onClose={() => setIsAssign({ drawer: false })}
        mutate={mutate}
      />
    </>
  );
};

interface Props {
  id?: string;
  data?: Card[];
}

const SwitchBloodGroup = (bloodGroup: any) => {
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
