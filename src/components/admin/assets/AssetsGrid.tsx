import {
	AssignmentInd,
	AssignmentReturn,
	DeleteRounded,
	Download,
	Edit,
	History,
	Visibility,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { LoaderAnime } from "components/core";
import {
	AssignAsset,
	ReturnAsset,
	UpdateDepartment,
} from "components/dialogues";
import ChooseAssetHistory from "components/dialogues/ChooseAssetHistory";
import UpdateAssets from "components/dialogues/UpdateAssets";
import { DepartmentInformation } from "components/drawer";
import ViewAssetDetailsDrawer from "components/drawer/ViewAssetDetailsDrawer";
import ViewAssetHistoryDrawer from "components/drawer/ViewAssetHistoryDrawer";
import { useAuth, useChange, useFetch } from "hooks";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { deleteFile } from "utils";
interface Props {
	data?: any;
	mutate?: any;
}
const settings = {
	dots: false,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	speed: 400,
	cssEase: "linear",
	autoplaySpeed: 3000,
	pauseOnHover: false,
	arrows: false,
	responsive: [
		{
			breakpoint: 940,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: false,
			},
		},
		{
			breakpoint: 760,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: false,
			},
		},
	],
};
const AssetsGrid = ({ data, mutate }: Props) => {
	return (
		<>
			<section className="py-6 ">
				<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 items-center justify-center">
					{data?.map((item: any, index: any) => (
						<div key={index}>
							<MoreOption item={item} mutate={mutate} />
						</div>
					))}
				</div>
			</section>
		</>
	);
};

export default AssetsGrid;
const MoreOption = ({ item, mutate }: any) => {
	const [assetHistory, setAssetHistory] = useState(false);
	const [assetDetails, setAssetDetails] = useState(false);
	const [isView, setIsView] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isInfo, setIsInfo] = useState<{ dialogue?: boolean; role?: any }>({
		dialogue: false,
		role: null,
	});
	const [assetId, setAssetId] = useState(false);
	const { change } = useChange();
	const [isUpdate, setIsUpdate] = useState<{
		dialogue?: boolean;
		assetData?: string | null;
	}>({ dialogue: false, assetData: null });
	const [isReturn, setIsReturn] = useState<{
		dialogue?: boolean;
		assetData?: string | null;
	}>({ dialogue: false, assetData: null });
	const [isAssign, setIsAssign] = useState<{
		dialogue?: boolean;
		assetData?: string | null;
	}>({ dialogue: false, assetData: null });
	const { user } = useAuth();

	const { data: assignId, isLoading: returnLoading, mutate: returnMutate } = useFetch<any>(
		`assets/all/return/asset/${assetId}`
	);
	const handleDelete = async (id: string) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to delete?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setLoading(true);
				try {
					Swal.fire(`Info`, "It will take some time", "info");
					const res = await change(`assets/${id}`, { method: "DELETE" });
					const photoPaths = item?.photos;
					if (photoPaths && photoPaths.length > 0) {
						photoPaths.forEach(async (path: any) => {
							await deleteFile(String(path));
						});
					}
					const docsPaths = item?.docs;
					if (docsPaths && docsPaths.length > 0) {
						docsPaths.forEach(async (path: any) => {
							await deleteFile(String(path));
						});
					}
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
					Swal.fire(`Success`, `Deleted Successfully!`, `success`);
					mutate();
					return;
				} catch (error) {
					console.log(error);
					setLoading(false);
				} finally {
					setLoading(false);
				}
			}
		});
	};
	const handelReturn = async (item: any) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to Return?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Return!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setLoading(true);
				try {
					Swal.fire("", "Please Wait...", "info");
					const res = await change(`assets/asset/return/${item?.id}`, {
						method: "PATCH",
						body: { isReturn: true },
					});
					console.log(res);
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
					setIsReturn({ dialogue: true, assetData: item });
					mutate();
					return;
				} catch (error) {
					console.log(error);
					setLoading(false);
				} finally {
					setLoading(false);
				}
			}
		});
	};
	return (
		<>
			<ChooseAssetHistory
				open={isView}
				handleClose={() => setIsView(false)}
				mutate={mutate}
			/>
			<ReturnAsset
				assetData={isReturn?.assetData}
				open={isReturn?.dialogue}
				handleClose={() => setIsReturn({ dialogue: false })}
				mutate={returnMutate}
				assignMutate={mutate}
			/>
			<AssignAsset
				assetData={isAssign?.assetData}
				open={isAssign?.dialogue}
				handleClose={() => setIsAssign({ dialogue: false })}
				mutate={mutate}
			/>
			<UpdateAssets
				assetData={isUpdate?.assetData}
				open={isUpdate?.dialogue}
				handleClose={() => setIsUpdate({ dialogue: false })}
				mutate={mutate}
			/>
			<DepartmentInformation
				open={isInfo?.dialogue}
				onClose={() => setIsInfo({ dialogue: false })}
				roleId={isInfo?.role?.id}
			/>
			<ViewAssetHistoryDrawer
				open={assetHistory}
				onClose={() => setAssetHistory(false)}
				assetId={assetId}
				data={assignId}
				isLoading={returnLoading}
			/>
			<ViewAssetDetailsDrawer
				open={assetDetails}
				onClose={() => setAssetDetails(false)}
				assetId={assetId}
				mutate={mutate}
			/>

			<div key={item?.id} className="mb-4 w-full">
				<div
					className="relative group h-full w-full border-2 border-gray-200 
                border-opacity-60 rounded-lg overflow-hidden shadow-lg"
				>
					{item?.isAssign ? (
						<p className="absolute top-2 z-50 rounded-r-xl bg-green-500 text-white text-sm px-2 pr-3 py-1 font-semibold">
							Assigned
						</p>
					) : (
						<p className="absolute top-2 z-50 rounded-r-xl bg-yellow-500 text-white text-sm px-2 pr-3 py-1 font-semibold">
							Not Assigned
						</p>
					)}
					{item?.photos?.length ? (
						item?.photos?.length > 1 ? (
							<>
								<Slider {...settings} className="">
									{item?.photos?.map((data: any, k: any) => (
										<img
											key={k}
											className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
											src={data}
											alt="Branch"
										/>
									))}
								</Slider>
							</>
						) : (
							<>
								{item?.photos?.map((data: any, k: any) => (
									<img
										key={k}
										className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
										src={data}
										alt="Branch"
									/>
								))}
							</>
						)
					) : (
						<img
							className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
							src="https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
							alt="Branch"
						/>
					)}
					<div className="py-1 pt-2 px-4">
						<h1
							className="inline-block py-1 title-font text-xl font-extrabold 
                    text-gray-800 tracking-wide cursor-pointer"
						>
							{item?.name}
						</h1>
						<p className="text-gray-500 flex items-start">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-1">
									<span className="font-semibold">Branch Name </span>
								</span>
								<span className="text-gray-500">
									{item?.assetOfBranch?.name || "___"}
								</span>
							</span>
						</p>
						<p className="text-gray-500 flex items-start">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									<span className="font-semibold">Model Number </span>
								</span>
								<span className="text-gray-500">{item?.modelName}</span>
							</span>
						</p>
						<p className="text-gray-500 flex items-start">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									<span className="font-semibold">Brand Name </span>
								</span>
								<span className="text-gray-500">
									{item?.brandName || "---"}
								</span>
							</span>
						</p>
						<p className="text-sm text-slate-600 font-medium flex items-center gap-3">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									<span className="font-semibold">Sl.No </span>
								</span>
								<span className="text-gray-500">
									{item?.serialNumber || "---"}
								</span>
							</span>
						</p>
						<p className="text-gray-500 flex items-start">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									<span className="font-semibold">Date Of Purchase </span>
								</span>
								<span className="text-gray-500">
									{moment(item?.dateOfPurchase).format("DD/MM/YYYY")}
								</span>
							</span>
						</p>
						<p className="text-sm text-slate-600 font-medium flex items-center gap-3">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									<span className="font-semibold">Bill amount </span>
								</span>
								<span className="text-gray-500">{item?.billAmount}</span>
							</span>
						</p>
						<p className="text-sm text-slate-600 font-medium flex items-center gap-3">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									<span className="font-semibold">Current Market Price </span>
								</span>
								<span className="text-gray-500">{item?.marketPrice}</span>
							</span>
						</p>
						<p className="text-sm text-slate-600 font-medium py-2 flex items-center gap-3">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									<span className="font-semibold">Docs </span>
								</span>
								<div className="grid grid-cols-3 gap-1">
									{item?.docs?.length
										? item?.docs?.map((doc: any, i: any) => {
											return (
												<a
													key={i}
													className="border border-theme rounded-md text-xs p-[2px]"
													href={doc?.link}
												>
													Docs <Download fontSize="small" />
												</a>
											);
										})
										: "---"}
								</div>
							</span>
						</p>

						<div className="flex bottom-0 ">
							{user?.role?.name == "CEO" || user?.role?.name == "HR" ?
								<Tooltip title="Delete Asset">
									<span
										onClick={() => handleDelete(item?.id)}
										className="cursor-pointer group w-full flex border-2 px-2 py-1 items-center justify-center"
									>
										<DeleteRounded fontSize="small" color="error" />
									</span>
								</Tooltip> : null}
							{item?.isAssign ? (
								<>
									<Tooltip title="Assign Details">
										<div
											onClick={() => {
												setAssetDetails(true), setAssetId(item?.id);
											}}
											className="cursor-pointer group w-full flex border-2 px-2 py-1 items-center justify-center"
										>
											<Visibility fontSize="small" color="secondary" />
										</div>
									</Tooltip>
									{user?.role?.name == "CEO" || user?.role?.name == "HR" ?
										<Tooltip title="Return Asset">
											<span
												onClick={() => {
													handelReturn(item);
												}}
												className="cursor-pointer group w-full flex border-2 px-2 py-1 items-center justify-center"
											>
												<AssignmentReturn fontSize="small" color="secondary" />
											</span>
										</Tooltip> : null}
								</>
							) : (
								<>
									{user?.role?.name == "CEO" || user?.role?.name == "HR" ?
										<Tooltip title="Assign Employee">
											<span
												onClick={() => {
													setIsAssign({ dialogue: true, assetData: item });
												}}
												className="cursor-pointer group w-full flex border-2 px-2 py-1 items-center justify-center"
											>
												<AssignmentInd fontSize="small" color="secondary" />
											</span>
										</Tooltip> : null}
								</>
							)}
							{user?.role?.name == "CEO" || user?.role?.name == "HR" ?
								<>
									<Tooltip title="Edit Asset">
										<span
											onClick={() => {
												setIsUpdate({ dialogue: true, assetData: item });
											}}
											className="cursor-pointer group w-full flex border-2 px-2 py-1 items-center justify-center"
										>
											<Edit color="primary" fontSize="small" />
										</span>
									</Tooltip>
									<Tooltip title="History of Asset">
										<span
											onClick={() => {
												setAssetHistory(true);
												setAssetId(item?.id);
											}}
											className="cursor-pointer group w-full flex border-2 px-2 py-1 items-center justify-center"
										>
											<History color="primary" fontSize="small" />
										</span>
									</Tooltip>
								</> : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
