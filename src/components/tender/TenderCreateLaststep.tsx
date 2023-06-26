import { Check, KeyboardArrowLeft } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

interface Props {
  handleBack?: () => void;
}

const initialValues = {
  fees: "",
  emdPaymentMode: "",
  paymentMode: "",
};

const validationSchema = Yup.object().shape({
  fees: Yup.string().required("Required!"),
  paymentMode: Yup.string().required("Required!"),
  emdPaymentMode: Yup.string().required("Required!"),
});

const TenderCreateLaststep = ({ handleBack }: Props) => {
  const [isEmdValue, setIsEmdValue] = useState("No")
  const handleOptionChange = (event: any) => {
    setIsEmdValue(event.target.value);
  };
  const handleSubmit = async (values: any) => {
    console.log(values);
    Swal.fire("Success", "Tender created successfully!", "success");
  };
  return (
    <section>
      <div className="px-20 my-8">
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
                    helperText={touched.fees && errors.fees}
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
                    helperText={touched.paymentMode && errors.paymentMode}
                  >
                    {paymentmodes.map((option) => (
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
                      name="fees"
                      value={values.fees}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.fees && !!errors.fees}
                      helperText={touched.fees && errors.fees}
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
                      helperText={touched.emdPaymentMode && errors.emdPaymentMode}
                    >
                      {paymentmodes.map((option) => (
                        <MenuItem key={option.id} value={option.title}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
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
          startIcon={<Check />}
          className="!bg-green-600"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </div>
    </section>
  );
};

export default TenderCreateLaststep;

const paymentmodes = [
  { id: 1, title: "Online" },
  { id: 2, title: "Offline" },
];
