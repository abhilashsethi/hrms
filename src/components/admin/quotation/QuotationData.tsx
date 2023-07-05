import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import {
  AddAdditionalQuotationDetails,
  EditAdditionalQuotationDetails,
  EditQuotationDetails,
} from "components/dialogues";
import EditTermsAndConditionDialogue from "components/dialogues/EditTermsAndConditionDialogue";
import { TenderLayout } from "components/tender";
import { useState } from "react";
import { Quotation } from "types";
interface Props {
  quotationData?: Quotation;
  mutate?: any;
  isLoading?: any;
}
const QuotationData = ({ quotationData, mutate, isLoading }: Props) => {
  const [isQuotationWorkData, setQuotationWorkData] = useState<Quotation>({});
  const [editDetails, setEditDetails] = useState<boolean>(false);
  const [additionDetails, setAdditionDetails] = useState<boolean>(false);
  const [AddadditionDetails, setAddAdditionDetails] = useState<boolean>(false);
  const [termsAndConditionDetails, setTermsAndConditionDetails] =
    useState<boolean>(false);
  console.log("Details=>", { quotationData });
  const basicDetails = [
    {
      id: 1,
      title: "Client Name",
      value: quotationData?.clientName,
    },
    {
      id: 2,
      title: "Client Email",
      value: quotationData?.clientEmail,
    },
    {
      id: 3,
      title: "Client Address",
      value: quotationData?.clientAddress,
    },
    {
      id: 4,
      title: "Quotation Title",
      value: quotationData?.clientName,
    },
    {
      id: 5,
      title: "Quotation Number",
      value: quotationData?.quotationNumber,
    },
    {
      id: 6,
      title: "Tax",
      value: quotationData?.isIgst ? "IGST" : "CGST & SGST",
    },
  ];

  return (
    <section>
      <EditQuotationDetails
        open={editDetails}
        handleClose={() => setEditDetails(false)}
        mutate={mutate}
        data={quotationData}
      />
      <EditAdditionalQuotationDetails
        open={additionDetails}
        handleClose={() => setAdditionDetails(false)}
        mutate={mutate}
        data={isQuotationWorkData}
        quotationData={quotationData}
      />
      <EditTermsAndConditionDialogue
        open={termsAndConditionDetails}
        handleClose={() => setTermsAndConditionDetails(false)}
        mutate={mutate}
        data={quotationData}
      />
      <AddAdditionalQuotationDetails
        open={AddadditionDetails}
        handleClose={() => setAddAdditionDetails(false)}
        mutate={mutate}
        data={quotationData}
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
                  <span className={`text-sm py-1 px-2 text-white tracking-wide shadow-md 
                  ${quotationData?.status === "Rejected" ? "bg-red-500" :
                      quotationData?.status === "Accepted" ? "bg-green-500" :
                        "bg-yellow-500"} rounded-md`}>
                    {quotationData?.status}
                  </span>
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
                  <th className="w-[30%] text-sm border-r-2">Qty</th>
                  <th className="w-[30%] text-sm border-r-2">Cost</th>
                  <th className="w-[30%] text-sm">Actions</th>
                </tr>
                {quotationData?.works?.length ? (
                  <>
                    {quotationData?.works?.map((item) => (
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
                            <p className="text-xs">{item?.quantity}</p>
                          </div>
                        </td>
                        <td
                          align="center"
                          className="w-[30%] text-sm border-r-2"
                        >
                          <div className="flex gap-2 items-center justify-center">
                            <p className="text-xs">{item?.cost}</p>
                          </div>
                        </td>
                        <td align="center" className="w-[20%] text-sm">
                          <div className="flex gap-1 py-2 justify-center">
                            <Tooltip title="Edit Document">
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
                            <Tooltip title="Delete Document">
                              <IconButton size="small">
                                <Delete
                                // onClick={() => handleDelete(item)}
                                />
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
              {quotationData?.termsAndConditions ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${quotationData?.termsAndConditions}`,
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

export default QuotationData;
