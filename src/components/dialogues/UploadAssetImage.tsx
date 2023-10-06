import { Check, Close, CloudUpload } from "@mui/icons-material";
import {
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
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { useRef, useState } from "react";
import { useChange } from "hooks";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import router from "next/router";

interface Props {
  open: any;
  handleCloseUpload: any;
  handleClose: any;
  mutate?: any;
  assetData?: any;
}

const UploadAssetImage = ({
  open,
  handleClose,
  handleCloseUpload,
  mutate,
  assetData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const initialValues = {
    photos: [],
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const photoUrls = [];
      for (const photo of values?.photos) {
        const url = await uploadFile(
          photo?.file,
          `${Date.now()}.${photo?.uniId}`
        );
        photoUrls.push(url);
      }
      const newPhotoArray = [...assetData?.photos, ...photoUrls];
      const res: any = await change(`assets/${assetData?.id}`, {
        method: "PATCH",
        body: { photos: newPhotoArray },
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
      handleCloseUpload();
      handleClose();
      // router?.push("/admin/branch/all-branch");
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
  };
  return (
    <Dialog
      onClose={handleCloseUpload}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "18rem !important" }}
      >
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          UPLOAD IMAGE
        </p>
        <IconButton
          aria-label="close"
          onClick={handleCloseUpload}
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
          <Formik
            initialValues={initialValues}
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
                <div className="flex flex-col gap-4">
                  {/* ----------------------------multiple image component------------------ */}
                  <div className="md:px-4 px-2 md:py-2 py-1">
                    <div className="py-2">
                      <InputLabel htmlFor="image">Upload Images</InputLabel>
                    </div>
                    <div
                      onClick={() => imageRef?.current?.click()}
                      className="min-h-[8rem] py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
                    >
                      <input
                        className="hidden"
                        ref={imageRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event: any) => {
                          const files = Array.from(event.target.files);
                          const fileObjects = files.map((file: any) => {
                            const uniId = file.type.split("/")[1].split("+")[0]; // Get unique ID of the image
                            return {
                              file,
                              previewURL: URL.createObjectURL(file),
                              uniId, // Add unique ID to the file object
                            };
                          });
                          setFieldValue("photos", fileObjects);
                        }}
                      />
                      <div className="flex justify-center items-center gap-2 flex-wrap">
                        {values.photos.map((image: any, index) => (
                          <div className="" key={index}>
                            <img
                              className="w-20 object-contain"
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
                    className={`${loading ? "!bg-gray-300" : "bg-theme"}`}
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="secondary" />
                      ) : (
                        <Check />
                      )
                    }
                  >
                    UPDATE
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadAssetImage;
