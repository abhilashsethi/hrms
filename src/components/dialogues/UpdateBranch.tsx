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
import { Role } from "types";
import { countries } from "schemas/Countries";

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
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "18rem !important" }}
      >
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          UPDATE BRANCH
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
      <DialogContent className="app-scrollbar" sx={{ p: 2 }}>
        <div className="md:w-[22rem] w-[72vw] md:px-4 px-2 tracking-wide">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
            {/* ----------------------------multiple image component------------------ */}
            <div className="md:px-4 px-2 md:py-2 py-1">
              <div className="py-2">
                <InputLabel htmlFor="image">
                  Update Images
                </InputLabel>
              </div>
              <div
                onClick={() => imageRef?.current?.click()}
                className="min-h-[8rem] py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
              >
                <input
                  className="hidden"
                  ref={imageRef}
                  type="file"
                  multiple
                  onChange={(event: any) => {
                    const files = Array.from(event.target.files);
                    const fileObjects = files.map((file: any) => {
                      const uniId = file.type.split("/")[1].split("+")[0]; // Get unique ID of the image
                      const imageURL = URL.createObjectURL(file); // Get the image URL
                      return {
                        file,
                        previewURL: imageURL,
                        uniId, // Add unique ID to the file object
                        imageURL, // Add the image URL to the file object
                      };
                    });
                    // const fileObjects = files.map((file: any) => ({
                    //   file,
                    //   previewURL: URL.createObjectURL(file),
                    // }));
                    formik.setFieldValue("photos", fileObjects);
                  }}
                />
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  {formik.values.photos.map((image: any, index: any) => (
                    <div className="" key={index}>
                      <img
                        className="w-40 object-contain"
                        src={image.previewURL}
                        alt={`Image ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <p>Upload Images</p>
                <CloudUpload fontSize="large" color="primary" />
                <ErrorMessage
                  name="photos"
                  component="div"
                  className="error"
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBranch;
