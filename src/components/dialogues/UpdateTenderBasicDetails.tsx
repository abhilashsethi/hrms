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
  tenderData?: any;
}

const UpdateTenderBasicDetails = ({ open, handleClose, mutate, tenderData }: Props) => {
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
    tenderData?: any;
  }>({ dialogue: false, tenderData: null });
  const [isUpload, setIsUpload] = useState<{
    dialogue?: boolean;
    tenderData?: any;
  }>({ dialogue: false, tenderData: null });
  const initialValues = {
    branchId: `${tenderData?.assetOfBranch?.id ? tenderData?.assetOfBranch?.id : ""}`,
    assetType: `${tenderData?.assetType ? tenderData?.assetType : ""}`,
    assetName: `${tenderData?.name ? tenderData?.name : ""}`,
    modelNo: `${tenderData?.modelName ? tenderData?.modelName : ""}`,
    purchaseDate: `${tenderData?.dateOfPurchase
      ? moment(tenderData?.dateOfPurchase).format("YYYY-MM-DD")
      : ""
      }`,

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
    billAmount: Yup.number().required("Bill amount is required!"),

    serialNo: Yup.string().required("Serial No. is required!"),
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`assets/${tenderData?.id}`, {
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
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
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
            UPDATE TENDER
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
                          Date Of Purchase <span className="text-red-600">*</span>
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

        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTenderBasicDetails;
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