import { Check, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { APPOINTMENT, User } from "types";
import * as yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  MainMutate: () => void;
  appointmentData?: APPOINTMENT;
}

const UpdateAppointmentDetails = ({
  open,
  handleClose,
  MainMutate,
  appointmentData,
}: Props) => {
  const { data: userData } = useFetch<User[]>(`users`);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const formik = useFormik({
    initialValues: {
      name: `${appointmentData?.name ? appointmentData?.name : ""}`,
      email: `${appointmentData?.email ? appointmentData?.email : ""}`,
      phone: `${appointmentData?.phone ? appointmentData?.phone : ""}`,
      startDate: `${
        appointmentData?.startDate
          ? moment(appointmentData?.startDate).format("YYYY-MM-DD")
          : ""
      }`,
      whomToVisitId: `${
        appointmentData?.whomToVisitId ? appointmentData?.whomToVisitId : ""
      }`,
      reason: `${appointmentData?.reason ? appointmentData?.reason : ""}`,
      address: `${appointmentData?.address ? appointmentData?.address : ""}`,
      status: `${appointmentData?.status ? appointmentData?.status : ""}`,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .required("Name is required!"),
      phone: yup
        .string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        )
        .min(6)
        .max(15),
      email: yup.string().email("Invalid email address"),
      address: yup.string().required("Required!"),
      startDate: yup.string().required("Required!"),
      whomToVisitId: yup.string().required("Required!"),
      reason: yup.string().required("Required!"),
      status: yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        values.startDate = moment(values.startDate).toISOString();

        const reqValue = Object.entries(values).reduce(
          (acc: any, [key, value]) => {
            if (key !== "link" && value) {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );
        const res = await change(`appointments/${appointmentData?.id}`, {
          method: "PATCH",
          body: reqValue,
        });
        setLoading(false);
        if (res?.status !== 200) {
          Swal.fire(
            "Error",
            res?.results?.msg || "Something went wrong!",
            "error"
          );
          setLoading(false);
          return;
        }
        MainMutate();
        handleClose();
        Swal.fire(`Success`, `Updated Successfully!`, `success`);
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });

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
          <div className="md:w-[50rem]  tracking-wide flex flex-col gap-3 text-sm py-4">
            <div className="flex flex-col items-center w-full">
              <form onSubmit={formik.handleSubmit} className="w-full">
                <div className="grid lg:grid-cols-2 gap-4 pb-4">
                  <div className="w-full">
                    <p className="text-theme font-semibold">
                      Status <span className="text-red-600">*</span>
                    </p>
                    <Autocomplete
                      fullWidth
                      size="small"
                      id="status"
                      options={Status_Type || []}
                      getOptionLabel={(option: any) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option: any, value: any) =>
                        option.value === value.value
                      }
                      value={
                        formik.values?.status
                          ? Status_Type?.find(
                              (option: any) =>
                                option.value === formik.values.status
                            )
                          : {}
                      }
                      onChange={(e: any, r: any) => {
                        formik.setFieldValue("status", r?.value);
                      }}
                      renderOption={(props, option: any) => (
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
                          placeholder="Status"
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.status && !!formik.errors.status
                          }
                          helperText={
                            formik.touched.status && formik.errors.status
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">
                      Name <span className="text-red-600">*</span>
                    </p>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Enter Branch Name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && !!formik.errors.name}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </div>

                  <div className="w-full">
                    <p className="text-theme font-semibold">Phone</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.phone && !!formik.errors.phone}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">Email</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && !!formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">Start Date</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Start Date"
                      name="startDate"
                      type="date"
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.startDate && !!formik.errors.startDate
                      }
                      helperText={
                        formik.touched.startDate && formik.errors.startDate
                      }
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">
                      Whom To Visit <span className="text-red-600">*</span>
                    </p>
                    <Autocomplete
                      fullWidth
                      size="small"
                      id="whomToVisitId"
                      options={userData || []}
                      getOptionLabel={(option: any) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option: any, value: any) =>
                        option.id === value.userId
                      }
                      value={
                        formik.values?.whomToVisitId
                          ? userData?.find(
                              (option: any) =>
                                option.id === formik.values.whomToVisitId
                            )
                          : {}
                      }
                      onChange={(e: any, r: any) => {
                        formik.setFieldValue("whomToVisitId", r?.id);
                      }}
                      renderOption={(props, option: any) => (
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
                          placeholder="Whom To Visit"
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.whomToVisitId &&
                            !!formik.errors.whomToVisitId
                          }
                          helperText={
                            formik.touched.whomToVisitId &&
                            formik.errors.whomToVisitId
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">Reason</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Reason"
                      name="reason"
                      value={formik.values.reason}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.reason && !!formik.errors.reason}
                      helperText={formik.touched.reason && formik.errors.reason}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">Address</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.address && !!formik.errors.address}
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="!bg-emerald-500"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Check />
                  }
                >
                  UPDATE DETAILS
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateAppointmentDetails;
const Status_Type = [
  {
    id: 1,
    name: "Completed",
    value: "Completed",
  },
  {
    id: 2,
    name: "Pending",
    value: "Pending",
  },
];
