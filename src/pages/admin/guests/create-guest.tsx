import { Check } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  InputLabel,
  TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import CountrySelector from "components/core/CountrySelector";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
const initialValues = {
  name: "",
  countryCode: null,
  phone: "",
  email: "",
  gender: "",
  visitInfo: "",
  designation: "",
  company: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Name must only contain alphabetic characters")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required!"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(6)
    .max(15)
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required!"),
  designation: Yup.string().required("Designation is required!"),
  visitInfo: Yup.string().required("Visit information is required"),
  countryCode: Yup.string().required("Country code required."),
});

const CreateGuest = () => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      delete values.confirmPassword;
      const res = await change(`guests`, {
        body: values,
      });
      setLoading(false);
      if (res?.status !== 201) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      router?.push("/admin/guests/all-guests");
      Swal.fire(`Success`, `You have successfully Created!`, `success`);
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

  const Gender = [
    {
      id: 1,
      name: "Male",
    },
    {
      id: 2,
      name: "Female",
    },
  ];

  return (
    <PanelLayout title="Create Guest ">
      <section className="md:px-8 px-4 py-4">
        <AdminBreadcrumbs links={links} />
        <section className="w-full py-4 flex justify-center items-center">
          <div className="md:p-6 p-2 md:w-3/4 rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
                  <h1 className="text-2xl uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
                    Create Guest
                  </h1>
                  <div className="md:grid md:grid-cols-2">
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
                        <InputLabel htmlFor="phone">
                          Phone<span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <div className="md:flex grid gap-2 justify-center items-center">
                        <div className=" w-full md:w-1/4 lg:w-32">
                          <CountrySelector
                            className="bg-white border border-gray-400"
                            defaultValue="91"
                            name="countryCode"
                            onChange={(e: any, r: any) => {
                              setFieldValue("countryCode", r?.phone);
                            }}
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
                        <InputLabel htmlFor="designation">
                          Designation <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="designation"
                        id="designation"
                        name="designation"
                        value={values.designation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.designation && !!errors.designation}
                        helperText={touched.designation && errors.designation}
                      />
                    </div>
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="role">
                          Gender <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>

                      <Autocomplete
                        fullWidth
                        size="small"
                        id="gender"
                        options={Gender || []}
                        onChange={(e: any, r: any) => {
                          setFieldValue("gender", r?.name);
                        }}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Gender"
                            placeholder="Selected Gender"
                            onBlur={handleBlur}
                            error={touched.gender && !!errors.gender}
                            helperText={touched.gender && errors.gender}
                          />
                        )}
                      />
                    </div>
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="company">Company Name</InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Company Name"
                        id="company"
                        name="company"
                        value={values.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.company && !!errors.company}
                        helperText={touched.company && errors.company}
                      />
                    </div>

                    <div className="px-4 py-2 col-span-2">
                      <div className="py-2">
                        <InputLabel htmlFor="visitInfo">
                          Visit Info <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        multiline
                        rows={4}
                        size="small"
                        fullWidth
                        // placeholder="Employee ID"
                        id="visitInfo"
                        name="visitInfo"
                        value={values.visitInfo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.visitInfo && !!errors.visitInfo}
                        helperText={touched.visitInfo && errors.visitInfo}
                      />
                    </div>
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
      </section>
    </PanelLayout>
  );
};

export default CreateGuest;

const links = [
  { id: 1, page: "Guests", link: "/admin/guests" },
  { id: 2, page: "Create Guest", link: "/admin/guests/create-guest" },
];
