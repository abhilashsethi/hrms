import { Check, Close, CloudUpload } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { ErrorMessage, useFormik } from "formik";
import * as yup from "yup";
import { useRef, useState } from "react";
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";
import { countries } from "schemas/Countries";
import UpdateBranchImage from "./UpdateBranchImage";
import { deleteFile } from "utils";

interface Props {
  open: any;
  handleClose: any;
  mutate?: any;
  branchData?: any;
}

const UpdateBranch = ({
  open,
  handleClose,
  mutate,
  branchData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { change } = useChange();
  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    imageData?: string | null;
  }>({ dialogue: false, imageData: null });

  const { data: userData } = useFetch<any>(`users`);
  const formik = useFormik({
    initialValues: {
      name: `${branchData?.name ? branchData?.name : ""}`,
      email: `${branchData?.email ? branchData?.email : ""}`,
      phone: `${branchData?.phone ? branchData?.phone : ""}`,
      country: `${branchData?.country ? branchData?.country : ""}`,
      location: `${branchData?.location ? branchData?.location : ""}`,
      managerId: `${branchData?.managerId ? branchData?.managerId : ""}`,
      photos: branchData?.photos ? branchData?.photos : [],
    },
    enableReinitialize: true,
    validationSchema: yup.object({ name: yup.string().required("Required!") }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await change(`branches/${branchData?.id}`, {
          method: "PATCH",
          body: values,
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
        mutate();
        handleClose();
        Swal.fire(`Success`, `Updated Successfully!`, `success`);
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });
  const handleDelete = async (data: any, branchData: any) => {
    console.log(data);
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
          const updatedPhotos = branchData?.photos.filter((photo: any) => photo !== data);
          const updatedBranchData = {
            ...branchData,
            photos: updatedPhotos
          };
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
          handleClose()
          return;
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  console.log(branchData);
  return (
    <>
      <UpdateBranchImage
        imageData={isUpdate?.imageData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
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
          <div className="md:w-[50rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
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
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.userId
                      }
                      value={
                        formik.values?.managerId
                          ? userData?.find(
                            (option: any) => option.id === formik.values.managerId
                          )
                          : {}
                      }
                      onChange={(e: any, r: any) => {
                        formik.setFieldValue("managerId", r?.id);
                      }}
                      renderOption={(props, option) => (
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
                          error={formik.touched.managerId && !!formik.errors.managerId}
                          helperText={formik.touched.managerId && formik.errors.managerId}
                        />
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-theme font-semibold">
                      Phone
                    </p>
                    <TextField
                      size="small"
                      fullWidth
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
                    <p className="text-theme font-semibold">
                      Email
                    </p>
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
                    <p className="text-theme font-semibold">
                      Location
                    </p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Enter Location"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.location && !!formik.errors.location}
                      helperText={formik.touched.location && formik.errors.location}
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
                            formik.touched?.country && Boolean(formik.errors?.country)
                          }
                          onBlur={formik.handleBlur}
                          helperText={formik.touched?.country && formik.errors?.country}
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
                  startIcon={loading ? <CircularProgress size={20} /> : <Check />}
                >
                  UPDATE BRANCH
                </Button>
              </form>
              <div className="grid lg:grid-cols-2 gap-4 py-4">
                {branchData?.photos?.map((data: any, k: any) => (
                  <div key={k} className="px-2 py-2 shadow-lg bg-slate-200 rounded-lg">
                    <img className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                      src={data} alt="Branch" />
                    <div className="flex justify-between gap-1 pt-4 pb-2">
                      <button onClick={() => {
                        setIsUpdate({ dialogue: true, imageData: data });
                      }} className="bg-theme hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded">Edit</button>
                      <button onClick={() => handleDelete(data, branchData)} className="bg-red-600 hover:bg-red-700 px-4 py-1 text-white font-semibold rounded">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateBranch;
