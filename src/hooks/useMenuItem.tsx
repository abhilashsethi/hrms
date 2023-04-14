import { Dashboard, AccountCircle } from "@mui/icons-material";
import useAuth from "./useAuth";
export default () => {
  const { user } = useAuth();
  if (user?.role === "ADMIN")
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <Dashboard />,
        route: "/panel/admin",
      },
    ];
  if (user?.role === "STUDENT")
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <Dashboard />,
        route: "/panel/student",
      },
      {
        key: "1",
        title: "Profile",
        icon: <AccountCircle />,
        route: "/panel/student/profile",
      },
    ];
  return [];
};
