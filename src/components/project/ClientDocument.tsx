import { Add, Close } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { DOC, PDF } from "assets/home";
import { ClientAddDocumentModal } from "components/dialogues";
import { useAuth, useChange } from "hooks";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { deleteFile } from "utils";
interface Props {
	projectData?: any;
	mutate?: any;
}
const initialValues = {
	TechStackIds: "",
};
const ClientDocument = ({ projectData, mutate }: Props) => {
	const { user } = useAuth();
	const [isUpdate, setIsUpdate] = useState(false);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();

	const removeDoc = (item: any) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You want to remove Document!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, remove!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					Swal.fire(`Info`, "It will take some time", "info");
					try {
						const res = await change(
							`projects/delete/client-doc?docId=${item?.id}`,
							{
								method: "DELETE",
							}
						);
						if (item?.link) {
							await deleteFile(String(item?.link?.split("/").reverse()[0]));
						}
						setLoading(false);
						if (res?.status !== 200) {
							Swal.fire(
								"Error",
								res?.results?.msg || "Unable to Delete",
								"error"
							);
							setLoading(false);
							return;
						}
						mutate();
						Swal.fire(`Removed!`, `Technology Deleted Successfully`, `success`);
						return;
					} catch (error) {
						console.log(error);
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<section className="w-full rounded-md p-6 mt-4 bg-white shadow-jubilation">
			<ClientAddDocumentModal
				open={isUpdate}
				projectData={projectData}
				mutate={mutate}
				handleClose={() => setIsUpdate(false)}
			/>
			<>
				{projectData?.clientId ? (
					<>
						<div className="flex justify-between items-center">
							<h1 className="font-semibold text-gray-600 underline">
								Client Document Details
							</h1>
							{(projectData?.technologies?.length &&
								user?.role?.name === "CEO") ||
							user?.role?.name === "CEO" ||
							user?.role?.name === "HR" ||
							user?.role?.name === "COO" ||
							user?.role?.name === "DIRECTOR" ||
							user?.role?.name === "PROJECT MANAGER" ? (
								<Tooltip title="Add Document">
									<IconButton
										onClick={() => setIsUpdate((prev) => !prev)}
										size="small"
									>
										<Add />
									</IconButton>
								</Tooltip>
							) : null}
						</div>

						{projectData?.clientDocs?.length ? (
							<div className="py-4 grid lg:grid-cols-3 gap-3 flex-wrap">
								{projectData?.clientDocs?.map((item: any) => (
									<div
										key={item?.id}
										className="px-4 py-4 relative mt-3 rounded-md shadow-jubilation"
									>
										{user?.role?.name === "CEO" ||
										user?.role?.name === "HR" ||
										user?.role?.name === "DIRECTOR" ||
										user?.role?.name === "COO" ||
										user?.role?.name === "PROJECT MANAGER" ? (
											<div
												onClick={() => removeDoc(item)}
												className="absolute right-[5px] top-[4px] cursor-pointer shadow-md bg-red-500 h-6 w-6 rounded-full flex justify-center items-center"
											>
												<Close className="!text-[1rem] !text-white" />
											</div>
										) : null}
										<div className="grid px-1 pt-2 gap-2 justify-items-center">
											<Link href={item?.link}>
												<img
													className="h-14 object-contain"
													src={DOC.src}
													alt="doc"
												/>
											</Link>
											<h3 className="text-sm font-semibold">{item?.title}</h3>
										</div>
									</div>
								))}
							</div>
						) : (
							<>
								<div className="flex flex-col gap-4 lg:py-12 py-6">
									<h1 className="text-center">No document Added </h1>
									{user?.role?.name === "CEO" ||
									user?.role?.name === "HR" ||
									user?.role?.name === "DIRECTOR" ||
									user?.role?.name === "COO" ||
									user?.role?.name === "PROJECT MANAGER" ? (
										<Button
											size="small"
											fullWidth
											startIcon={<Add />}
											onClick={() => setIsUpdate((prev) => !prev)}
											variant="contained"
											className="!bg-theme !hover:bg-theme-600 !text-white !font-semibold tracking-wide px-2"
										>
											ADD DOCUMENT
										</Button>
									) : null}
								</div>
							</>
						)}
					</>
				) : (
					"Please Add Client in this Project"
				)}
			</>
		</section>
	);
};

export default ClientDocument;
