import { Send } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { PhotoViewer } from "components/core";
import { Form, Formik } from "formik";
import { useAuth, useChange } from "hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import { Tickets } from "types";
import { clock } from "utils";
import ClientChats from "./ClientChats";
interface Props {
	ticketsData?: Tickets;
	ticketLoading?: any;
	mutateTicket?: any;
}
const initialValues = {
	text: "",
};
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const TicketDetails = ({ ticketsData, mutateTicket, ticketLoading }: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { change, isChanging } = useChange();
	const { user } = useAuth();
	const handleSubmit = async (values: any, { resetForm }: any) => {
		setLoading(true);
		try {
			const ticketText = {
				text: values?.text,
				ticketId: router?.query?.id,
				userInfo: {
					id: user?.id,
					name: user?.name,
					photo: user?.photo ? user?.photo : "",
				},
			};
			const res = await change(`ticket-conversations`, {
				body: ticketText,
			});
			setLoading(false);
			if (res?.status !== 201) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
				setLoading(false);
				return;
			}
			mutateTicket();
			Swal.fire(`Success`, `You have successfully Created!`, `success`);
			resetForm();
			return;
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
	};
	return (
		<section className="">
			<div className="grid lg:grid-cols-3 gap-4">
				<div className="lg:col-span-2">
					<div className="w-full bg-white shadow-xl rounded-lg p-8 mt-4">
						<div className="flex items-center gap-2 -ml-5">
							<div className="h-3 w-3 rounded-sm bg-theme"></div>
							<p className="font-bold tracking-wide">Conversations</p>
						</div>
						<div className="grid">
							<div className="flex flex-col gap-1 mt-4 max-h-[20rem] overflow-y-auto">
								{ticketLoading ? (
									<p>Loading Please wait .....</p>
								) : (
									<>
										{ticketsData?.conversations?.length ? (
											<>
												{ticketsData?.conversations
													?.sort(
														(a: any, b: any) =>
															(new Date(b?.createdAt) as any) -
															(new Date(a?.createdAt) as any)
													)
													?.map((item: any, i) => (
														<div
															key={i}
															className="flex gap-3 py-3 px-1 border-b-[1px]"
														>
															<div className="flex justify-start items-center">
																<div className=" bg-theme-100 rounded-full flex justify-center items-center">
																	<PhotoViewer
																		photo={item?.userInfo?.photo}
																		name={item?.userInfo?.name}
																		size="3rem"
																	/>
																</div>
															</div>
															<div className="w-full">
																<div className="md:flex grid gap-1 w-full justify-between pr-3 items-center">
																	<p className="text-sm font-semibold tracking-wide">
																		{item?.userInfo?.name}
																	</p>
																	<p className="pr-3 text-xs font-semibold text-gray-500 tracking-wide">
																		{clock(item?.createdAt).fromNow()}
																	</p>
																</div>
																<p className="text-sm text-justify break-all">
																	<div
																		dangerouslySetInnerHTML={{
																			__html: `${item?.text}`,
																		}}
																	></div>
																</p>
															</div>
														</div>
													))}{" "}
											</>
										) : (
											<p>No conversation</p>
										)}
									</>
								)}
							</div>
						</div>
					</div>
					<Formik initialValues={initialValues} onSubmit={handleSubmit}>
						{({ values, handleBlur, setFieldValue, setFieldTouched }) => (
							<Form>
								<div className="mt-8">
									<ReactQuill
										placeholder="Reply message ..."
										theme="snow"
										value={values.text}
										onChange={(value) => setFieldValue("text", value)}
										onBlur={() => setFieldTouched("text", true)}
										className="lg:h-[150px] w-full bg-white"
									/>
									<div className="flex md:pt-0 pt-4 justify-end items-end w-full pr-2">
										<Button
											type="submit"
											variant="contained"
											className="!bg-emerald-500"
											disabled={loading}
											startIcon={
												loading ? <CircularProgress size={20} /> : <Send />
											}
											size="small"
										>
											Send Message
										</Button>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<div className="w-full py-4 h-full">
					<ClientChats
						ticketsData={ticketsData}
						ticketLoading={ticketLoading}
						mutateTicket={mutateTicket}
					/>
				</div>
			</div>
		</section>
	);
};

export default TicketDetails;
