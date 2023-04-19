import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useAuth, useChange } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { KeyedMutator } from "swr";
import { Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";

interface Props {
  open?: any;
  handleClose?: any;
}

const BankInformationUpdate = ({ open, handleClose }: Props) => {
  const { user } = useAuth();
  const employeeId = useRouter();
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    bankName: "",
    IFSCCode: "",
    accountNo: "",
    pan: "",
  };

  const validationSchema = Yup.object().shape({
    bankName: Yup.string().required("Bank Name is required"),
    pan: Yup.string().required("Pan is required"),
    IFSCCode: Yup.string().required("IFSC Code is required"),
    accountNo: Yup.string().required("Account No is required"),
  });
  const handleSubmit = async (values: any) => {
    console.log(values);
    Swal.fire(`Success`, `You have successfully Updated!`, `success`).then(() =>
      handleClose()
    );
  };
  return (
    <>
      <Dialog
        //    onClose={handleClose}
        maxWidth="lg"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          sx={{ p: 2, minWidth: "40rem !important" }}
        >
          <p className="text-center text-md font-bold text-theme te tracking-wide">
            Personal Information Update
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
                      {/* pan */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Pan <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="pan"
                          placeholder="Enter Pan"
                          value={values.pan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.pan && !!errors.pan}
                          helperText={touched.pan && errors.pan}
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
