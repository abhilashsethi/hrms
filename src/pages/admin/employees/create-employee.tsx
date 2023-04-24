import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import * as Yup from "yup";
const initialValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  employeeID: "",
  roleId: "",
};

const validationSchema = Yup.object().shape({
  roleId: Yup.string().required("Employee Id is required!"),
  employeeID: Yup.string().required("Employee Id is required!"),
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Name must only contain alphabetic characters")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required!"),

  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(6)
    .max(15),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password should minimum 6 characters!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password Must Match!")
    .required("Confirm password is required!"),
});

const CreateEmployee = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, mutate } = useFetch<User[]>(`roles`);
  const { change, isChanging } = useChange();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      delete values.confirmPassword;
      const res = await change(`users`, {
        body: values,
      });
      setLoading(false);
      if (res?.status !== 201) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      router?.push("/admin/employees/all-employees");
      Swal.fire(`Success`, `You have successfully Created!`, `success`);
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
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <section className="w-full px-2 py-4 flex justify-center items-center">
          <div className="p-6 w-3/4 rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
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
                <Form>
                  <h1 className="text-2xl uppercase md:text-xl lg:text-2xl text-slate-600 flex justify-center font-extrabold py-2">
                    Create Employee
                  </h1>
                  <div className="grid lg:grid-cols-2">
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="name">
                          First Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
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
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="email">
                          Email <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
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
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="password">
                          Password <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
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
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="con-password">
                          Confirm Password{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
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
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="employeeID">
                          Employee ID <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Employee ID"
                        id="employeeID"
                        name="employeeID"
                        value={values.employeeID}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.employeeID && !!errors.employeeID}
                        helperText={touched.employeeID && errors.employeeID}
                      />
                    </div>
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                      </div>
                      <TextField
                        size="small"
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
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="role">
                          Role <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      {/* <TextField
                        size="small"
                        select
                        fullWidth
                        name="roleId"
                        value={values.roleId}
                        onChange={handleChange}
                      >
                        {data?.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField> */}
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="roleId"
                        options={data || []}
                        onChange={(e: any, r: any) => {
                          setFieldValue("roleId", r?.id);
                        }}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Employee Name"
                            placeholder="Assigned"
                            onBlur={handleBlur}
                            error={touched.roleId && !!errors.roleId}
                            helperText={touched.roleId && errors.roleId}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center py-4">
                    <Button
                      type="submit"
                      variant="contained"
                      className="!bg-theme !px-10 !py-3 hover:!bg-sky-800 hover:!shadow-xl"
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
      </section>
    </PanelLayout>
  );
};

export default CreateEmployee;

const links = [
  { id: 1, page: "Employees", link: "/admin/employees" },
  { id: 2, page: "Create Employee", link: "/admin/employees/create-employee" },
];
