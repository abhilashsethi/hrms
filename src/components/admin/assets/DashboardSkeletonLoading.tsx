import { DEFAULTIMG } from "assets/home";
import { PhotoViewer } from "components/core";
import moment from "moment";

const DashboardSkeletonLoading = () => {
	return (
		<>
			<div className="w-full bg-white py-4 px-4 border-t-[1px] shadow-sm">
				<div className="flex gap-4 tracking-wide items-center">
					<div className="md:h-20 h-14 md:w-20 w-14 rounded-xl flex justify-center items-center shadow-lg">
						<PhotoViewer
							size="3.5rem"
							photo={DEFAULTIMG.src}
							name={"YardOne"}
						/>
					</div>
					<div className="flex flex-col md:gap-2 gap-1">
						<span className="md:text-xl text-lg font-semibold text-gray-900"></span>
						<span className="text-sm md:text-base">
							{moment(new Date()).format("lll")}
						</span>
					</div>
				</div>
			</div>
			<div className="grid gap-4">
				<div className="flex md:flex-row flex-col gap-4 px-2">
					<div className="py-2 shadow-lg rounded-lg px-2 md:w-3/4 w-full animate-pulse">
						<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-3">
							<div className="w-full h-36 rounded bg-gray-500"></div>
							<div className="w-full h-36 rounded bg-gray-500"></div>
							<div className="w-full h-36 rounded bg-gray-500"></div>
							<div className="w-full h-36 rounded bg-gray-500"></div>
						</div>
						<div className="grid md:grid-cols-7 grid-cols-2 gap-2 justify-items-center w-full">
							<div className="w-12 h-12 bg-gray-500 rounded animate-pulse md:mx-0 mx-2"></div>
							<div className="w-12 h-12 bg-gray-500 rounded animate-pulse md:mx-0 mx-2"></div>
							<div className="w-12 h-12 bg-gray-500 rounded animate-pulse md:mx-0 mx-2"></div>
							<div className="w-12 h-12 bg-gray-500 rounded animate-pulse md:mx-0 mx-2"></div>
							<div className="w-12 h-12 bg-gray-500 rounded animate-pulse md:mx-0 mx-2"></div>
							<div className="w-12 h-12 bg-gray-500 rounded animate-pulse md:mx-0 mx-2"></div>
							<div className="w-12 h-12 bg-gray-500 rounded animate-pulse md:mx-0 mx-2"></div>
						</div>
					</div>
					<div className="md:w-1/4 w-full h-72 rounded bg-gray-500 animate-pulse"></div>
				</div>
				<div className="grid animate-pulse lg:grid-cols-2 content-between gap-6 px-2">
					<div className="w-full h-96 rounded bg-gray-500"></div>
					<div className="w-full h-96 rounded bg-gray-500"></div>
				</div>
			</div>
		</>
	);
};

export default DashboardSkeletonLoading;
