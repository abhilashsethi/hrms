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
  Key,
  Settings,
  Groups,
  DesignServicesRounded,
  AddRounded,
  ManageAccountsRounded,
  AccessTimeFilled,
  AddCircle,
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
            route: "/admin/clients/all-clients",
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
            title: "Date Wise Attendance",
            icon: <PlaylistAddCheckCircleRounded />,
            route: "/admin/attendances/today",
          },
        ],
      },
      {
        key: "6",
        title: "Meetings",
        icon: <Groups />,
        submenus: [
          {
            key: "6-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/meetings",
          },
          {
            key: "6-2",
            title: "All Meetings",
            icon: <Groups />,
            route: "/admin/meetings/all-meetings",
          },
        ],
      },
      {
        key: "7",
        title: "Projects",
        icon: <DesignServicesRounded />,
        submenus: [
          {
            key: "7-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/projects",
          },
          {
            key: "7-2",
            title: "All Projects",
            icon: <DesignServicesRounded />,
            route: "/admin/projects/all-projects",
          },
          {
            key: "7-3",
            title: "Create Project",
            icon: <AddRounded />,
            route: "/admin/projects/create-projects",
          },
        ],
      },
      {
        key: "8",
        title: "Roles",
        icon: <ManageAccountsRounded />,
        submenus: [
          {
            key: "8-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/roles",
          },
          {
            key: "8-2",
            title: "All Roles",
            icon: <ManageAccountsRounded />,
            route: "/admin/roles/all-roles",
          },
        ],
      },
      {
        key: "9",
        title: "Leaves",
        icon: <MedicalInformationRounded />,
        submenus: [
          {
            key: "9-1",
            title: "Apply Leave",
            icon: <AddCircle />,
            route: "#",
          },
          {
            key: "9-2",
            title: "All Leaves",
            icon: <AccessTimeFilled />,
            route: "/admin/employees/leaves",
          },
        ],
      },
      {
        key: "11",
        title: "Settings",
        icon: <Settings />,
        submenus: [
          {
            key: "11-1",
            title: "Change Password",
            icon: <Key />,
            route: "/admin/change-password",
          },
          // {
          //   key: "11-2",
          //   title: "Profile Update",
          //   icon: <PlaylistAddCheckCircleRounded />,
          //   route: "/admin/",
          // },
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
        key: "2",
        title: "Profile",
        icon: <AccountCircle />,
        route: "/admin/profile",
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
            title: "Date Wise Attendance",
            icon: <PlaylistAddCheckCircleRounded />,
            route: "/admin/attendances/today",
          },
        ],
      },
      {
        key: "6",
        title: "Meetings",
        icon: <Groups />,
        submenus: [
          {
            key: "6-1",
            title: "Dashboard",
            icon: <DashboardRounded />,
            route: "/admin/meetings/today",
          },
          {
            key: "6-2",
            title: "All Meetings",
            icon: <Groups />,
            route: "/admin/meetings/",
          },
        ],
      },
    ];
  return [];
};
