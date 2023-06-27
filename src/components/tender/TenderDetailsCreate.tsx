import { Check } from "@mui/icons-material";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useForm } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import * as Yup from "yup";

interface Props {
  handleNext: () => void;
}
const validationSchema = Yup.object().shape({
  tenderNo: Yup.string().required("Tender number is required!"),
  title: Yup.string().required("Title is required!"),
  portal: Yup.string().required("Portal is required!"),
  category: Yup.string().required("Category is required!"),
  submissionDate: Yup.string().required("Date is required!"),
  submissionTime: Yup.string().required("Time is required!"),
  bidValue: Yup.number().required('Bid value is required!').positive('Bid value must be positive').nullable(),
});
const TenderDetailsCreate = ({ handleNext }: Props) => {
  const { setTender } = useForm();
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    tenderNo: "",
    title: "",
    portal: "",
    category: "",
    submissionDate: null,
    submissionTime: "",
    bidValue: null,
  };
  const today = new Date();
  today.setDate(today.getDate() + 1); // Get the next day's date

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`tenders`, {
        body: {
          tenderNo: values?.tenderNo,
          title: values?.title,
          portal: values?.portal,
          category: values?.category,
          submissionDate: new Date(values?.submissionDate).toISOString(),
          submissionTime: values?.submissionTime,
          bidValue: Number(values?.bidValue),
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire(
          "Error",
          res?.results?.message || "Unable to Submit",
          "error"
        );
        setLoading(false);
        return;
      }
      setTender(res?.results?.data?.id)
      Swal.fire(`Success`, `You have successfully Created!`, `success`);
      handleNext()
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // const handleSubmit = async (values: any) => {
  //   console.log(values);
  // };

  return (
    <section className="w-full flex justify-center items-center mt-6">
      <div className="px-12 w-full">
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
              <div className="grid lg:grid-cols-2">
                <div className="md:px-4 px-2 md:py-2 py-1">
                  <div className="md:py-2 py-1">
                    <InputLabel htmlFor="tenderNo">
                      Tender No <span className="text-red-600">*</span>
                    </InputLabel>
                  </div>
                  <TextField
                    fullWidth
                    size="small"
                    id="tenderNo"
                    placeholder="Tender No"
                    name="tenderNo"
                    value={values.tenderNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.tenderNo && !!errors.tenderNo}
                    helperText={Boolean(touched?.tenderNo) && errors?.tenderNo as string}
                  />
                </div>
                <div className="md:px-4 px-2 md:py-2 py-1">
                  <div className="md:py-2 py-1">
                    <InputLabel htmlFor="title">
                      Title <span className="text-red-600">*</span>
                    </InputLabel>
                  </div>
                  <TextField
                    fullWidth
                    size="small"
                    id="title"
                    placeholder="Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && !!errors.title}
                    helperText={Boolean(touched.title) && errors.title as string}
                  />
                </div>
                <div className="md:px-4 px-2 md:py-2 py-1">
                  <div className="md:py-2 py-1">
                    <InputLabel htmlFor="portal">
                      Portal <span className="text-red-600">*</span>
                    </InputLabel>
                  </div>
                  <TextField
                    fullWidth
                    size="small"
                    id="portal"
                    placeholder="Portal"
                    name="portal"
                    value={values.portal}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.portal && !!errors.portal}
                    helperText={Boolean(touched.portal) && errors.portal as string}
                  />
                </div>
                <div className="md:px-4 px-2 md:py-2 py-1">
                  <div className="md:py-2 py-1">
                    <InputLabel htmlFor="category">
                      Category <span className="text-red-600">*</span>
                    </InputLabel>
                  </div>
                  <TextField
                    fullWidth
                    size="small"
                    id="category"
                    placeholder="Category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.category && !!errors.category}
                    helperText={Boolean(touched.category) && errors.category as string}
                  />
                </div>
                <div className="md:px-4 px-2 md:py-2 py-1">
                  <div className="md:py-2 py-1">
                    <InputLabel htmlFor="date">
                      Submission Date <span className="text-red-600">*</span>
                    </InputLabel>
                  </div>
                  <TextField
                    fullWidth
                    size="small"
                    id="submissionDate"
                    placeholder="Submission Date"
                    name="submissionDate"
                    type="date"
                    inputProps={{
                      min: today.toISOString().split("T")[0],
                      max: "9999-12-31",
                    }}
                    value={values.submissionDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.submissionDate && !!errors.submissionDate}
                    helperText={Boolean(touched.submissionDate) && errors.submissionDate as string}
                  />
                </div>
                <div className="md:px-4 px-2 md:py-2 py-1">
                  <div className="md:py-2 py-1">
                    <InputLabel htmlFor="time">
                      Submission Time <span className="text-red-600">*</span>
                    </InputLabel>
                  </div>
                  <TextField
                    fullWidth
                    size="small"
                    id="submissionTime"
                    placeholder="Submission Time"
                    name="submissionTime"
                    type="time"
                    value={values.submissionTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.submissionTime && !!errors.submissionTime}
                    helperText={Boolean(touched.submissionTime) && errors.submissionTime as string}
                  />
                </div>
                <div className="md:px-4 px-2 md:py-2 py-1">
                  <div className="md:py-2 py-1">
                    <InputLabel htmlFor="bid">
                      Bid Value <span className="text-red-600">*</span>
                    </InputLabel>
                  </div>
                  <TextField
                    fullWidth
                    size="small"
                    id="bidValue"
                    placeholder="Bid Value"
                    name="bidValue"
                    value={values.bidValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.bidValue && !!errors.bidValue}
                    helperText={Boolean(touched.bidValue) && errors.bidValue as string}
                  />
                </div>
              </div>
              <div className="flex justify-end md:py-4 py-2">
                <Button
                  type="submit"
                  variant="contained"
                  className="!bg-theme"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Check />
                  }
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default TenderDetailsCreate;
