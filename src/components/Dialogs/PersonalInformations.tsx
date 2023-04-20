import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useAuth, useChange, useFetch } from "hooks";
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

const PersonalInformations = ({ open, handleClose }: Props) => {
  const router = useRouter();
  const { data: employData } = useFetch<any>(`users/${router?.query?.id}`);
  console.log(employData);
  const initialValues = {
    pan: `${employData?.pan ? employData?.pan : ""}`,
    aadharNo: `${employData?.aadharNo ? employData?.aadharNo : ""}`,
    gmail: `${employData?.gmail ? employData?.gmail : ""}`,
  };

  const validationSchema = Yup.object().shape({
    pan: Yup.string().required("Pan is required"),
    gmail: Yup.string().required("gmail is required"),
    aadharNo: Yup.string().required("Aadhar No is required"),
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
                          Pan No <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="pan"
                          placeholder="Enter Pan No"
                          value={values.pan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.pan && !!errors.pan}
                          helperText={touched.pan && errors.pan}
                        />
                      </div>
                      {/* gmail */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Gmail <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="gmail"
                          placeholder="Enter Gmail"
                          value={values.gmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.gmail && !!errors.gmail}
                          helperText={touched.gmail && errors.gmail}
                        />
                      </div>
                      {/* Aadhar No */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Aadhar No <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          name="aadharNo"
                          fullWidth
                          size="small"
                          placeholder="Enter Aadhar No"
                          value={values.aadharNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.aadharNo && !!errors.aadharNo}
                          helperText={touched.aadharNo && errors.aadharNo}
                        />
                      </div>

                      {/* passport */}
                      {/* <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Passport No <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="passport"
                          placeholder="Enter Passport No"
                          value={values.passport}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.passport && !!errors.passport}
                          helperText={touched.passport && errors.passport}
                        />
                      </div> */}
                      {/* religion */}
                      {/* <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Religion <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="religion"
                          placeholder="Enter Religion"
                          value={values.religion}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.religion && !!errors.religion}
                          helperText={touched.religion && errors.religion}
                        />
                      </div> */}
                      {/* maritalStatus */}
                      {/* <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Marital status <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="maritalStatus"
                          placeholder="Enter Marital status"
                          value={values.maritalStatus}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.maritalStatus && !!errors.maritalStatus
                          }
                          helperText={
                            touched.maritalStatus && errors.maritalStatus
                          }
                        />
                      </div> */}

                      {/* nationality */}
                      {/* <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Nationality <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="nationality"
                          placeholder="Enter Nationality"
                          value={values.nationality}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.nationality && !!errors.nationality}
                          helperText={touched.nationality && errors.nationality}
                        />
                      </div> */}
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

export default PersonalInformations;
