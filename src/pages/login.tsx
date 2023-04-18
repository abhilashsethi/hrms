import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoginSchema } from "schemas";
import Swal from "sweetalert2";
import { User } from "types";
import { useMutation, useAuth } from "hooks";
import * as Yup from "yup";
import { LOGO } from "../assets";

const Login = () => {
  const { isMutating, trigger } = useMutation(`auth/login`);
  const router = useRouter();
  const { setUser, setToken } = useAuth();
  const handleLogin = async (values: any, submitProps: any) => {
    try {
      const res = await trigger(values);
      // console.log(res);
      if (!res.success) return Swal.fire("Error", res.msg, "error");
      const user: User = { ...res.data.user };
      // console.log(user);
      setUser(user);
      setToken(res.data.accessToken);
      if (user?.role?.name === "CEO")
        return Swal.fire("Welcome Back!", "Login Successful!", "success").then(
          () => router.push(`/admin`)
        );
      if (user?.role?.name === "HR")
        return Swal.fire("Welcome Back!", "Login Successful!", "success").then(
          () => router.push(`/admin/hr`)
        );
      return Swal.fire("Error", "You Don't Have Access To This Page", "error");
    } catch (error) {
      submitProps.setSubmitting(false);
      Swal.fire("Error", "Invalid login credentials", "error");
      console.log(error);
    }
  };

  const initialValues = LoginSchema().reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as { [key: string]: string });
  const validationSchema = LoginSchema().reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as { [key: string]: Yup.StringSchema });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <section
        className="w-full h-screen bg-white flex"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-full w-full bg-gradient-to-bl from-theme-100 to-secondary-100 flex flex-col justify-center items-center">
          <figure className="md:w-52 w-24 m-auto mb-4 mt-8">
            <img className="w-full object-contain" src={LOGO.src} alt="" />
          </figure>
          <div className="flex flex-col items-center">
            <div className="mt-4">
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleLogin}
              >
                {(formik) => (
                  <Form>
                    <Card className="md:w-[30rem] w-[22rem] px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                      <CardContent>
                        <div className="flex flex-col place-content-center mt-8">
                          <p className="text-center md:text-2xl text-xl font-semibold text-theme">
                            Login
                          </p>
                          <p className="mt-1 text-center font-thin md:text-sm text-xs text-secondary-600 mb-4">
                            Enter your credentials to access your panel
                          </p>
                        </div>
                        {LoginSchema().map((inputItem) => (
                          <Field name={inputItem.name} key={inputItem.key}>
                            {(props: {
                              meta: { touched: any; error: any };
                              field: JSX.IntrinsicAttributes & TextFieldProps;
                            }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                                label={inputItem.label}
                                type={showPassword ? "text" : inputItem.type}
                                error={Boolean(
                                  props.meta.touched && props.meta.error
                                )}
                                helperText={
                                  props.meta.touched && props.meta.error
                                }
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {inputItem.startIcon}
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {inputItem.type === "password" && (
                                        <IconButton
                                          onClick={() =>
                                            setShowPassword(!showPassword)
                                          }
                                        >
                                          {showPassword ? (
                                            <Visibility />
                                          ) : (
                                            <VisibilityOff />
                                          )}
                                        </IconButton>
                                      )}
                                    </InputAdornment>
                                  ),
                                }}
                                {...props.field}
                              />
                            )}
                          </Field>
                        ))}

                        <div className="flex place-content-center py-4">
                          <Button
                            type="submit"
                            disabled={
                              formik.isSubmitting ||
                              !formik.isValid ||
                              isMutating
                            }
                            variant="contained"
                            color="primary"
                            className="!bg-theme"
                            size="large"
                            startIcon={
                              isMutating ? (
                                <CircularProgress size={16} />
                              ) : (
                                <LoginOutlined />
                              )
                            }
                          >
                            Login
                          </Button>
                        </div>
                        <Link href="/forgot-password">
                          <p className="text-center text-theme md:text-sm text-xs cursor-pointer hover:font-semibold transition-all ease-in-out duration-200 hover:text-youtube">
                            Forgot password ?
                          </p>
                        </Link>
                      </CardContent>
                    </Card>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
