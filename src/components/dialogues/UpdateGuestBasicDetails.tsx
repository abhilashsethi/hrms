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
  name: Yup.string().required("Name is required!"),
  email: Yup.string().required("Email is required!"),
  employeeID: Yup.string().required("Employee ID is required!"),
  phone: Yup.string().required("Phone No is required!"),
  validFrom: Yup.string().required("Valid from is required!"),
  validTill: Yup.string().required("Valid till is required!"),
});

const UpdateGuestBasicDetails = ({ open, handleClose, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const router = useRouter();
  const { data: employData } = useFetch<any>(`users/${router?.query?.id}`);
  const initialValues = {
    name: `${employData?.name ? employData?.name : ""}`,
    employeeID: `${employData?.employeeID ? employData?.employeeID : ""}`,
    phone: `${employData?.phone ? employData?.phone : ""}`,
    email: `${employData?.email ? employData?.email : ""}`,
    validFrom: `${employData?.validFrom ? employData?.validFrom : ""}`,
    validTill: `${employData?.validTill ? employData?.validTill : ""}`,
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`users/${router?.query?.id}`, {
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
          sx={{ p: 2, minWidth: "40rem !important" }}
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
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Name <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          name="name"
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
                          Employee ID <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          name="employeeID"
                          fullWidth
                          placeholder="Enter Employee ID"
                          value={values.employeeID}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.employeeID && !!errors.employeeID}
                          helperText={touched.employeeID && errors.employeeID}
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Phone No <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
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
                          Valid From <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          type="date"
                          name="validFrom"
                          placeholder="Enter Valid From"
                          value={values.validFrom}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.validFrom && !!errors.validFrom}
                          helperText={touched.validFrom && errors.validFrom}
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Valid Till <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          type="date"
                          name="validTill"
                          placeholder="Enter Valid Till"
                          value={values.validTill}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.validTill && !!errors.validTill}
                          helperText={touched.validTill && errors.validTill}
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
