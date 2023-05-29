import { NORESULTS } from "assets/animations";
import React from "react";
import Lottie from "react-lottie";
interface Props {
	image?: any;
	animeHight?: number;
	animeWidth?: number;
	text?: string;
}
const LoaderAnimeLarge = ({
	image,
	animeHight,
	animeWidth,
	text,
}: Props) => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: image ? image : NORESULTS,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<div className=" w-full flex flex-col justify-center items-center">
			<div className="">
				<Lottie
					options={defaultOptions}
					height={animeHight ? animeHight : 250}
					width={animeWidth ? animeWidth : 250}
				/>
			</div>
			<span className="text-xl capitalize tracking-wide">
				{text ? text : "No result found!"}
			</span>
		</div>
	);
};

export default LoaderAnimeLarge;
