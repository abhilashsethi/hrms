import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { AdminBreadcrumbs, ClientImageUpload } from "components/core";
import CountrySelector from "components/core/CountrySelector";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as Yup from "yup";
const initialValues = {
  firstName: "",
  lastName: "",
  countryCode: "91",
  phone: "",
  email: "",
  gender: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
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
  countryCode: Yup.string().required("Country Code Required."),
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
  image: Yup.mixed().test(
    "fileType",
    "Only image files are allowed",
    (value: any) => {
      if (!value) return true; // Return true for optional field if no file is selected
      return value && value?.type.startsWith("image/");
    }
  ),
});
const AddClients = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { change, isChanging } = useChange();
  const handleSubmit = async (values: any) => {
    const uniId = new Date().getTime();
    const reqValue = Object.entries(values).reduce((acc: any, [key, value]) => {
      if (value && key !== "confirmPassword" && key !== "image") {
        acc[key] = value;
      }
      return acc;
    }, {});
    if (values?.image) {
      try {
        setLoading(true);
        const url: any = await uploadFile(values?.image, `${uniId}.png`);
        delete values.image;
        const res = await change(`clients`, {
          body: { ...reqValue, photo: url },
        });
        setLoading(false);
        if (res?.status !== 201) {
          Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
          setLoading(false);
          return;
        }
        router?.push("/admin/clients/all-clients");
        Swal.fire(`Success`, `Client successfully Added!`, `success`);
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const res = await change(`clients`, {
          body: { ...reqValue },
        });
        setLoading(false);
        if (res?.status !== 201) {
          Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
          setLoading(false);
          return;
        }
        router?.push("/admin/clients/all-clients");
        Swal.fire(`Success`, `You have successfully Created!`, `success`);
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <PanelLayout title="All Clients ">
      <div className="pt-4 px-2 ">
        <AdminBreadcrumbs links={links} />
      </div>
      <section className="w-full px-2 py-4 flex justify-center items-center">
        <div className="md:p-6 p-2 lg:w-3/4 rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
                  Create Client
                </h1>
                <div className="grid lg:grid-cols-2">
                  <div className="px-4 py-2">
                    <div className="py-2">
                      <InputLabel htmlFor="firstName">
                        First Name <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      size="small"
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
                  <div className="px-4 py-2">
                    <div className="py-2">
                      <InputLabel htmlFor="firstName">
                        Last Name <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      size="small"
                      id="lastName"
                      placeholder="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
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
                        Confirm Password <span className="text-red-600">*</span>
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
                      <InputLabel htmlFor="phone">Phone</InputLabel>
                    </div>
                    <div className="md:flex grid gap-2 justify-center items-center">
                      <div className=" w-full md:w-1/4 lg:w-32">
                        <CountrySelector
                          className="bg-white border border-gray-400"
                          defaultValue="91"
                          name="countryCode"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.countryCode}
                        />
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
                  </div>
                  <div className="px-4 py-2">
                    <div className="py-2">
                      <InputLabel htmlFor="phone">Gender</InputLabel>
                    </div>
                    <TextField
                      select
                      size="small"
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
                </div>
                <div className="px-4 py-2">
                  <div className="py-2">
                    <InputLabel htmlFor="phone">Profile Image</InputLabel>
                  </div>
                  <ClientImageUpload
                    values={values}
                    setImageValue={(event: any) => {
                      setFieldValue("image", event.target.files[0]);
                    }}
                  >
                    <ErrorMessage name="image" />
                  </ClientImageUpload>
                </div>
                <div className="flex justify-center py-4">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
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
    </PanelLayout>
  );
};

export default AddClients;

const genders = [
  { id: 1, value: "Male" },
  { id: 2, value: "Female" },
];
const links = [
  { id: 1, page: "Clients", link: "/admin/clients" },
  { id: 2, page: "Add Clients", link: "/admin/clients/add-clients" },
];
