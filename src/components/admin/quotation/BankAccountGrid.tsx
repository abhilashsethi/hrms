import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { BANK } from "assets/home";
import { IOSSwitch } from "components/core";
import { UpdateBankDetails } from "components/dialogues";
import { useChange } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { QuotationBank } from "types";
interface Props {
  mutate: () => void;
  data?: QuotationBank[];
}

const QuotationGrid = ({ mutate, data }: Props) => {
  const { change } = useChange();
  const [isUpdate, setIsUpdate] = useState<{
    dialogue: boolean;
    bankData?: QuotationBank;
  }>({ dialogue: false, bankData: {} });

  const handleBlock = async (e: ChangeEvent<HTMLInputElement>, id?: string) => {
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
        const res = await change(`quotations/update/account/${id}`, {
          method: "PATCH",
          body: { isBlock: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "Bank status update successfully!!", "success");
        return;
      }
    });
  };
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
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    }
  };
  return (
    <>
      <UpdateBankDetails
        bankData={isUpdate?.bankData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <div className="grid py-4 gap-6 lg:grid-cols-3 ">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl bg-gradient-to-r from-rose-100 to-teal-100"
          >
            <div className="relative">
              <p
                className={`absolute top-2 z-50 rounded-r-xl 
             ${
               item?.isBlock ? `bg-red-500` : `bg-green-500`
             } text-white text-sm px-2 pr-3 py-1 font-semibold`}
              >
                {item?.isBlock ? "Blocked" : "Active"}
              </p>
              <div className="absolute right-0 rounded-tl-lg top-24 z-50 p-2">
                <div className="flex">
                  {/* <Tooltip title="Status">
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
                      <IOSSwitch
                        size="small"
                        checked={item?.isBlock}
                        onChange={(e) => handleBlock(e, item?.id)}
                      />
                    </Avatar>
                  </Tooltip> */}
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
                      onClick={() => {
                        setIsUpdate({
                          dialogue: true,
                          bankData: item,
                        });
                      }}
                    >
                      <Edit
                        sx={{ padding: "0px !important" }}
                        fontSize="small"
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
                  <div className="grid py-1">
                    <p className="font-semibold text-base text-blue-600">
                      Bank Name :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.bankName}
                    </p>
                  </div>
                  <div className="grid py-1">
                    <p className="font-semibold text-base text-blue-600">
                      Branch Name :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.branchName}
                    </p>
                  </div>
                  <div className="grid py-1">
                    <p className="font-semibold text-base text-blue-600">
                      Account Number :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.accountNumber}
                    </p>
                  </div>
                  <div className="grid py-1">
                    <p className="font-semibold text-base text-blue-600">
                      Company Name :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.companyName}
                    </p>
                  </div>
                  <div className="grid py-1">
                    <p className="font-semibold text-base text-blue-600">
                      IFSC Code :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.ifscCode}
                    </p>
                  </div>
                  <div className="grid py-1">
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
