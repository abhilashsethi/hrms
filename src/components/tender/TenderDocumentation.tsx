import { PhotoViewerSmall, TextTitles } from "components/core";
import TenderLayout from "./TenderLayout";
import { CHATDOC } from "assets/home";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { Add, Check, Delete, Download, Person } from "@mui/icons-material";
import { useState } from "react";
import { AddTenderDocument, AddTenderDocumentationMember } from "components/dialogues";
import { Tender } from "types";
import Swal from "sweetalert2";
import { useChange } from "hooks";
interface Props {
  tenderData?: Tender;
  mutate: () => void;
}
const TenderDocumentation = ({ mutate, tenderData }: Props) => {
  const { change } = useChange();
  const [isDocument, setIsDocument] = useState<{
    dialogue: boolean;
    tenderData?: any | null;
  }>({ dialogue: false, tenderData: null });
  const [isMember, setIsMember] = useState<{
    dialogue: boolean;
    tenderData?: Tender;
  }>({ dialogue: false, tenderData: {} });
  const handleRemove = async (item: Tender) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Remove user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`tenders/remove-member-from-tender?assignMemberId=${item?.id}&tenderId=${tenderData?.id}`, {
            method: "PATCH",
          });

          if (res?.status !== 200) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          Swal.fire(`Success`, "Remove Successfully!", "success");
          mutate();
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <AddTenderDocument
        tenderData={isDocument?.tenderData}
        open={isDocument?.dialogue}
        handleClose={() => setIsDocument({ dialogue: false })}
        mutate={mutate}
      />
      <AddTenderDocumentationMember
        tenderData={isMember?.tenderData}
        open={isMember?.dialogue}
        handleClose={() => setIsMember({ dialogue: false })}
        mutate={mutate}
      />
      <h1 className="text-theme font-semibold">Assigned Member</h1>
      {tenderData?.members?.length ?
        <>
          {tenderData?.members?.map((item) => (
            <>
              {item?.isAllowedToAddDoc ?
                <div key={item?.id} className="w-80 rounded-md border-theme border-2 mt-3 p-4">
                  <div className="mt-2 rounded-md p-2 flex gap-4 items-center">
                    <PhotoViewerSmall
                      name={item?.member?.name}
                      size="3.5rem"
                      photo={item?.member?.photo}
                    />
                    <div>
                      <h1>{item?.member?.name}</h1>
                      <h1 className="text-sm text-gray-600">{item?.member?.email}</h1>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-center gap-2">
                    <Link
                      href={`/admin/employees/profile/${item?.id}`}
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
                      onClick={() => handleRemove(item)}
                      variant="contained"
                      className="!bg-youtube"
                      size="small"
                      startIcon={<Delete />}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                : <div className="w-80">
                  <div className="grid py-6 justify-center justify-items-center">
                    <p className="text-lg font-semibold">
                      No Member Assigned
                    </p>
                    <div className="flex justify-end mb-2">
                      <Button
                        startIcon={<Add />}
                        variant="contained"
                        className="!bg-theme"
                        onClick={() => {
                          setIsMember({ dialogue: true, tenderData: tenderData });
                        }}>
                        Add Member
                      </Button>
                    </div>
                  </div>
                </div>}
            </>
          ))}
        </> :
        <div className="w-80">
          <div className="grid py-6 justify-center justify-items-center">
            <p className="text-lg font-semibold">
              No Member Assigned
            </p>
            <div className="flex justify-end mb-2">
              <Button
                startIcon={<Add />}
                variant="contained"
                className="!bg-theme"
                onClick={() => {
                  setIsMember({ dialogue: true, tenderData: tenderData });
                }}>
                Add Member
              </Button>
            </div>
          </div>
        </div>
      }
      <div className="mt-14">
        <TenderLayout title="Documents">
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
                  :
                  <tr>
                    <td colSpan={4} className="flex justify-center px-2 py-6">
                      No Document
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </TenderLayout>
      </div>
      <div className="mt-4">
        <h1 className="font-semibold">All documents created ? </h1>
        <div className="flex gap-2 items-center">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>

        </div>
      </div>
      <div className="w-1/2">
        <h1 className="font-semibold">Reason </h1>
        <TextField
          multiline
          fullWidth
          rows={3}
          placeholder="Reason"
          className="mt-2"
        />
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

export default TenderDocumentation;

const documents = [
  { id: 1, name: "Financial Document", doc: "alldata.csv" },
  { id: 2, name: "Tender Agreement", doc: "agreements.csv" },
];
