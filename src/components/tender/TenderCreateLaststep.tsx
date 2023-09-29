import { Check } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useForm } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import router from "next/router";

interface Props {
  EmdAmount?: number;
  tenderFees?: number;
  tenderPaymentMode?: string;
  EmdPaymentMode?: string;
}

const validationSchema = Yup.object().shape({
  tenderPaymentMode: Yup.string().required("Required!"),
  tenderFees: Yup.number()
    .required("Required!")
    .min(0, "Tender fees must be a positive number")
    .positive("Tender fees must be a positive number"),
  EmdAmount: Yup.number()
    .min(0, "Tender fees must be a positive number")
    .positive("Tender fees must be a positive number"),
});

const TenderCreateLaststep = () => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { tender } = useForm();
  const [isEmdValue, setIsEmdValue] = useState(false);
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEmdValue(event.target.value === "yes");
  };
  const initialValues = {
    EmdAmount: 0,
    tenderFees: 0,
    tenderPaymentMode: "",
    EmdPaymentMode: "",
  };
  const handleSubmit = async (values: Props) => {
    setLoading(true);
    try {
      const res = await change(`tenders/update/${tender?.id}`, {
        method: "PATCH",
        body: {
          EmdAmount: Number(values?.EmdAmount === 0 ? values?.EmdAmount : null),
          tenderFees: Number(values?.tenderFees),
          isEmdExemption: isEmdValue,
          feesPaymentMode: values?.tenderPaymentMode,
          EmdPaymentMode: values?.EmdPaymentMode
            ? values?.EmdPaymentMode
            : null,
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      router?.push("/admin/tenders/all-tenders");
      Swal.fire(`Success`, `Tender created successfully!`, `success`);
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
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
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div className="md:px-20 my-8">
              <h1 className="text-theme font-semibold">Tender Fee Details</h1>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="md:py-2 py-1">
                  <h1 className="mb-2">Tender Fees in ₹</h1>
                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    placeholder="Tender Fees"
                    name="tenderFees"
                    value={values.tenderFees}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.tenderFees && !!errors.tenderFees}
                    helperText={
                      Boolean(touched.tenderFees) &&
                      (errors.tenderFees as string)
                    }
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
                    error={
                      touched.tenderPaymentMode && !!errors.tenderPaymentMode
                    }
                    helperText={
                      Boolean(touched.tenderPaymentMode) &&
                      (errors.tenderPaymentMode as string)
                    }
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
                  defaultValue={isEmdValue ? "yes" : "no"}
                  row
                  name="isEmdValue"
                  onChange={handleOptionChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </div>
              {!isEmdValue && (
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="md:py-2 py-1">
                    <h1 className="mb-2">EMD Amount in ₹</h1>
                    <TextField
                      fullWidth
                      type="number"
                      size="small"
                      placeholder="EMD amount"
                      name="EmdAmount"
                      value={values.EmdAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.EmdAmount && !!errors.EmdAmount}
                      helperText={
                        Boolean(touched.EmdAmount) &&
                        (errors.EmdAmount as string)
                      }
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
                      helperText={
                        Boolean(touched.EmdPaymentMode) &&
                        (errors.EmdPaymentMode as string)
                      }
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
            <div className="flex md:justify-end justify-center items-center md:px-20">
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Check />}
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
