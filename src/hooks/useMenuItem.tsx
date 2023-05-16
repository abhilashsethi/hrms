import {
	Dashboard,
	AccountCircle,
	PlaylistAddCheckCircleRounded,
	PeopleRounded,
	QrCodeScannerRounded,
	PersonAddAltRounded,
	Diversity3Rounded,
	MedicalInformationRounded,
	Key,
	Groups,
	DesignServicesRounded,
	AddRounded,
	ManageAccountsRounded,
	ExitToApp,
	ElevatorRounded,
	PendingActionsRounded,
} from "@mui/icons-material";
import useAuth from "./useAuth";
import ICONS from "assets/icons";
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
						icon: <QrCodeScannerRounded />,
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
						icon: <Diversity3Rounded />,
						route: "/admin/clients/all-clients",
					},
					{
						key: "4-3",
						title: "Add Clients",
						icon: <Diversity3Rounded />,
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
						icon: <ElevatorRounded />,
						route: "/admin/guests/all-guests",
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
						icon: <PlaylistAddCheckCircleRounded />,
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
						icon: <PendingActionsRounded />,
						route: "/admin/leaves/leave-requests",
					},
					{
						key: "9-3",
						title: "Employee Leaves",
						icon: <MedicalInformationRounded />,
						route: "/admin/leaves/all-leave-requests",
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
						icon: <Groups />,
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
						icon: <DesignServicesRounded />,
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
						icon: <ManageAccountsRounded />,
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
						icon: <MedicalInformationRounded />,
						route: "/admin/department/all-department",
					},
				],
			},
			{
				key: "13",
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
						icon: <Key />,
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
