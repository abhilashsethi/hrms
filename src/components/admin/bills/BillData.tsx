import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Loader } from "components/core";
import {
  AddAdditionalBillDetails,
  EditBasicBillDetails,
  EditBillTermsAndCondition,
} from "components/dialogues";
import EditAdditionalBillDetails from "components/dialogues/EditAdditionalBillDetails";
import { TenderLayout } from "components/tender";
import { useChange } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { Bills, Quotation } from "types";
interface Props {
  billData?: Bills;
  mutate: () => void;
  isLoading: boolean;
}
const BillData = ({ billData, mutate, isLoading }: Props) => {
  const [isQuotationWorkData, setQuotationWorkData] = useState<Quotation>({});
  const { change } = useChange();
  const [editDetails, setEditDetails] = useState<boolean>(false);
  const [additionDetails, setAdditionDetails] = useState<boolean>(false);
  const [AddAdditionDetails, setAddAdditionDetails] = useState<boolean>(false);
  const [termsAndConditionDetails, setTermsAndConditionDetails] =
    useState<boolean>(false);
  const basicDetails = [
    {
      id: 1,
      title: "Client Name",
      value: billData?.clientName || "---",
    },
    {
      id: 2,
      title: "Client Email",
      value: billData?.clientEmail || "---",
    },
    {
      id: 3,
      title: "Client Address",
      value: billData?.clientAddress || "---",
    },
    {
      id: 4,
      title: "Bill Amount",
      value: billData?.grandTotal?.toFixed(2) || "---",
    },
    {
      id: 5,
      title: "Invoice Number",
      value: billData?.billNumber || "---",
    },
    {
      id: 6,
      title: "Invoice Date",
      value: billData?.invoiceDate
        ? moment(billData?.invoiceDate).format("lll")
        : "Not Specified",
    },
    {
      id: 7,
      title: "Invoice Due Date",
      value: billData?.dueDate
        ? moment(billData?.dueDate).format("lll")
        : "Not Specified",
    },
    {
      id: 8,
      title: "Tax",
      value: billData?.isIgst ? "IGST" : "CGST & SGST",
    },
  ];
  const handleDelete = (item?: Bills) => {
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
          const res = await change(`bills/remove-work/${item?.id}`, {
            method: "DELETE",
            body: { billId: billData?.id },
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
  if (isLoading) {
    return (
      <section className="min-h-screen">
        <Loader />
      </section>
    );
  }
  return (
    <section>
      <EditBasicBillDetails
        open={editDetails}
        handleClose={() => setEditDetails(false)}
        mutate={mutate}
        data={billData}
      />
      <EditAdditionalBillDetails
        open={additionDetails}
        handleClose={() => setAdditionDetails(false)}
        mutate={mutate}
        data={isQuotationWorkData}
        billData={billData}
      />
      <EditBillTermsAndCondition
        open={termsAndConditionDetails}
        handleClose={() => setTermsAndConditionDetails(false)}
        mutate={mutate}
        data={billData}
      />
      <AddAdditionalBillDetails
        open={AddAdditionDetails}
        handleClose={() => setAddAdditionDetails(false)}
        mutate={mutate}
        data={billData}
      />

      <div className="mt-8">
        <TenderLayout title="Basic Details">
          <div className="flex justify-end absolute right-[10px] top-[10px]">
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => {
                  setEditDetails(true);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-1/5 text-sm font-semibold py-2">Status</td>
                <td className="w-3/5">
                  {billData?.status ? (
                    <span
                      className={`text-sm py-1 px-2 text-white tracking-wide shadow-md 
                  ${
                    billData?.status === "Unpaid"
                      ? "bg-red-500"
                      : billData?.status === "Paid"
                      ? "bg-green-500"
                      : null
                  } rounded-md`}
                    >
                      {billData?.status}
                    </span>
                  ) : (
                    "---"
                  )}
                </td>
              </tr>
              {basicDetails?.map((item) => (
                <tr>
                  <td className="w-1/5 text-sm font-semibold py-2">
                    {item?.title}
                  </td>
                  <td className="w-3/5">
                    <span className="text-sm text-gray-600 py-2">
                      {item?.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TenderLayout>
      </div>
      <div className="mt-14">
        <TenderLayout title="Additional Details">
          <div>
            <div className="flex justify-end mb-2">
              <Button
                onClick={() => {
                  setAddAdditionDetails(true);
                }}
                type="submit"
                variant="contained"
                className="!bg-theme"
                startIcon={<Add />}
              >
                Add New
              </Button>
            </div>
            <table className="w-full">
              <tbody className="border-2">
                <tr className="border-b-2">
                  <th className="w-[40%] text-sm border-r-2">Description</th>
                  <th className="w-[30%] text-sm border-r-2">SAC Code</th>
                  <th className="w-[30%] text-sm border-r-2">Amount</th>
                  <th className="w-[30%] text-sm">Actions</th>
                </tr>
                {billData?.works?.length ? (
                  <>
                    {billData?.works?.map((item) => (
                      <tr className="border-b-2">
                        <td
                          align="center"
                          className="w-[40%] text-sm border-r-2"
                        >
                          {item?.description}
                        </td>
                        <td
                          align="center"
                          className="w-[30%] text-sm border-r-2"
                        >
                          <div className="flex gap-2 items-center justify-center">
                            <p className="text-xs">{item?.SACcode}</p>
                          </div>
                        </td>
                        <td
                          align="center"
                          className="w-[30%] text-sm border-r-2"
                        >
                          <div className="flex gap-2 items-center justify-center">
                            <p className="text-xs">{item?.Amount}</p>
                          </div>
                        </td>
                        <td align="center" className="w-[20%] text-sm">
                          <div className="flex gap-1 py-2 justify-center">
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setQuotationWorkData(item),
                                    setAdditionDetails(true);
                                }}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small">
                                <Delete onClick={() => handleDelete(item)} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={4}>No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TenderLayout>
      </div>
      <div className="mt-14">
        <TenderLayout title="Terms & Conditions">
          <div className="">
            <div className="flex justify-end ">
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => {
                    setTermsAndConditionDetails(true);
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            </div>
            <p className="text-gray-500 text-justify text-sm">
              {billData?.termsAndConditions ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${billData?.termsAndConditions}`,
                  }}
                ></div>
              ) : (
                "No Terms And Conditions"
              )}
            </p>
          </div>
        </TenderLayout>
      </div>
    </section>
  );
};

export default BillData;
