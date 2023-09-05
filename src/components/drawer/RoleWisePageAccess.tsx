import { makeStyles } from "@material-ui/core";
import { Add, Close, Delete, Security } from "@mui/icons-material";
import { Container, Drawer, IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { PageAccessSkeleton } from "components/admin/roles";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Role } from "types";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	roleId?: any;
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
const RoleWisePageAccess = ({ open, onClose, roleId }: Props) => {
	const [history, setHistory] = useState(false);
	const classes = useStyles();
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

					<div className="mt-2 mb-5 flex flex-col gap-4">
						{PageList?.map((item, i) => (
							<div key={i} className="">
								<div
									className={`w-full rounded-xl shadow-lg px-2 py-2 
                 bg-gradient-to-r from-rose-100 to-teal-100
                  `}
								>
									<MoreOption item={item} roleId={roleId} />
								</div>
							</div>
						))}
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default RoleWisePageAccess;
const MoreOption = ({ item, roleId }: any) => {
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const {
		data: roleData,
		isLoading,
		mutate,
	} = useFetch<Role>(`roles/${roleId}`);
	const handleClick = async (item: any) => {
		setLoading(true);
		try {
			Swal.fire("", "Please Wait...", "info");
			const res = await change(`roles/addPage/${roleId}`, {
				method: "POST",
				body: { link: item?.value },
			});
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire(
					"Error",
					res?.results?.msg || "Something went wrong!",
					"error"
				);
				setLoading(false);
				return;
			}
			Swal.fire(`Success`, `Access Granted Successfully!`, `success`);
			mutate();
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	const handleDelete = async (data: any, roleData: any) => {
		Swal.fire({
			title: "Are you sure?",
			text: `You want to Remove Access?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Remove!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setLoading(true);
				try {
					Swal.fire("", "Please Wait...", "info");
					const res = await change(`roles/removePage/${roleData?.id}`, {
						method: "DELETE",
						body: { pageId: data?.pageId },
					});
					setLoading(false);
					if (res?.status !== 200) {
						Swal.fire(
							"Error",
							res?.results?.msg || "Something went wrong!",
							"error"
						);
						setLoading(false);
						return;
					}
					Swal.fire(`Success`, `Access Removed Successfully!`, `success`);
					mutate();
					return;
				} catch (error) {
					console.log(error);
					setLoading(false);
				}
			}
		});
	};
	return (
		<>
			{isLoading ? (
				<PageAccessSkeleton />
			) : (
				<div className="w-full py-2 px-2 rounded-md ">
					<div className="flex justify-between justify-items-center">
						{item?.icon}
						<span className="text-black font-semibold">{item?.name}</span>

						<>
							{roleData?.accessPages?.find((data) => data?.link === item?.value)
								?.pageId ? (
								<Tooltip title="Remove Access">
									<Delete
										className="!text-red-600"
										onClick={() =>
											handleDelete(
												roleData?.accessPages?.find(
													(data) => data?.link === item?.value
												),
												roleData
											)
										}
									/>
								</Tooltip>
							) : (
								<Tooltip title="Add Access">
									<Add
										className="!text-black"
										onClick={() => handleClick(item)}
									/>
								</Tooltip>
							)}
						</>

						{/*            
              <Tooltip title="Add Access">
                <Add
                  className="!text-black"
                  onClick={() => handleClick(item)}
                />
              </Tooltip> */}
					</div>
				</div>
			)}
		</>
	);
};

const PageList = [
	{
		id: 1,
		value: "/admin",
		icon: <ICONS.Dashboard_1 />,
		name: "Admin Dashboard",
	},
	{
		id: 2,
		value: "/admin/cards",
		icon: <ICONS.Dashboard_1 />,
		name: "Cards Dashboard",
	},
	{
		id: 3,
		value: "/admin/cards/scanned",
		icon: <ICONS.Scanned_Cards />,
		name: "Scanned Cards",
	},
	{
		id: 300,
		value: "/admin/cards/my-card",
		icon: <ICONS.Scanned_Cards />,
		name: "My Cards",
	},
	{
		id: 4,
		value: "/admin/employees",
		icon: <ICONS.Dashboard_1 />,
		name: "Employees Dashboard",
	},
	{
		id: 4,
		value: "/admin/employees/my-profile",
		icon: <ICONS.All_Employee />,
		name: "My Profile",
	},
	{
		id: 5,
		value: "/admin/employees/all-employees",
		icon: <ICONS.All_Employee />,
		name: "All Employees",
	},
	{
		id: 6,
		value: "/admin/employees/create-employee",
		icon: <ICONS.Add_Employee />,
		name: "Create Employee",
	},
	{
		id: 7,
		value: "/admin/employees/upload-employee-data",
		icon: <ICONS.Upload_Employee_Data />,
		name: "Upload Employee's Data",
	},
	{
		id: 8,
		value: "/admin/clients",
		icon: <ICONS.Dashboard_1 />,
		name: "Clients Dashboard",
	},
	{
		id: 9,
		value: "/admin/clients/all-clients",
		icon: <ICONS.All_Clients />,
		name: "All Clients",
	},
	{
		id: 10,
		value: "/admin/clients/add-clients",
		icon: <ICONS.Add_Clients />,
		name: "Add Clients",
	},
	{
		id: 11,
		value: "/admin/guests",
		icon: <ICONS.Dashboard_1 />,
		name: "Guests Dashboard",
	},
	{
		id: 12,
		value: "/admin/guests/all-guests",
		icon: <ICONS.All_Guests />,
		name: "All Guests",
	},
	{
		id: 13,
		value: "/admin/guests/create-guest",
		icon: <ICONS.Add_Guest />,
		name: "Add Guest",
	},
	{
		id: 14,
		value: "/admin/attendances",
		icon: <ICONS.Dashboard_1 />,
		name: "Attendance Dashboard",
	},
	{
		id: 1445,
		name: "My Attendance",
		icon: <ICONS.Data_Wise_Attendance />,
		value: "/admin/attendances/my-attendance",
	},
	{
		id: 15,
		value: "/admin/attendances/today",
		icon: <ICONS.Data_Wise_Attendance />,
		name: "Date Wise Attendance",
	},
	// {
	// 	id: 16,
	// 	value: "/admin/payroll/configure",
	// 	icon: <ICONS.Configure />,
	// 	name: "Payroll Configure",
	// },
	{
		id: 17,
		value: "/admin/payroll/view-config",
		icon: <ICONS.Configure />,
		name: "Payroll View Config",
	},
	{
		id: 18,
		value: "/admin/payroll/add-salary-info",
		icon: <ICONS.Add_Salary_Info />,
		name: "Payroll Add Salary Info",
	},

	{
		id: 19,
		value: "/admin/leaves",
		icon: <ICONS.Dashboard_1 />,
		name: "Leaves Dashboard",
	},
	{
		id: 20,
		value: "/admin/leaves/leave-requests",
		icon: <ICONS.All_Leave_Requests />,
		name: "Leave Requests",
	},
	{
		id: 20,
		value: "/admin/leaves/manager-leave-requests",
		icon: <ICONS.All_Leave_Requests />,
		name: "Manager Leave Requests",
	},
	{
		id: 21,
		value: "/admin/leaves/all-leaves",
		icon: <ICONS.Employee_Leaves />,
		name: "Employee Leaves",
	},
	{
		id: 210,
		value: "/admin/leaves/my-leaves",
		icon: <ICONS.Employee_Leaves />,
		name: "My Leaves",
	},
	{
		id: 22,
		value: "/admin/meetings",
		icon: <ICONS.Dashboard_1 />,
		name: "Meetings Dashboard",
	},
	{
		id: 23,
		value: "/admin/meetings/all-meetings",
		icon: <ICONS.All_Meetings />,
		name: "All Meetings",
	},
	{
		id: 230,
		value: "/admin/meetings/my-meetings",
		icon: <ICONS.All_Meetings />,
		name: "My Meetings",
	},
	{
		id: 24,
		value: "/admin/projects",
		icon: <ICONS.Dashboard_1 />,
		name: "Projects Dashboard",
	},
	{
		id: 25,
		value: "/admin/projects/all-projects",
		icon: <ICONS.All_Projects />,
		name: "All Projects",
	},
	{
		id: 250,
		value: "/admin/projects/my-projects",
		icon: <ICONS.All_Projects />,
		name: "My Projects",
	},
	{
		id: 26,
		value: "/admin/projects/create-projects",
		icon: <ICONS.Add_Project />,
		name: "Create Project",
	},
	{
		id: 27,
		value: "/admin/tenders",
		icon: <ICONS.Dashboard_1 />,
		name: "Tenders Dashboard",
	},
	{
		id: 28,
		value: "/admin/tenders/all-tenders",
		icon: <ICONS.All_Tender />,
		name: "All Tenders",
	},
	{
		id: 29,
		value: "/admin/tenders/members",
		icon: <ICONS.All_Employee />,
		name: "Tenders Members",
	},
	{
		id: 30,
		value: "/admin/tenders/create-tender",
		icon: <ICONS.Create_Tender />,
		name: "Create Tender",
	},
	{
		id: 31,
		value: "/admin/tenders/my-tenders",
		icon: <ICONS.Tender_Details />,
		name: "My Tenders",
	},
	{
		id: 32,
		value: "/admin/assets",
		icon: <ICONS.Dashboard_1 />,
		name: "Assets Dashboard",
	},
	{
		id: 33,
		value: "/admin/assets/all-assets",
		icon: <ICONS.All_Assets />,
		name: "View All Asset",
	},
	{
		id: 330,
		value: "/admin/assets/my-assets",
		icon: <ICONS.All_Assets />,
		name: "My Asset",
	},
	{
		id: 34,
		value: "/admin/assets/create-assets",
		icon: <ICONS.Add_Assets />,
		name: "Add Asset",
	},
	{
		id: 35,
		value: "/admin/technologies",
		icon: <ICONS.Dashboard_1 />,
		name: "Technologies Dashboard",
	},
	{
		id: 36,
		value: "/admin/technologies/all-technologies",
		icon: <ICONS.All_Tech />,
		name: "All Technologies",
	},
	{
		id: 37,
		value: "/admin/roles",
		icon: <ICONS.Dashboard_1 />,
		name: "Roles Dashboard",
	},
	{
		id: 38,
		value: "/admin/roles/all-roles",
		icon: <ICONS.All_Roles />,
		name: "All Roles",
	},
	{
		id: 39,
		value: "/admin/department",
		icon: <ICONS.Dashboard_1 />,
		name: "Departments Dashboard",
	},
	{
		id: 40,
		value: "/admin/department/all-department",
		icon: <ICONS.All_Departments />,
		name: "All Department",
	},
	{
		id: 41,
		value: "/admin/branch",
		icon: <ICONS.Dashboard_1 />,
		name: "Branch Dashboard",
	},
	{
		id: 1223,
		name: "My Branch",
		icon: <ICONS.All_Branch />,
		value: "/admin/branch/my-branch",
	},
	{
		id: 42,
		value: "/admin/branch/all-branch",
		icon: <ICONS.All_Branch />,
		name: "All Branches",
	},
	{
		id: 43,
		value: "/admin/branch/create-branch",
		icon: <ICONS.Create_Branch />,
		name: "Create Branch",
	},
	{
		id: 100,
		value: "/admin/email/create",
		icon: <ICONS.Create />,
		name: "Create Email",
	},
	{
		key: 103,
		name: "Sent",
		icon: <ICONS.Sent />,
		value: "/admin/email/sent",
	},
	{
		id: 101,
		value: "/admin/email",
		icon: <ICONS.Inbox />,
		name: "Inbox",
	},
	{
		id: 102,
		value: "/admin/email/drafts",
		icon: <ICONS.Draft />,
		name: "Drafts",
	},
	{
		id: 44,
		value: "/admin/templates/create-template",
		icon: <ICONS.Create_Template />,
		name: "Create Email Templates",
	},
	{
		id: 45,
		value: "/admin/templates/saved-templates",
		icon: <ICONS.Saved_Template />,
		name: "Saved Email Templates",
	},
	{ id: 46, value: "/admin/chat", icon: <ICONS.All_Chat />, name: "Chats" },
	{ id: 47, value: "/admin/support", icon: <ICONS.Support />, name: "Support" },
	{
		id: 48,
		value: "/admin/change-password",
		icon: <ICONS.Change_Password />,
		name: "Change Password",
	},
	{
		id: 53,
		value: "/admin/quotation",
		icon: <ICONS.Quotation />,
		name: "Quotation Dashboard",
	},
	{
		id: 52,
		value: "/admin/quotation/create-quotation",
		icon: <ICONS.Create_Quotation />,
		name: "Create Quotation",
	},
	{
		id: 54,
		value: "/admin/quotation/all-quotation",
		icon: <ICONS.Change_Password />,
		name: "View All Quotation",
	},
	{
		id: 53,
		value: "/admin/quotation/gst-config",
		icon: <ICONS.GST_Configure />,
		name: "Quotation Gst Configure",
	},
	{
		id: 55,
		value: "/admin/quotation/bank-account-config",
		icon: <ICONS.Bank_Account_Config />,
		name: "Quotation Bank Account Configure",
	},
	{
		id: 55,
		value: "/admin/quotation/all-bank-account",
		icon: <ICONS.Change_Password />,
		name: "Quotation All Bank Accounts",
	},
	{
		id: 56,
		value: "/admin/bills",
		icon: <ICONS.Bill />,
		name: "Bill Dashboard",
	},
	{
		id: 57,
		value: "/admin/bills/create-bill",
		icon: <ICONS.Create_Bill />,
		name: "Create Bill",
	},
	{
		id: 58,
		value: "/admin/bills/signature-config",
		icon: <ICONS.Signature_Config />,
		name: "Signature config",
	},
	{
		id: 59,
		value: "/admin/bills/all-bills",
		icon: <ICONS.Bill />,
		name: "View All Bills",
	},
	{
		id: 60,
		value: "/admin/config",
		icon: <ICONS.Configure />,
		name: "Config",
	},
	{
		id: 61,
		value: "/admin/config/gst-config",
		icon: <ICONS.GST_Configure />,
		name: "GST Config",
	},
	{
		id: 62,
		value: "/admin/config/bank-account-config",
		icon: <ICONS.Bank_Account_Config />,
		name: "Bank Account Config",
	},

	{
		id: 63,
		value: "/admin/config/all-bank-account",
		icon: <ICONS.All_Bank_Accounts />,
		name: "All Bank Account",
	},
	{
		id: 64,
		value: "/admin/security/create-guard",
		icon: <ICONS.Create_Guard />,
		name: "Create Guard",
	},
	{
		id: 65,
		value: "/admin/security",
		icon: <ICONS.Security />,
		name: "Security Dashboard",
	},

	{
		id: 66,
		value: "/admin/security/shift-config",
		icon: <ICONS.Shift_Configure />,
		name: "Security Shift Configuration",
	},
	{
		id: 67,
		value: "/admin/security/create-appointment",
		icon: <ICONS.Create_Appointment />,
		name: "Security Create Appointment",
	},
	{
		id: 68,
		value: "/admin/security/all-appointments",
		icon: <ICONS.All_Appointments />,
		name: "Security All Appointments",
	},
	{
		id: 69,
		value: "/admin/support/create-support",
		icon: <ICONS.Create_Supports />,
		name: "Create Support",
	},
	{
		id: 70,
		value: "/admin/support",
		icon: <ICONS.All_Appointments />,
		name: "Support",
	},
	{
		id: 71,
		value: "/admin/support/all-supports",
		icon: <ICONS.All_Support />,
		name: "All Supports",
	},
	{
		id: 72,
		value: "/admin/meetings/my-meetings",
		icon: <ICONS.All_Meetings />,
		name: "My Meetings",
	},
	{
		id: 73,
		value: "/admin/meetings/create-meeting",
		icon: <ICONS.All_Meetings />,
		name: "Create Meeting",
	},
	{
		id: 74,
		value: "/admin/employees/ex-employees",
		icon: <ICONS.All_Meetings />,
		name: "Ex-Employees",
	},
	{
		id: 75,
		value: "/admin/announcement/all-announcements",
		icon: <ICONS.All_Announcement />,
		name: "All Announcements",
	},
	{
		id: 76,
		value: "/admin/announcement/create-announcement",
		icon: <ICONS.Create_Announcement />,
		name: "Create Announcements",
	},
	{
		id: 77,
		value: "/admin/holiday",
		icon: <ICONS.Holiday />,
		name: "Holiday",
	},
	{
		id: 78,
		value: "/admin/holiday/create-holiday",
		icon: <ICONS.Add_Holiday />,
		name: "Create Holiday",
	},
	{
		id: 79,
		value: "/admin/holiday/all-holidays",
		icon: <ICONS.View_Holiday />,
		name: "View All Holidays",
	},

	// { id: 49, value: "/admin/leaves", icon: <ICONS.Dashboard_1 />, name: "Leaves Dashboard" },
	// { id: 50, value: "/admin/leaves", icon: <ICONS.Dashboard_1 />, name: "Leaves Dashboard" },
];
