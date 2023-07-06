import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { BANK } from "assets/home";
import { IOSSwitch } from "components/core";
import {
  UpdateBankDetails,
  UpdateTenderBasicDetails,
} from "components/dialogues";
import { useChange } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { QuotationBank } from "types";
interface Props {
  mutate?: any;
  data?: QuotationBank[];
}

const QuotationGrid = ({ mutate, data }: Props) => {
  const { change } = useChange();
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState<{
    dialogue: boolean;
    bankData?: QuotationBank;
  }>({ dialogue: false, bankData: {} });
  const handleDelete = (id?: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`quotations/delete/account/${id}`, {
            method: "DELETE",
          });
          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            return;
          }
          Swal.fire(`Success`, "Deleted Successfully!", "success");
          mutate();
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <UpdateBankDetails
        tenderData={isUpdate?.bankData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <div className="grid py-4 gap-6 lg:grid-cols-3">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl"
          >
            <div className="relative">
              <p
                className={`absolute top-2 z-50 rounded-r-xl 
             bg-green-500 text-white text-sm px-2 pr-3 py-1 font-semibold`}
              >
                Active
              </p>
              <div className="absolute right-0 rounded-tl-lg top-24 z-50 bg-gradient-to-r from-rose-100 to-teal-100 p-2">
                <div className="flex">
                  <Tooltip title="Status">
                    <Avatar
                      variant="rounded"
                      className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-gray-300 !p-0"
                      sx={{
                        mr: "0.1vw",
                        padding: "0px !important",
                        backgroundColor: "Highlight",
                        cursor: "pointer",
                        color: "",
                        width: 60,
                        height: 33,
                      }}
                    >
                      <IOSSwitch />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Avatar
                      variant="rounded"
                      className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
                      sx={{
                        mr: "0.1vw",
                        padding: "0px !important",
                        backgroundColor: "Highlight",
                        cursor: "pointer",
                        color: "",
                        width: 30,
                        height: 33,
                      }}
                    >
                      <Delete
                        sx={{ padding: "0px !important" }}
                        fontSize="small"
                        onClick={() => handleDelete(item?.id)}
                      />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <Avatar
                      variant="rounded"
                      className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-theme-500 !p-0"
                      sx={{
                        mr: "0.1vw",
                        padding: "0px !important",
                        backgroundColor: "Highlight",
                        cursor: "pointer",
                        color: "",
                        width: 30,
                        height: 33,
                      }}
                    >
                      <Edit
                        sx={{ padding: "0px !important" }}
                        fontSize="small"
                        onClick={() => {
                          setIsUpdate({
                            dialogue: true,
                            bankData: item,
                          });
                        }}
                      />
                    </Avatar>
                  </Tooltip>
                </div>
              </div>
              <div className="flex justify-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 py-3 rounded-t-lg w-full border">
                <img src={BANK.src} alt="" className="w-24" />
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-rose-100 to-teal-100">
                <div className="pt-3 flex flex-col">
                  <div className="flex  gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Bank Name :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.bankName}
                    </p>
                  </div>
                  <div className="flex  gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Branch Name :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.branchName}
                    </p>
                  </div>
                  <div className="flex  gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Account Number :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.accountNumber}
                    </p>
                  </div>
                  <div className="flex  gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Company Name :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.companyName}
                    </p>
                  </div>
                  <div className="flex  gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      IFSC Code :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.ifscCode}
                    </p>
                  </div>
                  <div className="flex  gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      SWIFT Code :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.swiftCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuotationGrid;
