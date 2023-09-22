import { Check } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  InputLabel,
  TextField,
} from "@mui/material";
import { AdminBreadcrumbs, SingleImageUpload } from "components/core";
import CountrySelector from "components/core/CountrySelector";
import { ErrorMessage, Form, Formik } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { APPOINTMENT, User } from "types";
import { uploadFile } from "utils";
import * as Yup from "yup";

const CreateAppointment = () => {
  const { user } = useAuth();
  const initialValues = {
    branchRequired: ["CEO", "COO"]?.includes(String(user?.role?.name)) || false,
    name: "",
    phone: "",
    email: "",
    address: "",
    startDate: "",
    startTime: "",
    endTime: "",
    assignedUserId: "",
    status: "",
    countryCode: "91",
    image: undefined,
    holidayOfBranchId: "",
    reason: "",
  };
  const validationSchema = Yup.object().shape({
    branchRequired: Yup.boolean(),
    holidayOfBranchId: Yup.string().when("branchRequired", {
      is: true,
      then(schema) {
        return schema.required("Required");
      },
    }),
    name: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Name must only contain alphabetic characters")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Required!"),

    phone: Yup.string()
      .required("Required!")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(6)
      .max(15),
    email: Yup.string().email("Invalid email address").required("Required!"),
    assignedUserId: Yup?.string()?.required("Required"),
    address: Yup.string().required("Required!"),
    startDate: Yup.string().required("Required!"),
    startTime: Yup.string().required("Required!"),
    endTime: Yup.string().required("Required!"),
    status: Yup.string().required("Required!"),
    countryCode: Yup.string().required("Required."),
    reason: Yup.string().required("Required!"),
    image: Yup.mixed()
      .test("fileSize", "Image size is too large", (value: any) => {
        if (value) {
          const maxSize = 5 * 1024 * 1024; // Maximum size in bytes (5MB)
          return value.size <= maxSize;
        }
        return true;
      })
      .test("fileType", "Invalid file type", (value: any) => {
        if (value) {
          const supportedFormats = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/svg+xml",
          ];
          return supportedFormats.includes(value.type);
        }
        return true;
      })
      .nullable(),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: branchData } = useFetch<any>(`branches`);
  const { change, isChanging } = useChange();
  const { data: userData } = useFetch<User[]>(`users`);
  const handleSubmit = async (values: APPOINTMENT) => {
    try {
      setLoading(true);
      const uniId = values?.image?.type?.split("/")[1];
      const url =
        values?.image &&
        (await uploadFile(values?.image, `${Date.now()}.${uniId}`));
      const res = await change(`appointments`, {
        body: {
          name: values?.name,
          email: values?.email,
          phone: values?.phone,
          address: values?.address,
          startDate: new Date(values?.startDate)?.toISOString(),
          startTime: values?.startTime,
          whomToVisitId: values?.assignedUserId,
          status: values?.status,
          photo: url,
          reason: values?.reason,
          branchId:
            user?.role?.name === "CEO" ||
            user?.role?.name === "COO" ||
            user?.role?.name === "DIRECTOR"
              ? values?.holidayOfBranchId
              : user?.employeeOfBranchId,
          endTime: values?.endTime,
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      router?.push("/admin/security/all-appointments");
      Swal.fire(
        `Success!`,
        `${res?.results?.msg || `Appointment Created Successfully`}`,
        `success`
      );
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
    <PanelLayout title="Create Appointment ">
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
                    Create Appointment
                  </h1>
                  <div className="grid lg:grid-cols-2">
                    {user?.role?.name === "CEO" ||
                    user?.role?.name === "COO" ||
                    user?.role?.name === "DIRECTOR" ? (
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="holidayOfBranchId">
                            Branch <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>

                        <Autocomplete
                          fullWidth
                          size="small"
                          id="holidayOfBranchId"
                          options={branchData || []}
                          onChange={(e: any, r: any) => {
                            setFieldValue("holidayOfBranchId", r?.id);
                          }}
                          getOptionLabel={(option: any) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // label="Role"
                              placeholder="Branch"
                              onBlur={handleBlur}
                              error={
                                touched.holidayOfBranchId &&
                                !!errors.holidayOfBranchId
                              }
                              helperText={
                                touched.holidayOfBranchId &&
                                errors.holidayOfBranchId
                              }
                            />
                          )}
                        />
                      </div>
                    ) : null}
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:py-2 py-1">
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

                    <div className="md:px-4 px-2 md:py-2 py-1">
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
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="phone">
                          Country Code <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <CountrySelector
                        className="bg-white border border-gray-400"
                        defaultValue="91"
                        name="countryCode"
                        onChange={(e: any, r: any) => {
                          setFieldValue("countryCode", r?.phone);
                        }}
                        onBlur={handleBlur}
                        value={values.countryCode}
                        error={touched.countryCode && !!errors.countryCode}
                        helperText={touched.countryCode && errors.countryCode}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="phone">
                          Phone <span className="text-red-600">*</span>
                        </InputLabel>
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
                        <InputLabel htmlFor="address">
                          Address <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Address"
                        id="address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address && !!errors.address}
                        helperText={touched.address && errors.address}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="startDate">
                          Appointment Date{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="date"
                        inputProps={{
                          min: new Date().toISOString().split("T")[0],
                        }}
                        id="startDate"
                        name="startDate"
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.startDate && !!errors.startDate}
                        helperText={touched.startDate && errors.startDate}
                      />
                    </div>

                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="startTime">
                          Appointment Start Time{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={values.startTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.startTime && !!errors.startTime}
                        helperText={touched.startTime && errors.startTime}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="endTime">
                          Appointment End Time{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={values.endTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.endTime && !!errors.endTime}
                        helperText={touched.endTime && errors.endTime}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="assignedUserId">
                          Whom To Visit<span className="text-red-500">*</span>
                        </InputLabel>
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="assignedUserId"
                        options={userData || []}
                        onChange={(e, r) => {
                          setFieldValue("assignedUserId", r?.id);
                        }}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Role"
                            placeholder="Name"
                            onBlur={handleBlur}
                            error={
                              touched.assignedUserId && !!errors.assignedUserId
                            }
                            helperText={
                              touched.assignedUserId && errors.assignedUserId
                            }
                          />
                        )}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="status">
                          Appointment Status{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>

                      <Autocomplete
                        fullWidth
                        size="small"
                        id="status"
                        options={Status_Type || []}
                        onChange={(e, r) => {
                          setFieldValue("status", r?.value);
                        }}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Role"
                            placeholder="status"
                            onBlur={handleBlur}
                            error={touched.status && !!errors.status}
                            helperText={touched.status && errors.status}
                          />
                        )}
                      />
                    </div>

                    <div className="md:px-4 px-2 md:py-2 py-1 col-span-2">
                      <div className="py-2">
                        <InputLabel htmlFor="reason">
                          Reason <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Reason"
                        multiline
                        rows={3}
                        id="reason"
                        name="reason"
                        value={values.reason}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.reason && !!errors.reason}
                        helperText={touched.reason && errors.reason}
                      />
                    </div>
                  </div>
                  <div className="px-2 md:py-2 py-1">
                    <div className="md:py-2 py-1">
                      <InputLabel htmlFor="name">Upload Image</InputLabel>
                    </div>
                    <SingleImageUpload
                      values={values}
                      message={"Max Size - 5MB"}
                      setImageValue={(event: any) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    >
                      <ErrorMessage name="image" />
                    </SingleImageUpload>
                  </div>
                  <div className="flex justify-center md:py-4 py-2">
                    <Button
                      type="submit"
                      variant="contained"
                      className="!bg-theme"
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="secondary" />
                        ) : (
                          <Check />
                        )
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

export default CreateAppointment;

const links = [
  { id: 1, page: "Security", link: "/admin/security" },
  {
    id: 2,
    page: "Create Appointment",
    link: "/admin/security/create-appointment",
  },
];
const Status_Type = [
  {
    id: 1,
    name: "Completed",
    value: "Completed",
  },
  {
    id: 2,
    name: "Pending",
    value: "Pending",
  },
];
