import { Check, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { QuotationBank } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  bankData?: QuotationBank;
}

const UpdateBankDetails = ({ open, handleClose, mutate, bankData }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    bankName: `${bankData?.bankName ? bankData?.bankName : ""}`,
    branchName: `${bankData?.branchName ? bankData?.branchName : ""}`,
    accountNumber: `${bankData?.accountNumber ? bankData?.accountNumber : ""}`,
    companyName: `${bankData?.companyName ? bankData?.companyName : ""}`,
    ifscCode: `${bankData?.ifscCode ? bankData?.ifscCode : ""}`,
    swiftCode: `${bankData?.swiftCode ? bankData?.swiftCode : ""}`,
  };

  const validationSchema = Yup.object().shape({
    bankName: Yup.string()
      .required("Bank name is required")
      .min(2, "Bank name is too short")
      .max(50, "Bank name is too long")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Bank name can only contain letters and spaces"
      ),
    branchName: Yup.string().required("Branch name is required"),
    accountNumber: Yup.string()
      .required("Account number is required")
      .matches(/^[0-9]{9,18}$/, "Invalid account number"),
    companyName: Yup.string().required("Company name is required"),
    ifscCode: Yup.string()
      .required("IFSC code is required")
      .matches(/^[A-Z]{4}[0][A-Z0-9]{6}$/, "Invalid IFSC code"),
    swiftCode: Yup.string()
      .matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, "Invalid Swift code")
      .required("Swift code is required"),
  });
  const handleSubmit = async (values: QuotationBank) => {
    setLoading(true);
    try {
      const res = await change(`quotations/update/account/${bankData?.id}`, {
        method: "PATCH",
        body: {
          bankName: values?.bankName,
          branchName: values?.branchName,
          accountNumber: values?.accountNumber,
          companyName: values?.companyName,
          ifscCode: values?.ifscCode,
          swiftCode: values?.swiftCode,
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Bank details updated successfully!`, `success`);
      mutate();
      handleClose();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          sx={{ p: 2, minWidth: "18rem !important" }}
        >
          <p className="text-center text-xl font-bold text-theme tracking-wide">
            UPDATE
          </p>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              top: 10,
              right: 10,
              position: "absolute",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Tooltip title="Close">
              <Close />
            </Tooltip>
          </IconButton>
        </DialogTitle>
        <DialogContent className="app-scrollbar" sx={{ p: 2 }}>
          <div className="md:px-4 px-2 tracking-wide">
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
                      <div className="py-2">
                        <InputLabel htmlFor="title">
                          Bank name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="bankName"
                        // placeholder="Name"
                        name="bankName"
                        value={values.bankName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.bankName && !!errors.bankName}
                        helperText={touched.bankName && errors.bankName}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="title">
                          Branch name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="branchName"
                        // placeholder="Name"
                        name="branchName"
                        value={values.branchName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.branchName && !!errors.branchName}
                        helperText={touched.branchName && errors.bankName}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="accountNumber">
                          Account Number <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Email"
                        id="accountNumber"
                        name="accountNumber"
                        value={values.accountNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.accountNumber && !!errors.accountNumber}
                        helperText={
                          touched.accountNumber && errors.accountNumber
                        }
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="accountNumber">
                          IFSC Code <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="ifscCode"
                        name="ifscCode"
                        value={values?.ifscCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched?.ifscCode && !!errors?.ifscCode}
                        helperText={touched?.ifscCode && errors?.ifscCode}
                      />
                    </div>

                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="submissionDate">
                          SWIFT Code <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Employee ID"
                        id="swiftCode"
                        name="swiftCode"
                        value={values.swiftCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.swiftCode && !!errors.swiftCode}
                        helperText={touched.swiftCode && errors.swiftCode}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="companyName">
                          Company Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Email"
                        id="companyName"
                        name="companyName"
                        value={values.companyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.companyName && !!errors.companyName}
                        helperText={touched.companyName && errors.companyName}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center md:py-4 py-2">
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      className="!bg-green-500"
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateBankDetails;
