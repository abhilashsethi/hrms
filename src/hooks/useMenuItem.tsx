import {
	AccountCircle,
	Add,
	Dashboard,
	Email,
	FileCopy,
	Forum,
	MedicalInformationRounded,
} from "@mui/icons-material";
import ICONS from "assets/icons";
import useAuth from "./useAuth";
export default () => {
	const { user } = useAuth();
	if (user?.role?.name === "CEO")
		return [
			{
				key: "1",
				title: "Dashboard",
				icon: <ICONS.Dashboard_1 />,
				route: "/admin",
			},
			{
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
			},
			{
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
			{
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
			},
			{
				key: "14",
				title: "Payroll",
				icon: <ICONS.Payroll_1 />,
				submenus: [
					{
						key: "14-1",
						title: "Employee Salary",
						icon: <ICONS.Dashboard_1 />,
						route: "/admin/payroll/employee-salary",
					},
					{
						key: "14-2",
						title: "Configure",
						icon: <ICONS.Dashboard_1 />,
						route: "/admin/payroll/configure",
					},
					{
						key: "14-3",
						title: "Salary Structure",
						icon: <ICONS.Dashboard_1 />,
						route: "/admin/payroll/salary-structure",
					},
				],
			},
			{
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
						icon: <MedicalInformationRounded />,
						route: "/admin/leaves/all-leaves",
					},
				],
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
			{
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
				key: "20",
				title: "Email Templates",
				icon: <ICONS.Email_Template />,
				submenus: [
					{
						key: "20-1",
						title: "Create Template",
						icon: <ICONS.Create_Template />,
						route: "/admin/templates/create-template",
					},
					{
						key: "20-2",
						title: "Saved Templates",
						icon: <ICONS.Saved_Template />,
						route: "/admin/templates/saved-templates",
					},
				],
			},
			{
				key: "24",
				title: "Chats",
				icon: <ICONS.Chat />,
				route: "/admin/chat",
			},
			{
				key: "15",
				title: "Support",
				icon: <ICONS.Support />,
				route: "/admin/support",
			},
			{
				key: "11",
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
