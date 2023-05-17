import {
  AddCardRounded,
  Delete,
  MeetingRoomRounded,
  PersonRemoveRounded,
} from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { IOSSwitch } from "components/core";
import { useChange } from "hooks";
import Swal from "sweetalert2";
import { useState } from "react";
import { Card } from "types";
import { CardAssign, RoomAccessDrawer } from "components/drawer";
import { DEFAULTPROFILE, ID } from "assets/home";

interface Props {
  data?: Card[];
  mutate?: any;
}

const AllScannedGrid = ({ data, mutate }: Props) => {
  return (
    <>
      <div className="mt-2">
        <Grid container spacing={3}>
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
  const [isAccess, setIsAccess] = useState(false);
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
          const response = await change(`cards/${id}`, {
            method: "DELETE",
          });
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          Swal.fire("Success", "Deleted successfully!", "success");
          mutate();
        }
      } catch (error) {
        console.log(error);
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
        console.log(error);
      }
    });
  };
  return (
    <>
      <RoomAccessDrawer open={isAccess} onClose={() => setIsAccess(false)} />
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
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SearchingYard.com"
                        alt="QR Code"
                        className="w-12 h-12 "
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
                        {item?.user?.bloodGroup}
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
                        <Tooltip title="Delete Card">
                          <div className="h-10 w-10 bg-white shadow-lg rounded-full">
                            <IconButton onClick={() => handleDelete(item?.id)}>
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
                        <Tooltip title="Room Access">
                          <div className="h-10 w-10 bg-white shadow-lg rounded-full">
                            <IconButton onClick={() => setIsAccess(true)}>
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

// const rests = [1];

// <div className="w-full flex flex-col items-center justify-center gap-4  ">
// <div className="relative overflow-hidden w-full flex h-[32rem] flex-col shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-6 py-4 rounded-lg gap-3">
//   <div className="h-[18rem] overflow-hidden w-[36rem] rotate-[36deg] absolute top-[-38px] left-[-11px]">
//     <div
//       className="w-full h-[130%] rotate-[144deg]"
//       style={{
//         backgroundImage:
//           "url(" +
//           "https://img.freepik.com/free-vector/violet-mandala-design_53876-80479.jpg?w=740&t=st=1682683386~exp=1682683986~hmac=c7baa05e610b52e68afe4a8c0b92987c323e862744375f7bbe588beeb41bc151" +
//           ")",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     ></div>
//   </div>
//   <div className="w-full flex flex-col items-center justify-center pt-4 relative">
//     <div className="w-[10rem] mt-5 h-20 absolute top-0">
//       <img
//         src="https://www.searchingyard.com/_next/static/media/icon.e85db0e4.svg"
//         alt="Logo"
//       />
//     </div>
//   </div>
//   <div className="w-full mt-8 flex items-center justify-center">
//     <div className="w-[12rem] h-[12rem] rounded-full relative">
//       <div className="w-[10rem] h-[10rem] rounded-full bg-cyan-400 absolute top-4 left-4"></div>
//       <img
//         src={DEFAULTPROFILE.src}
//         alt="User Photo"
//         className="w-[8rem] h-[8rem] rounded-full absolute top-8 left-8"
//       />
//     </div>
//   </div>
//   {item?.userId ? (
//     <div className="flex flex-col gap-2">
//       <div className="w-full flex flex-col">
//         <p className="text-lg font-semibold text-blue-950">
//           <CardNameComponent userId={item?.userId} isName />
//         </p>
//       </div>

//       <div className="w-full flex justify-between gap-8">
//         <div className="flex flex-col item-end justify-end">
//           <Tooltip title="Assign User">
//             <IconButton
//               onClick={() => {
//                 setIsAssign({
//                   drawer: true,
//                   activeCardId: item?.cardId,
//                 });
//               }}
//             >
//               <AddCardRounded
//                 className="!text-theme"
//                 fontSize="large"
//               />
//             </IconButton>
//           </Tooltip>
//         </div>

//         <div className="flex flex-col justify-end items-end text-blue-900">
//           <p className="text-sm ">{item?.cardId}</p>
//           <p className="text-sm">
//             <CardNameComponent userId={item?.userId} isEmail />
//           </p>
//           <p className="text-sm">
//             <CardNameComponent userId={item?.userId} isPhone />
//           </p>
//           <p className="text-sm">O +ve</p>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <>
//       <div className="w-full grid justify-items-center">
//         <p className="pt-6 text-lg font-semibold text-red-600">
//           Not Assigned
//         </p>
//         <Tooltip title="Assign User">
//           <IconButton
//             onClick={() => {
//               setIsAssign({
//                 drawer: true,
//                 activeCardId: item?.cardId,
//               });
//             }}
//           >
//             <AddCardRounded
//               className="!text-theme"
//               fontSize="large"
//             />
//           </IconButton>
//         </Tooltip>
//       </div>
//     </>
//   )}
//   <div className="w-full flex items-center justify-center gap-2">
//     <p className="font-semibold tracking-wide text-sm">
//       Unblock/Block
//     </p>
//     <IOSSwitch
//       checked={item?.isBlocked}
//       onChange={(e) => handleBlock(e, item?.cardId)}
//     />
//   </div>
// </div>
// </div>
