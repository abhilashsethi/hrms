import { MedicalInformationRounded, Send } from "@mui/icons-material";
import ICONS from "assets/icons";
import { useEffect, useState } from "react";
import { useFetch } from "./useAPI";
import useAuth from "./useAuth";

type AccessDataType = {
  accessPages: {
    pageId: string;
    link: string;
  }[];
};

export default () => {
  const [activeMenu, setActiveMenu] = useState<any>([]);
  const { user } = useAuth();

  const { data: roleData, isLoading } = useFetch<AccessDataType>(
    `roles/${user?.roleId}`
  );
  const allData = [
    {
      key: "1",
      title: "Dashboard",
      icon: <ICONS.Dashboard_1 />,
      route: "/admin",
    },

    user?.role?.name == "CEO" || user?.role?.name == "HR"
      ? {
        key: "2",
        title: "Cards",
        icon: <ICONS.Card />,
        submenus: [
          {
            key: "2-1",
            title: "Dashboard",
            icon: <ICONS.Dashboard_1 />,
            route: "/admin/cards",
          },
          {
            key: "2-2",
            title: "Scanned Cards",
            icon: <ICONS.Scanned_Cards />,
            route: "/admin/cards/scanned",
          },
        ],
      }
      : {
        key: "2card",
        title: "My Cards",
        icon: <ICONS.Scanned_Cards />,
        route: "/admin/cards/scanned",
      },

    user?.role?.name == "CEO" || user?.role?.name == "HR"
      ? {
        key: "3",
        title: "Employees",
        icon: <ICONS.Employees />,
        submenus: [
          {
            key: "3-1",
            title: "Dashboard",
            icon: <ICONS.Dashboard_1 />,
            route: "/admin/employees",
          },
          {
            key: "3-2",
            title: "All Employees",
            icon: <ICONS.All_Employee />,
            route: "/admin/employees/all-employees",
          },
          {
            key: "3-3",
            title: "Create Employee",
            icon: <ICONS.Add_Employee />,
            route: "/admin/employees/create-employee",
          },
          {
            key: "3-4",
            title: "Upload Employee's Data",
            icon: <ICONS.Upload_Employee_Data />,
            route: "/admin/employees/upload-employee-data",
          },
        ],
      }
      : {
        key: "3ss",
        title: "My Profile",
        icon: <ICONS.All_Employee />,
        route: "/admin/employees/all-employees",
      },
    {
      key: "4",
      title: "Clients",
      icon: <ICONS.Clients />,
      submenus: [
        {
          key: "4-1",
          title: "Dashboard",
          icon: <ICONS.Dashboard_1 />,
          route: "/admin/clients",
        },
        {
          key: "4-2",
          title: "All Clients",
          icon: <ICONS.All_Clients />,
          route: "/admin/clients/all-clients",
        },
        {
          key: "4-3",
          title: "Add Clients",
          icon: <ICONS.Add_Clients />,
          route: "/admin/clients/add-clients",
        },
      ],
    },
    {
      key: "13",
      title: "Guests",
      icon: <ICONS.Guest />,
      submenus: [
        {
          key: "13-1",
          title: "Dashboard",
          icon: <ICONS.Dashboard_1 />,
          route: "/admin/guests",
        },
        {
          key: "13-2",
          title: "All Guests",
          icon: <ICONS.All_Guests />,
          route: "/admin/guests/all-guests",
        },
        {
          key: "13-3",
          title: "Add Guest",
          icon: <ICONS.Add_Guest />,
          route: "/admin/guests/create-guest",
        },
      ],
    },
    user?.role?.name == "CEO" || user?.role?.name == "HR"
      ? {
        key: "5",
        title: "Attendance",
        icon: <ICONS.Attendance />,
        submenus: [
          {
            key: "5-1",
            title: "Dashboard",
            icon: <ICONS.Dashboard_1 />,
            route: "/admin/attendances",
          },
          {
            key: "5-2",
            title: "Date Wise Attendance",
            icon: <ICONS.Data_Wise_Attendance />,
            route: "/admin/attendances/today",
          },
        ],
      }
      : {
        key: "5ss",
        title: "My Attendance",
        icon: <ICONS.Data_Wise_Attendance />,
        route: "/admin/attendances/today",
      },
    {
      key: "14",
      title: "Payroll",
      icon: <ICONS.Payroll_1 />,
      submenus: [
        // {
        // 	key: "14-1",
        // 	title: "Employee Salary",
        // 	icon: <ICONS.Dashboard_1 />,
        // 	route: "/admin/payroll/employee-salary",
        // },
        {
          key: "14-2",
          title: "Configure",
          icon: <ICONS.Configure />,
          route: "/admin/payroll/configure",
        },
        {
          key: "14-2",
          title: "View Config",
          icon: <ICONS.View_Configure />,
          route: "/admin/payroll/view-config",
        },
        {
          key: "14-3",
          title: "Add Salary Info",
          icon: <ICONS.Add_Salary_Info />,
          route: "/admin/payroll/add-salary-info",
        },
      ],
    },
    user?.role?.name == "CEO" || user?.role?.name == "HR"
      ? {
        key: "9",
        title: "Leaves",
        icon: <ICONS.Leaves />,
        submenus: [
          {
            key: "9-1",
            title: "Dashboard",
            icon: <ICONS.Dashboard_1 />,
            route: "/admin/leaves",
          },
          {
            key: "9-2",
            title: "Leave Requests",
            icon: <ICONS.All_Leave_Requests />,
            route: "/admin/leaves/leave-requests",
          },
          {
            key: "9-3",
            title: "Employee Leaves",
            icon: <ICONS.Employee_Leaves />,
            route: "/admin/leaves/all-leaves",
          },
        ],
      }
      : {
        key: "9ss",
        title: "My Leaves",
        icon: <ICONS.Employee_Leaves />,
        route: "/admin/leaves/all-leaves",
      },
    {
      key: "6",
      title: "Meetings",
      icon: <ICONS.Meeting />,
      submenus: [
        {
          key: "6-1",
          title: "Dashboard",
          icon: <ICONS.Dashboard_1 />,
          route: "/admin/meetings",
        },
        {
          key: "6-2",
          title: "All Meetings",
          icon: <ICONS.All_Meetings />,
          route: "/admin/meetings/all-meetings",
        },
      ],
    },
    user?.role?.name == "CEO" || user?.role?.name == "HR"
      ? {
        key: "7",
        title: "Projects",
        icon: <ICONS.Projects />,
        submenus: [
          {
            key: "7-1",
            title: "Dashboard",
            icon: <ICONS.Dashboard_1 />,
            route: "/admin/projects",
          },
          {
            key: "7-2",
            title: "All Projects",
            icon: <ICONS.All_Projects />,
            route: "/admin/projects/all-projects",
          },
          {
            key: "7-3",
            title: "Create Project",
            icon: <ICONS.Add_Project />,
            route: "/admin/projects/create-projects",
          },
        ],
      }
      : {
        key: "7ss",
        title: "My Projects",
        icon: <ICONS.All_Projects />,
        route: "/admin/projects/all-projects",
      },
    user?.role?.name == "CEO" || user?.role?.name == "HR"
      ? {
        key: "27",
        title: "Tenders",
        icon: <ICONS.Tender />,
        submenus: [
          {
            key: "27-1",
            title: "Dashboard",
            icon: <ICONS.Dashboard_1 />,
            route: "/admin/tenders",
          },
          {
            key: "27-2",
            title: "All Tenders",
            icon: <ICONS.All_Tender />,
            route: "/admin/tenders/all-tenders",
          },
          {
            key: "27-5",
            title: "Members",
            icon: <ICONS.All_Employee />,
            route: "/admin/tenders/members",
          },
          {
            key: "27-3",
            title: "Create Tender",
            icon: <ICONS.Create_Tender />,
            route: "/admin/tenders/create-tender",
          },
          {
            key: "27-4",
            title: "Tender Details",
            icon: <ICONS.Tender_Details />,
            route: "/admin/tenders/tender-details",
          },
        ],
      }
      : {
        key: "27ss",
        title: "My Tenders",
        icon: <ICONS.All_Tender />,
        route: "/admin/tenders/all-tenders",
      },
    user?.role?.name == "CEO" || user?.role?.name == "HR"
      ? {
        key: "28",
        title: "Assets",
        icon: <ICONS.Assets />,
        submenus: [
          {
            key: "28-1",
            title: "Dashboard",
            icon: <ICONS.Dashboard_1 />,
            route: "/admin/assets",
          },
          {
            key: "28-2",
            title: "View All Asset",
            icon: <ICONS.All_Assets />,
            route: "/admin/assets/all-assets",
          },
          {
            key: "28-3",
            title: "Add Asset",
            icon: <ICONS.All_Assets />,
            route: "/admin/assets/create-assets",
          },
        ],
      }
      : {
        key: "28ss",
        title: "My Asset",
        icon: <ICONS.All_Assets />,
        route: "/admin/assets/all-assets",
      },
    {
      key: "12",
      title: "Technologies",
      icon: <ICONS.Technology />,
      submenus: [
        {
          key: "12-1",
          title: "Dashboard",
          icon: <ICONS.Dashboard_1 />,
          route: "/admin/technologies",
        },
        {
          key: "12-2",
          title: "All Technologies",
          icon: <ICONS.All_Tech />,
          route: "/admin/technologies/all-technologies",
        },
      ],
    },
    {
      key: "8",
      title: "Roles",
      icon: <ICONS.Role />,
      submenus: [
        {
          key: "8-1",
          title: "Dashboard",
          icon: <ICONS.Dashboard_1 />,
          route: "/admin/roles",
        },
        {
          key: "8-2",
          title: "All Roles",
          icon: <ICONS.All_Roles />,
          route: "/admin/roles/all-roles",
        },
      ],
    },
    {
      key: "10",
      title: "Departments",
      icon: <ICONS.Departments />,
      submenus: [
        {
          key: "10-1",
          title: "Dashboard",
          icon: <ICONS.Dashboard_1 />,
          route: "/admin/department",
        },
        {
          key: "10-2",
          title: "All Department",
          icon: <ICONS.All_Departments />,
          route: "/admin/department/all-department",
        },
      ],
    },
    {
      key: "11re32r23e23e32",
      title: "Branch",
      icon: <ICONS.Branch />,
      submenus: [
        {
          key: "11-1",
          title: "Dashboard",
          icon: <ICONS.Dashboard_1 />,
          route: "/admin/branch",
        },
        {
          key: "11-2",
          title: "All Branches",
          icon: <ICONS.All_Branch />,
          route: "/admin/branch/all-branch",
        },
        {
          key: "11-3",
          title: "Create Branch",
          icon: <ICONS.Create_Branch />,
          route: "/admin/branch/create-branch",
        },
      ],
    },
    {
      key: "20",
      title: "Email",
      icon: <ICONS.Email />,
      submenus: [
        {
          key: "20-1",
          title: "Create Email",
          icon: <ICONS.Create className="!text-6xl" />,
          route: "/admin/email/create",
        },
        {
          key: "20-2",
          title: "Inbox",
          icon: <ICONS.Inbox />,
          route: "/admin/email",
        },
        {
          key: "20-6",
          title: "Sent",
          icon: <ICONS.Sent />,
          route: "/admin/email/sent",
        },
        {
          key: "20-3",
          title: "Drafts",
          icon: <ICONS.Draft />,
          route: "/admin/email/drafts",
        },
        {
          key: "20-4",
          title: "Create Template",
          icon: <ICONS.Create_Template />,
          route: "/admin/templates/create-template",
        },
        {
          key: "20-5",
          title: "Saved Templates",
          icon: <ICONS.Saved_Template />,
          route: "/admin/templates/saved-templates",
        },
      ],
    },
    {
      key: "24",
      title: "Chats",
      icon: <ICONS.All_Chat />,
      route: "/admin/chat",
    },
    {
      key: "15",
      title: "Support",
      icon: <ICONS.Support />,
      route: "/admin/support",
    },
    {
      key: "11wfewfwfwe",
      title: "Settings",
      icon: <ICONS.Setting />,
      submenus: [
        {
          key: "11-1",
          title: "Change Password",
          icon: <ICONS.Change_Password />,
          route: "/admin/change-password",
        },
        // {
        //   key: "9-2",
        //   title: "Profile Update",
        //   icon: <PlaylistAddCheckCircleRounded />,
        //   route: "/admin/",
        // },
      ],
    },
  ];

  useEffect(() => {
    if (isLoading || !roleData?.accessPages?.length) return;

    //get all the link
    const allAccessibleLink = roleData?.accessPages?.map((item) => item?.link);

    const withSubmenuData = allData
      ?.map((item) => {
        if (item?.submenus?.length) {
          return {
            ...item,
            submenus: item?.submenus
              ?.map((inner) => {
                if (allAccessibleLink?.includes(inner?.route)) {
                  return inner;
                }
                return undefined;
              })
              ?.filter((supperInner) => typeof supperInner !== "undefined"),
          };
        } else if (item?.route && allAccessibleLink?.includes(item?.route)) {
          return item;
        } else {
          return undefined;
        }
      })
      ?.filter(
        (item: any) =>
          !(typeof item === "undefined" || item?.submenus?.length === 0)
      );

    setActiveMenu(withSubmenuData);
  }, [isLoading, roleData?.accessPages?.length]);

  if (user?.role?.name) return activeMenu;

  return [];
};
