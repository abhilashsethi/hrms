import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { KeyedMutator } from "swr";
import { CalendarMonthRounded, Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";
import { User } from "types";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

interface Props {
  open?: any;
  handleClose?: any;
}
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  email: Yup.string().required("Email is required!"),
  employeeID: Yup.string().required("Employee ID is required!"),
  phone: Yup.string().required("Phone No is required!"),
  dob: Yup.string().required("Date of Birth is required!"),
  address: Yup.string().required("Address is required!"),
  gender: Yup.string().required("Gender is required!"),
  roleId: Yup.string().required("Role is required!"),
  joiningDate: Yup.string().required("Joining Date is required!"),
});

const UpdateProfileHead = ({ open, handleClose }: Props) => {
  const router = useRouter();
  const { data: employData } = useFetch<any>(`users/${router?.query?.id}`);
  console.log(employData);
  const initialValues = {
    name: `${employData?.name ? employData?.name : ""}`,
    employeeID: `${employData?.employeeID ? employData?.employeeID : ""}`,
    phone: `${employData?.phone ? employData?.phone : ""}`,
    email: `${employData?.email ? employData?.email : ""}`,
    dob: `${employData?.dob ? employData?.dob : ""}`,
    address: "",
    gender: "",
    roleId: "",
    joiningDate: "",
  };
  const handleSubmit = async (values: any) => {
    console.log(values);
    Swal.fire(`Success`, `You have successfully Updated!`, `success`).then(() =>
      handleClose()
    );
  };
  return (
    <>
      <Dialog
        // onClose={handleClose}
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
                      {/* name */}
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
                      {/* email */}
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
                      {/* employee id */}
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
                      {/* phone */}
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
                      {/* dob */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Date of Birth
                        </p>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{ width: "100%" }}
                            onChange={(e: any) =>
                              console.log(moment(e?.$d).format("lll"))
                            }
                          />
                        </LocalizationProvider> */}
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
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      {/* roleId */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Role <span className="text-red-600">*</span>
                        </p>
                        <TextField
                          fullWidth
                          name="roleId"
                          placeholder="Enter Role Id"
                          value={values.roleId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.roleId && !!errors.roleId}
                          helperText={touched.roleId && errors.roleId}
                        />
                      </div>
                      {/* joiningDate */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Joining Date
                        </p>
                        <TextField
                          fullWidth
                          name="joiningDate"
                          placeholder="Enter Joining Date"
                          value={values.joiningDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.joiningDate && !!errors.joiningDate}
                          helperText={touched.joiningDate && errors.joiningDate}
                        />
                      </div>
                      {/* address */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">Address</p>
                        <TextField
                          fullWidth
                          name="address"
                          multiline
                          rows={4}
                          placeholder="Enter Address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.address && !!errors.address}
                          helperText={touched.address && errors.address}
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

export default UpdateProfileHead;

const genders = [
  { id: 1, value: "male", label: "Male" },
  { id: 2, value: "female", label: "Female" },
];
