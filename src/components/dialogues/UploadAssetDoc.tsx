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
import { PDF } from "assets/home";

interface Props {
  open: any;
  handleCloseUpload: any;
  handleClose: any;
  mutate?: any;
  assetData?: any;
}

const UploadAssetDoc = ({
  open,
  handleClose,
  handleCloseUpload,
  mutate,
  assetData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const docsRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const initialValues = {
    uploadDoc: [],
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const docsUrls = [];
      for (const docLink of values?.uploadDoc) {
        const url = await uploadFile(
          docLink?.file,
          `${Date.now()}.${docLink?.uniId}`
        );
        docsUrls.push({ link: url, docType: docLink?.uniId });
      }
      const newDocArray = [...assetData?.docs, ...docsUrls];
      const res: any = await change(`assets/${assetData?.id}`, {
        method: "PATCH",
        body: { docs: newDocArray },
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
      console.log(error);
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
          UPLOAD DOCUMENT
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
                  <div
                    onClick={() => docsRef?.current?.click()}
                    className="min-h-[8rem] py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
                  >
                    <input
                      className="hidden"
                      ref={docsRef}
                      type="file"
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
                        setFieldValue("uploadDoc", fileObjects);
                      }}
                    />
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      {values.uploadDoc.map((image: any, index: any) => (
                        <div className="" key={index}>
                          <img
                            className="w-20 object-contain"
                            src={PDF.src}
                            alt={`Image ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <p>Upload Docs</p>
                    <CloudUpload fontSize="large" color="primary" />
                    <ErrorMessage
                      name="uploadDoc"
                      component="div"
                      className="error"
                    />
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

export default UploadAssetDoc;
