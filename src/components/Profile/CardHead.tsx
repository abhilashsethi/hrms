import { SendRounded } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { UpdateProfileHead } from "components/Dialogs";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CardHead = () => {
  const router = useRouter();
  const [isDialogue, setIsDialogue] = useState(false);
  const { data: employData } = useFetch<{ name: string; employeeID: string }>(
    `users/${router?.query?.id}`
  );
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
          <div className="md:flex border-r-2">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full"
                src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
                alt="John Doe"
              />
            </div>
            <div className="px-6">
              <h1 className="md:text-xl text-2xl font-bold capitalize">
                {employData?.name}
              </h1>
              <h5 className="text-gray-400 text-sm capitalize">
                UI/UX Design Team
              </h5>
              <h5 className="text-gray-400 text-md py-1 capitalize">
                Web Developer
              </h5>
              <h5 className="text-md py-1 capitalize">
                Employee Id:{" "}
                <span className="font-semibold pl-2">
                  {employData?.employeeID}
                </span>
              </h5>
              <h5 className="text-gray-400 text-md py-1 capitalize">
                Date of Join: <span>1st Jan 2013</span>
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
            <span className="col-span-2">9934567892</span>
            <h5>Email :</h5>
            <span className="col-span-2 ">xyzcom@yard.com</span>
            <h5>Birthday :</h5>
            <span className="col-span-2 ">24th July</span>
            <h5>Address :</h5>
            <span className="col-span-2 ">
              1861 Bayonne Ave, Mancheswar, Bhubaneswar,7510024
            </span>
            <h5>Gender :</h5>
            <span className="col-span-2 ">Male</span>
            <h5>Reports to :</h5>
            <span className="col-span-2">
              <div className="flex">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
                  alt="John Doe"
                />
                <span className="px-4">Ashirbad Panigrahi</span>
              </div>
            </span>
          </div>
        </div>
      </div>
      <UpdateProfileHead
        open={isDialogue}
        handleClose={() => setIsDialogue(false)}
      />
    </>
  );
};

export default CardHead;
