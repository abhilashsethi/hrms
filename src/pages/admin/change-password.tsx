import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import * as Yup from "yup";
const initialValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password should minimum 6 characters!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password Must Match!")
    .required("Confirm password is required!"),
});
const ChangePassword = ({ resetForm }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { user } = useAuth();
  const { data: employees, mutate, isLoading } = useFetch<User>(`users`);
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    try {
      const requestBody = {
        password: values.password,
        ...(user?.isClient && { isClient: true }), // Add isClient if user?.isClient is true
      };
      const res = await change(`users/change-password/${user?.id}`, {
        method: "PUT",
        body: requestBody,
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Password change successfully`, `success`);
      resetForm();
      mutate();
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PanelLayout title="Change Password">
      <section className="w-full px-2 py-6 lg:py-24 flex justify-center items-center">
        <div className="p-6 md:w-1/2 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <h1 className="text-2xl tracking-wide uppercase md:text-xl lg:text-2xl text-slate-600 flex justify-center font-extrabold">
                  CHANGE PASSWORD
                </h1>
                <div className="grid">
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
                </div>
                <div className="flex justify-center py-4">
                  <Button
                    type="submit"
                    variant="contained"
                    className={`${loading ? "!bg-gray-300" : "bg-theme"}`}
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="secondary" />
                      ) : (
                        <Check />
                      )
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

export default ChangePassword;
