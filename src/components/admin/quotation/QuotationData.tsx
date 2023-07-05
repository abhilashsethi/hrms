import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import {
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
  const [editDetails, setEditDetails] = useState<boolean>(false);
  const [additionDetails, setAdditionDetails] = useState<boolean>(false);
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
      value:
        quotationData?.clientAddress,
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
        data={quotationData}
      />
      <EditTermsAndConditionDialogue
        open={termsAndConditionDetails}
        handleClose={() => setTermsAndConditionDetails(false)}
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
                  <span className="text-sm py-1 px-2 text-white tracking-wide shadow-md bg-green-500 rounded-md">
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
            <table className="w-full">
              <tbody className="border-2">
                <tr className="border-b-2">
                  <th className="w-[10%] text-sm font-semibold py-2 border-r-2">
                    S.No
                  </th>
                  <th className="w-[40%] text-sm border-r-2">Description</th>
                  <th className="w-[30%] text-sm border-r-2">Qty</th>
                  <th className="w-[30%] text-sm border-r-2">Cost</th>
                  <th className="w-[30%] text-sm">Actions</th>
                </tr>

                <>
                  <tr className="border-b-2">
                    <td
                      align="center"
                      className="w-[10%] text-sm py-2 border-r-2"
                    >
                      1
                    </td>
                    <td align="center" className="w-[40%] text-sm border-r-2">
                      {/* {item?.title} */}Android App & Admin Panel Development
                    </td>
                    <td align="center" className="w-[30%] text-sm border-r-2">
                      <div className="flex gap-2 items-center justify-center">
                        <p className="text-xs">1</p>
                      </div>
                    </td>
                    <td align="center" className="w-[30%] text-sm border-r-2">
                      <div className="flex gap-2 items-center justify-center">
                        <p className="text-xs">1,20,000</p>
                      </div>
                    </td>
                    <td align="center" className="w-[20%] text-sm">
                      <div className="flex gap-1 py-2 justify-center">
                        <Tooltip title="Edit Document">
                          <IconButton
                            size="small"
                            onClick={() => {
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
                </>
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
              Welcome to SearchingYard! These terms and conditions outline the
              rules and regulations for the use of SearchingYard's Website,
              located at https://searchingyard.com/. By accessing this website
              we assume you accept these terms and conditions. Do not continue
              to use SearchingYard if you do not agree to take all of the terms
              and conditions stated on this page. The following terminology
              applies to these Terms and Conditions, Privacy Statement and
              Disclaimer Notice and all Agreements: "Client", "You" and "Your"
              refers to you, the person log on this website and compliant to the
              Company’s terms and conditions. "The Company", "Ourselves", "We",
              "Our" and "Us", refers to our Company. "Party", "Parties", or
              "Us", refers to both the Client and ourselves. All terms refer to
              the offer, acceptance and consideration of payment necessary to
              undertake the process of our assistance to the Client in the most
              appropriate manner for the express purpose of meeting the Client’s
              needs in respect of provision of the Company’s stated services, in
              accordance with and subject to, prevailing law of Netherlands. Any
              use of the above terminology or other words in the singular,
              plural, capitalization and/or he/she or they, are taken as
              interchangeable and therefore as referring to same. Cookies We
              employ the use of cookies. By accessing SearchingYard, you agreed
              to use cookies in agreement with the SearchingYard's Privacy
              Policy. Most interactive websites use cookies to let us retrieve
              the user’s details for each visit. Cookies are used by our website
              to enable the functionality of certain areas to make it easier for
              people visiting our website. Some of our affiliate/advertising
              partners may also use cookies.
            </p>
          </div>
        </TenderLayout>
      </div>
    </section>
  );
};

export default QuotationData;

// const docs = [
// 	{ id: 1, title: "Doc 53426", img: PDF.src },
// 	{ id: 2, title: "Doc 53426", img: DOC.src },
// 	{ id: 3, title: "Doc 53426", img: XLS.src },
// 	{ id: 4, title: "Doc 53426", img: IMG.src },
// 	{ id: 5, title: "Doc 53426", img: PDF.src },
// 	{ id: 6, title: "Doc 53426", img: PDF.src },
// ];
