import { Download, Visibility } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import ViewAssetDetailsDrawer from "components/drawer/ViewAssetDetailsDrawer";
import { useAuth, useChange, useFetch } from "hooks";
import moment from "moment";
import { useState } from "react";
import Slider from "react-slick";
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
const MyAssetsGrid = ({ data, mutate }: Props) => {
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

export default MyAssetsGrid;
const MoreOption = ({ item, mutate }: any) => {
	const [assetDetails, setAssetDetails] = useState(false);

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

	const {
		data: assignId,
		isLoading: returnLoading,
		mutate: returnMutate,
	} = useFetch<any>(`assets/all/return/asset/${assetId}`);

	return (
		<>
			<ViewAssetDetailsDrawer
				open={assetDetails}
				onClose={() => setAssetDetails(false)}
				assetId={assetId}
				mutate={mutate}
			/>

			{
				<div key={item?.id} className="mb-4 w-full">
					<div
						className="relative group h-full w-full border-2 border-gray-200 
              border-opacity-60 rounded-lg overflow-hidden shadow-lg"
					>
						{item?.Asset?.isAssign ? (
							<p className="absolute top-2 z-50 rounded-r-xl bg-green-500 text-white text-sm px-2 pr-3 py-1 font-semibold">
								Assigned
							</p>
						) : (
							<p className="absolute top-2 z-50 rounded-r-xl bg-yellow-500 text-white text-sm px-2 pr-3 py-1 font-semibold">
								Not Assigned
							</p>
						)}
						{item?.Asset?.photos?.length ? (
							item?.Asset?.photos?.length > 1 ? (
								<>
									<Slider {...settings} className="">
										{item?.Asset?.photos?.map((data: any, k: any) => (
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
									{item?.Asset?.photos?.map((data: any, k: any) => (
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
								src="/no_IMG.jpg"
								alt="Branch"
							/>
						)}
						<div className="py-1 pt-2 px-4">
							<h1
								className="inline-block py-1 title-font text-xl font-extrabold 
                  text-gray-800 tracking-wide cursor-pointer"
							>
								{item?.Asset?.name}
							</h1>

							<p className="text-gray-500 flex items-start">
								<span className="group flex text-sm text-theme items-center justify-center gap-2">
									<span className="group flex items-center justify-center gap-2">
										<span className="font-semibold">Model Number </span>
									</span>
									<span className="text-gray-500">
										{item?.Asset?.modelName}
									</span>
								</span>
							</p>

							<p className="text-gray-500 flex items-start">
								<span className="group flex text-sm text-theme items-center justify-center gap-2">
									<span className="group flex items-center justify-center gap-2">
										<span className="font-semibold">Brand Name </span>
									</span>
									<span className="text-gray-500">
										{item?.Asset?.brandName || "---"}
									</span>
								</span>
							</p>
							<p className="text-sm text-slate-600 font-medium flex items-center gap-3">
								<span className="group flex text-sm text-theme items-center justify-center gap-2">
									<span className="group flex items-center justify-center gap-2">
										<span className="font-semibold">Sl.No </span>
									</span>
									<span className="text-gray-500">
										{item?.Asset?.serialNumber || "---"}
									</span>
								</span>
							</p>

							<div className="flex bottom-0 ">
								{item?.Asset?.isAssign ? (
									<>
										<Tooltip title="Assign Details">
											<div
												onClick={() => {
													setAssetDetails(true),
														setAssetId(item?.Asset?._id?.$oid);
												}}
												className="cursor-pointer group w-full flex border-2 px-2 py-1 items-center justify-center"
											>
												<Visibility fontSize="small" color="secondary" />
											</div>
										</Tooltip>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			}
		</>
	);
};
