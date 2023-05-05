import { HeadStyle, IOSSwitch, Loader, RoleComponent } from "components/core";
import { PeopleRounded } from "@mui/icons-material";
import { MuiTblOptions, getDataWithSL } from "utils";
import { RenderIconRow } from "components/common";
import MaterialTable from "@material-table/core";
import { useChange } from "hooks";
import Swal from "sweetalert2";
import { useState } from "react";
interface ARRAY {
	id?: string;
}
interface Props {
	data?: ARRAY[];
	mutate?: any;
}
const AllLeaveRequests = ({ data, mutate }: Props) => {
	const { change, isChanging } = useChange();
	const handleBlock = async (e: any, userId: string) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to update status?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, update!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await change(`users/${userId}`, {
					method: "PATCH",
					body: { isBlocked: !e.target?.checked },
				});
				mutate();
				if (res?.status !== 200) {
					Swal.fire(`Error`, "Something went wrong!", "error");
					return;
				}
				Swal.fire(`Success`, "Status updated successfully!", "success");
				return;
			}
		});
	};

	const [tabelData, setTabelData] = useState([
		{
			Id: "1",
			name: "Ashutosh Mohapatra",
			email: "ashutosh@gmail.com",
			leaveType: "Casual Leave",
			leaveFrom: "05/05/2023",
			leaveTo: "14/05/2023",
			days: "10",
			reason: "personal",
			createdAt: "02 May, 2023",
		},
	]);

	return (
		<section className="mt-8">
			<MaterialTable
				title={<HeadStyle name="All Leave Requests" icon={<PeopleRounded />} />}
				isLoading={!data}
				// data={data ? getDataWithSL<any>(data) : []}
				data={tabelData}
				options={{ ...MuiTblOptions(), selection: true }}
				columns={[
					{
						title: "#",
						field: "sl",
						editable: "never",
						width: "2%",
					},
					{
						title: "Name",
						tooltip: "Name",
						field: "name",
						editable: "never",
					},
					{
						title: "Email",
						tooltip: "Email",
						field: "email",
						editable: "never",
					},
					{
						title: "Leave Type",
						field: "leaveType",
						emptyValue: "Not Provided",
						editable: "never",
					},
					{
						title: "Leave From",
						field: "leaveFrom",
						emptyValue: "Not Provided",
						editable: "never",
					},
					{
						title: "Leave To",
						field: "leaveTo",
						emptyValue: "Not Provided",

						editable: "never",
					},
					{
						title: "No Of Days",
						field: "days",
						emptyValue: "Not Provided",
						editable: "never",
					},
					{
						title: "Status",
						field: "status",
						emptyValue: "Not Provided",
						editable: "never",
					},
					{
						title: "Reason",
						field: "reason",
						emptyValue: "Not Provided",
						editable: "never",
					},

					{
						title: "Created",
						field: "createdAt",
						// render: (data) => new Date(data.createdAt).toDateString(),
						editable: "never",
					},
				]}
				// onRowDoubleClick={(e, rowData) =>
				//   push(`/admin/attendances/user/${rowData?.id}`)
				// }

				editable={{
					onRowDelete: async (oldData) => {
						const res = await change(`users/${oldData}`, {
							method: "DELETE",
						});
						if (res?.status !== 200) {
							Swal.fire(`Error`, "Something went wrong!", "error");
							return;
						}
						Swal.fire(`Success`, "Deleted Successfully!", "success");
						mutate();
						return;
					},
					onRowUpdate: async (newData: any) => {
						const res = await change(`users/${newData?.id}`, {
							method: "PATCH",
							body: {
								isOfficeAccessGranted:
									newData?.isOfficeAccessGranted === "true" ? true : false,
							},
						});
						console.log(res);
						mutate();
						if (res?.status !== 200) {
							Swal.fire(`Error`, "Something went wrong!", "error");
							return;
						}
						Swal.fire(`Success`, "Updated Successfully!", "success");
						return;
					},
				}}
			/>
		</section>
	);
};

export default AllLeaveRequests;
