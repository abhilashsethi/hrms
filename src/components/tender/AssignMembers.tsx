import {
  Add,
  FileCopy,
  FindInPage,
  KeyboardArrowRight,
  Task,
  Timeline,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
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
  documentUserId?: string;
  reviewUserId?: string;
  submissionUserId?: string;
  trackUserId?: string;
  isAllowedToAddDoc?: Boolean;
  isAllowedToReviewTender?: Boolean;
  isAllowedToSubmitTender?: Boolean;
  isAllowedToTrackTender?: Boolean;
}

const validationSchema = Yup.object().shape({
  documentUserId: Yup.string().required("Required!"),
});
const validationSchemaReview = Yup.object().shape({
  reviewUserId: Yup.string().required("Required!"),
});
const validationSchemaSubmission = Yup.object().shape({
  submissionUserId: Yup.string().required("Required!"),
});
const validationSchemaFinal = Yup.object().shape({
  trackUserId: Yup.string().required("Required!"),
});

const AssignMembers = ({ handleNext }: Props) => {
  const [isDisableReview, setIsDisableReview] = useState(false);
  const [isDisableSubmission, setIsDisableSubmission] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const [loadingFinal, setLoadingFinal] = useState(false);
  const { change } = useChange();
  const { tender } = useForm();
  const { data: employees } = useFetch<User[]>(`users?departmentName=BID`);
  const initialValues = {
    documentUserId: "",
  };
  const initialValuesReview = {
    reviewUserId: "",
  };
  const initialValuesSubmission = {
    submissionUserId: "",
  };
  const initialValuesFinal = {
    trackUserId: "",
  };

  const handleSubmit = async (values: TenderData) => {
    setLoading(true);

    try {
      const res = await change(`tenders/assign-user-to-tender`, {
        body: {
          memberId: values?.documentUserId,
          tenderId: tender?.id,
          isAllowedToAddDoc: true,
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }

      Swal.fire("Success", "Assign member successfully!", "success");
      setLoading(false);
      setIsDisable(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitReview = async (values: TenderData) => {
    setLoadingReview(true);
    try {
      const res = await change(`tenders/assign-user-to-tender`, {
        body: {
          memberId: values?.reviewUserId,
          tenderId: tender?.id,
          isAllowedToReviewTender: true,
        },
      });
      setLoadingReview(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoadingReview(false);
        return;
      }

      Swal.fire("Success", "Assign member successfully!", "success");
      setIsDisableReview(true);
      setLoadingReview(false);
    } catch (error) {
      console.log(error);
      setLoadingReview(false);
    } finally {
      setLoadingReview(false);
    }
  };
  const handleSubmitSubmission = async (values: TenderData) => {
    setLoadingSubmission(true);

    try {
      const res = await change(`tenders/assign-user-to-tender`, {
        body: {
          memberId: values?.submissionUserId,
          tenderId: tender?.id,
          isAllowedToSubmitTender: true,
        },
      });
      setLoadingSubmission(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoadingSubmission(false);
        return;
      }

      Swal.fire("Success", "Assign member successfully!", "success");
      setIsDisableSubmission(true);
      setLoadingSubmission(false);
    } catch (error) {
      console.log(error);
      setLoadingSubmission(false);
    } finally {
      setLoadingSubmission(false);
    }
  };
  const handleSubmitFinal = async (values: TenderData) => {
    setLoadingFinal(true);

    try {
      const res = await change(`tenders/assign-user-to-tender`, {
        body: {
          memberId: values?.trackUserId,
          tenderId: tender?.id,
          isAllowedToTrackTender: true,
        },
      });
      setLoadingFinal(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoadingFinal(false);
        return;
      }

      Swal.fire("Success", "Assign member successfully!", "success");
      handleNext();
      setLoadingFinal(false);
    } catch (error) {
      console.log(error);
      setLoadingFinal(false);
    } finally {
      setLoadingFinal(false);
    }
  };
  return (
    <section>
      <div className="mb-8 w-full md:px-20 mt-8">
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 bg-slate-600 rounded-sm"></div>
          <h1>Select the members for tender management.</h1>
        </div>
        <div className="md:w-4/5 w-full">
          {/* Documentation */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleBlur, setFieldValue }) => (
              <Form>
                <div className="mt-6 md:flex justify-between">
                  <h1 className="flex gap-3 items-center">
                    <FileCopy fontSize="small" /> Documentation
                  </h1>
                  <div className="md:w-1/2 md:flex justify-center items-center gap-2">
                    <Autocomplete
                      disabled={isDisable}
                      options={employees || []}
                      fullWidth
                      size="small"
                      getOptionLabel={(option) =>
                        option.name ? option?.name : ""
                      }
                      onChange={(
                        e: SyntheticEvent<Element, Event>,
                        r: User | null
                      ) => setFieldValue("documentUserId", r?.id)}
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
                            Boolean(touched.documentUserId) &&
                            (errors.documentUserId as string)
                          }
                        />
                      )}
                    />
                    <div className="flex justify-end items-center py-2">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || isDisable}
                        startIcon={
                          loading ? <CircularProgress size={20} /> : <Add />
                        }
                        className="!bg-theme"
                      >
                        ADD
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {/* Review */}
          <Formik
            initialValues={initialValuesReview}
            validationSchema={validationSchemaReview}
            enableReinitialize={true}
            onSubmit={handleSubmitReview}
          >
            {({ errors, touched, handleBlur, setFieldValue }) => (
              <Form>
                <div className="mt-6 md:flex justify-between">
                  <h1 className="flex gap-3 items-center">
                    <FindInPage fontSize="small" /> Review
                  </h1>
                  <div className="md:w-1/2 md:flex items-center gap-2">
                    <Autocomplete
                      disabled={isDisableReview}
                      options={employees || []}
                      fullWidth
                      getOptionLabel={(option) =>
                        option.name ? option?.name : ""
                      }
                      size="small"
                      onChange={(
                        e: SyntheticEvent<Element, Event>,
                        r: User | null
                      ) => setFieldValue("reviewUserId", r?.id)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="reviewUserId"
                          placeholder="Select Member"
                          onBlur={handleBlur}
                          error={touched.reviewUserId && !!errors.reviewUserId}
                          helperText={
                            Boolean(touched.reviewUserId) &&
                            (errors.reviewUserId as string)
                          }
                        />
                      )}
                    />
                    <div className="flex justify-end items-center py-2">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loadingReview || isDisableReview}
                        startIcon={
                          loadingReview ? (
                            <CircularProgress size={20} />
                          ) : (
                            <Add />
                          )
                        }
                        className="!bg-theme"
                      >
                        ADD
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {/* Submission */}
          <Formik
            initialValues={initialValuesSubmission}
            validationSchema={validationSchemaSubmission}
            enableReinitialize={true}
            onSubmit={handleSubmitSubmission}
          >
            {({ errors, touched, handleBlur, setFieldValue }) => (
              <Form>
                <div className="mt-6 md:flex justify-between">
                  <h1 className="flex gap-3 items-center">
                    <Task fontSize="small" /> Submission
                  </h1>
                  <div className="md:w-1/2 md:flex justify-center items-center gap-2">
                    <Autocomplete
                      disabled={isDisableSubmission}
                      options={employees || []}
                      fullWidth
                      getOptionLabel={(option) =>
                        option.name ? option?.name : ""
                      }
                      size="small"
                      onChange={(
                        e: SyntheticEvent<Element, Event>,
                        r: User | null
                      ) => setFieldValue("submissionUserId", r?.id)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="submissionUserId"
                          placeholder="Select Member"
                          onBlur={handleBlur}
                          error={
                            touched.submissionUserId &&
                            !!errors.submissionUserId
                          }
                          helperText={
                            Boolean(touched.submissionUserId) &&
                            (errors.submissionUserId as string)
                          }
                        />
                      )}
                    />
                    <div className="flex justify-end items-center py-2">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loadingSubmission || isDisableSubmission}
                        startIcon={
                          loadingSubmission ? (
                            <CircularProgress size={20} />
                          ) : (
                            <Add />
                          )
                        }
                        className="!bg-theme"
                      >
                        ADD
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {/* Final */}
          <Formik
            initialValues={initialValuesFinal}
            validationSchema={validationSchemaFinal}
            enableReinitialize={true}
            onSubmit={handleSubmitFinal}
          >
            {({ errors, touched, handleBlur, setFieldValue }) => (
              <Form>
                <div className="mt-6 md:flex justify-between">
                  <h1 className="flex gap-3 items-center">
                    <Timeline fontSize="small" /> Track
                  </h1>
                  <div className="md:w-1/2 md:flex justify-center items-center gap-2">
                    <Autocomplete
                      options={employees || []}
                      fullWidth
                      getOptionLabel={(option) =>
                        option.name ? option?.name : ""
                      }
                      size="small"
                      onChange={(
                        e: SyntheticEvent<Element, Event>,
                        r: User | null
                      ) => setFieldValue("trackUserId", r?.id)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="trackUserId"
                          placeholder="Select Member"
                          onBlur={handleBlur}
                          error={touched.trackUserId && !!errors.trackUserId}
                          helperText={
                            Boolean(touched.trackUserId) &&
                            (errors.trackUserId as string)
                          }
                        />
                      )}
                    />
                    <div className="flex justify-end items-center py-2 gap-2">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loadingFinal}
                        startIcon={
                          loadingFinal ? (
                            <CircularProgress size={20} />
                          ) : (
                            <KeyboardArrowRight />
                          )
                        }
                        className="!bg-green-600"
                      >
                        NEXT
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default AssignMembers;
