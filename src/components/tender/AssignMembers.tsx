import {
  FileCopy,
  FindInPage,
  KeyboardArrowRight,
  Search,
  Task,
  Timeline
} from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useFetch } from "hooks";
import * as Yup from "yup";

interface Props {
  handleBack?: () => void;
  handleNext: () => void;
}
const validationSchema = Yup.object().shape({
  documentUserId: Yup.string().required("Required!"),
  searchUserId: Yup.string().required("Required!"),
  reviewUserId: Yup.string().required("Required!"),
  submissionUserId: Yup.string().required("Required!"),
  trackUserId: Yup.string().required("Required!"),
});
const AssignMembers = ({ handleBack, handleNext }: Props) => {
  const { data: employees } = useFetch<any>(`users`);
  const initialValues = {
    documentUserId: "",
    searchUserId: "",
    reviewUserId: "",
    submissionUserId: "",
    trackUserId: "",
  };
  const handleSubmit = async (values: any) => {
    console.log(values);

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
                    <Search fontSize="small" /> Search and filter
                  </h1>
                  <div className="w-1/2">
                    <Autocomplete
                      options={employees || []}
                      fullWidth
                      value={
                        values?.searchUserId
                          ? employees?.find(
                            (option: any) => option.id === values.searchUserId
                          )
                          : ""
                      }
                      getOptionLabel={(option: any) => option.name ? option?.name : ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.searchUserId
                      }
                      size="small"
                      onChange={(e, r) =>
                        setFieldValue("searchUserId", r?.id)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="searchUserId"
                          placeholder="Select Member"
                          onBlur={handleBlur}
                          error={
                            touched.searchUserId && !!errors.searchUserId
                          }
                          helperText={
                            Boolean(touched.searchUserId) && errors.searchUserId as string
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <h1 className="flex gap-3 items-center">
                    <FileCopy fontSize="small" /> Documentation
                  </h1>
                  <div className="w-1/2">
                    <Autocomplete
                      options={employees || []}
                      fullWidth
                      value={
                        values?.documentUserId
                          ? employees?.find(
                            (option: any) => option.id === values.documentUserId
                          )
                          : ""
                      }
                      getOptionLabel={(option: any) => option.name ? option?.name : ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.documentUserId
                      }
                      size="small"
                      onChange={(e, r) =>
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
                      value={
                        values?.reviewUserId
                          ? employees?.find(
                            (option: any) => option.id === values.reviewUserId
                          )
                          : ""
                      }
                      getOptionLabel={(option: any) => option.name ? option?.name : ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.reviewUserId
                      }
                      size="small"
                      onChange={(e, r) =>
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
                      getOptionLabel={(option: any) => option.name ? option?.name : ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.submissionUserId
                      }
                      value={
                        values?.submissionUserId
                          ? employees?.find(
                            (option: any) => option.id === values.submissionUserId
                          )
                          : ""
                      }
                      size="small"
                      onChange={(e, r) =>
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
                      getOptionLabel={(option: any) => option.name ? option?.name : ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.trackUserId
                      }
                      size="small"
                      onChange={(e, r) =>
                        setFieldValue("trackUserId", r?.id)
                      }
                      value={
                        values?.trackUserId
                          ? employees?.find(
                            (option: any) => option.id === values.trackUserId
                          )
                          : ""
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
                startIcon={<KeyboardArrowRight />}
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
