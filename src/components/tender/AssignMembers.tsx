import {
  FileCopy,
  FindInPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Search,
  Task,
  Timeline,
} from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useFetch } from "hooks";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useFormStore from "hooks/userFormStore";

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
  time: Yup.string().required("Required!"),
  bid: Yup.string().required("Required!"),
});
const AssignMembers = ({ handleBack, handleNext }: Props) => {
  const { data: employees } = useFetch<any>(`users`);
  const { setTender, tender } = useFormStore();
  const initialValues = {
    documentUserId: tender?.documentUserId || "",
    searchUserId: tender?.searchUserId || "",
    reviewUserId: tender?.reviewUserId || "",
    submissionUserId: tender?.submissionUserId || "",
    trackUserId: tender?.trackUserId || "",
  };
  const handleSubmit = async (values: any) => {
    console.log(values);
    setTender(values)
    handleNext()
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
                      options={employees}
                      fullWidth
                      getOptionLabel={(option: any) => option.name}
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
                          value={values.searchUserId}
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
                      options={employees}
                      fullWidth
                      getOptionLabel={(option: any) => option.name}
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
                          value={values.documentUserId}
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
                      options={employees}
                      fullWidth
                      getOptionLabel={(option: any) => option.name}
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
                          value={values.reviewUserId}
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
                      options={employees}
                      fullWidth
                      getOptionLabel={(option: any) => option.name}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.submissionUserId
                      }
                      size="small"
                      onChange={(e, r) =>
                        setFieldValue("submissionUserId", r?.id)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="submissionUserId"
                          value={values.submissionUserId}
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
                      options={employees}
                      fullWidth
                      getOptionLabel={(option: any) => option.name}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.trackUserId
                      }
                      size="small"
                      onChange={(e, r) =>
                        setFieldValue("trackUserId", r?.id)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="trackUserId"
                          value={values.trackUserId}
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
            <div className="flex justify-between items-center px-20">
              <Button
                variant="contained"
                startIcon={<KeyboardArrowLeft />}
                className="!bg-red-600"
                onClick={handleBack}
              >
                PREV
              </Button>
              <Button
                variant="contained"
                startIcon={<KeyboardArrowRight />}
                className="!bg-green-600"
                onClick={handleNext}
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
