import { Add, Delete, Download, Edit, Print } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { CHATDOC } from "assets/home";
import moment from "moment";
import TenderLayout from "./TenderLayout";

const TenderDetail = () => {
  return (
    <section className="">
      <div className="flex justify-end">
        <Button startIcon={<Print />} variant="contained" className="!bg-theme">
          View Details
        </Button>
      </div>
      <div className="mt-8">
        <TenderLayout title="Basic Details">
          <div className="flex justify-end absolute right-[10px] top-[10px]">
            <Tooltip title="Edit">
              <IconButton size="small">
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
                    Open
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
              <IconButton size="small">
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
        <TenderLayout title="Tender Documents">
          <div>
            <div className="flex justify-end mb-2">
              <Button
                startIcon={<Add />}
                variant="contained"
                className="!bg-theme"
              >
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
                {documents?.map((item, index) => (
                  <tr key={item?.id} className="border-b-2">
                    <td
                      align="center"
                      className="w-[10%] text-sm py-2 border-r-2"
                    >
                      {Number(index) + 1}
                    </td>
                    <td align="center" className="w-[40%] text-sm border-r-2">
                      {item?.name}
                    </td>
                    <td align="center" className="w-[30%] text-sm border-r-2">
                      <div className="flex gap-2 items-center justify-center">
                        <img
                          className="h-6 object-contain"
                          src={CHATDOC.src}
                          alt=""
                        />
                        <span>{item?.doc}</span>
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
              </tbody>
            </table>
          </div>
        </TenderLayout>
      </div>
    </section>
  );
};

export default TenderDetail;

const basicDetails = [
  { id: 1, title: "Tender No", value: "18/EE/AIIMS/RPR/2023-24" },
  {
    id: 2,
    title: "Tender Title",
    value: "Administrative Department - AIIMS Raipur",
  },
  {
    id: 3,
    title: "Portal",
    value:
      "https://eprocure.gov.in/eprocure/app?component=%24DirectLink&page=Home&service=direct&session=T&sp=SPL%2BSTi4WzReT4fcrO9UwDw%3D%3D",
  },
  { id: 4, title: "Tender Category", value: "Works" },
  {
    id: 5,
    title: "Submission Date",
    value: `${moment(new Date()).format("ll")}`,
  },
  {
    id: 6,
    title: "Submission Time",
    value: `${moment(new Date()).format("hh:mm A")}`,
  },
  {
    id: 7,
    title: "Bid Value in ₹",
    value: `50,00,000/-`,
  },
];

const tenderFees = [
  { id: 1, title: "Tender Fees in ₹", value: "150.00" },
  {
    id: 2,
    title: "Payment Mode",
    value: "Online",
  },
  {
    id: 3,
    title: "EMD Exemption",
    value: "No",
  },
  {
    id: 4,
    title: "EMD Amount in ₹",
    value: "20, 000/-",
  },
];

const documents = [
  { id: 1, name: "Financial Document", doc: "alldata.csv" },
  { id: 2, name: "Tender Agreement", doc: "agreements.csv" },
];
