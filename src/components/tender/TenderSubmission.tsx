import { PhotoViewerSmall, TextTitles } from "components/core";
import TenderLayout from "./TenderLayout";
import { CHATDOC } from "assets/home";
import {
  Button,
  Checkbox,
  IconButton,
  Link,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { Add, Check, Delete, Download, Person } from "@mui/icons-material";
import { useState } from "react";
import { AddTenderDocument } from "components/dialogues";

const TenderSubmission = () => {
  const [isDocument, setIsDocument] = useState<{
    dialogue?: boolean;
    tenderData?: any | null;
  }>({ dialogue: false, tenderData: null });
  return (
    <section>
      <AddTenderDocument
        tenderData={isDocument?.tenderData}
        open={isDocument?.dialogue}
        handleClose={() => setIsDocument({ dialogue: false })}
      // mutate={mutate}
      />
      <h1 className="text-theme font-semibold">Assigned Member</h1>
      <div className="w-80 rounded-md border-theme border-2 mt-3 p-4">
        <div className="mt-2 rounded-md p-2 flex gap-4 items-center">
          <PhotoViewerSmall
            name="Srinu Reddy"
            size="3.5rem"
            photo={
              "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm328-366-tong-08_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=6a37204762fdd64612ec2ca289977b5e"
            }
          />
          <div>
            <h1>Srinu Reddy</h1>
            <h1 className="text-sm text-gray-600">srinu@sy.com</h1>
          </div>
        </div>
        <div className="mt-2 flex justify-center gap-2">
          <Link
            href={`/admin/employees/all-employees?id=`}
          >
            <Button
              variant="contained"
              className="!bg-theme"
              size="small"
              startIcon={<Person />}
            >
              View Details
            </Button>
          </Link>
          <Button
            // onClick={() => removeClient()}
            variant="contained"
            className="!bg-youtube"
            size="small"
            startIcon={<Delete />}
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="mt-14">
        <TenderLayout title="Documents">
          <div>
            <div className="flex justify-end mb-2">
              <Button
                startIcon={<Add />}
                variant="contained"
                className="!bg-theme"
                onClick={() => {
                  setIsDocument({ dialogue: true, tenderData: documents });
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

      <div className="w-1/2 mt-4">
        <h1 className="font-semibold">Update Status </h1>
        <TextField
          className="!mt-4"
          select
          fullWidth
          defaultValue="Disqualified"
        >
          {statuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div className="flex mt-2 mb-2">
          <Button
            startIcon={<Check />}
            variant="contained"
            className="!bg-green-500"
          >
            Update
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TenderSubmission;

const documents = [
  { id: 1, name: "Financial Document", doc: "alldata.csv" },
  { id: 2, name: "Tender Agreement", doc: "agreements.csv" },
];

const statuses = [
  {
    value: "Submitted",
    label: "Submitted",
  },
  {
    value: "Cancelled",
    label: "Cancelled",
  },
  {
    value: "Open",
    label: "Open",
  },
  {
    value: "Closed",
    label: "Closed",
  },
  {
    value: "Technical Evaluation",
    label: "Technical Evaluation",
  },
  {
    value: "Financial Evaluation",
    label: "Financial Evaluation",
  },
  {
    value: "Bid Awarded",
    label: "Bid Awarded",
  },
  {
    value: "Closed",
    label: "Closed",
  },
  {
    value: "L1",
    label: "L1",
  },
  {
    value: "Disqualified",
    label: "Disqualified",
  },
];
