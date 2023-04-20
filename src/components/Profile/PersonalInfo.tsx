import ICONS from "assets/icons";
import { PersonalInformations } from "components/Dialogs";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { User } from "types";
import BankInfo from "./BankInfo";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
const PersonalInfo = () => {
  const [isDialogue, setIsDialogue] = useState(false);
  const router = useRouter();
  const { data: employData, mutate } = useFetch<User>(
    `users/${router?.query?.id}`
  );
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-6 pt-6">
        <div className="bg-white rounded-md shadow-md shadow-theme px-6 py-4">
          {employData?.panNo || employData?.aadharNo || employData?.gmail ? (
            <>
              <div className="flex justify-between">
                <h1 className="text-xl font-medium py-2">
                  Personal Informations
                </h1>
                <div className="py-2 px-2">
                  <ICONS.Edit
                    className="h-5 w-5"
                    onClick={() => setIsDialogue(true)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 py-2 tracking-wide">
                <h5 className="font-medium">Pan No. :</h5>
                <span className="col-span-2">{employData?.panNo}</span>
                <h5 className="font-medium">Aadhar No :</h5>
                <span className="col-span-2 ">{employData?.aadharNo}</span>
                <h5 className="font-medium">Gmail :</h5>
                <span className="col-span-2 ">{employData?.gmail}</span>
                <h5 className="font-medium">Nationality :</h5>
                <span className="col-span-2 ">Indian</span>
                <h5 className="font-medium">Linkedin Id :</h5>
                <span className="col-span-2 ">{employData?.linkedin}</span>
                <h5 className="font-medium">Github Id :</h5>
                <span className="col-span-2 ">{employData?.github}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="py-6">
                  <h1 className="text-xl font-medium py-2">
                    No Personal Informations
                  </h1>
                  <Button
                    onClick={() => setIsDialogue(true)}
                    startIcon={<Add />}
                    className="!bg-theme !px-8 !py-2 !text-white !font-bold"
                  >
                    Add Personal Data
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bank Info */}
        <BankInfo />

        {/* <div className="rounded-md bg-white shadow-md shadow-theme px-6 py-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium py-2">Emergency Contact</h1>
            <div className="py-2 px-2">
              <ICONS.Edit className="h-5 w-5" />
            </div>
          </div>
          <h5 className="text-md font-medium py-1">Primary</h5>
          <div className="grid grid-cols-3 gap-y-1 mb-4 tracking-wide">
            <h5 className="font-medium">Primary Name :</h5>
            <span className="col-span-2">John Doe</span>
            <h5 className="font-medium">Relationship :</h5>
            <span className="col-span-2 ">Father</span>
            <h5 className="font-medium">Phone :</h5>
            <span className="col-span-2 ">9954882222</span>
          </div>
          <hr />
          <h5 className="text-md font-medium mt-4 py-1">Secondary</h5>
          <div className="grid grid-cols-3 gap-y-1 tracking-wide">
            <h5 className="font-medium">Name :</h5>
            <span className="col-span-2 ">Karen Wills</span>
            <h5 className="font-medium">Relationship :</h5>
            <span className="col-span-2 ">Brother</span>
            <h5 className="font-medium">Name :</h5>
            <span className="col-span-2 ">Karen Wills</span>
          </div>
        </div> */}
      </div>
      <PersonalInformations
        mutate={mutate}
        open={isDialogue}
        handleClose={() => setIsDialogue(false)}
      />
    </>
  );
};

export default PersonalInfo;
