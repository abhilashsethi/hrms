import {
  Dashboard,
  AccountCircle,
  PlaylistAddCheckCircleRounded,
  PeopleRounded,
  CreditCardRounded,
  DashboardRounded,
  QrCodeScannerRounded,
  PersonAddAltRounded,
} from "@mui/icons-material";
import useAuth from "./useAuth";
export default () => {
  const { user } = useAuth();
  if (user?.role === "CEO")
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <DashboardRounded />,
        route: "/admin",
      },
      {
        key: "2",
        title: "Cards",
        icon: <CreditCardRounded />,
        submenus: [
          {
            key: "2-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/cards",
          },
          {
            key: "2-2",
            title: "Scanned Cards",
            icon: <QrCodeScannerRounded />,
            route: "/admin/scanned-cards",
          },
        ],
      },
      {
        key: "3",
        title: "Users",
        icon: <PeopleRounded />,
        submenus: [
          {
            key: "3-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/users",
          },
          {
            key: "3-2",
            title: "View Users",
            icon: <PeopleRounded />,
            route: "/admin/view-users",
          },
          {
            key: "3-3",
            title: "Create User",
            icon: <PersonAddAltRounded />,
            route: "/admin/create-user",
          },
        ],
      },
      {
        key: "4",
        title: "Attendance",
        icon: <PlaylistAddCheckCircleRounded />,
        submenus: [
          {
            key: "4-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/attendance",
          },
          {
            key: "4-2",
            title: "Daily Attendance",
            icon: <PlaylistAddCheckCircleRounded />,
            route: "/admin/daily-attendance",
          },
        ],
      },
    ];
  if (user?.role === "HR")
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <Dashboard />,
        route: "/admin/users",
      },
      {
        key: "1",
        title: "Profile",
        icon: <AccountCircle />,
        route: "/admin/profile",
      },
    ];
  return [];
};
