import { Loader, PhotoViewerSmall, TextTitles } from "components/core";
import TenderLayout from "./TenderLayout";
import { CHATDOC } from "assets/home";
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
import { Add, Check, Delete, Download, Person } from "@mui/icons-material";
import { AddTenderDocument, AddTenderReviewMember, AddTenderSubmissionMember } from "components/dialogues";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import * as Yup from "yup";
interface Props {
  tenderData?: Tender;
  mutate: () => void;
  isLoading?: boolean;
}
const TenderSubmission = ({ mutate, tenderData, isLoading }: Props) => {
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const [isDocumentValue, setIsDocumentValue] = useState(tenderData?.isAllDocumentsAdded)

  const [filteredMember, setFilteredMember] = useState<any | null>(null);
  tenderData?.members?.length ?
    useEffect(() => {
      const filtered = tenderData?.members?.find(member => member.isAllowedToSubmitTender);
      setFilteredMember(filtered || null);
    }, [tenderData]) : null;
  const initialValues = {
    status: `${tenderData?.status ? tenderData?.status : ""}`,
  };

  const validationSchema = Yup.object().shape({
  });
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
        Swal.fire(
          "Error",
          res?.results?.msg || "Unable to Submit",
          "error"
        );
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Status change successfully`, `success`);
      mutate()
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
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
      {tenderData?.members?.length ?
        <>
          {filteredMember ?
            <div className="w-80 rounded-md border-theme border-2 mt-3 p-4">
              <div className="mt-2 rounded-md p-2 flex gap-4 items-center">
                <PhotoViewerSmall
                  name={filteredMember?.member?.name}
                  size="3.5rem"
                  photo={filteredMember?.member?.photo}
                />
                <div>
                  <h1>{filteredMember?.member?.name}</h1>
                  <h1 className="text-sm text-gray-600">{filteredMember?.member?.email}</h1>
                </div>
              </div>
              <div className="mt-2 flex justify-center gap-2">
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
                <Button
                  onClick={() => handleRemove(filteredMember)}
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

      <div className="w-1/2 mt-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
          }) => (
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
