import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import PanelLayout from "layouts/panel";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Swal from "sweetalert2";
import { useMutation } from "hooks";
const initialValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  employeeId: "",
  role: "",
};

const validationSchema = Yup.object().shape({
  role: Yup.string().required("Role is required!"),
  employeeId: Yup.string().required("Employee Id is required!"),
  name: Yup.string()
    .matches(
      /^[A-Za-z ]+$/,
      "First name must only contain alphabetic characters"
    )
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required!"),

  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(6)
    .max(15)
    .required("Phone number is required!"),
  email: Yup.string().email("Invalid email address").required("Required!"),
  password: Yup.string()
    .min(6, "Password should minimum 6 characters!")
    .required("password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password Must Match!")
    .required("Confirm password is required!"),
});

const CreateUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const { isMutating, trigger } = useMutation(`users`);
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await trigger(values);
      if (!res.success) return Swal.fire("Error", res.msg, "error");
      console.log(res);
      // Swal.fire(`Info`, `Please Wait..., We Are Uploading Your Data!`, `info`);
      // const formData = new FormData();
      // formData?.append("email", values?.email);
      // formData?.append("name", values?.name);
      // formData?.append("password", values?.password);
      // formData?.append("phone", values?.phone);
      // formData?.append("roleId", values?.roleId);
      // formData?.append("employeeID", values?.employeeID);
      // const data: any = await useMutation(`users`, {
      //   body: formData,
      //   isFormData: true,
      // });
      // setLoading(false);
      // if (data?.status !== 200) {
      //   Swal.fire(
      //     "Error",
      //     data?.results?.error?.message || "Unable to Submit",
      //     "error"
      //   );
      //   setLoading(false);
      //   return;
      // }
      Swal.fire(`Success`, `You have successfully Submitted!`, `success`);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PanelLayout title="Create Employee - SY HR MS">
      <section className="w-full px-2 py-10 flex justify-center items-center">
        <div className="p-6 shadow-xl w-3/4 rounded-xl shadow-sky-400 border-b-4 border-sky-600">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-slate-600 flex justify-center font-extrabold py-2">
                  Create Employee
                </h1>
                <div className="grid lg:grid-cols-2">
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="name">
                        First Name <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      id="name"
                      placeholder="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="email">
                        Email <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="password">
                        Password <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {"password" === "password" && (
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="con-password">
                        Confirm Password <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Confirm Password"
                      id="con-password"
                      type={showConPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {"password" === "password" && (
                              <IconButton
                                onClick={() =>
                                  setShowConPassword(!showConPassword)
                                }
                              >
                                {showConPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="employeeId">
                        Employee ID <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Employee ID"
                      id="employeeId"
                      name="employeeId"
                      value={values.employeeId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.employeeId && !!errors.employeeId}
                      helperText={touched.employeeId && errors.employeeId}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="phone">
                        Phone <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Phone"
                      id="phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="role">
                        Role <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="role"
                        value={values.role}
                        label="Role"
                        onChange={handleChange}
                      >
                        <MenuItem value={"fullstack"}>Full Stack</MenuItem>
                        <MenuItem value={"frontEnd"}>Front End</MenuItem>
                        <MenuItem value={"backEnd"}>Back End</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="flex justify-center py-4">
                  <Button
                    type="submit"
                    variant="contained"
                    className="!bg-theme !px-10 !py-3 hover:!bg-sky-800 hover:!shadow-xl"
                    disabled={loading}
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <Check />
                    }
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </PanelLayout>
  );
};

export default CreateUser;
