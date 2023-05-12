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
  phone: Yup.string().required("Phone No is required!"),
  gender: Yup.string().required("Gender is required!"),
});

const UpdateClient = ({ open, handleClose, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const router = useRouter();
  const { data: clientData } = useFetch<any>(`clients/${router?.query?.id}`);
  const initialValues = {
    name: `${clientData?.name ? clientData?.name : ""}`,
    phone: `${clientData?.phone ? clientData?.phone : ""}`,
    email: `${clientData?.email ? clientData?.email : ""}`,
    gender: `${clientData?.gender ? clientData?.gender : ""}`,
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`clients/${router?.query?.id}`, {
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
                        <p className="text-theme font-semibold my-2">Gender</p>
                        <TextField
                          select
                          fullWidth
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

                      {/* <div className="w-full">
                           <p className="text-theme font-semibold my-2">
                             Department <span className="text-red-600">*</span>
                           </p>
                           <Autocomplete
                             sx={{ width: "100%" }}
                             options={departmentsData?.departments}
                             autoHighlight
                             getOptionLabel={(option: any) =>
                               option.name ? option.name : ""
                             }
                             isOptionEqualToValue={(option, value) =>
                               option.id === value.departmentId
                             }
                             value={
                               values?.departmentId
                                 ? departmentsData?.departments?.find(
                                     (option: any) =>
                                       option.id === values.departmentId
                                   )
                                 : {}
                             }
                             onChange={(e: any, r: any) => {
                               setFieldValue("departmentId", r?.id);
                             }}
                             renderOption={(props, option) => (
                               <Box
                                 component="li"
                                 sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                 {...props}
                               >
                                 {option.name}
                               </Box>
                             )}
                             renderInput={(params) => (
                               <TextField
                                 {...params}
                                 label="Select Role"
                                 inputProps={{
                                   ...params.inputProps,
                                 }}
                               />
                             )}
                           />
                         </div> */}
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

export default UpdateClient;
const genders = [
  { id: 1, value: "Male" },
  { id: 2, value: "Female" },
];
