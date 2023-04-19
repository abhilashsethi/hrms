import ICONS from "assets/icons";
import { PersonalInformations } from "components/Dialogs";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { User } from "types";
const PersonalInfo = () => {
  const [isDialogue, setIsDialogue] = useState(false);
  const { data, isLoading, mutate } = useFetch<User[]>(`users`);
  const { change, isChanging } = useChange();
  const { push } = useRouter();
  console.log(data);
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-6 pt-6">
        <div className="bg-white rounded-md shadow-md shadow-theme px-6 py-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium py-2">Personal Informations</h1>
            <div className="py-2 px-2">
              <ICONS.Edit
                className="h-5 w-5"
                onClick={() => setIsDialogue(true)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 py-2 tracking-wide">
            <h5 className="font-medium">Passport No. :</h5>
            <span className="col-span-2">9934567892</span>
            <h5 className="font-medium">Passport Exp Date :</h5>
            <span className="col-span-2 ">9876543210</span>
            <h5 className="font-medium">Tel :</h5>
            <span className="col-span-2 ">9876543210</span>
            <h5 className="font-medium">Nationality :</h5>
            <span className="col-span-2 ">Indian</span>
            <h5 className="font-medium">Religion :</h5>
            <span className="col-span-2 ">Hindu</span>
            <h5 className="font-medium">Marital status :</h5>
            <span className="col-span-2 ">Married</span>
            <h5 className="font-medium">Employment of spouse :</h5>
            <span className="col-span-2 ">No</span>
            <h5 className="font-medium">No. of children :</h5>
            <span className="col-span-2 ">2</span>
          </div>
        </div>
        <div className="rounded-md bg-white shadow-md shadow-theme px-6 py-4">
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
        </div>
      </div>
      <PersonalInformations
        open={isDialogue}
        handleClose={() => setIsDialogue(false)}
      />
    </>
  );
};

export default PersonalInfo;
