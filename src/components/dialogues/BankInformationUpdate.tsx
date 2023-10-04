import {
  Button,
  CircularProgress,
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
import { Loader } from "components/core";
import { User } from "types";

interface Props {
  open?: any;
  mutate?: any;
  handleClose?: any;
  employData?: any;
}

const BankInformationUpdate = ({
  open,
  mutate,
  employData,
  handleClose,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const router = useRouter();

  const initialValues = {
    bankName: employData?.bankName || "",
    ifscCode: employData?.ifscCode || "",
    accountNo: employData?.accountNo || "",
  };

  const validationSchema = Yup.object().shape({
    bankName: Yup.string()
      .min(2, "Bank name is too short")
      .max(50, "Bank name is too long")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Bank name can only contain letters and spaces"
      ),
    ifscCode: Yup.string().matches(
      /^[A-Z]{4}[0][A-Z0-9]{6}$/,
      "Invalid IFSC code"
    ),
    accountNo: Yup.string().matches(/^[0-9]{9,18}$/, "Invalid account number"),
  });
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      Swal.fire(`Info`, `Please Wait..., It will take Some Time!`, `info`);
      const resData: any = await change(`users/${employData?.id}`, {
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
      Swal.fire(`Success`, `You have successfully submitted!`, `success`);
      handleClose();
      mutate();

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
    <>
      <Dialog
        onClose={handleClose}
        maxWidth="lg"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">
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
          <div className="md:w-[50rem] w-[65vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
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
                          Bank Name
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
                          helperText={
                            (touched?.bankName as any) &&
                            (errors?.bankName as any)
                          }
                        />
                      </div>

                      {/* IFSC Code */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          IFSC Code
                        </p>
                        <TextField
                          name="ifscCode"
                          fullWidth
                          size="small"
                          placeholder="Enter IFSC Code"
                          value={values.ifscCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.ifscCode && !!errors.ifscCode}
                          helperText={
                            (touched.ifscCode as any) &&
                            (errors.ifscCode as any)
                          }
                        />
                      </div>
                      {/* accountNo */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Account No
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
                          helperText={
                            (touched.accountNo as any) &&
                            (errors.accountNo as any)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 justify-center mt-4">
                      <Button
                        type="submit"
                        className="!bg-theme"
                        variant="contained"
                        disabled={
                          loading ||
                          (!values?.accountNo &&
                            !values?.bankName &&
                            !values?.ifscCode)
                        }
                        startIcon={
                          loading ? <CircularProgress size={20} /> : <Check />
                        }
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
