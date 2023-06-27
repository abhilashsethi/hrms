import { Check } from "@mui/icons-material";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import useFormStore from "hooks/userFormStore";
import { useState } from "react";
import * as Yup from "yup";

interface Props {
  handleNext: () => void;
}



const validationSchema = Yup.object().shape({
  tenderNo: Yup.string().required("Required!"),
  title: Yup.string().required("Required!"),
  portal: Yup.string().required("Required!"),
  category: Yup.string().required("Required!"),
  date: Yup.string().required("Required!"),
  time: Yup.string().required("Required!"),
  bid: Yup.string().required("Required!"),
});

const TenderDetailsCreate = ({ handleNext }: Props) => {
  const [loading, setLoading] = useState(false);
  const { setTender, tender } = useFormStore();
  const initialValues = {
    tenderNo: tender?.tenderNo || "",
    title: tender?.title || "",
    portal: tender?.portal || "",
    category: tender?.category || "",
    date: tender?.date || "",
    time: tender?.time || "",
    bid: tender?.bid || "",
  };
  const handleSubmit = async (values: any) => {
    console.log(values);
    setTender(values)
    handleNext()
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
                    id="date"
                    placeholder="Submission Date"
                    name="date"
                    type="date"
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],
                    }}
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.date && !!errors.date}
                    helperText={Boolean(touched.date) && errors.date as string}
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
                    helperText={Boolean(touched.time) && errors.time as string}
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
                    helperText={Boolean(touched.bid) && errors.bid as string}
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
                  NEXT
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
