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
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";
import moment from "moment";
import { PDF } from "assets/home";
import UpdateAssetImage from "./UpdateAssetImage";
import UploadAssetImage from "./UploadAssetImage";
import { HeadText } from "components/core";
import { deleteFile } from "utils";
import UploadAssetDoc from "./UploadAssetDoc";
import UpdateAssetDoc from "./UpdateAssetDoc";

interface Props {
  open: any;
  handleClose: any;
  mutate?: any;
  assetData?: any;
}

const UpdateAssets = ({ open, handleClose, mutate, assetData }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: branchData } = useFetch<any>(`branches`);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { change } = useChange();
  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    imageData?: string | null;
  }>({ dialogue: false, imageData: null });
  const [isDocUpdate, setIsDocUpdate] = useState<{
    dialogue?: boolean;
    docData?: string | null;
  }>({ dialogue: false, docData: null });
  const [isDocUpload, setIsDocUpload] = useState<{
    dialogue?: boolean;
    assetData?: any;
  }>({ dialogue: false, assetData: null });
  const [isUpload, setIsUpload] = useState<{
    dialogue?: boolean;
    assetData?: any;
  }>({ dialogue: false, assetData: null });
  const initialValues = {
    branchId: `${
      assetData?.assetOfBranch?.id ? assetData?.assetOfBranch?.id : ""
    }`,
    assetType: `${assetData?.assetType ? assetData?.assetType : ""}`,
    assetName: `${assetData?.name ? assetData?.name : ""}`,
    modelNo: `${assetData?.modelName ? assetData?.modelName : ""}`,
    purchaseDate: `${
      assetData?.dateOfPurchase
        ? moment(assetData?.dateOfPurchase).format("YYYY-MM-DD")
        : ""
    }`,
    billAmount: `${assetData?.billAmount ? assetData?.billAmount : ""}`,
    brandName: `${assetData?.brandName ? assetData?.brandName : ""}`,
    marketPrice: `${assetData?.marketPrice ? assetData?.marketPrice : ""}`,
    serialNo: `${assetData?.serialNumber ? assetData?.serialNumber : ""}`,
    uploadDoc: assetData?.doc ? assetData?.doc : [],
    images: assetData?.photos ? assetData?.photos : [],
  };

  const validationSchema = Yup.object().shape({
    assetName: Yup.string()
      .matches(
        /^[A-Za-z ]+$/,
        "Asset Name must only contain alphabetic characters"
      )
      .min(2, "Asset Name must be at least 2 characters")
      .max(50, "Asset Name must be less than 50 characters")
      .required("Asset Name is required!"),
    modelNo: Yup.string().required("Model No is required!"),
    purchaseDate: Yup.string().required("Purchase date is required!"),
    billAmount: Yup.number()
      .required("Bill amount is required!")
      .moreThan(0, "Bill amount be greater than zero"),

    serialNo: Yup.string().required("Serial No. is required!"),
    marketPrice: Yup.number().moreThan(0, "Market Price be greater than zero"),
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`assets/${assetData?.id}`, {
        method: "PATCH",
        body: {
          branchId: values?.branchId,
          name: values?.assetName,
          assetType: values?.assetType,
          dateOfPurchase: new Date(values?.purchaseDate).toISOString(),
          billAmount: Number(values?.billAmount),
          brandName: values?.brandName,
          marketPrice: Number(values?.marketPrice),
          modelName: values?.modelNo,
          serialNumber: values?.serialNo,
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
      mutate();
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
  };
  const handleDelete = async (data: any, assetData: any) => {
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
          const updatedPhotos = assetData?.photos.filter(
            (photo: any) => photo !== data
          );
          const res = await change(`assets/${assetData?.id}`, {
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
          handleClose();
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
  const handleDeleteDoc = async (data: any, assetData: any) => {
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
          await deleteFile(String(data?.link?.split("/").reverse()[0]));
          const updatedDocs = assetData?.docs.filter(
            (doc: any) => doc?.link !== data?.link
          );
          const res = await change(`assets/${assetData?.id}`, {
            method: "PATCH",
            body: { docs: updatedDocs },
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
          handleClose();
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
      <UpdateAssetImage
        imageData={isUpdate?.imageData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <UpdateAssetDoc
        docData={isDocUpdate?.docData}
        open={isDocUpdate?.dialogue}
        handleCloseUpdateDoc={() => setIsDocUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <UploadAssetDoc
        assetData={isDocUpload?.assetData}
        open={isDocUpload?.dialogue}
        handleClose={handleClose}
        handleCloseUpload={() => setIsDocUpload({ dialogue: false })}
        mutate={mutate}
      />
      <UploadAssetImage
        assetData={isUpload?.assetData}
        open={isUpload?.dialogue}
        handleClose={handleClose}
        handleCloseUpload={() => setIsUpload({ dialogue: false })}
        mutate={mutate}
      />
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
            UPDATE ASSET
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
          <div className="md:px-4 px-2 tracking-wide">
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
                  <div className="grid lg:grid-cols-2">
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="role">
                          Select Asset Type{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        name="assetType"
                        placeholder="Asset Type"
                        value={values.assetType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.assetType && !!errors.assetType}
                        helperText={touched.assetType && errors.assetType}
                      >
                        {assetTypeArr.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:py-2 py-1">
                        <InputLabel htmlFor="name">
                          Choose Branch<span className="text-red-500">*</span>
                        </InputLabel>
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="branchId"
                        options={branchData || []}
                        getOptionLabel={(option: any) =>
                          option.name ? option.name : ""
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.userId
                        }
                        value={
                          values?.branchId
                            ? branchData?.find(
                                (option: any) => option.id === values.branchId
                              )
                            : {}
                        }
                        onChange={(e: any, r: any) => {
                          setFieldValue("branchId", r?.id);
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
                            placeholder="Branch Name"
                            onBlur={handleBlur}
                            error={touched.branchId && !!errors.branchId}
                            helperText={touched.branchId && errors.branchId}
                          />
                        )}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:py-2 py-1">
                        <InputLabel htmlFor="assetName">
                          Asset Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="assetName"
                        // placeholder="Name"
                        name="assetName"
                        value={values.assetName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.assetName && !!errors.assetName}
                        helperText={touched.assetName && errors.assetName}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="modelNo">
                          Model No. <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Email"
                        id="modelNo"
                        name="modelNo"
                        value={values.modelNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.modelNo && !!errors.modelNo}
                        helperText={touched.modelNo && errors.modelNo}
                      />
                    </div>

                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="purchaseDate">
                          Date Of Purchase{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="date"
                        // placeholder="Employee ID"
                        id="purchaseDate"
                        name="purchaseDate"
                        value={values.purchaseDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.purchaseDate && !!errors.purchaseDate}
                        helperText={touched.purchaseDate && errors.purchaseDate}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="billAmount">
                          Bill Amount<span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        onChange={(e) => {
                          // Allow only numeric input
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          handleChange({
                            target: {
                              name: "billAmount",
                              value,
                            },
                          });
                        }}
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                          onPaste: (e) => {
                            // Prevent paste action
                            e.preventDefault();
                          },
                        }}
                        // placeholder="Phone"
                        id="billAmount"
                        name="billAmount"
                        value={values.billAmount}
                        onBlur={handleBlur}
                        error={touched.billAmount && !!errors.billAmount}
                        helperText={touched.billAmount && errors.billAmount}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="brandName">Brand Name</InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Phone"
                        id="brandName"
                        name="brandName"
                        value={values.brandName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.brandName && !!errors.brandName}
                        helperText={touched.brandName && errors.brandName}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="marketPrice">
                          Current Market Price
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Phone"
                        id="marketPrice"
                        name="marketPrice"
                        value={values.marketPrice}
                        onChange={(e) => {
                          // Allow only numeric input
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          handleChange({
                            target: {
                              name: "marketPrice",
                              value,
                            },
                          });
                        }}
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                          onPaste: (e) => {
                            // Prevent paste action
                            e.preventDefault();
                          },
                        }}
                        onBlur={handleBlur}
                        error={touched.marketPrice && !!errors.marketPrice}
                        helperText={touched.marketPrice && errors.marketPrice}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="serialNo">
                          Serial No<span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Phone"
                        id="serialNo"
                        name="serialNo"
                        value={values.serialNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.serialNo && !!errors.serialNo}
                        helperText={touched.serialNo && errors.serialNo}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center md:py-4 py-2">
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      className="!bg-green-500"
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
          {assetData?.docs?.length ? (
            <>
              <div className="w-full">
                <div className="flex justify-between pt-4 gap-2">
                  <HeadText title="Documents" />
                  <button
                    onClick={() =>
                      setIsDocUpload({ dialogue: true, assetData: assetData })
                    }
                    className="bg-theme-500 hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded"
                  >
                    Add More Document
                  </button>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4 py-4">
                {assetData?.docs?.map((data: any, k: any) => (
                  <div
                    key={k}
                    className="px-2 py-2 shadow-lg bg-slate-200 rounded-lg"
                  >
                    <a href={data?.link}>
                      <img src={PDF.src} alt="" />
                    </a>
                    <div className="flex justify-between gap-1 pt-4 pb-2">
                      <button
                        onClick={() => {
                          setIsDocUpdate({ dialogue: true, docData: data });
                        }}
                        className="bg-theme hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDoc(data, assetData)}
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
              <HeadText title="Documents" />
              <div className="w-full py-4">
                <div className="grid justify-center justify-items-center pt-4 gap-2">
                  <p>No Document Available</p>
                  <button
                    onClick={() =>
                      setIsDocUpload({ dialogue: true, assetData: assetData })
                    }
                    className="bg-theme-500 hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded"
                  >
                    Add Documents
                  </button>
                </div>
              </div>
            </>
          )}
          {assetData?.photos?.length ? (
            <>
              <div className="w-full">
                <div className="flex justify-between pt-4 gap-2">
                  <HeadText title="Images" />
                  <button
                    onClick={() =>
                      setIsUpload({ dialogue: true, assetData: assetData })
                    }
                    className="bg-theme-500 hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded"
                  >
                    Add More Images
                  </button>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4 py-4">
                {assetData?.photos?.map((data: any, k: any) => (
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
                        onClick={() => handleDelete(data, assetData)}
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
              <HeadText title="Images" />
              <div className="w-full py-4">
                <div className="grid justify-center justify-items-center pt-4 gap-2">
                  <p>No Image Available</p>
                  <button
                    onClick={() =>
                      setIsUpload({ dialogue: true, assetData: assetData })
                    }
                    className="bg-theme-500 hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded"
                  >
                    Add Images
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateAssets;
const assetTypeArr = [
  {
    id: 1,
    value: "Laptop",
    name: "Laptop",
  },
  {
    id: 2,
    value: "Mouse",
    name: "Mouse",
  },
  {
    id: 3,
    value: "KeyBoard",
    name: "Key Board",
  },
  {
    id: 4,
    value: "Monitor",
    name: "Monitor",
  },
  {
    id: 5,
    value: "Other",
    name: "Other",
  },
];
