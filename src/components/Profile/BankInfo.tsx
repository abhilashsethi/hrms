import MaterialTable from "@material-table/core";
import ICONS from "assets/icons";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { User } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";
import { BankInformationUpdate } from "components/Dialogs";

const BankInfo = () => {
  const [isDialogue, setIsDialogue] = useState(false);
  const { data, isLoading, mutate } = useFetch<User[]>(`users`);
  const { change, isChanging } = useChange();
  const { push } = useRouter();
  return (
    <>
      <div className="bg-white rounded-md shadow-md shadow-theme px-6 py-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium py-2">Bank information</h1>
          <div className="py-2 px-2">
            <ICONS.Edit
              className="h-5 w-5"
              onClick={() => setIsDialogue(true)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 py-2 tracking-wide">
          <h5 className="font-medium">Bank name :</h5>
          <span className="col-span-2">ICICI Bank</span>
          <h5 className="font-medium">Bank account No. :</h5>
          <span className="col-span-2 ">159843014641</span>
          <h5 className="font-medium">IFSC Code :</h5>
          <span className="col-span-2 ">ICI24504</span>
          <h5 className="font-medium">PAN No :</h5>
          <span className="col-span-2 ">TC000Y56</span>
        </div>
      </div>

      <BankInformationUpdate
        open={isDialogue}
        handleClose={() => setIsDialogue(false)}
      />
    </>
  );
};

export default BankInfo;
