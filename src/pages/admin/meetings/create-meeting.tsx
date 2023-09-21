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
import { Form, Formik, FormikValues } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import { Client } from "types";
import * as Yup from "yup";
// import PayrollInputField from "./PayrollInputField";

interface FormValues {
  inputFields: InputField[];
  clientName?: string;
  clientEmail?: string;
  clientAddress?: string;
  quotationTitle?: string;
  text?: string;
  branchId?: string;
  meetingTitle?: string;
  meetingPurpose?: string;
  meetingDate?: string;
  meetingStartTime?: string;
  meetingEndTime?: string;
  meetingPersonName?: string;
  clientPhone?: string;
  address?: string;
  lat?: number;
  lon?: number;
  status?: string;
}
interface InputField {
  docTitle?: string;
  doc?: any;
}

interface Props {
  handleNext: () => void;
}

interface FormValues {
  inputFields: InputField[];
}
const CreateMeeting = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const router = useRouter();

  const initialValues = {
    meetingTitle: "",
    meetingPurpose: "",
    meetingDate: "",
    meetingStartTime: "",
    meetingEndTime: "",
    meetingPersonName: "",
    clientName: "",
    status: "",
    docs: "",
    clientPhone: "",
    clientEmail: "",
    address: "",
    lat: "",
    lon: "",
    countryCode: "91",
    meetingNotes: "",
    inputFields: [{ docTitle: "", doc: null }],
  };
  const validationSchema = Yup.object().shape({
    meetingTitle: Yup.string().required("Meeting Title is required!"),
    meetingDate: Yup.string().required("Meeting Date is required!"),
    meetingStartTime: Yup.string().required("Meeting StartTime is required!"),
    meetingPersonName: Yup.string().required(
      "Meeting Person Name is required!"
    ),
    clientName: Yup.string().required("Client Name is required!"),
    countryCode: Yup.string().required("Country Code Required."),
    status: Yup.string().required("Meeting Status is required!"),
    lat: Yup.string()
      .matches(
        /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/,
        "Latitude must be a valid decimal number"
      )
      .required("Latitude is required"),
    lon: Yup.string()
      .matches(
        /^-?([1-9]|[1-9][0-9]|1[0-7][0-9]|180)\.{1}\d{1,6}$/,
        "Longitude must be a valid decimal number"
      )
      .required("Longitude is required"),
  });

  const { data: clients } = useFetch<Client[]>(`clients`);

  const handleSubmit = async (values: FormikValues, { resetForm }: any) => {
    setLoading(true);
    try {
      const resData = {
        title: values?.meetingTitle,
        purpose: values?.meetingPurpose,
        meetingDate: new Date(values?.meetingDate || "")?.toISOString(),
        meetingStartTime: values?.meetingStartTime,
        meetingEndTime: values?.meetingEndTime,
        meetingPersonName: values?.meetingPersonName,
        clientName: values?.clientName,
        clientPhone: values?.clientPhone?.toString(),
        clientEmail: values?.clientEmail,
        countryCode: values?.countryCode,
        address: values?.address,
        lat: Number(values?.lat) || 0,
        lng: Number(values?.lon) || 0,
        userId: user?.id,
        status: values?.status,
      };
      const reqValue = Object.entries(resData).reduce(
        (acc: any, [key, value]) => {
          if (value) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      const res = await change(`meetings`, {
        body: reqValue,
      });

      setLoading(false);
      if (res?.status !== 201) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Meeting created successfully!`, `success`);
      resetForm();
      user?.role?.name === "CEO" ||
      user?.role?.name === "COO" ||
      user?.role?.name === "DIRECTOR"
        ? router.push("/admin/meetings/all-meetings")
        : router.push("/admin/meetings/my-meetings");
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
    <PanelLayout title="Create Meeting ">
      <section className="md:px-8 px-2 md:py-4 py-2">
        <div className="px-2 md:px-0">
          <AdminBreadcrumbs links={links} />
        </div>
        <section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
          <div className="md:w-[60rem] w-full bg-white md:px-4 py-4 px-2 tracking-wide rounded-lg shadow-xl">
            <p className="text-center text-2xl font-bold text-theme tracking-wide">
              Create Meeting
            </p>
            <div className="w-full my-6 py-6 md:px-20 px-2">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  setFieldTouched,
                }) => (
                  <Form>
                    <div className="grid lg:grid-cols-2">
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="md:py-2 py-1">
                          <InputLabel htmlFor="meetingTitle">
                            Meeting Title{" "}
                            <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          fullWidth
                          size="small"
                          id="meetingTitle"
                          name="meetingTitle"
                          value={values.meetingTitle}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.meetingTitle && !!errors.meetingTitle}
                          helperText={
                            touched.meetingTitle && errors.meetingTitle
                          }
                        />
                      </div>

                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="meetingPurpose">
                            Meeting Purpose{" "}
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          id="meetingPurpose"
                          name="meetingPurpose"
                          value={values.meetingPurpose}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.meetingPurpose && !!errors.meetingPurpose
                          }
                          helperText={
                            touched.meetingPurpose && errors.meetingPurpose
                          }
                        />
                      </div>
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="meetingDate">
                            Meeting Date <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          type="date"
                          id="meetingDate"
                          name="meetingDate"
                          value={values.meetingDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.meetingDate && !!errors.meetingDate}
                          helperText={touched.meetingDate && errors.meetingDate}
                        />
                      </div>

                      <div className="px-4 py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="meetingStartTime">
                            Meeting Start Time{" "}
                            <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>

                        <TextField
                          size="small"
                          fullWidth
                          type="time"
                          id="meetingStartTime"
                          name="meetingStartTime"
                          value={values.meetingStartTime}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.meetingStartTime &&
                            !!errors.meetingStartTime
                          }
                          helperText={
                            touched.meetingStartTime && errors.meetingStartTime
                          }
                        />
                      </div>
                      <div className="px-4 py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="meetingEndTime">
                            Meeting End Time
                          </InputLabel>
                        </div>

                        <TextField
                          size="small"
                          fullWidth
                          type="time"
                          id="meetingEndTime"
                          name="meetingEndTime"
                          value={values.meetingEndTime}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.meetingEndTime && !!errors.meetingEndTime
                          }
                          helperText={
                            touched.meetingEndTime && errors.meetingEndTime
                          }
                        />
                      </div>

                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="meetingPersonName">
                            Meeting Person Name{" "}
                            <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          id="meetingPersonName"
                          name="meetingPersonName"
                          value={values.meetingPersonName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.meetingPersonName &&
                            !!errors.meetingPersonName
                          }
                          helperText={
                            touched.meetingPersonName &&
                            errors.meetingPersonName
                          }
                        />
                      </div>
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="clientName">
                            Client Name <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <Autocomplete
                          fullWidth
                          size="small"
                          id="clientName"
                          options={clients || []}
                          onChange={(
                            e: SyntheticEvent<Element, Event>,
                            r: Client | null
                          ) => {
                            setFieldValue("clientName", r?.name);
                          }}
                          getOptionLabel={(option: any) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Client Name"
                              onBlur={handleBlur}
                              error={touched.clientName && !!errors.clientName}
                              helperText={
                                touched.clientName && errors.clientName
                              }
                            />
                          )}
                        />
                      </div>
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="status">
                            Meeting Status{" "}
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
                              placeholder="status"
                              onBlur={handleBlur}
                              error={touched.status && !!errors.status}
                              helperText={touched.status && errors.status}
                            />
                          )}
                        />
                      </div>

                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="clientPhone">
                            Client Phone
                          </InputLabel>
                        </div>

                        <div className="md:flex grid justify-center gap-2 items-center">
                          <div className=" w-full md:w-1/4 lg:w-32">
                            <CountrySelector
                              className="bg-white border border-gray-400"
                              defaultValue="91"
                              name="countryCode"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.countryCode}
                              error={
                                touched.countryCode && !!errors.countryCode
                              }
                              helperText={
                                touched.countryCode && errors.countryCode
                              }
                            />
                          </div>
                          <TextField
                            size="small"
                            fullWidth
                            type="number"
                            id="clientPhone"
                            name="clientPhone"
                            value={values.clientPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.clientPhone && !!errors.clientPhone}
                            helperText={
                              touched.clientPhone && errors.clientPhone
                            }
                          />
                        </div>
                      </div>
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="clientEmail">
                            Client Email
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          id="clientEmail"
                          name="clientEmail"
                          value={values.clientEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.clientEmail && !!errors.clientEmail}
                          helperText={touched.clientEmail && errors.clientEmail}
                        />
                      </div>
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="address">Address</InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
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
                          <InputLabel htmlFor="lat">
                            Latitude <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          id="lat"
                          name="lat"
                          value={values.lat}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.lat && !!errors.lat}
                          helperText={touched.lat && errors.lat}
                        />
                      </div>
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="lon">
                            Longitude <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          id="lon"
                          name="lon"
                          value={values.lon}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.lon && !!errors.lon}
                          helperText={touched.lon && errors.lon}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center md:py-4 py-2 mt-10">
                      <Button
                        type="submit"
                        variant="contained"
                        className="!bg-theme"
                        disabled={loading}
                        startIcon={
                          loading ? <CircularProgress size={20} /> : <Check />
                        }
                      >
                        CREATE
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </section>
      </section>
    </PanelLayout>
  );
};

export default CreateMeeting;
const links = [
  {
    id: 2,
    page: "Create Meeting",
    link: "/admin/meetings/create-meeting",
  },
];
const Status_Type = [
  {
    id: 1,
    name: "Ongoing",
    value: "Ongoing",
  },
  {
    id: 2,
    name: "InPipeline",
    value: "InPipeline",
  },
  {
    id: 2,
    name: "QuotationSent",
    value: "QuotationSent",
  },
  {
    id: 2,
    name: "Closed",
    value: "Closed",
  },
];
