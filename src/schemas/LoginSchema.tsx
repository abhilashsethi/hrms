import { LockOpen, MailOutline } from "@mui/icons-material";
import * as yup from "yup";
export default () => [
  {
    key: "1",
    label: "Enter your email",
    name: "email",
    type: "email",
    validationSchema: yup
      .string()
      .required("Email is required")
      .email("Invalid Email Address"),
    initialValue: "",
    startIcon: <MailOutline />,
  },
  {
    key: "2",
    label: "Enter your password",
    name: "password",
    type: "password",
    validationSchema: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    initialValue: "",
    startIcon: <LockOpen />,
  },
];
