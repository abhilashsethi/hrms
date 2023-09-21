import { Add, Delete } from "@mui/icons-material";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { IMG, PDF } from "assets/home";
import { RenderIconRow } from "components/common";
import { HeadText, PhotoViewer, ReverseIOSSwitch } from "components/core";
import { TicketAddDocumentDialogue } from "components/dialogues";
import { useChange } from "hooks";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Tickets } from "types";
import TicketDetailsSkeletonLoading from "./TicketDetailsSkeletonLoading";
interface Props {
	ticketsData?: Tickets;
	ticketLoading?: any;
	mutateTicket?: any;
}
const ClientChats = ({ ticketsData, mutateTicket, ticketLoading }: Props) => {
	const [getDocument, setGetDocument] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [tickets, setTickets] = useState(false);
	const { change } = useChange();
	const handleResolved = async (
		e?: ChangeEvent<HTMLInputElement>,
		id?: string
	) => {
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
				const res = await change(`tickets/${id}`, {
					method: "PATCH",
					body: { isResolved: e && !e.target?.checked },
				});
				mutateTicket();
				if (res?.status !== 200) {
					Swal.fire(`Error`, "Something went wrong!", "error");
					return;
				}
				Swal.fire(`Success`, "Status updated successfully!!", "success");
				return;
			}
		});
	};

	return (
		<section className="w-full p-4 rounded-lg bg-white shadow-xl">
			<TicketAddDocumentDialogue
				open={getDocument}
				handleClose={() => setGetDocument(false)}
				ticketsData={ticketsData}
				mutate={mutateTicket}
			/>
			<HeadText title="Details" />
			{ticketLoading ? (
				<TicketDetailsSkeletonLoading />
			) : (
				<>
					<div className="md:flex items-center gap-4">
						<div className="my-2">
							<PhotoViewer
								photo={ticketsData?.client?.photo}
								name={ticketsData?.client?.name}
								size="5.5rem"
							/>
						</div>
						<div className="tracking-wide w-full h-full">
							<p className="text-md text-slate-600 font-medium mt-1">
								{ticketsData?.client?.name}
							</p>

							<p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
								<RenderIconRow value={ticketsData?.client?.email} isEmail />
							</p>
							<p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
								<RenderIconRow value={ticketsData?.client?.phone} isPhone />
							</p>
						</div>
					</div>
					<div className="font-semibold my-3">
						Support Title :{"  "}
						<span className="font-medium text-gray-600">
							{ticketsData?.title}
						</span>
					</div>
					<div className="font-semibold mt-3">Support Description :</div>
					<p className="text-gray-600 font-medium text-sm">
						{ticketsData?.description}
					</p>
					<div className="flex items-center mt-3 gap-3">
						<div className="font-semibold ">Issue Resolved :</div>
						<div>
							<ReverseIOSSwitch
								checked={ticketsData?.isResolved}
								onChange={(e) => handleResolved(e, ticketsData?.id)}
							/>
						</div>
					</div>

					<div className="flex justify-between">
						<p className="font-semibold mt-3 mb-2">Documents</p>
						<Tooltip title="Add more">
							<button className="mt-5 bg-white text-theme hover:scale-95 transition duration-300 ease-in-out hover:bg-theme hover:text-white border border-theme rounded-lg px-4">
								<Add
									onClick={() => setGetDocument((prev) => !prev)}
									className=""
								/>
							</button>
						</Tooltip>
					</div>
					{ticketsData?.documents?.length ? (
						<>
							<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-6">
								{ticketsData?.documents?.map((docData) => (
									<div key={docData?.docId} className="cursor-pointer">
										<a href={docData?.link}>
											<img
												className="w-12"
												src={docData?.filetype === "pdf" ? PDF.src : IMG.src}
												alt=""
											/>
										</a>
										<p className="text-xs">doc_1002...</p>
										<DeleteButton
											id={docData?.docId}
											mutateTicket={mutateTicket}
											ticketsData={ticketsData}
										/>
									</div>
								))}
							</div>
						</>
					) : (
						<div className="grid gap-1 justify-items-center">
							<p>No Document</p>
							<Button
								variant="contained"
								startIcon={<Add />}
								onClick={() => setGetDocument((prev) => !prev)}
								className="!bg-theme text-white font-semibold tracking-wide hover:scale-95 transition duration-300 ease-in-out"
							>
								Add Document
							</Button>
						</div>
					)}
				</>
			)}
		</section>
	);
};

export default ClientChats;

interface ButtonProps {
	id?: string | null | undefined;
	mutateTicket?: any;
	ticketsData?: Tickets;
}

const DeleteButton = ({ id, mutateTicket, ticketsData }: ButtonProps) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const handleDelete = (id: any) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to delete!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			try {
				setLoading(true);
				if (result.isConfirmed) {
					Swal.fire(`Info`, "It will take some time", "info");
					const response = await change(
						`tickets/remove-doc/${ticketsData?.id}`,
						{
							method: "DELETE",
							body: { documentId: id },
						}
					);
					setLoading(false);
					if (response?.status !== 200) {
						Swal.fire("Error", "Something went wrong!", "error");
					}
					mutateTicket();
					Swal.fire("Success", "Deleted successfully!", "success");
				}
			} catch (error) {
				if (error instanceof Error) {
					Swal.fire(`Error`, error?.message, `error`);
				} else {
					Swal.fire(`Error`, "Something Went Wrong", `error`);
				}
				setLoading(false);
			} finally {
				setLoading(false);
			}
		});
	};
	return (
		<Button
			onClick={() => {
				// setActiveId(item?.id);
				handleDelete(id);
			}}
			disabled={loading}
			variant="contained"
			className="!bg-red-500 text-xs"
			startIcon={loading ? <CircularProgress size={20} /> : <Delete />}
			size="small"
		>
			DELETE
		</Button>
	);
};
