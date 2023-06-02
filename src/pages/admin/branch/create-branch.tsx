import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import {
     Autocomplete,
     Box,
     Button,
     CircularProgress,
     IconButton,
     InputAdornment,
     InputLabel,
     TextField,
} from "@mui/material";
import { AdminBreadcrumbs, Loader } from "components/core";
import { useTheme, useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { countries } from "schemas/Countries";
const initialValues = {
     name: "",
     phone: "",
     email: "",
     country: "",
     location: "",
     userId: "",
};

const validationSchema = Yup.object().shape({
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

const CreateBranch = () => {
     const [loading, setLoading] = useState(false);
     const { data: userData } = useFetch<any>(`users`);
     const { change, isChanging } = useChange();
     const handleSubmit = async (values: any) => {
          try {
               setLoading(true);
               const res: any = await change(`branches`, {
                    body: values,
               });
               setLoading(false);
               if (res?.status !== 201) {
                    Swal.fire("Error", res?.results?.message || "Unable to Submit", "info");
                    setLoading(false);
                    return;
               }
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
          <PanelLayout title="Create Employee - Admin Panel">
               <section className="md:px-8 px-2 md:py-4 py-2">
                    <div className="px-2 md:px-0">
                         <AdminBreadcrumbs links={links} />
                    </div>
                    <section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
                         <div className="md:p-6 p-2 md:w-3/4 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
                                        <Form>
                                             <h1 className="text-lg uppercase md:text-xl lg:text-2xl text-slate-600 flex justify-center font-extrabold py-2">
                                                  Create Branch
                                             </h1>
                                             <div className="grid lg:grid-cols-2">
                                                  <div className="md:px-4 px-2 md:py-2 py-1">
                                                       <div className="md:py-2 py-1">
                                                            <InputLabel htmlFor="name">
                                                                 Branch Name <span className="text-red-600">*</span>
                                                            </InputLabel>
                                                       </div>
                                                       <TextField
                                                            fullWidth
                                                            size="small"
                                                            id="name"
                                                            placeholder="Branch Name"
                                                            name="name"
                                                            value={values.name}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={touched.name && !!errors.name}
                                                            helperText={touched.name && errors.name}
                                                       />
                                                  </div>
                                                  <div className="md:px-4 px-2 md:py-2 py-1">
                                                       <div className="md:py-2 py-1">
                                                            <InputLabel htmlFor="location">
                                                                 Branch Location <span className="text-red-600">*</span>
                                                            </InputLabel>
                                                       </div>
                                                       <TextField
                                                            fullWidth
                                                            size="small"
                                                            id="location"
                                                            placeholder="Branch Location"
                                                            name="location"
                                                            value={values.location}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={touched.location && !!errors.location}
                                                            helperText={touched.location && errors.location}
                                                       />
                                                  </div>
                                                  <div className="w-full">
                                                       <p className="text-theme font-semibold my-2">
                                                            Country <span className="text-red-600">*</span>
                                                       </p>
                                                       <Autocomplete
                                                            options={countries}
                                                            autoHighlight
                                                            // getOptionLabel={(option: any) =>
                                                            // 	option.label ? option.label : ""
                                                            // }
                                                            value={values?.country as any}
                                                            fullWidth
                                                            onChange={(e, r: any) =>
                                                                 setFieldValue("country", r?.label)
                                                            }
                                                            renderOption={(props, option: any) => (
                                                                 <Box
                                                                      component="li"
                                                                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                                                      {...props}
                                                                 >
                                                                      <img
                                                                           loading="lazy"
                                                                           width="20"
                                                                           src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                           srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                           alt=""
                                                                      />
                                                                      {option?.label}
                                                                 </Box>
                                                            )}
                                                            renderInput={(params) => (
                                                                 <TextField
                                                                      {...params}
                                                                      label="Choose a country"
                                                                      name="country"
                                                                      error={
                                                                           touched?.country && Boolean(errors?.country)
                                                                      }
                                                                      onBlur={handleBlur}
                                                                      helperText={touched?.country && errors?.country}
                                                                      inputProps={{
                                                                           ...params.inputProps,
                                                                      }}
                                                                 />
                                                            )}
                                                       />
                                                  </div>
                                                  <div className="md:px-4 px-2 md:py-2 py-1">
                                                       <div className="py-2">
                                                            <InputLabel htmlFor="email">
                                                                 Email
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

                                                  <div className="md:px-4 px-2 md:py-2 py-1">
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

                                                  <div className="md:px-4 px-2 md:py-2 py-1">
                                                       <div className="py-2">
                                                            <InputLabel htmlFor="manager">
                                                                 Assign Manager
                                                            </InputLabel>
                                                       </div>
                                                       <Autocomplete
                                                            fullWidth
                                                            size="small"
                                                            id="userId"
                                                            options={userData || []}
                                                            onChange={(e: any, r: any) => {
                                                                 setFieldValue("userId", r?.id);
                                                            }}
                                                            getOptionLabel={(option: any) => option.name}
                                                            renderInput={(params) => (
                                                                 <TextField
                                                                      {...params}
                                                                      placeholder="Manager Name"
                                                                      onBlur={handleBlur}
                                                                      error={
                                                                           touched.userId && !!errors.userId
                                                                      }
                                                                      helperText={
                                                                           touched.userId && errors.userId
                                                                      }
                                                                 />
                                                            )}
                                                       />
                                                  </div>
                                             </div>
                                             <div className="flex justify-center md:py-4 py-2">
                                                  <Button
                                                       type="submit"
                                                       variant="contained"
                                                       className="!bg-theme"
                                                       disabled={loading}
                                                       startIcon={
                                                            loading ? <CircularProgress size={20} /> : <Check />
                                                       }
                                                  >
                                                       SUBMIT
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

export default CreateBranch;

const links = [
     { id: 1, page: "branches", link: "/admin/branch" },
     { id: 2, page: "Create Branch", link: "/admin/branch/create-branch" },
];
