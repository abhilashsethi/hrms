import { DeleteRounded, Edit } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { UpdateDepartment } from "components/dialogues";
import UpdateAssets from "components/dialogues/UpdateAssets";
import { DepartmentInformation } from "components/drawer";
import { useChange } from "hooks";
import { useState } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
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
				<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 items-center justify-center">
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
	const [loading, setLoading] = useState(false);
	const [isInfo, setIsInfo] = useState<{ dialogue?: boolean; role?: any }>({
		dialogue: false,
		role: null,
	});
	const { change } = useChange();
	const [isUpdate, setIsUpdate] = useState<any>({
		dialogue: false,
		departmentData: null,
	});

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
				Swal.fire("", "Please Wait...", "info");
				try {
					Swal.fire(`Info`, "It will take some time", "info");
					const res = await change(`departments/${id}`, { method: "DELETE" });
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
			}
		});
	};
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
				Swal.fire(`Success`, "User Blocked successfully!!", "success");
				return;
			}
		});
	};

	return (
		<>
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

			<div key={item?.id} className="mb-4 w-full">
				<div
					className="group h-full w-full border-2 border-gray-200 
                border-opacity-60 rounded-lg overflow-hidden shadow-lg"
				>
					{item?.photos?.length > 1 ? (
						<>
							<Slider {...settings} className="">
								{item?.photos?.map((data: any, k: any) => (
									<img
										key={k}
										className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
										src={data?.photo}
										alt="blog"
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
									src={data?.photo}
									alt="blog"
								/>
							))}
						</>
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
								<span className="group flex items-center justify-center gap-2">
									{/* <img src={MANAGER.src} className="w-8 pr-2" alt="" /> */}
									<span className="font-semibold">Model No : </span>
								</span>
								<span className="text-gray-500">{item?.modelNo}</span>
							</span>
						</p>
						<p className="text-gray-500 flex items-start">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									{/* <img src={MANAGER.src} className="w-8 pr-2" alt="" /> */}
									<span className="font-semibold">Brand Name : </span>
								</span>
								<span className="text-gray-500">
									{item?.brand ? item?.brand : "---"}
								</span>
							</span>
						</p>

						<p className="text-gray-500 flex items-start">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									{/* <img src={MANAGER.src} className="w-8 pr-2" alt="" /> */}
									<span className="font-semibold">Date Of Purchase : </span>
								</span>
								<span className="text-gray-500">{item?.dateOfPurchase}</span>
							</span>
						</p>
						<p className="text-sm text-slate-600 font-medium py-1 flex items-center gap-3">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									{/* <img src={MANAGER.src} className="w-8 pr-2" alt="" /> */}
									<span className="font-semibold">Bill amount : </span>
								</span>
								<span className="text-gray-500">{item?.billAmount}</span>
							</span>
						</p>
						<p className="text-sm text-slate-600 font-medium py-1 flex items-center gap-3">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									{/* <img src={MANAGER.src} className="w-8 pr-2" alt="" /> */}
									<span className="font-semibold">Current Market Price : </span>
								</span>
								<span className="text-gray-500">{item?.currentMp}</span>
							</span>
						</p>
						<p className="text-sm text-slate-600 font-medium py-1 flex items-center gap-3">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									{/* <img src={MANAGER.src} className="w-8 pr-2" alt="" /> */}
									<span className="font-semibold">Sl.No : </span>
								</span>
								<span className="text-gray-500">{item?.slNo}</span>
							</span>
						</p>
						<p className="text-sm text-slate-600 font-medium py-1 flex items-center gap-3">
							<span className="group flex text-sm text-theme items-center justify-center gap-2">
								<span className="group flex items-center justify-center gap-2">
									{/* <img src={MANAGER.src} className="w-8 pr-2" alt="" /> */}
									<span className="font-semibold">Docs : </span>
								</span>
								{item?.docs}
							</span>
						</p>

						<div className="flex bottom-0 ">
							<Tooltip title="Delete Asset">
								<span className="cursor-pointer group w-full flex border-2 px-2 py-1 items-center justify-center">
									<DeleteRounded fontSize="small" color="error" />
								</span>
							</Tooltip>
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
							{/* <div className="group w-full gap-2 flex border-2 px-2 py-1 items-center justify-center ">
								<p className="font-semibold tracking-wide text-sm">STATUS</p>
								<ReverseIOSSwitch
									size="small"
									checked={item?.isBlocked}
									onChange={(e) => handleBlock(e, item?.id)}
								/>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
