import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { Formik, Form, FieldArray, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Check, Close, CloudUpload } from "@mui/icons-material";
import Swal from "sweetalert2";
import moment from "moment";
import { useRef, useState } from "react";

interface Props {
  open: any;
  handleClose: any;
  mutate?: any;
  assetData?: any;
}
const initialValues = {
  images: [],
  returnDate: "",
  returnTime: "",
  remark: "",
  checklist: [],
};

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "Please upload at least one image"),
  returnDate: Yup.string().required("Assigned Date is required!"),
  returnTime: Yup.string().required("Assigned Date is required!"),
  remark: Yup.string().required("remark is required!"),
  // checklist: Yup.array().min(1, "Select at least one item from the checklist"),
});

const ReturnAsset = ({ open, handleClose, mutate, assetData }: Props) => {
  const [checkedList, setCheckedList] = useState<String>("");
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  const handleCheck = (item: { label: string }) => {
    // if (checkedList.includes(item?.label)) {
    // 	setCheckedList(checkedList.filter((id) => id !== item?.label));
    // } else {
    // 	setCheckedList( item?.label);
    // }
    setCheckedList(item?.label);
  };
  console.log(checkedList);
  return (
    <>
      <Dialog
        onClose={handleClose}
        maxWidth="lg"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">
          <p className="text-center text-md font-bold text-theme te tracking-wide">
            RETURN ASSET
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
                          <InputLabel htmlFor="returnDate">
                            Date Of Return{" "}
                            <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          type="date"
                          id="returnDate"
                          name="returnDate"
                          value={values.returnDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.returnDate && !!errors.returnDate}
                          helperText={touched.returnDate && errors.returnDate}
                        />
                      </div>
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="returnTime">
                            Time Of Return{" "}
                            <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          type="time"
                          id="returnTime"
                          name="returnTime"
                          value={values.returnTime}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.returnTime && !!errors.returnTime}
                          helperText={touched.returnTime && errors.returnTime}
                        />
                      </div>
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="remark">
                            Remark
                            <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          multiline
                          maxRows={4}
                          id="remark"
                          name="remark"
                          value={values.remark}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.remark && !!errors.remark}
                          helperText={touched.remark && errors.remark}
                        />
                      </div>
                      <div className="col-span-2 md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="remark">
                            Check List
                            <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>

                        <FormGroup>
                          <div className="grid lg:grid-cols-2 gap-x-4">
                            {checkListForLaptop?.map((item, i) => (
                              <FormControlLabel
                                control={<Checkbox />}
                                label={item?.label}
                                onChange={() => handleCheck(item)}
                              />
                            ))}
                          </div>
                        </FormGroup>
                      </div>
                      <div className="col-span-2 md:px-4 px-2 md:py-2 py-1">
                        <p className="text-gray-500 mb-2">
                          Upload Images
                          <span className="text-red-600">*</span>
                        </p>
                        {/* ----------------------------multiple Images component------------------ */}
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
                                const uniId = file.type
                                  .split("/")[1]
                                  .split("+")[0]; // Get unique ID of the image
                                return {
                                  file,
                                  previewURL: URL.createObjectURL(file),
                                  uniId, // Add unique ID to the file object
                                };
                              });
                              setFieldValue("images", fileObjects);
                            }}
                          />
                          <div className="flex justify-center items-center gap-2 flex-wrap">
                            {values.images.map((image: any, index) => (
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
                            name="images"
                            component="div"
                            className="error"
                          />
                        </div>
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReturnAsset;
const checkListForLaptop = [
  { id: 1, value: "isPowerOnOff", label: "Powers on/Off" },
  { id: 2, value: "isAllKeyboardButtonWork", label: "All keyboard button work" },
  { id: 3, value: "isTrackPadWork", label: "Trackpad works" },
  { id: 4, value: "isCameraWork", label: "Camera works" },
  { id: 5, value: "isSpeakerWork", label: "Speakers works" },
  { id: 6, value: "isConnectionToInternetWork", label: "Connects to internet" },
  { id: 7, value: "isBrightnessFunctionWork", label: "Brightness is fully adjustable to min and max brightness" },
  { id: 8, value: "isChargingFunctionWork", label: "Charging block charges laptop" },
  { id: 9, value: "isAllPortsWork", label: "All ports on laptop function" },
  { id: 10, value: "isOpenAndCloseWork", label: "Opens and close properly" },
  { id: 11, value: "isAllRubberPadsAttached", label: "Rubber pads are all attached" },
  { id: 12, value: "isAllScrewArePresent", label: "All screws are present" },
  { id: 13, value: "isThereAnyMejorScratchOrDent", label: "No major scratches or dents" },
];
const checkListForMonitor = [
  { id: 1, value: "isPowerOnOff", label: "Powers on/Off" },
  { id: 2, value: "isHDMICableInclude", label: "HDMI cable is included" },
  { id: 3, value: "isPowerAdapterInclude", label: "Powers adapter is included" },
  { id: 4, value: "isThereAnyMejorScratchOrDent", label: "No major scratches or dents" },
];
const checkListForMouse = [
  { id: 1, value: "isUSBReceiverWork", label: "USB receiver is included" },
  { id: 2, value: "isLeftClickWork", label: "Left click works" },
  { id: 3, value: "isRightClickWork", label: "Right click works" },
  { id: 4, value: "isScrollWheelWork", label: "Scroll wheel works" },
  { id: 5, value: "isAdditionalButtonWork", label: "Additional buttons work" },
  { id: 6, value: "isThereAnyMejorScratchOrDent", label: "No major scratches or dents" },
];
const checkListForKeyboard = [
  { id: 1, value: "isUSBReceiverWork", label: "USB receiver is included" },
  { id: 2, value: "isAllKeyboardButtonWork", label: "All keyboard button work" },
  { id: 3, value: "isAllScrewArePresent", label: "All screws are present" },
  { id: 4, value: "isAllRubberPadsAttached", label: "Rubber pads are all attached" },
  { id: 5, value: "isThereAnyMejorScratchOrDent", label: "No major scratches or dents" },
];
