import { Add, Delete, Download, Edit, Print } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { CHATDOC } from "assets/home";
import moment from "moment";
import TenderLayout from "./TenderLayout";
import { useState } from "react";
import {
  UpdateTenderBasicDetails,
  AddTenderDocument,
  UpdateTenderEMDDetails,
  UpdateTenderFeeDetails
} from "components/dialogues";
import { useFetch } from "hooks";
import { Tender } from "types";
import { useRouter } from "next/router";
interface Props {
  tenderData?: Tender;
  mutate: () => void;
}
const TenderDetail = ({ tenderData, mutate }: Props) => {

  console.log("Get by Id", { tenderData });
  const basicDetails = [
    {
      id: 1, title: "Tender No",
      value: tenderData?.tenderNo || "---"
    },
    {
      id: 2,
      title: "Tender Title",
      value: tenderData?.title || "---",
    },
    {
      id: 3,
      title: "Portal",
      value: tenderData?.portal || "---",
    },
    {
      id: 4,
      title: "Tender Category",
      value: tenderData?.category || "---",
    },
    {
      id: 5,
      title: "Submission Date",
      value: `${moment(tenderData?.submissionDate).format("ll")}` || "---",
    },
    {
      id: 6,
      title: "Submission Time",
      value: `${moment(tenderData?.submissionTime).format("hh:mm A")}` || "---",
    },
    {
      id: 7,
      title: "Bid Value in ₹",
      value: tenderData?.bidValue || "---",
    },
  ];
  const tenderFees = [
    {
      id: 1,
      title: "Tender Fees in ₹",
      value: tenderData?.tenderFees || "---",
    },
    {
      id: 2,
      title: "Payment Mode",
      value: tenderData?.tenderPaymentMode || "---"
    },
  ];
  const emdFees = [
    {
      id: 3,
      title: "EMD Exemption",
      value: tenderData?.isEmdExemption ? "Yes" : "No",
    },
    {
      id: 4,
      title: "EMD Amount in ₹",
      value: tenderData?.EmdAmount || "---",
    },
    {
      id: 2,
      title: "Payment Mode",
      value: tenderData?.EmdPaymentMode || "---",
    },
  ];
  const [isUpdate, setIsUpdate] = useState<{
    dialogue: boolean;
    tenderData?: Tender;
  }>({ dialogue: false, tenderData: {} });
  const [isFeeDetails, setIsFeeDetails] = useState<{
    dialogue: boolean;
    tenderData?: Tender;
  }>({ dialogue: false, tenderData: {} });
  const [isEmdDetails, setIsEmdDetails] = useState<{
    dialogue: boolean;
    tenderData?: Tender;
  }>({ dialogue: false, tenderData: {} });
  const [isDocument, setIsDocument] = useState<{
    dialogue: boolean;
    tenderData?: Tender;
  }>({ dialogue: false, tenderData: {} });
  return (
    <section className="">
      <UpdateTenderBasicDetails
        tenderData={isUpdate?.tenderData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <UpdateTenderFeeDetails
        tenderData={isFeeDetails?.tenderData}
        open={isFeeDetails?.dialogue}
        handleClose={() => setIsFeeDetails({ dialogue: false })}
        mutate={mutate}
      />
      <UpdateTenderEMDDetails
        tenderData={isEmdDetails?.tenderData}
        open={isEmdDetails?.dialogue}
        handleClose={() => setIsEmdDetails({ dialogue: false })}
        mutate={mutate}
      />
      <AddTenderDocument
        tenderData={isDocument?.tenderData}
        open={isDocument?.dialogue}
        handleClose={() => setIsDocument({ dialogue: false })}
        mutate={mutate}
      />
      <div className="flex justify-end">
        <Button startIcon={<Print />} variant="contained" className="!bg-theme">
          View Details
        </Button>
      </div>
      <div className="mt-8">
        <TenderLayout title="Basic Details">
          <div className="flex justify-end absolute right-[10px] top-[10px]">
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => {
                setIsUpdate({ dialogue: true, tenderData: tenderData });
              }}>
                <Edit />
              </IconButton>
            </Tooltip>
          </div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-1/5 text-sm font-semibold py-2">Status</td>
                <td className="w-3/5">
                  <span className="text-sm py-1 px-2 text-white tracking-wide shadow-md bg-yellow-500 rounded-md">
                    {tenderData?.status}
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
        <TenderLayout title="Tender Fee Details">
          <div className="flex justify-end absolute right-[10px] top-[10px]">
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => {
                setIsFeeDetails({ dialogue: true, tenderData: tenderData });
              }}>
                <Edit />
              </IconButton>
            </Tooltip>
          </div>
          <table className="w-full">
            <tbody>
              {tenderFees?.map((item) => (
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
        <TenderLayout title="EMD Fee Details">
          <div className="flex justify-end absolute right-[10px] top-[10px]">
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => {
                setIsEmdDetails({ dialogue: true, tenderData: tenderData });
              }}>
                <Edit />
              </IconButton>
            </Tooltip>
          </div>
          <table className="w-full">
            <tbody>
              {emdFees?.map((item) => (
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
        <TenderLayout title="Tender Documents">
          <div>
            <div className="flex justify-end mb-2">
              <Button
                startIcon={<Add />}
                variant="contained"
                className="!bg-theme"
                onClick={() => {
                  setIsDocument({ dialogue: true, tenderData: tenderData });
                }}>
                Add Document
              </Button>
            </div>
            <table className="w-full">
              <tbody className="border-2">
                <tr className="border-b-2">
                  <th className="w-[10%] text-sm font-semibold py-2 border-r-2">
                    S.No
                  </th>
                  <th className="w-[40%] text-sm border-r-2">Document Name</th>
                  <th className="w-[30%] text-sm border-r-2">Document</th>
                  <th className="w-[20%] text-sm">Actions</th>
                </tr>
                {tenderData?.documents?.length ?
                  <>
                    {tenderData?.documents?.map((item, index) => (
                      <tr key={item?.id} className="border-b-2">
                        <td
                          align="center"
                          className="w-[10%] text-sm py-2 border-r-2"
                        >
                          {Number(index) + 1}
                        </td>
                        <td align="center" className="w-[40%] text-sm border-r-2">
                          {item?.title}
                        </td>
                        <td align="center" className="w-[30%] text-sm border-r-2">
                          <div className="flex gap-2 items-center justify-center">
                            <img
                              className="h-6 object-contain"
                              src={CHATDOC.src}
                              alt=""
                            />
                            <span>{item?.link}</span>
                          </div>
                        </td>
                        <td align="center" className="w-[20%] text-sm">
                          <div className="flex gap-1 py-2 justify-center">
                            <Tooltip title="Download Document">
                              <IconButton size="small">
                                <Download />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Document">
                              <IconButton size="small">
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                  : <p className="flex justify-center px-2 py-6">No Document</p>
                }
              </tbody>
            </table>
          </div>
        </TenderLayout>
      </div>
    </section>
  );
};

export default TenderDetail;

