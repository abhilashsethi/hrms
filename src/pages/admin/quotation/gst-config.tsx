import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { INVOICE } from "assets/home";
import { AdminBreadcrumbs } from "components/core";
import { EditGSTConfigure } from "components/dialogues";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
const initialValues = {
	gst: "",
	cgst: "",
	sgst: "",
};

const validationSchema = Yup.object().shape({
	gst: Yup.number().required("% For GST is required !"),
	cgst: Yup.number().required("% For CGST is required !"),
	sgst: Yup.number().required("% For SGST is required !"),
});

const GstConfig = () => {
	const { change } = useChange();
	const [loading, setLoading] = useState(false);
	const [additionDetails, setAdditionDetails] = useState<boolean>(false);
	const handleSubmit = async (values: any, { resetForm }: any) => {
		setLoading(true);
		try {
			const res = await change(`payrolls/createPayrollConfig`, {
				body: {
					basicSalary: values?.basicSalary,
					hra: values?.hra,
					pfEmployee: values?.employeePf,
				},
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
			Swal.fire(
				`Success`,
				`Payroll Configuration Set Successfully !`,
				`success`
			);
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<PanelLayout title="GST configure - Admin Panel">
			<EditGSTConfigure
				open={additionDetails}
				handleClose={() => setAdditionDetails(false)}
			/>
			<section className="lg:px-8 px-2 lg:py-4 py-2">
				<div className="px-2 lg:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<div className="w-full h-full flex justify-center items-center">
					<div className="relative w-72 rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl">
						<div className="relative">
							<div className="absolute right-0 rounded-tl-lg top-24 z-50 bg-gradient-to-r from-rose-100 to-teal-100 p-2">
								<div className="flex">
									<Tooltip title="Edit">
										<Avatar
											onClick={() => setAdditionDetails(true)}
											variant="rounded"
											className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-yellow-500 !p-0"
											sx={{
												mr: ".1vw",
												padding: "0px !important",
												backgroundColor: "Highlight",
												cursor: "pointer",
												color: "",
												width: 30,
												height: 30,
											}}
										>
											<Edit
												sx={{ padding: "0px !important" }}
												fontSize="small"
											/>
										</Avatar>
									</Tooltip>
									<Tooltip title="Delete">
										<Avatar
											variant="rounded"
											className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
											sx={{
												mr: "0.1vw",
												padding: "0px !important",
												backgroundColor: "Highlight",
												cursor: "pointer",
												color: "",
												width: 30,
												height: 30,
											}}
										>
											<Delete
												sx={{ padding: "0px !important" }}
												fontSize="small"
												// onClick={() => handleDelete(item?.id)}
											/>
										</Avatar>
									</Tooltip>
								</div>
							</div>
							<div className="flex justify-center bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 py-3 rounded-t-lg w-full border">
								<img src={INVOICE.src} alt="" className="w-24" />
							</div>
							<div className="px-4 bg-gradient-to-r from-rose-100 to-teal-100">
								<div className="mt-3 flex flex-col  justify-start">
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											IGST :
										</p>
										<p className="text-sm md:text-base font-semibold">18%</p>
									</div>
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											CGST :
										</p>
										<p className="text-sm md:text-base text-gray-700 font-semibold">
											9%
										</p>
									</div>
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											SGST :
										</p>
										<p className="text-sm md:text-base text-gray-700">9%</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PanelLayout>
	);
};

export default GstConfig;

const links = [
	// { id: 1, page: "Payroll", link: "/admin/payroll" },
	{ id: 2, page: "Gst Configure", link: "/admin/quotation/gst-config" },
];
