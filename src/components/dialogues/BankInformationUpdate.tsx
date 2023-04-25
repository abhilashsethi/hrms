import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";

interface Props {
  open?: any;
  mutate?: any;
  handleClose?: any;
}

const BankInformationUpdate = ({ open, mutate, handleClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const router = useRouter();
  const { data: employData } = useFetch<any>(`users/${router?.query?.id}`);

  const initialValues = {
    bankName: `${employData?.bankName ? employData?.bankName : ""}`,
    IFSCCode: `${employData?.IFSCCode ? employData?.IFSCCode : ""}`,
    accountNo: `${employData?.accountNo ? employData?.accountNo : ""}`,
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
    IFSCCode: Yup.string()
      .required("IFSC code is required")
      .matches(/^[A-Z]{4}[0][A-Z0-9]{6}$/, "Invalid IFSC code"),
    accountNo: Yup.string()
      .required("Account number is required")
      .matches(/^[0-9]{9,18}$/, "Invalid account number"),
  });
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      Swal.fire(`Info`, `Please Wait..., It will take Some Time!`, `info`);
      const resData: any = await change(`users/${router?.query?.id}`, {
        method: "PATCH",
        body: values,
      });
      setLoading(false);
      if (resData?.status !== 200) {
        Swal.fire(
          "Error",
          resData?.results?.msg || "Unable to Submit",
          "error"
        );
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `You have successfully Submitted!`, `success`);
      handleClose();
      mutate();

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
        maxWidth="lg"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          sx={{ p: 2, minWidth: "40rem !important" }}
        >
          <p className="text-center text-md font-bold text-theme te tracking-wide">
            Bank Information Update
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
        <DialogContent className="app-scrollbar" sx={{ p: 3 }}>
          <div className="md:w-[50rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
            <div className="flex flex-col items-center w-full">
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
                  <Form className="w-full">
                    <div className="grid lg:grid-cols-2 gap-4">
                      {/* name */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Bank Name <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="bankName"
                          placeholder="Enter Bank Name"
                          value={values.bankName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.bankName && !!errors.bankName}
                          helperText={touched.bankName && errors.bankName}
                        />
                      </div>

                      {/* IFSC Code */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          IFSC Code <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          name="IFSCCode"
                          fullWidth
                          size="small"
                          placeholder="Enter IFSC Code"
                          value={values.IFSCCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.IFSCCode && !!errors.IFSCCode}
                          helperText={touched.IFSCCode && errors.IFSCCode}
                        />
                      </div>
                      {/* accountNo */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Account No <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="accountNo"
                          placeholder="Enter Account No"
                          value={values.accountNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.accountNo && !!errors.accountNo}
                          helperText={touched.accountNo && errors.accountNo}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 justify-center mt-4">
                      <Button
                        type="submit"
                        className="!bg-theme"
                        variant="contained"
                        startIcon={<Check />}
                      >
                        SUBMIT
                      </Button>
                    </div>
                    {/* <button type="submit">Submit</button> */}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BankInformationUpdate;
