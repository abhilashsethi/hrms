import { Check } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Branch, Role } from "types";
import * as Yup from "yup";
interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  joiningDate: string | null;
  branchId: string;
  address: string;
  agencyAddress: string;
  agencyName: string;
  shiftId: string;
  roleId: string;
  departmentId: string;
  isAgency?: boolean;
}
type ReqValue = Partial<FormValues>;
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  joiningDate: null,
  branchId: "",
  address: "",
  agencyAddress: "",
  agencyName: "",
  shiftId: "",
  roleId: "",
  departmentId: "",
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
  phoneNumber: Yup.string()
    .required("Required!")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(6)
    .max(15),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  branchId: Yup.string().required("Required!"),
  address: Yup.string().required("Required!"),
  // agencyAddress: Yup.string().required("Required!"),
  // agencyName: Yup.string().required("Required!"),
  joiningDate: Yup.string().required("Required!"),
  shiftId: Yup.string().required("Required!"),
  roleId: Yup.string().required("Required!"),
  departmentId: Yup.string().required("Required!"),
});

const CreateGuard = () => {
  const [loading, setLoading] = useState(false);
  const [isSecurityAgency, setIsSecurityAgency] = useState(true);
  const { data: branchData } = useFetch<Branch[]>(`branches`);
  const { data: roleData } = useFetch<Role[]>(`roles`);
  const { data: departmentsData } = useFetch<Role[]>(`departments`);
  const { data: securityShift } = useFetch<any>(`security/shift`);
  const { change } = useChange();
  const handleOptionChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    const newValue = event.target.value === "YES";
    setIsSecurityAgency(newValue);
    if (!newValue) {
      setFieldValue("agencyName", "");
      setFieldValue("agencyAddress", "");
    }
  };
  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      const formattedJoiningDate = values.joiningDate
        ? new Date(values.joiningDate).toISOString()
        : null;

      // Create the request object with the formatted date

      const reqValue: ReqValue = Object.entries(values).reduce(
        (acc, [key, value]) => {
          if (value) {
            // Special handling for joiningDate
            if (key === "joiningDate") {
              acc[key] = formattedJoiningDate;
            } else {
              acc[key as keyof FormValues] = value;
            }
          }
          return acc;
        },
        {} as ReqValue
      );

      if (isSecurityAgency) {
        if (!values.agencyName || !values.agencyAddress) {
          Swal.fire("Required!", "Agency details are required", "info");
          setLoading(false);
          return;
        }

        reqValue.isAgency = true;
        reqValue.agencyName = values.agencyName;
        reqValue.agencyAddress = values.agencyAddress;
      } else {
        reqValue.isAgency = false;
      }

      const res = await change(`security`, {
        body: reqValue,
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(
        `Success!`,
        `${res?.results?.msg || `Security Created Successfully`}`,
        `success`
      );
      router?.push("/admin/employees/all-employees");
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PanelLayout title="Create Guard - Admin Panel">
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
                    Create Guard
                  </h1>
                  <div className="grid lg:grid-cols-2">
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:py-2 py-1">
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
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:py-2 py-1">
                        <InputLabel htmlFor="lastName">
                          Last Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="lastName"
                        placeholder="LastName"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && !!errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="email">
                          Personal Email <span className="text-red-600">*</span>
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
                        <InputLabel htmlFor="joiningDate">
                          Joining Date <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="date"
                        id="joiningDate"
                        name="joiningDate"
                        value={values.joiningDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.joiningDate && !!errors.joiningDate}
                        helperText={touched.joiningDate && errors.joiningDate}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="branchId">
                          Branch <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>

                      <Autocomplete
                        fullWidth
                        size="small"
                        id="branchId"
                        options={branchData || []}
                        onChange={(
                          e: React.ChangeEvent<{}>,
                          r: Branch | null
                        ) => {
                          setFieldValue("branchId", r?.id || "");
                        }}
                        getOptionLabel={(option: Branch) => option.name || ""} // Ensure a string is always returned
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Role"
                            placeholder="Branch"
                            onBlur={handleBlur}
                            error={touched.branchId && !!errors.branchId}
                            helperText={touched.branchId && errors.branchId}
                          />
                        )}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="departmentId">
                          Department Name{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="departmentId"
                        options={departmentsData || []}
                        onChange={(e: ChangeEvent<{}>, r: Role | null) => {
                          setFieldValue("departmentId", r?.id || "");
                        }}
                        getOptionLabel={(option: Role) => option.name || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Department Name"
                            placeholder="Department Name"
                            onBlur={handleBlur}
                            error={
                              touched.departmentId && !!errors.departmentId
                            }
                            helperText={
                              touched.departmentId && errors.departmentId
                            }
                          />
                        )}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="role">
                          Role <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>

                      <Autocomplete
                        fullWidth
                        size="small"
                        id="roleId"
                        options={roleData || []}
                        onChange={(e: ChangeEvent<{}>, r: Role | null) => {
                          setFieldValue("roleId", r?.id || "");
                        }}
                        getOptionLabel={(option: Role) => option.name || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Role"
                            placeholder="Role"
                            onBlur={handleBlur}
                            error={touched.roleId && !!errors.roleId}
                            helperText={touched.roleId && errors.roleId}
                          />
                        )}
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
                        <InputLabel htmlFor="phoneNumber">
                          Phone <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Phone"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phoneNumber && !!errors.phoneNumber}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                    </div>

                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="shift">
                          Shift <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>

                      <Autocomplete
                        fullWidth
                        size="small"
                        id="shiftId"
                        options={securityShift || []}
                        onChange={(e: any, r: any) => {
                          setFieldValue("shiftId", r?.id);
                        }}
                        getOptionLabel={(option: any) => option.type}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="shiftId"
                            onBlur={handleBlur}
                            error={touched.shiftId && !!errors.shiftId}
                            helperText={touched.shiftId && errors.shiftId}
                          />
                        )}
                      />
                    </div>

                    <div className="my-3 px-4">
                      <p className="text-gray-500">
                        Security Agency
                        <span className="text-red-600">*</span>
                      </p>
                      <RadioGroup
                        defaultValue={isSecurityAgency ? "YES" : "NO"}
                        row
                        name="isSecurityAgency"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleOptionChange(e, setFieldValue)
                        }
                      >
                        <FormControlLabel
                          value="YES"
                          control={<Radio />}
                          label="YES"
                        />
                        <FormControlLabel
                          value="NO"
                          control={<Radio />}
                          label="NO"
                        />
                      </RadioGroup>
                      {isSecurityAgency ? (
                        <>
                          <div className="md:px-4 px-2 md:py-2 py-1">
                            <div className="py-2">
                              <InputLabel htmlFor="agencyName">
                                Agency Name{" "}
                                <span className="text-red-600">*</span>
                              </InputLabel>
                            </div>
                            <TextField
                              size="small"
                              fullWidth
                              placeholder="Agency"
                              id="agencyName"
                              name="agencyName"
                              value={values.agencyName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.agencyName && !!errors.agencyName}
                              helperText={
                                touched.agencyName && errors.agencyName
                              }
                            />
                          </div>
                          <div className="md:px-4 px-2 md:py-2 py-1">
                            <div className="py-2">
                              <InputLabel htmlFor="agencyAddress">
                                Agency Address{" "}
                                <span className="text-red-600">*</span>
                              </InputLabel>
                            </div>
                            <TextField
                              size="small"
                              fullWidth
                              multiline
                              rows={3}
                              placeholder="Address"
                              id="agencyAddress"
                              name="agencyAddress"
                              value={values.agencyAddress}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.agencyAddress && !!errors.agencyAddress
                              }
                              helperText={
                                touched.agencyAddress && errors.agencyAddress
                              }
                            />
                          </div>
                        </>
                      ) : null}
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

export default CreateGuard;

const links = [
  { id: 1, page: "Security", link: "/admin/security" },
  { id: 2, page: "Create Guard", link: "/admin/security/create-guard" },
];
const Shift_Type = [
  {
    id: 1,
    name: "First Shift",
    value: "first",
  },
  {
    id: 2,
    name: "Second Shift",
    value: "second",
  },
  {
    id: 3,
    name: "Night Shift",
    value: "night",
  },
];
