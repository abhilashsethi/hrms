import MaterialTable from "@material-table/core";
import { Info, PeopleRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { HeadStyle } from "components/core";
import { DepartmentInformation } from "components/drawer";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Role } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface Props {
	data?: Role[];
	mutate?: any;
}
const AllDepartmentColumn = ({ data, mutate }: Props) => {
	const [loading, setLoading] = useState(false);
	const { change, isChanging } = useChange();
	const [isInfo, setIsInfo] = useState<{ dialogue?: boolean; role?: any }>({
		dialogue: false,
		role: null,
	});
	console.log(data);
	return (
		<section className="mt-8">
			<DepartmentInformation
				open={isInfo?.dialogue}
				onClose={() => setIsInfo({ dialogue: false })}
				roleId={isInfo?.role?.id}
			/>
			<MaterialTable
				title={<HeadStyle name="All Department" icon={<PeopleRounded />} />}
				isLoading={!data}
				data={
					data
						? data?.map((_, i) => ({
								..._,
								sl: i + 1,
								totalMembers: _?._count?.users,
								updatedAt: clock(_.updatedAt).fromNow(),
								createdAt: new Date(_.createdAt).toDateString(),
						  }))
						: []
				}
				options={{ ...MuiTblOptions(), selection: false, paging: false }}
				columns={[
					{
						title: "#",
						field: "sl",
						editable: "never",
						width: "2%",
					},
					{
						title: "Department",
						tooltip: "Department",
						field: "name",
					},
					{
						title: "Total Members",
						tooltip: "Total Members",
						// field: "data._count?.users",
						field: "totalMembers",
						render: (data) => {
							return <div className="">{data?.totalMembers}</div>;
						},
						editable: "never",
					},
					{
						title: "Details",
						field: "name",
						export: false,
						render: (data) => {
							return (
								<Tooltip title="Details">
									<div className="text-sm bg-gradient-to-r from-blue-500 to-blue-400 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
										<IconButton
											onClick={() => setIsInfo({ dialogue: true, role: data })}
										>
											<Info className="!text-white" />
										</IconButton>
									</div>
								</Tooltip>
							);
						},
						editable: "never",
					},
					{
						title: "Last Updated",
						field: "updatedAt",
						render: (data) => {
							return <div className="">{data?.updatedAt}</div>;
						},
						editable: "never",
					},
					{
						title: "Created",
						field: "createdAt",
						render: (data) => {
							return <div className="">{data?.createdAt}</div>;
						},
						editable: "never",
					},
				]}
				editable={{
					onRowDelete: async (oldData) => {
						setLoading(true);
						Swal.fire("", "Please Wait...", "info");
						try {
							const res = await change(`departments/${oldData.id}`, {
								method: "DELETE",
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
							mutate();
							Swal.fire(`Success`, `Deleted Successfully!`, `success`);
							return;
						} catch (error) {
							console.log(error);
							setLoading(false);
						} finally {
							setLoading(false);
						}
					},
					onRowUpdate: async (newData) => {
						const res = await change(`departments/${newData?.id}`, {
							method: "PATCH",
							body: { name: newData?.name },
						});
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

export default AllDepartmentColumn;
const department = [
	{
		id: 0,
		name: "Web Development",
		updatedAt: "25th Aug",
		createdAt: "25th Aug",
	},
	{
		id: 1,
		name: "Application Development",
		updatedAt: "25th Aug",
		createdAt: "25th Aug",
	},
	{
		id: 2,
		name: "IT Management",
		updatedAt: "25th Aug",
		createdAt: "25th Aug",
	},
	{
		id: 3,
		name: "Accounts Management",
		updatedAt: "25th Aug",
		createdAt: "25th Aug",
	},
];
