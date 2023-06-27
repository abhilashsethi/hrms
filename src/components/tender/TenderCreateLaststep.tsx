import { Check, KeyboardArrowLeft } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  emdFees: Yup.string().required("Required!"),
  fees: Yup.string().required("Required!"),
});

const TenderCreateLaststep = () => {
  const [loading, setLoading] = useState(false);
  const [isEmdValue, setIsEmdValue] = useState("no")
  const handleOptionChange = (event: any) => {
    setIsEmdValue(event.target.value);
  };
  const initialValues = {
    emdFees: "",
    fees: "",
    emdPaymentMode: "",
    paymentMode: "",
  };
  const handleSubmit = async (values: any) => {
    console.log(values);
    Swal.fire("Success", "Tender created successfully!", "success");
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
            <div className="px-20 my-8">

              <h1 className="text-theme font-semibold">Tender Fee Details</h1>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="md:py-2 py-1">
                  <h1 className="mb-2">Tender Fees in ₹</h1>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Tender Fees"
                    name="fees"
                    value={values.fees}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fees && !!errors.fees}
                    helperText={Boolean(touched.fees) && errors.fees as string}
                  />
                </div>
                <div className="md:py-2 py-1">
                  <h1 className="mb-2">Payment Mode</h1>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    name="paymentMode"
                    placeholder="Payment Mode"
                    label="Select payment mode"
                    value={values.paymentMode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.paymentMode && !!errors.paymentMode}
                    helperText={Boolean(touched.paymentMode) && errors.paymentMode as string}
                  >
                    {paymentModes.map((option) => (
                      <MenuItem key={option.id} value={option.title}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <h1 className="text-theme font-semibold mt-4">EMD Fee Details</h1>
              <div className="md:py-2 py-1">
                <h1 className="mb-2">EMD Exemption</h1>

                <RadioGroup
                  defaultValue={isEmdValue}
                  row
                  onChange={handleOptionChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </div>
              {isEmdValue === "no" && (
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="md:py-2 py-1">
                    <h1 className="mb-2">EMD Amount in ₹</h1>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="EMD amount"
                      name="emdFees"
                      value={values.emdFees}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.emdFees && !!errors.emdFees}
                      helperText={Boolean(touched.emdFees) && errors.emdFees as string}
                    />
                  </div>
                  <div className="md:py-2 py-1">
                    <h1 className="mb-2">Payment Mode</h1>
                    <TextField
                      fullWidth
                      size="small"
                      select
                      name="emdPaymentMode"
                      placeholder="Payment Mode"
                      label="Select payment mode"
                      value={values.emdPaymentMode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.emdPaymentMode && !!errors.emdPaymentMode}
                      helperText={Boolean(touched.emdPaymentMode) && errors.emdPaymentMode as string}
                    >
                      {paymentModes.map((option) => (
                        <MenuItem key={option.id} value={option.title}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
              )}

            </div>
            <div className="flex justify-end items-center px-20">
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <Check />
                }
                className="!bg-green-600"
              >
                SUBMIT
              </Button>

            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default TenderCreateLaststep;

const paymentModes = [
  { id: 1, title: "Online" },
  { id: 2, title: "Offline" },
];
