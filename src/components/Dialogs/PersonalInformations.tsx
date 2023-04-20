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
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useState } from "react";

interface Props {
  open?: any;
  handleClose?: any;
  mutate?: any;
}

const PersonalInformations = ({ open, handleClose, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const router = useRouter();
  const { data: employData } = useFetch<any>(`users/${router?.query?.id}`);
  console.log(employData);
  const initialValues = {
    panNo: `${employData?.panNo ? employData?.panNo : ""}`,
    aadharNo: `${employData?.aadharNo ? employData?.aadharNo : ""}`,
    gmail: `${employData?.gmail ? employData?.gmail : ""}`,
    linkedin: `${employData?.linkedin ? employData?.linkedin : ""}`,
    github: `${employData?.github ? employData?.github : ""}`,
  };

  const validationSchema = Yup.object().shape({
    panNo: Yup.string()
      .required("PAN number is required")
      .matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, "Invalid PAN number"),
    gmail: Yup.string().required("gmail is required"),
    aadharNo: Yup.string()
      .required("Aadhaar number is required")
      .matches(/^\d{12}$/, "Invalid Aadhaar number")
      .test("checksum", "Invalid Aadhaar number", function (value: any) {
        if (/^\d{12}$/.test(value)) {
          let sum = 0;
          for (let i = 0; i < 12; i++) {
            sum += parseInt(value.charAt(i)) * (i + 1);
          }
          return sum % 10 === 0;
        }
        return false;
      }),
    linkedin: Yup.string().url("Invalid link"),
    github: Yup.string().url("Invalid link"),
  });
  // const handleSubmit = async (values: any) => {
  //   console.log(values);
  //   Swal.fire(`Success`, `You have successfully Updated!`, `success`).then(() =>
  //     handleClose()
  //   );
  // };
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
            Personal Information
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
                          name="panNo"
                          placeholder="Enter Pan No"
                          value={values.panNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.panNo && !!errors.panNo}
                          helperText={touched.panNo && errors.panNo}
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
                      {/* linkedin */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Linkedin Id
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="linkedin"
                          placeholder="Enter Linkedin"
                          value={values.linkedin}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.linkedin && !!errors.linkedin}
                          helperText={touched.linkedin && errors.linkedin}
                        />
                      </div>
                      {/* linkedin */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Github Id
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="github"
                          placeholder="Enter Github Id"
                          value={values.github}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.github && !!errors.github}
                          helperText={touched.github && errors.github}
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

export default PersonalInformations;
