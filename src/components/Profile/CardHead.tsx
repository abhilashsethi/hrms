import { Edit, SendRounded } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import ICONS from "assets/icons";
import { UpdateProfileHead } from "components/Dialogs";
import { ChangeProfile } from "components/dialogues";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { User } from "types";

const CardHead = () => {
  const router = useRouter();
  const [isDialogue, setIsDialogue] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const { data: employData, mutate } = useFetch<User>(
    `users/${router?.query?.id}`
  );
  // console.log(employData);
  return (
    <>
      <div className="bg-white border-b-2 border-theme px-4 py-6 shadow-md shadow-theme rounded">
        <div className="float-right py-2 px-2">
          <Tooltip title="Edit">
            <IconButton onClick={() => setIsDialogue(true)}>
              <ICONS.Edit className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="border-r-2 flex justify-center items-center">
            <div className="pr-8 relative flex justify-center items-center group ">
              {employData?.photo && (
                <img
                  className="h-28 w-28 object-contain rounded-full shadow-md"
                  src={employData?.photo}
                  alt="John Doe"
                />
              )}
              {!employData?.photo && (
                <div className="h-28 w-28 rounded-full uppercase shadow-lg flex justify-center items-center text-4xl font-bold border-[1px]">
                  {employData?.name.slice(0, 1)}
                </div>
              )}
              <div
                onClick={() => setIsProfile(true)}
                className="absolute cursor-pointer rounded-full w-28 h-28 group-hover:flex transition-all ease-in-out duration-300 justify-center items-center hidden  bg-[#0007]"
              >
                <Edit className="!text-white" />
              </div>
            </div>
            <div className="px-6">
              <h1 className="md:text-xl text-2xl font-bold capitalize">
                {employData?.name}
              </h1>
              <h5 className="text-gray-400 text-md py-1 capitalize">
                {employData?.role?.name || ""}
              </h5>
              <h5 className="text-md py-1 capitalize">
                Employee Id:{" "}
                <span className="font-semibold pl-2">
                  {employData?.employeeID || ""}
                </span>
              </h5>
              <h5 className="text-gray-400 text-md py-1 capitalize">
                Date of Join:{" "}
                <span>
                  {moment(employData?.joiningDate).format("ll") || ""}
                </span>
              </h5>
              <div className="mt-4">
                <Button
                  className="!bg-theme"
                  variant="contained"
                  startIcon={<SendRounded />}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <h5>Phone :</h5>
            <span className="col-span-2">{employData?.phone || ""}</span>
            <h5>Email :</h5>
            <span className="col-span-2 ">{employData?.email || ""}</span>
            <h5>Birthday :</h5>
            <span className="col-span-2 ">
              {moment(employData?.dob).format("ll")}
            </span>
            <h5>Address :</h5>
            <span className="col-span-2 ">{employData?.address || "---"}</span>
            <h5>Gender :</h5>
            <span className="col-span-2 ">
              {(employData?.gender as any) || "---"}
            </span>
          </div>
        </div>
      </div>
      <UpdateProfileHead
        open={isDialogue}
        handleClose={() => setIsDialogue(false)}
      />
      <ChangeProfile
        open={isProfile}
        handleClose={() => setIsProfile(false)}
        mutate={mutate}
      />
    </>
  );
};

export default CardHead;
