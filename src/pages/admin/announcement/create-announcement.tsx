import { Campaign, Check, CheckBox } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  InputLabel,
  TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import { Branch, Role } from "types";
import * as Yup from "yup";
const initialValues = {
  title: "",
  message: "",
  announcementStatus: "",
  departmentId: "",
  branchId: "",
  roleId: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required!"),
  message: Yup.string().required("Required!"),
  announcementStatus: Yup.string().required("Required!"),
  branchId: Yup.string().required("Required!"),
});

const CreateAnnouncement = () => {
  // const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { user } = useAuth();
  const [isAnnouncement, setIsAnnouncement] = useState<string>("");
  const { data: departmentsData } = useFetch<Role[]>(`departments`);
  const { data: roleData } = useFetch<Role[]>(`roles`);
  const { data: branchData } = useFetch<Role[]>(`branches`);
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  console.log({ checked });
  const handleChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleSubmit = async (values: any, { resetForm }: any) => {
    console.log(values);
    setLoading(true);
    try {
      if (
        checked === false &&
        values?.departmentId === "" &&
        values?.roleId === ""
      ) {
        Swal.fire(
          "Info",
          "At Least Chose One Department, Role or For All",
          "info"
        );
        setLoading(false);
        return;
      }
      const resData = {
        title: values?.title,
        description: values?.message,
        status: values?.announcementStatus,
        branchId: values?.branchId,
        isAll: checked,
        departmentId: values?.departmentId ? values?.departmentId : undefined,
        roleId: values?.roleId ? values?.roleId : undefined,
      };
      const res = await change(`announcement`, {
        body: resData,
      });

      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Sent successfully!`, `success`);
      resetForm();
      router?.push("/admin/announcement/all-announcements");
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
    <PanelLayout title="Create Announcements">
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
                  <h1 className="text-lg uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
                    Announcements <Campaign className="ml-2" />
                  </h1>
                  <div className="grid lg:grid-cols-1">
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="message">
                          Title <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Title"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                      />
                    </div>
                    {user?.role?.name === "CEO" ||
                    user?.role?.name === "DIRECTOR" ||
                    user?.role?.name === "COO" ? (
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="branchId">
                            Choose Branch{" "}
                            <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <Autocomplete
                          fullWidth
                          size="small"
                          id="branchId"
                          options={branchData || []}
                          onChange={(
                            e: SyntheticEvent<Element, Event>,
                            r: Role | null
                          ) => {
                            setFieldValue(
                              "branchId",
                              user?.role?.name === "CEO" ||
                                user?.role?.name === "DIRECTOR" ||
                                user?.role?.name === "COO"
                                ? r?.id
                                : user?.employeeOfBranchId
                            );
                          }}
                          getOptionLabel={(option) =>
                            option.name ? option?.name : ""
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // label="Department Name"
                              placeholder="Branch Name"
                              onBlur={handleBlur}
                              error={touched.branchId && !!errors.branchId}
                              helperText={touched.branchId && errors.branchId}
                            />
                          )}
                        />
                      </div>
                    ) : null}
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2 flex gap-4 items-center">
                        <Checkbox
                          onChange={handleChangeCheckBox}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                        <InputLabel htmlFor="message">
                          Want to send all
                        </InputLabel>
                      </div>
                    </div>
                    {checked ? null : (
                      <>
                        <div className="md:px-4 px-2 md:py-2 py-1">
                          <div className="py-2">
                            <InputLabel htmlFor="roleId">
                              Choose Role{" "}
                            </InputLabel>
                          </div>
                          <Autocomplete
                            fullWidth
                            size="small"
                            id="roleId"
                            options={roleData || []}
                            onChange={(
                              e: SyntheticEvent<Element, Event>,
                              r: Role | null
                            ) => {
                              setFieldValue("roleId", checked ? "" : r?.id);
                            }}
                            getOptionLabel={(option) =>
                              option.name ? option?.name : ""
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                // label="Department Name"
                                placeholder="Role Name"
                                onBlur={handleBlur}
                                error={touched.roleId && !!errors.roleId}
                                helperText={touched.roleId && errors.roleId}
                              />
                            )}
                          />
                        </div>
                        <div className="md:px-4 px-2 md:py-2 py-1">
                          <div className="py-2">
                            <InputLabel htmlFor="departmentId">
                              Choose Department{" "}
                            </InputLabel>
                          </div>
                          <Autocomplete
                            fullWidth
                            size="small"
                            id="departmentId"
                            options={departmentsData || []}
                            onChange={(
                              e: SyntheticEvent<Element, Event>,
                              r: Role | null
                            ) => {
                              setFieldValue(
                                "departmentId",
                                checked ? "" : r?.id
                              );
                            }}
                            getOptionLabel={(option) =>
                              option.name ? option?.name : ""
                            }
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
                      </>
                    )}
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="announcementStatus">
                          Select Announcement Status{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>

                      <Autocomplete
                        fullWidth
                        size="small"
                        id="announcementStatus"
                        options={Status_Type || []}
                        onChange={(e: any, r: any) => {
                          setFieldValue("announcementStatus", r?.value);
                          setIsAnnouncement(r?.value);
                        }}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Announcement Status"
                            // placeholder="Selected Gender"
                            onBlur={handleBlur}
                            error={
                              touched.announcementStatus &&
                              !!errors.announcementStatus
                            }
                            helperText={
                              touched.announcementStatus &&
                              errors.announcementStatus
                            }
                          />
                        )}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="message">
                          Message <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Message"
                        id="message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.message && !!errors.message}
                        helperText={touched.message && errors.message}
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
                        loading ? (
                          <CircularProgress color="secondary" size={20} />
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

export default CreateAnnouncement;

const links = [
  {
    id: 1,
    page: "Create Announcement",
    link: "/admin/announcement/create-announcement",
  },
];
const Status_Type = [
  {
    id: 1,
    name: "Published",
    value: "Published",
  },
  {
    id: 2,
    name: "Pending",
    value: "Pending",
  },
];
