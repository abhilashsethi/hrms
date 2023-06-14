import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { Logo } from "assets/dashboard_Icons";
import { Field, Form, Formik } from "formik";
import { useAuth, useMutation } from "hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import * as Yup from "yup";

const LoginSchema = [
  {
    key: "1",
    label: "Username",
    placeHolder: "Type Your Username",
    icon: "",
    name: "username",
    type: "text",
    validationSchema: Yup.string().required("Username is required"),
    initialValue: "",
  },
  {
    key: "2",
    label: "Password",
    placeHolder: "Type Your Password",
    icon: "",
    name: "password",
    type: "password",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    initialValue: "",
  },
];

const initialValues = LoginSchema.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema = LoginSchema.reduce((accumulator, currentValue) => {
  accumulator[currentValue.name] = currentValue.validationSchema;
  return accumulator;
}, {} as { [key: string]: any });

const LoginAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isMutating, trigger } = useMutation(`auth/login`);
  const router = useRouter();
  const { setUser, setToken } = useAuth();
  const handleLogin = async (values: any, submitProps: any) => {
    try {
      const res = await trigger(values);
      if (!res.success) return Swal.fire("Error", res.msg, "error");
      const user: User = { ...res.data.user };
      setUser(user);
      setToken(res.data.accessToken);
      router.push(`/admin`);
      // if (user?.role?.name === "CEO")
      //   return Swal.fire("Welcome Back!", "Login Successful!", "success").then(
      //     () => router.push(`/admin`)
      //   );
      // if (user?.role?.name === "HR")
      //   return Swal.fire("Welcome Back!", "Login Successful!", "success").then(
      //     () => router.push(`/admin/hr`)
      //   );
      // return Swal.fire("Error", "You Don't Have Access To This Page", "error");
    } catch (err) {
      submitProps.setSubmitting(false);
      Swal.fire(
        "Error",
        "Server not available, Please try after sometime!",
        "error"
      );
    }
  };

  return (
    <article className="w-full md:flex-row flex flex-col justify-center items-center gap-5 text-themeDarkGray min-h-screen">
      <section className="lg:w-9/12 w-full md:flex-row flex flex-col">
        <div className="md:w-1/2 md:block hidden w-full md:h-[30rem] h-[22rem] relative overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-blue-300 rounded-l bg-gradient-to-t from-blue-400 to-white py-3">
          <div className="flex md:w-[12rem] w-[10rem] md:h-[12rem] h-[10rem] bg-blue-200 rotate-animation-one absolute top-[110px] left-[-50px] items-center justify-center rotate-[38deg]">
            <div className="md:w-[7rem] w-[5rem] md:h-[7rem] h-[5rem]  bg-[#FFB774]"></div>
          </div>
          <div className="flex absolute z-[30]  top-4 left-4 items-center justify-center px-8">
            <img src={Logo.src} alt="logo" className="w-full h-10" />
          </div>
          <div className="flex  absolute md:top-60 z-[30] top-20 left-4 flex-col h-full gap-4 px-8">
            <h1 className="md:text-4xl text-3xl text-blue-600 font-bold text-start tracking-wide">
              Welcome to HRMS
            </h1>
            <p className="text-themeDarkGray md:font-medium text-sm md:tracking-wide tracking-normal  leading-6 md:text-start text-justify">
              Streamline HR processes, optimize employee management, and enhance
              productivity with our innovative HR management system. Simplify HR
              tasks and empower your workforce for success.
            </p>
          </div>
          <div className="flex md:w-[12rem] w-[10rem] md:h-[12rem] h-[10rem] rotate-animation-two bg-blue-200 absolute top-[-50px] right-[-50px] items-center justify-center rotate-[38deg]">
            <div className="md:w-[7rem] w-[5rem] md:h-[7rem] h-[5rem]  bg-[#525fa7] "></div>
          </div>
        </div>
        <div className="md:w-1/2 w-full md:h-[30rem] h-[41.7rem] bg-white md:rounded-r rounded-none">
          <div className="flex flex-col items-start justify-center h-full gap-4 px-8">
            <div className="md:hidden w-full flex flex-col items-center justify-center">
              <img src={Logo.src} alt="logo" className="h-6 object-contain" />
              <p className="text-themeDarkGray text-sm font-medium">
                Welcome to HRMS
              </p>
            </div>
            <h1 className="text-2xl text-themeDarkGray font-bold text-start">
              Login
            </h1>
            <p className="text-blue-950 text-base leading-7 text-start">
              Sign in by entering information below
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleLogin}
            >
              {(formik) => (
                <Form className="flex flex-col gap-4 w-full">
                  {LoginSchema.map((item) => (
                    <Field name={item.name} key={item.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & {
                          name: string;
                          type: string;
                          placeholder: string;
                          id: string;
                          value: string;
                          onChange: (event: any) => void;
                          onBlur: (event: any) => void;
                          checked: boolean;
                          multiple: boolean;
                        };
                      }) => (
                        <div
                          className="flex flex-col gap-1 w-full"
                          key={item.key}
                        >
                          <label
                            htmlFor={item.name}
                            className="text-themeDarkGray text-sm font-semibold"
                          >
                            {item.label}
                          </label>
                          <div className="flex items-center border-b border-black justify-between w-full">
                            <input
                              id={item.name}
                              name={item.name}
                              placeholder={item.placeHolder}
                              type={showPassword ? "text" : item.type}
                              className="w-full h-10  px-4 bg-white"
                              onChange={(e) => {
                                props.field.onChange(e);
                                formik.handleChange(e);
                              }}
                              onBlur={(e) => {
                                props.field.onBlur(e);
                                formik.handleBlur(e);
                              }}
                            />
                            {item.type === "password" && (
                              <div
                                className="focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </div>
                            )}
                          </div>
                          {props.meta.touched && props.meta.error && (
                            <div className="text-red-600 text-sm">
                              {props.meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  ))}
                  <div className="flex flex-col items-start justify-between w-full gap-4">
                    <div className="flex items-center justify-end w-full">
                      <Link
                        href="/forgot-password"
                        className="text-sm font-semibold hover:text-blue-600"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="w-full">
                      <Button
                        fullWidth
                        type="submit"
                        disabled={
                          formik.isSubmitting || !formik.isValid || isMutating
                        }
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={
                          isMutating ? (
                            <CircularProgress size={16} />
                          ) : (
                            <LoginOutlined />
                          )
                        }
                      >
                        LOGIN
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </article>
  );
};

export default LoginAuth;
