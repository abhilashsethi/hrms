import { AddCardRounded } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import {
  CardNameComponent,
  IOSSwitch,
  Loader,
  TextTitles,
} from "components/core";
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";
import { useState } from "react";
import { Card } from "types";
import { CardAssign } from "components/drawer";
const AllScannedGrid = () => {
  const [isAssign, setIsAssign] = useState<{
    drawer?: boolean;
    activeCardId?: string | null;
  }>({
    drawer: false,
    activeCardId: null,
  });
  const { data, isLoading, mutate } = useFetch<Card[]>(`cards`);
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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <TextTitles title="Scanned Cards" />

      <div className="mt-4">
        <Grid container spacing={3}>
          {data?.map((item: any) => (
            <Grid key={item?.id} item lg={3}>
              <div className="w-full flex flex-col items-center justify-center gap-4  ">
                <div className="relative overflow-hidden w-full flex h-[32rem] flex-col shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-6 py-4 rounded-lg gap-3">
                  <div className="h-[18rem] overflow-hidden w-[36rem] rotate-[36deg] absolute top-[-38px] left-[-11px]">
                    <div
                      className="w-full h-[130%] rotate-[144deg]"
                      style={{
                        backgroundImage:
                          "url(" +
                          "https://img.freepik.com/free-vector/gradient-abstract-background_23-2149101392.jpg?w=996&t=st=1682488853~exp=1682489453~hmac=7d07aa079e3ca4dd1b7f0e661c299fed4f919886deddfe8f6acf9a9db159201d" +
                          ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </div>
                  {/* company logo */}
                  <div className="w-full flex flex-col items-center justify-center pt-4 relative">
                    <div className="w-[10rem] mt-5 h-20 absolute top-0">
                      <img
                        src="https://www.searchingyard.com/_next/static/media/icon.e85db0e4.svg"
                        alt="Logo"
                      />
                    </div>
                  </div>
                  {/* user Photo */}
                  <div className="w-full mt-8 flex items-center justify-center">
                    <div className="w-[12rem] h-[12rem] rounded-full relative">
                      <div className="w-[10rem] h-[10rem] rounded-full bg-cyan-400 absolute top-4 left-4"></div>
                      <img
                        src="https://picsum.photos/200"
                        alt="User Photo"
                        className="w-[8rem] h-[8rem] rounded-full absolute top-8 left-8"
                      />
                    </div>
                  </div>
                  {/* user Details */}
                  {item?.userId ? (
                    <div className="flex flex-col gap-2">
                      <div className="w-full flex flex-col">
                        <p className="text-lg font-semibold text-blue-950">
                          <CardNameComponent userId={item?.userId} isName />
                        </p>
                      </div>
                      {/* profile Details */}

                      <div className="w-full flex justify-between gap-8">
                        <div className="flex flex-col item-end justify-end">
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

                        <div className="flex flex-col justify-end items-end text-blue-900">
                          <p className="text-sm ">{item?.cardId}</p>
                          <p className="text-sm">
                            <CardNameComponent userId={item?.userId} isEmail />
                          </p>
                          <p className="text-sm">
                            <CardNameComponent userId={item?.userId} isPhone />
                          </p>
                          <p className="text-sm">O +ve</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-full grid justify-items-center">
                        <p className="pt-6 text-lg font-semibold text-red-600">
                          Not Assigned
                        </p>
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
                    </>
                  )}
                  <div className="w-full flex items-center justify-center gap-2">
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
              {/* <div className="py-6 px-4 bg-slate-50 w-full shadow-lg rounded-lg flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-lg font-semibold tracking-wide capitalize">
                    Card Id: {item?.cardId}
                  </p>
                  <p className="text-lg font-semibold tracking-wide capitalize">
                    User name: <CardNameComponent userId={item?.userId} />
                  </p>

                  <div className="grid justify-items-center gap-2">
                    <div className="h-10 w-10 cursor-pointer hover:shadow-xl flex justify-center items-center text-lg font-semibold">
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
                    <p className="font-semibold tracking-wide text-sm">
                      Unblock/Block
                    </p>
                    <IOSSwitch
                      checked={item?.isBlocked}
                      onChange={(e) => handleBlock(e, item?.cardId)}
                    />
                  </div>
                </div>
              </div> */}
            </Grid>
          ))}
        </Grid>
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

export default AllScannedGrid;