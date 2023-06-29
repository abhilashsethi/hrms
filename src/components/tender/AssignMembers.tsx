import {
  FileCopy,
  FindInPage,
  KeyboardArrowRight,
  Task,
  Timeline
} from "@mui/icons-material";
import { Autocomplete, Button, CircularProgress, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useFetch, useForm } from "hooks";
import { SyntheticEvent, useState } from "react";
import { User } from "react-email-editor";
import Swal from "sweetalert2";
import * as Yup from "yup";
interface Props {
  handleNext: () => void;
}
interface TenderData {
  documentUserId?: string,
  reviewUserId?: string,
  submissionUserId?: string,
  trackUserId?: string,
  isAllowedToAddDoc?: Boolean,
  isAllowedToReviewTender?: Boolean,
  isAllowedToSubmitTender?: Boolean,
  isAllowedToTrackTender?: Boolean,
}

const validationSchema = Yup.object().shape({
  documentUserId: Yup.string().required("Required!"),
  reviewUserId: Yup.string().required("Required!"),
  submissionUserId: Yup.string().required("Required!"),
  trackUserId: Yup.string().required("Required!"),
});

const AssignMembers = ({ handleNext }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { tender } = useForm();
  const { data: employees } = useFetch<User[]>(`users?departmentName=BID`);
  const initialValues = {
    documentUserId: "",
    reviewUserId: "",
    submissionUserId: "",
    trackUserId: "",
  };

  const handleSubmit = async (values: TenderData) => {
    console.log(values);
    setLoading(true);
    const reqData = Object.entries(values)?.map(([key, value], index) => ({
      memberId: value,
      tenderId: tender?.id,
      isAllowedToAddDoc: key === "documentUserId",
      isAllowedToReviewTender: key === "reviewUserId",
      isAllowedToSubmitTender: key === "submissionUserId",
      isAllowedToTrackTender: key === "trackUserId"
    }));
    try {
      const promises = reqData?.map(async (data) => {
        try {
          const res = await change(`tenders/assign-user-to-tender`, {
            body: data,
          });
          if (res?.status !== 200) {
            throw new Error(res?.results?.msg || "Unable to Submit");
          }
        } catch (error) {
          throw new Error(String(error));
        }
      });

      await Promise.all(promises).then(() => {
        Swal.fire("Success", "You have successfully Created!", "success");
        handleNext();
        setLoading(false);
      })
    } catch (error: any) {
      console.log(error);
      Swal.fire("Error", (error?.message), "error");
      setLoading(false);
      return
    }

    setLoading(false);
  };

  return (
    <section>
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
          setFieldValue,
        }) => (
          <Form>
            <div className="mb-8 w-full px-20 mt-8">
              <div className="flex gap-2 items-center">
                <div className="h-3 w-3 bg-slate-600 rounded-sm"></div>
                <h1>Select the members for tender management.</h1>
              </div>
              <div className="w-4/5">

                <div className="mt-6 flex justify-between">
                  <h1 className="flex gap-3 items-center">
                    <FileCopy fontSize="small" /> Documentation
                  </h1>
                  <div className="w-1/2">
                    <Autocomplete
                      options={employees || []}
                      fullWidth
                      size="small"
                      getOptionLabel={(option) => option.name ? option?.name : ""}

                      onChange={(e: SyntheticEvent<Element, Event>, r: User | null) =>
                        setFieldValue("documentUserId", r?.id)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="documentUserId"
                          placeholder="Select Member"
                          onBlur={handleBlur}
                          error={
                            touched.documentUserId && !!errors.documentUserId
                          }
                          helperText={
                            Boolean(touched.documentUserId) && errors.documentUserId as string
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <h1 className="flex gap-3 items-center">
                    <FindInPage fontSize="small" /> Review
                  </h1>
                  <div className="w-1/2">
                    <Autocomplete
                      options={employees || []}
                      fullWidth
                      getOptionLabel={(option) => option.name ? option?.name : ""}
                      size="small"
                      onChange={(e: SyntheticEvent<Element, Event>, r: User | null) =>
                        setFieldValue("reviewUserId", r?.id)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="reviewUserId"
                          placeholder="Select Member"
                          onBlur={handleBlur}
                          error={
                            touched.reviewUserId && !!errors.reviewUserId
                          }
                          helperText={
                            Boolean(touched.reviewUserId) && errors.reviewUserId as string
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <h1 className="flex gap-3 items-center">
                    <Task fontSize="small" /> Submission
                  </h1>
                  <div className="w-1/2">
                    <Autocomplete
                      options={employees || []}
                      fullWidth
                      getOptionLabel={(option) => option.name ? option?.name : ""}

                      size="small"
                      onChange={(e: SyntheticEvent<Element, Event>, r: User | null) =>
                        setFieldValue("submissionUserId", r?.id)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="submissionUserId"
                          placeholder="Select Member"
                          onBlur={handleBlur}
                          error={
                            touched.submissionUserId && !!errors.submissionUserId
                          }
                          helperText={
                            Boolean(touched.submissionUserId) && errors.submissionUserId as string
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <h1 className="flex gap-3 items-center">
                    <Timeline fontSize="small" /> Track
                  </h1>
                  <div className="w-1/2">
                    <Autocomplete
                      options={employees || []}
                      fullWidth
                      getOptionLabel={(option) => option.name ? option?.name : ""}

                      size="small"
                      onChange={(e: SyntheticEvent<Element, Event>, r: User | null) =>
                        setFieldValue("trackUserId", r?.id)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="trackUserId"
                          placeholder="Select Member"
                          onBlur={handleBlur}
                          error={
                            touched.trackUserId && !!errors.trackUserId
                          }
                          helperText={
                            Boolean(touched.trackUserId) && errors.trackUserId as string
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center px-20">
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <KeyboardArrowRight />
                }
                className="!bg-green-600"
              >
                NEXT
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AssignMembers;
