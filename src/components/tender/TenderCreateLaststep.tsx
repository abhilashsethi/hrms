import { Check } from "@mui/icons-material";
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
import { useChange } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

interface Props {
  emdAmount?: string,
  tenderFees?: string,
  tenderPaymentMode?: string,
  EmdPaymentMode?: string,
}

const validationSchema = Yup.object().shape({
  tenderPaymentMode: Yup.string().required("Required!"),
  tenderFees: Yup.string().required("Required!"),
});

const TenderCreateLaststep = () => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const [isEmdValue, setIsEmdValue] = useState(false)
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEmdValue(event.target.value === 'yes');
  };
  const initialValues = {
    emdAmount: "",
    tenderFees: "",
    tenderPaymentMode: "",
    EmdPaymentMode: "",
  };
  const handleSubmit = async (values: Props) => {
    console.log(values);
    setLoading(true);
    try {
      const res = await change(`tenders`, {
        body: {
          emdAmount: values?.emdAmount,
          tenderFees: values?.tenderFees,
          isEmdExemption: isEmdValue,
          tenderPaymentMode: values?.tenderPaymentMode,
          EmdPaymentMode: values?.EmdPaymentMode,
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
      console.log("res data", res?.results?.data?.id);
      Swal.fire(`Success`, `You have successfully Created!`, `success`);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
                    name="tenderFees"
                    value={values.tenderFees}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.tenderFees && !!errors.tenderFees}
                    helperText={Boolean(touched.tenderFees) && errors.tenderFees as string}
                  />
                </div>
                <div className="md:py-2 py-1">
                  <h1 className="mb-2">Payment Mode</h1>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    name="tenderPaymentMode"
                    placeholder="Payment Mode"
                    label="Select payment mode"
                    value={values.tenderPaymentMode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.tenderPaymentMode && !!errors.tenderPaymentMode}
                    helperText={Boolean(touched.tenderPaymentMode) && errors.tenderPaymentMode as string}
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
              {!isEmdValue && (
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="md:py-2 py-1">
                    <h1 className="mb-2">EMD Amount in ₹</h1>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="EMD amount"
                      name="emdAmount"
                      value={values.emdAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.emdAmount && !!errors.emdAmount}
                      helperText={Boolean(touched.emdAmount) && errors.emdAmount as string}
                    />
                  </div>
                  <div className="md:py-2 py-1">
                    <h1 className="mb-2">Payment Mode</h1>
                    <TextField
                      fullWidth
                      size="small"
                      select
                      name="EmdPaymentMode"
                      placeholder="Payment Mode"
                      label="Select payment mode"
                      value={values.EmdPaymentMode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.EmdPaymentMode && !!errors.EmdPaymentMode}
                      helperText={Boolean(touched.EmdPaymentMode) && errors.EmdPaymentMode as string}
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
