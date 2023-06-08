import { Check } from "@mui/icons-material";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import * as Yup from "yup";
const initialValues = {
  tenderNo: "",
  title: "",
  portal: "",
  category: "",
  date: "",
  time: "",
  bid: "",
};

const validationSchema = Yup.object().shape({
  tenderNo: Yup.string().required("Required!"),
});

const TenderDetailsCreate = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: any) => {
    console.log(values);
  };
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
                    helperText={touched.tenderNo && errors.tenderNo}
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
                    helperText={touched.title && errors.title}
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
                    helperText={touched.portal && errors.portal}
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
                    helperText={touched.category && errors.category}
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
                    id="date"
                    placeholder="Submission Date"
                    name="date"
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
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
                    id="time"
                    placeholder="Submission Time"
                    name="time"
                    type="time"
                    value={values.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.time && !!errors.time}
                    helperText={touched.time && errors.time}
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
                    id="bid"
                    placeholder="Bid Value"
                    name="bid"
                    value={values.bid}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.bid && !!errors.bid}
                    helperText={touched.bid && errors.bid}
                  />
                </div>
              </div>
              <div className="flex justify-center md:py-4 py-2">
                <Button
                  type="submit"
                  variant="contained"
                  className="!bg-theme"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Check />
                  }
                >
                  SUBMIT
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
