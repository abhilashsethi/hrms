import { Loader, PhotoViewerSmall, TextTitles } from "components/core";
import TenderLayout from "./TenderLayout";
import { CHATDOC, PDF } from "assets/home";
import {
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Link,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  Add,
  Check,
  Delete,
  Download,
  Edit,
  Person,
} from "@mui/icons-material";
import {
  AddTenderDocument,
  AddTenderReviewMember,
  AddTenderSubmissionMember,
  UpdateTenderDocument,
} from "components/dialogues";
import { Form, Formik } from "formik";
import { useAuth, useChange } from "hooks";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import * as Yup from "yup";
import { deleteFile, downloadFile } from "utils";
interface Props {
  tenderData?: Tender;
  mutate: () => void;
  isLoading?: boolean;
}
interface TenderDoc {
  link?: any;
  title?: string;
  id?: string;
}
const TenderSubmission = ({ mutate, tenderData, isLoading }: Props) => {
  const { user } = useAuth();
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const [isDocumentValue, setIsDocumentValue] = useState(
    tenderData?.isAllDocumentsAdded
  );

  const [filteredMember, setFilteredMember] = useState<any | null>(null);
  tenderData?.members?.length
    ? useEffect(() => {
        const filtered = tenderData?.members?.find(
          (member) => member.isAllowedToSubmitTender
        );
        setFilteredMember(filtered || null);
      }, [tenderData])
    : null;
  const initialValues = {
    status: `${tenderData?.status ? tenderData?.status : ""}`,
  };

  const validationSchema = Yup.object().shape({});
  const [isUpdateDocument, setIsUpdateDocument] = useState<{
    dialogue: boolean;
    tenderData?: TenderDoc;
  }>({ dialogue: false, tenderData: {} });
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
          const res = await change(
            `tenders/remove-member-from-tender?assignMemberId=${item?.id}&tenderId=${tenderData?.id}`,
            {
              method: "PATCH",
            }
          );

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
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    }
  };
  const handleSubmit = async (values: Tender) => {
    setLoading(true);
    try {
      const res = await change(`tenders/update/${tenderData?.id}`, {
        method: "PATCH",
        body: {
          status: values?.status,
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Status change successfully`, `success`);
      mutate();
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (item: TenderDoc) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete ${item?.title}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(
            `tenders/remove/document?tenderId=${tenderData?.id}&docId=${item?.id}`,
            {
              method: "DELETE",
            }
          );
          if (item?.id) {
            await deleteFile(String(item?.link?.split("/").reverse()[0]));
          }
          if (res?.status !== 200) {
            Swal.fire(`Error`, "Something went wrong!", "error");
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

  const isCEOOrCOO =
    user?.role?.name === "CEO" ||
    user?.role?.name === "COO" ||
    user?.role?.name === "DIRECTOR" ||
    user?.role?.name === "BID MANAGER";

  if (isLoading) {
    return (
      <section className="min-h-screen">
        <Loader />
      </section>
    );
  }

  return (
    <section>
      <UpdateTenderDocument
        tenderData={isUpdateDocument?.tenderData}
        open={isUpdateDocument?.dialogue}
        handleClose={() => setIsUpdateDocument({ dialogue: false })}
        mutate={mutate}
      />
      <AddTenderDocument
        tenderData={isDocument?.tenderData}
        open={isDocument?.dialogue}
        handleClose={() => setIsDocument({ dialogue: false })}
        mutate={mutate}
      />
      <AddTenderSubmissionMember
        tenderData={isMember?.tenderData}
        open={isMember?.dialogue}
        handleClose={() => setIsMember({ dialogue: false })}
        mutate={mutate}
      />
      <h1 className="text-theme font-semibold">Assigned Member</h1>
      {tenderData?.members?.length ? (
        <>
          {filteredMember ? (
            <div className="md:w-96 w-full rounded-md border-theme border-2 mt-3 md:p-4 p-2">
              <div className="md:mt-2 rounded-md p-2 md:flex grid justify-items-center gap-4 items-center">
                <PhotoViewerSmall
                  name={filteredMember?.member?.name}
                  size="3.5rem"
                  photo={filteredMember?.member?.photo}
                />
                <div>
                  <h1 className="break-all md:break-normal">
                    {filteredMember?.member?.name}
                  </h1>
                  <h1 className="text-sm text-gray-600 break-all md:break-normal">
                    {filteredMember?.member?.email}
                  </h1>
                </div>
              </div>
              <div className="mt-2 md:flex grid justify-center gap-2">
                <Link
                  href={`/admin/employees/profile/${filteredMember?.member?.id}`}
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
                {user?.role?.name === "CEO" ||
                user?.role?.name === "BID MANAGER" ? (
                  <Button
                    onClick={() => handleRemove(filteredMember)}
                    variant="contained"
                    className="!bg-youtube"
                    size="small"
                    startIcon={<Delete />}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="md:w-80 w-full">
              <div className="grid py-6 justify-center justify-items-center">
                <p className="text-lg font-semibold">No Member Assigned</p>
                <div className="flex justify-end mb-2">
                  {user?.role?.name === "CEO" ||
                  user?.role?.name === "BID MANAGER" ? (
                    <Button
                      startIcon={<Add />}
                      variant="contained"
                      className="!bg-theme"
                      onClick={() => {
                        setIsMember({ dialogue: true, tenderData: tenderData });
                      }}
                    >
                      Add Member
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="md:w-80 w-full">
          <div className="grid py-6 justify-center justify-items-center">
            <p className="text-lg font-semibold">No Member Assigned</p>
            <div className="flex justify-end mb-2">
              <Button
                startIcon={<Add />}
                variant="contained"
                className="!bg-theme"
                onClick={() => {
                  setIsMember({ dialogue: true, tenderData: tenderData });
                }}
              >
                Add Member
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-14">
        <TenderLayout title="Documents">
          <div>
            {/* <div className="flex justify-end mb-2">
              <Button
                startIcon={<Add />}
                variant="contained"
                className="!bg-theme"
                onClick={() => {
                  setIsDocument({ dialogue: true, tenderData: tenderData });
                }}
              >
                Add Document
              </Button>
            </div> */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <tbody className="border-2">
                  <tr className="border-b-2">
                    <th className="w-[10%] text-sm font-semibold py-2 border-r-2">
                      S.No
                    </th>
                    <th className="w-[40%] text-sm border-r-2">
                      Document Name
                    </th>
                    <th className="w-[30%] text-sm border-r-2">Document</th>
                    <th className="w-[20%] text-sm">Actions</th>
                  </tr>
                  {tenderData?.documents?.length ? (
                    <>
                      {tenderData?.documents?.map((item, index) => (
                        <tr key={item?.id} className="border-b-2">
                          <td
                            align="center"
                            className="w-[10%] text-sm py-2 border-r-2"
                          >
                            {Number(index) + 1}
                          </td>
                          <td
                            align="center"
                            className="w-[40%] text-sm border-r-2"
                          >
                            {item?.title}
                          </td>
                          <td
                            align="center"
                            className="w-[30%] text-sm border-r-2"
                          >
                            <div className="flex gap-2 items-center justify-center">
                              <img
                                className="h-6 object-contain"
                                src={CHATDOC.src}
                                alt=""
                              />
                              <p className="text-xs">
                                {item?.link?.slice(0, 9)}
                                {item?.link?.length > 9 ? "..." : null}
                              </p>
                            </div>
                          </td>
                          {isCEOOrCOO ? (
                            <td align="center" className="w-[20%] text-sm">
                              <div className="flex gap-1 py-2 justify-center">
                                <Tooltip
                                  title="Download Document"
                                  onClick={() =>
                                    downloadFile(
                                      item?.link,
                                      item?.link?.split("/")?.at(-1) as any
                                    )
                                  }
                                >
                                  <IconButton size="small">
                                    <Download />
                                  </IconButton>
                                </Tooltip>
                                {/* <Tooltip title="Edit Document">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setIsUpdateDocument({
                                      dialogue: true,
                                      tenderData: item,
                                    });
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Document">
                                <IconButton size="small">
                                  <Delete onClick={() => handleDelete(item)} />
                                </IconButton>
                              </Tooltip> */}
                              </div>
                            </td>
                          ) : filteredMember &&
                            filteredMember?.member?.name === user?.name ? (
                            <td align="center" className="w-[20%] text-sm">
                              <div className="flex gap-1 py-2 justify-center">
                                <Tooltip
                                  title="Download Document"
                                  onClick={() =>
                                    downloadFile(
                                      item?.link,
                                      item?.link?.split("/")?.at(-1) as any
                                    )
                                  }
                                >
                                  <IconButton size="small">
                                    <Download />
                                  </IconButton>
                                </Tooltip>
                                {/* <Tooltip title="Edit Document">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setIsUpdateDocument({
                                      dialogue: true,
                                      tenderData: item,
                                    });
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Document">
                                <IconButton size="small">
                                  <Delete onClick={() => handleDelete(item)} />
                                </IconButton>
                              </Tooltip> */}
                              </div>
                            </td>
                          ) : null}
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={4} className="flex justify-center px-2 py-6">
                        No Document
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden w-full max-h-96 overflow-scroll">
              <div className="grid grid-cols-1 gap-4 py-6">
                {tenderData?.documents?.length ? (
                  <>
                    {tenderData?.documents?.map((item, index) => (
                      <div key={index}>
                        <div className="bg-white text-sm rounded-lg shadow-lg">
                          <div className="h-28 rounded-t-lg bg-gradient-to-r from-theme-400 to-cyan-300 flex gap-4 justify-center items-center justify-items-center">
                            <div>
                              <img src={PDF.src} className="h-14 w-14" />
                              <p className="text-xs text-white">
                                {item?.link?.slice(0, 9)}
                                {item?.link?.length > 9 ? "..." : null}
                              </p>
                            </div>
                          </div>
                          <div className="px-4 py-2">
                            <div className="flex gap-3 pt-2">
                              <span className=" font-semibold">S.No :</span>
                              <span>{Number(index) + 1}</span>
                            </div>
                            <div className="grid gap-2">
                              <span className=" font-semibold">
                                Document Name :
                              </span>
                              <span>{item?.title}</span>
                            </div>
                            {isCEOOrCOO ? (
                              <div className="grid gap-2">
                                <span className=" font-semibold">
                                  Actions :
                                </span>
                                <div className="flex gap-1 py-2 justify-center">
                                  <Tooltip
                                    title="Download Document"
                                    onClick={() =>
                                      downloadFile(
                                        item?.link,
                                        item?.link?.split("/")?.at(-1) as any
                                      )
                                    }
                                  >
                                    <IconButton size="small">
                                      <Download />
                                    </IconButton>
                                  </Tooltip>
                                  {/* <Tooltip title="Edit Document">
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      setIsUpdateDocument({
                                        dialogue: true,
                                        tenderData: item,
                                      });
                                    }}
                                  >
                                    <Edit />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Document">
                                  <IconButton size="small">
                                    <Delete
                                      onClick={() => handleDelete(item)}
                                    />
                                  </IconButton>
                                </Tooltip> */}
                                </div>
                              </div>
                            ) : filteredMember &&
                              filteredMember?.member?.name === user?.name ? (
                              <div className="grid gap-2">
                                <span className=" font-semibold">
                                  Actions :
                                </span>
                                <div className="flex gap-1 py-2 justify-center">
                                  <Tooltip
                                    title="Download Document"
                                    onClick={() =>
                                      downloadFile(
                                        item?.link,
                                        item?.link?.split("/")?.at(-1) as any
                                      )
                                    }
                                  >
                                    <IconButton size="small">
                                      <Download />
                                    </IconButton>
                                  </Tooltip>
                                  {/* <Tooltip title="Edit Document">
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      setIsUpdateDocument({
                                        dialogue: true,
                                        tenderData: item,
                                      });
                                    }}
                                  >
                                    <Edit />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Document">
                                  <IconButton size="small">
                                    <Delete
                                      onClick={() => handleDelete(item)}
                                    />
                                  </IconButton>
                                </Tooltip> */}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div>
                    <span className="flex justify-center px-2 py-6">
                      No Document
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile View  end*/}
          </div>
        </TenderLayout>
      </div>
      {filteredMember && filteredMember?.member?.name === user?.name ? (
        <div className="md:w-1/2 w-full mt-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <h1 className="font-semibold">Update Status </h1>
                <TextField
                  className="!mt-4"
                  select
                  fullWidth
                  id="status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.status && !!errors.status}
                  helperText={touched.status && errors.status}
                >
                  {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <div className="flex mt-2 mb-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <Check />
                    }
                    variant="contained"
                    className="!bg-green-500"
                  >
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : null}
    </section>
  );
};

export default TenderSubmission;

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
    value: "TechnicalEvaluation",
    label: "Technical Evaluation",
  },
  {
    value: "FinancialEvaluation",
    label: "Financial Evaluation",
  },
  {
    value: "BidAwarded",
    label: "Bid Awarded",
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
