import { makeStyles } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import {
  Button,
  Container,
  Drawer,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { ProjectDrawerSkeletonLoading } from "components/admin/clients";
import { Form, Formik } from "formik";
import { useFetch } from "hooks";
import moment from "moment";
import { useState } from "react";
import Slider from "react-slick";
import * as Yup from "yup";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setViewProject?: any;
  assetId?: any;
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "50vw",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "80vw",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "30vw",
    },
  },
}));


const RoleWisePageAccess = ({
  open,
  onClose,
  setViewProject,
  assetId,
}: Props) => {
  const [history, setHistory] = useState(false);
  const classes = useStyles();
  const { data: assignId, isLoading } = useFetch<any>(
    `assets/all/return/asset/${assetId}`
  );

  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Branch is required!"),
  });
  const initialValues = {
    type: "returnHistory",
  };
  const handleSubmit = async (values: any) => {
    try {
      if (values.type == "assignHistory") {
        setHistory(true);
      }
      if (values.type == "returnHistory") {
        setHistory(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container style={{ marginTop: "1rem" }} className={classes.container}>
          {/* Drawer Element */}
          <div className="flex items-center justify-between ">
            <p className="text-lg font-bold text-theme">Page Access</p>
            <IconButton onClick={() => onClose()}>
              <Close
                fontSize="small"
                className="text-red-500 block md:hidden"
              />
            </IconButton>
          </div>

          <div className="md:w-[22rem] w-[72vw] md:px-4 px-2 tracking-wide">
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
                  <div className="px-4 py-2">
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="name">
                          Choose History Type
                          <span className="text-red-500">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        select
                        fullWidth
                        name="type"
                        placeholder="Document Type"
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.type && !!errors.type}
                        helperText={touched.type && errors.type}
                      >
                        {Asset_History.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="flex justify-center py-4">
                    <Button
                      type="submit"
                      variant="contained"
                      className="!bg-theme"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="mt-2 flex flex-col gap-4">
            <div className="">
              <div
                className={`w-full h-full  rounded-l-xl shadow-xl px-2 py-2 bg-[#edf4fe] my-3`}
              >
                <div className="w-full order-2 border border-gray-500 rounded-md p-[1px] mb-2">

                </div>
                <div className="flex flex-col gap-1 font-semibold text-blue-700">
                  <div className="">
                    Assigned User :{" "}
                    <span className="text-black font-medium">
                      Name
                    </span>
                  </div>
                  <div className="gap-2">
                    Date Of Assign :{" "}
                    <span className="text-black font-medium">
                      dage
                    </span>
                  </div>

                  <div className="gap-2">
                    Date Of Return :{" "}
                    <span className="text-black font-medium">

                      Not Specified
                    </span>
                  </div>
                  <div className="gap-2">
                    Time Of Assign :{" "}
                    <span className="text-black font-medium">
                      Not Specified
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </Container>
      </Drawer>
    </>
  );
};

export default RoleWisePageAccess;

const Asset_History = [
  { id: 1, value: "assignHistory", name: "Assign History" },
  { id: 2, value: "returnHistory", name: "Return History" },
];


