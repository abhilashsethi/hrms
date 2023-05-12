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
import { ClientImageUpload } from "components/core";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as Yup from "yup";
const initialValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
};

const validationSchema = Yup.object().shape({
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
  image: Yup.mixed()
    .test("fileSize", "Image size is too large", (value: any) => {
      if (value) {
        const maxSize = 2 * 1024 * 1024; // Maximum size in bytes (2MB)
        return value?.size <= maxSize;
      }
      return true;
    })
    .test("fileType", "Invalid file type", (value: any) => {
      if (value) {
        const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
        return supportedFormats.includes(value?.type);
      }
      return true;
    }),
});
const AddClients = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { change, isChanging } = useChange();
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const uniId = new Date().getTime();
    try {
      delete values.confirmPassword;
      const url: any = await uploadFile(values?.image, `${uniId}.png`);
      delete values.image;
      const res = await change(`clients`, {
        body: { ...values, photo: url },
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
  };
  return (
    <PanelLayout title="All Clients - SY HR MS">
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
                  Create Client
                </h1>
                <div className="grid lg:grid-cols-2">
                  <div className="px-4 py-2">
                    <div className="py-2">
                      <InputLabel htmlFor="name">
                        Name <span className="text-red-600">*</span>
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
                      setFieldValue("image", event.currentTarget.files[0]);
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
