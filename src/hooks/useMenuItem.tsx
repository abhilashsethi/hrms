import {
  Dashboard,
  AccountCircle,
  PlaylistAddCheckCircleRounded,
  PeopleRounded,
  CreditCardRounded,
  DashboardRounded,
  QrCodeScannerRounded,
  PersonAddAltRounded,
  Diversity3Rounded,
  MedicalInformationRounded,
  MeetingRoom,
  Work,
  CameraRoll,
} from "@mui/icons-material";
import useAuth from "./useAuth";
export default () => {
  const { user } = useAuth();
  if (user?.role?.name === "CEO")
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
            route: "/admin/cards/scanned",
          },
        ],
      },
      {
        key: "3",
        title: "Employees",
        icon: <PeopleRounded />,
        submenus: [
          {
            key: "3-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/employees",
          },
          {
            key: "3-2",
            title: "All Employees",
            icon: <PeopleRounded />,
            route: "/admin/employees/all-employees",
          },
          {
            key: "3-3",
            title: "Create Employee",
            icon: <PersonAddAltRounded />,
            route: "/admin/employees/create-employee",
          },
          {
            key: "3-4",
            title: "Leaves",
            icon: <MedicalInformationRounded />,
            route: "/admin/employees/leaves",
          },
        ],
      },
      {
        key: "4",
        title: "Clients",
        icon: <Diversity3Rounded />,
        submenus: [
          {
            key: "4-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/users",
          },
          {
            key: "4-2",
            title: "Clients",
            icon: <Diversity3Rounded />,
            route: "/admin/users",
          },
        ],
      },
      {
        key: "5",
        title: "Attendance",
        icon: <PlaylistAddCheckCircleRounded />,
        submenus: [
          {
            key: "5-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/attendances",
          },
          {
            key: "5-2",
            title: "Today Attendance",
            icon: <PlaylistAddCheckCircleRounded />,
            route: "/admin/attendances/today",
          },
        ],
      },
      {
        key: "6",
        title: "Meetings",
        icon: <MeetingRoom />,
        submenus: [
          {
            key: "6-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/meetings/today",
          },
          {
            key: "6-2",
            title: "Today Meetings",
            icon: <PlaylistAddCheckCircleRounded />,
            route: "/admin/meetings/",
          },
        ],
      },
      {
        key: "7",
        title: "Projects",
        icon: <Work />,
        submenus: [
          {
            key: "7-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/projects",
          },
          {
            key: "7-2",
            title: "Today Projects",
            icon: <PlaylistAddCheckCircleRounded />,
            route: "/admin/projects/today",
          },
        ],
      },
      {
        key: "8",
        title: "Roles",
        icon: <CameraRoll />,
        submenus: [
          {
            key: "8-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/roles",
          },
          {
            key: "8-2",
            title: "Today Roles",
            icon: <PlaylistAddCheckCircleRounded />,
            route: "/admin/roles/today",
          },
        ],
      },
    ];
  if (user?.role?.name === "HR")
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
