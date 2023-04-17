import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import PanelLayout from "layouts/panel";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  date: "",
  employeeId: "",
  company: "",
  department: "",
  designation: "",
};

const validationSchema = Yup.object().shape({
  date: Yup.string().required("date is required!"),
  employeeId: Yup.string().required("Employee Id is required!"),
  department: Yup.string().required("Department is required!"),
  company: Yup.string().required("Company is required!"),
  designation: Yup.string().required("Designation is required!"),
  username: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Username must only contain alphabetic characters")
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters")
    .required("Username is required!"),
  firstName: Yup.string()
    .matches(
      /^[A-Za-z ]+$/,
      "First name must only contain alphabetic characters"
    )
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required!"),
  lastName: Yup.string()
    .matches(
      /^[A-Za-z ]+$/,
      "Last name must only contain alphabetic characters"
    )
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required!"),
  phoneNumber: Yup.string()
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

  const handleSubmit = async (values: any) => {
    console.log(values);
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
                <h1 className="text-3xl md:text-4xl lg:text-6xl text-slate-600 flex justify-center font-extrabold py-2">
                  Create Employee
                </h1>
                <div className="grid lg:grid-cols-2">
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="firstName">
                        First Name <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      id="firstName"
                      placeholder="First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="lastName">
                        Last Name <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Last Name"
                      id="fullWidth"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="username">
                        Username <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Username"
                      id="username"
                      name="email"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
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
                      <InputLabel htmlFor="joiningDate">
                        Joining Date <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Joining Date"
                      id="joiningDate"
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.date && !!errors.date}
                      helperText={touched.date && errors.date}
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
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="company">
                        Company <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Company"
                      id="company"
                      name="company"
                      value={values.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.company && !!errors.company}
                      helperText={touched.company && errors.company}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="department">
                        Department <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Department"
                      id="department"
                      name="department"
                      value={values.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.department && !!errors.department}
                      helperText={touched.department && errors.department}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <div className="py-2">
                      <InputLabel htmlFor="designation">
                        Designation <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      placeholder="Designation"
                      id="designation"
                      name="designation"
                      value={values.designation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.designation && !!errors.designation}
                      helperText={touched.designation && errors.designation}
                    />
                  </div>
                </div>
                <div className="flex justify-center py-4">
                  <Button
                    type="submit"
                    variant="contained"
                    className="!bg-theme !px-10 !py-3 hover:!bg-sky-800 hover:!shadow-xl"
                    startIcon={<Check />}
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
