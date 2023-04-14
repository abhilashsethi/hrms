import { Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material";
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
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { LoginSchema } from "../schemas";
import { Formik, Form, Field } from "formik";
import useAuth from "../hooks/useAuth";
import { LOGO } from "../assets";
import { LOGINBG } from "../assets/home";
import Link from "next/link";
import { useChange, useMutation } from "utils";
import { User } from "types";
import useAppContext from "hooks/useAppContext";
import Head from "next/head";

const Login = () => {
  const { change } = useChange();
  const { isMutating, trigger } = useMutation(`auth/signin`);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (values: any, submitProps: any) => {
    try {
      const { error, success } = await trigger(values);
      if (error) return Swal.fire("Error", error.message, "error");
      const user = {
        ...success?.data?.user,
        token: success?.data?.token,
      } as User;

      setUser?.(user);
      if (user.role === "ADMIN")
        return Swal.fire("Welcome Back!", "Login Successful!", "success").then(
          () => router.push(`/panel/admin`)
        );
      if (user.role === "STUDENT") {
        const sendActivity = await change(`last-visit/create`, {
          method: "POST",
          body: { visitDate: [`${new Date().toISOString()}`] },
        });
        return Swal.fire("Welcome Back!", "Login Successful!", "success").then(
          () => router.push(`/panel/student`)
        );
      }
      if (user.role === "UNIVERSITY")
        return Swal.fire("Error", "Invalid login credentials", "error");
      if (
        user.role === "AMBASSADOR" ||
        "FACULTY" ||
        "MANAGER" ||
        "UNIVERSITY_STUDENT"
      ) {
        return Swal.fire("Error", "Invalid login credentials", "error");
      }
      // return Swal.fire("Welcome Back!", "Login Successful!", "success").then(
      //   () => router.push(`/panel/user`)
      // );
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
          backgroundImage: `url(${LOGINBG.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-full w-full bg-gradient-to-b from-[#ffffffdc] via-[#4ffff098] to-[#00000086] flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="mt-4 md:w-28 w-24">
              <img className="w-full object-contain" src={LOGO.src} alt="" />
            </div>

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
                        <div className="flex flex-col place-content-center py-2">
                          <p className="mt-4 text-center md:text-2xl text-xl font-semibold text-theme">
                            LOGIN
                          </p>
                          <p className="mt-1 text-center font-thin md:text-sm text-xs text-[#DD3350]">
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
