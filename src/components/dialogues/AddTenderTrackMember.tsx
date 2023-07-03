import { Check, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  TextField,
  Tooltip
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import { Tender, User } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  tenderData?: Tender;
}
interface Input {
  memberId?: string;
}
const AddTenderTrackMember = ({ open, handleClose, mutate, tenderData }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { data: employees } = useFetch<User[]>(`users?departmentName=BID`);

  const initialValues = {
    memberId: "",
  };

  const validationSchema = Yup.object().shape({
    memberId: Yup.string().required("Member is required!"),
  });

  const handleSubmit = async (values: Input) => {
    setLoading(true);
    try {
      const res = await change(`tenders/assign-user-to-tender`, {
        body: {
          memberId: values?.memberId,
          tenderId: tenderData?.id,
          isAllowedToReviewTender: true,
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire(
          "Error",
          res?.results?.msg || "Unable to Submit",
          "error"
        );
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `You have successfully Created Member!`, `success`);
      mutate()
      handleClose()
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
        >
          <p className="text-center text-xl font-bold text-theme tracking-wide">
            ADD MEMBER
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
          <div className="md:w-[25rem] w-full md:px-4 px-2 tracking-wide">
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
                setFieldValue,
                handleBlur,
              }) => (
                <Form>
                  <div className="md:px-4 px-2 md:py-2 py-1">
                    <div className="py-2">
                      <InputLabel htmlFor="note">
                        Review Member <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <div className="">
                      <Autocomplete
                        options={employees || []}
                        fullWidth
                        size="small"
                        getOptionLabel={(option) => option.name ? option?.name : ""}

                        onChange={(e: SyntheticEvent<Element, Event>, r: User | null) =>
                          setFieldValue("memberId", r?.id)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="memberId"
                            placeholder="Select Member"
                            onBlur={handleBlur}
                            error={
                              touched.memberId && !!errors.memberId
                            }
                            helperText={
                              Boolean(touched.memberId) && errors.memberId as string
                            }
                          />
                        )}
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

export default AddTenderTrackMember;
