import { Check, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { useChange, useFetch } from "hooks";
import { useRef, useState } from "react";
import { countries } from "schemas/Countries";
import Swal from "sweetalert2";
import { deleteFile } from "utils";
import * as yup from "yup";
import UpdateBranchImage from "./UpdateBranchImage";
import UploadBranchImage from "./UploadBranchImage";
import { Branch, User } from "types";
import CountrySelector from "components/core/CountrySelector";

interface Props {
  open: boolean;
  handleClose: () => void;
  MainMutate: () => void;
  branchId?: string;
}

const UpdateBranch = ({ open, handleClose, MainMutate, branchId }: Props) => {
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { change } = useChange();
  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    imageData?: string | null;
  }>({ dialogue: false, imageData: null });
  const [isUpload, setIsUpload] = useState<{
    dialogue?: boolean;
    branchData?: any;
  }>({ dialogue: false, branchData: null });
  const { data: branchData, mutate } = useFetch<any>(`branches/${branchId}`);
  const { data: userData } = useFetch<User[]>(`users`);
  const formik = useFormik({
    initialValues: {
      name: `${branchData?.name ? branchData?.name : ""}`,
      email: `${branchData?.email ? branchData?.email : ""}`,
      phone: `${branchData?.phone ? branchData?.phone : 0}`,
      country: `${branchData?.country ? branchData?.country : ""}`,
      countryCode: `${branchData?.countryCode ? branchData?.countryCode : ""}`,
      location: `${branchData?.location ? branchData?.location : ""}`,
      managerId: `${branchData?.managerId ? branchData?.managerId : ""}`,
      photos: branchData?.photos ? branchData?.photos : [],
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      country: yup.string().required("Country Name is required!"),
      location: yup.string().required("Location is required!"),
      managerId: yup.string().required("Manager is required!"),
      name: yup
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .required("Name is required!"),
      phone: yup
        .string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        )
        .min(6)
        .max(15),
      email: yup.string().email("Invalid email address"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const reqValue = Object.entries(values).reduce(
          (acc: any, [key, value]) => {
            if (key !== "link" && value) {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );
        const res = await change(`branches/${branchData?.id}`, {
          method: "PATCH",
          body: {
            name: values?.name,
            email: values?.email ? values?.email : null,
            phone: values?.phone ? values?.phone : null,
            countryCode: values?.countryCode,
            country: values?.country,
            location: values?.location,
            managerId: values?.managerId,
            photos: values?.photos,
          },
        });
        setLoading(false);
        if (res?.status !== 200) {
          Swal.fire(
            "Error",
            res?.results?.msg || "Something went wrong!",
            "error"
          );
          setLoading(false);
          return;
        }
        MainMutate();
        handleClose();
        Swal.fire(`Success`, `Updated Successfully!`, `success`);
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
    },
  });
  const handleDelete = async (data: any, branchData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire("", "Please Wait...", "info");
          await deleteFile(String(data?.split("/").reverse()[0]));
          const updatedPhotos = branchData?.photos.filter(
            (photo: any) => photo !== data
          );

          const res = await change(`branches/${branchData?.id}`, {
            method: "PATCH",
            body: { photos: updatedPhotos },
          });
          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            return;
          }
          Swal.fire(`Success`, `Deleted Successfully!`, `success`);
          mutate();
          return;
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
        }
      }
    });
  };
  return (
    <>
      <UpdateBranchImage
        imageData={isUpdate?.imageData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
        MainMutate={MainMutate}
      />
      <UploadBranchImage
        branchData={isUpload?.branchData}
        open={isUpload?.dialogue}
        handleClose={() => setIsUpload({ dialogue: false })}
        MainMutate={MainMutate}
        mutate={mutate}
      />
      <Dialog
        onClose={handleClose}
        maxWidth="lg"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">
          <p className="text-center text-md font-bold text-theme te tracking-wide">
            UPDATE
          </p>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              top: 10,
              right: 10,
              position: "absolute",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Tooltip title="Close">
              <Close />
            </Tooltip>
          </IconButton>
        </DialogTitle>
        <DialogContent className="app-scrollbar" sx={{ p: 3 }}>
          <div className="md:w-[50rem]  tracking-wide flex flex-col gap-3 text-sm py-4">
            <div className="flex flex-col items-center w-full">
              <form onSubmit={formik.handleSubmit} className="w-full">
                <div className="grid lg:grid-cols-2 gap-4 pb-4">
                  <div className="w-full">
                    <p className="text-theme font-semibold">
                      Branch Name <span className="text-red-600">*</span>
                    </p>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Enter Branch Name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && !!formik.errors.name}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">
                      Assign Manager <span className="text-red-600">*</span>
                    </p>
                    <Autocomplete
                      fullWidth
                      size="small"
                      id="managerId"
                      options={userData || []}
                      getOptionLabel={(option: any) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option: any, value: any) =>
                        option.id === value.userId
                      }
                      value={
                        formik.values?.managerId
                          ? userData?.find(
                              (option: any) =>
                                option.id === formik.values.managerId
                            )
                          : {}
                      }
                      onChange={(e: any, r: any) => {
                        formik.setFieldValue("managerId", r?.id);
                      }}
                      renderOption={(props, option: any) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.name}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Manager Name"
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.managerId &&
                            !!formik.errors.managerId
                          }
                          helperText={
                            formik.touched.managerId && formik.errors.managerId
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">Country Code</p>
                    <CountrySelector
                      className="bg-white border border-gray-400"
                      defaultValue="91"
                      name="countryCode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.countryCode}
                      error={
                        formik.touched.countryCode &&
                        !!formik.errors.countryCode
                      }
                      helperText={
                        formik.touched.countryCode && formik.errors.countryCode
                      }
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">Phone</p>

                    <TextField
                      size="small"
                      fullWidth
                      type="number"
                      placeholder="Phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.phone && !!formik.errors.phone}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">Email</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && !!formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">Location</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Enter Location"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.location && !!formik.errors.location
                      }
                      helperText={
                        formik.touched.location && formik.errors.location
                      }
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">
                      Country <span className="text-red-600">*</span>
                    </p>
                    <Autocomplete
                      size="small"
                      options={countries}
                      autoHighlight
                      value={formik.values?.country as any}
                      fullWidth
                      onChange={(e, r: any) =>
                        formik.setFieldValue("country", r?.label)
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
                            formik.touched?.country &&
                            Boolean(formik.errors?.country)
                          }
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.touched?.country && formik.errors?.country
                          }
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="!bg-emerald-500"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Check />
                  }
                >
                  UPDATE DETAILS
                </Button>
              </form>
              {branchData?.photos?.length ? (
                <>
                  <div className="w-full">
                    <div className="flex justify-end pt-4 gap-2">
                      <button
                        onClick={() =>
                          setIsUpload({
                            dialogue: true,
                            branchData: branchData,
                          })
                        }
                        className="bg-theme-500 hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded"
                      >
                        Add More Images
                      </button>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-4 py-4">
                    {branchData?.photos?.map((data: any, k: any) => (
                      <div
                        key={k}
                        className="px-2 py-2 shadow-lg bg-slate-200 rounded-lg"
                      >
                        <img
                          className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                          src={data}
                          alt="Branch"
                        />
                        <div className="flex justify-between gap-1 pt-4 pb-2">
                          <button
                            onClick={() => {
                              setIsUpdate({ dialogue: true, imageData: data });
                            }}
                            className="bg-theme hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(data, branchData)}
                            className="bg-red-600 hover:bg-red-700 px-4 py-1 text-white font-semibold rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center justify-items-center pt-4 gap-2">
                    <p>No Image Available</p>
                    <button
                      onClick={() =>
                        setIsUpload({ dialogue: true, branchData: branchData })
                      }
                      className="bg-theme-500 hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded"
                    >
                      Add Images
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateBranch;
