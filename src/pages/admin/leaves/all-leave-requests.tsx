import { Add, Search, Upload } from "@mui/icons-material";
import { Button, MenuItem, Pagination, Stack, TextField } from "@mui/material";
import {
	AllLeaveRequests,
	EmployeesColumn,
	EmplyeesGrid,
} from "components/admin";
import {
	AdminBreadcrumbs,
	GridAndList,
	Loader,
	LoaderAnime,
	SkeletonLoader,
} from "components/core";
import { UploadEmployData } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import { User } from "types";

const AllLeaves = () => {
	const [pageNumber, setPageNumber] = useState<number | null>(1);
	const [isGrid, setIsGrid] = useState(true);
	const [userName, setUsername] = useState<string | null>(null);
	const [isRole, setIsRole] = useState<string | null>(null);
	const [isUpload, setIsUpload] = useState(false);
	const [empId, setEmpId] = useState("");
	const handleChange = (event: any) => {
		setIsRole(event.target.value);
	};
	const { data: roleData } = useFetch<any>(`roles`);
	const {
		data: employees,
		mutate,
		isLoading,
		pagination,
	} = useFetch<User[]>(
		`users?page=${pageNumber}&limit=8${userName ? `&name=${userName}` : ""}${
			empId ? `&employeeID=${empId}` : ""
		}${isRole ? `&role=${isRole}` : ""}`
	);
	// console.log(
	//   `users?page=${pageNumber}&limit=8${userName ? `&name=${userName}` : ""}${
	//     empId ? `&employeeID=${empId}` : ""
	//   }${isRole ? `&role=${isRole}` : ""}`
	// );
	// useEffect(() => {
	//   if (employees) {
	//     const filtered = employees.filter((user: any) => {
	//       return user?.name?.toLowerCase().includes(userName?.toLowerCase());
	//     });
	//     setSearchedUser(filtered);
	//   }
	// }, [employees, userName]);
	// useEffect(() => {
	//   if (employees) {
	//     const filtered = employees.filter((user: any) => {
	//       return user?.employeeID?.toLowerCase().includes(empId?.toLowerCase());
	//     });
	//     setSearchedUser(filtered);
	//   }
	// }, [employees, empId]);
	// useEffect(() => {
	//   if (isRole) {
	//     const filtered = employees?.filter((user: any) => {
	//       return user?.roleId === isRole;
	//     });
	//     setSearchedUser(filtered);
	//   }
	// }, [isRole]);
	return (
		<PanelLayout title="All Leave Requests - SY HR MS">
			<section className="px-8">
				<section>
					<AllLeaveRequests data={employees} mutate={mutate} />
				</section>
				{!employees?.length && <LoaderAnime />}
				{employees?.length ? (
					<div className="flex justify-center py-8">
						<Stack spacing={2}>
							<Pagination
								count={Math.ceil(
									Number(pagination?.total || 1) /
										Number(pagination?.limit || 1)
								)}
								onChange={(e, v: number) => {
									setPageNumber(v);
								}}
								variant="outlined"
							/>
						</Stack>
					</div>
				) : null}
			</section>
		</PanelLayout>
	);
};

export default AllLeaves;

const links = [
	{ id: 1, page: "Employees", link: "/admin/employees" },
	{ id: 2, page: "All Employees", link: "/admin/employees/all-employees" },
];
