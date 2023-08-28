import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";
import moment from "moment";
import { useState } from "react";

interface Props {
  open?: any;
  handleClose?: any;
  mutate?: any;
}
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Name must only contain alphabetic characters")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required!"),
  visitInfo: Yup.string()
    .min(5, "visitInfo must be at least 5 characters")
    .max(500, "visitInfo must be less than 500 characters"),
  email: Yup.string().email("Invalid gmail address"),
  phone: Yup.string().required("Phone No is required!"),
});

const UpdateGuestBasicDetails = ({ open, handleClose, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const router = useRouter();
  const { data: employData } = useFetch<any>(`guests/${router?.query?.id}`);
  const initialValues = {
    name: `${employData?.name ? employData?.name : ""}`,
    company: `${employData?.company ? employData?.company : ""}`,
    phone: `${employData?.phone ? employData?.phone : ""}`,
    email: `${employData?.email ? employData?.email : ""}`,
    designation: `${employData?.designation ? employData?.designation : ""}`,
    gender: `${employData?.gender ? employData?.gender : ""}`,
    visitInfo: `${employData?.visitInfo ? employData?.visitInfo : ""}`,
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`guests/${router?.query?.id}`, {
        method: "PATCH",
        body: values,
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Update", "error");
        setLoading(false);
        return;
      }
      mutate();
      Swal.fire(`Success`, `Updated Successfully`, `success`);
      handleClose();
      return;
    } catch (error) {}
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
          // sx={{ p: 2, minWidth: "40rem !important" }}
        >
          <p className="text-center text-md font-bold text-theme te tracking-wide">
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
        <DialogContent className="app-scrollbar" sx={{ p: 3 }}>
          <div className="md:w-[50rem] w-full md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
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
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Name <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          name="name"
                          size="small"
                          placeholder="Enter Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Email <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="email"
                          placeholder="Enter Email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Company Name
                        </p>
                        <TextField
                          name="company"
                          fullWidth
                          size="small"
                          placeholder="Enter Company Name"
                          value={values.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.company && !!errors.company}
                          helperText={touched.company && errors.company}
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Phone No <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="phone"
                          placeholder="Enter Phone No"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phone && !!errors.phone}
                          helperText={touched.phone && errors.phone}
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Designation
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="designation"
                          placeholder="Enter Designation"
                          value={values.designation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.designation && !!errors.designation}
                          helperText={touched.designation && errors.designation}
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">Gender</p>
                        <TextField
                          select
                          fullWidth
                          size="small"
                          name="gender"
                          placeholder="Gender"
                          value={values.gender}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.gender && !!errors.gender}
                          helperText={touched.gender && errors.gender}
                        >
                          {genders.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Visitor Information{" "}
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          rows={4}
                          multiline
                          name="visitInfo"
                          placeholder="Enter Visitor Information"
                          value={values.visitInfo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.visitInfo && !!errors.visitInfo}
                          helperText={touched.visitInfo && errors.visitInfo}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 justify-center mt-4">
                      <Button
                        type="submit"
                        className="!bg-theme"
                        variant="contained"
                        disabled={loading}
                        startIcon={
                          loading ? <CircularProgress size={20} /> : <Check />
                        }
                      >
                        UPDATE
                      </Button>
                    </div>
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

export default UpdateGuestBasicDetails;

const genders = [
  { id: 1, value: "Male" },
  { id: 2, value: "Female" },
];
