import {
	EmailContainer,
	EmailDetailsHeader,
	EmailReplyContainer,
} from "components/email";
import { useFetch, useFetch_Fun } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useRef } from "react";
import { EmailType } from "types";
import { useReactToPrint } from "react-to-print";
import { EMAILSENT } from "assets/animations";
import Lottie from "react-lottie";
import { LoaderAnime } from "components/core";

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: EMAILSENT,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const ViewEmail = () => {
	const { query } = useRouter();
	const { data, isValidating, error } = useFetch_Fun<EmailType>(
		`emails/${query?.emailId}`
	);
	// let data;
	// let isValidating;
	// let error;

	const printRef = useRef(null);

	const handlePrint = useReactToPrint({
		content: () => printRef?.current,
	});

	console.log("data======>", data);

	return (
		<PanelLayout title="Email | View">
			{isValidating ? (
				<div className="w-full flex items-center min-h-[80vh] justify-center">
					<Lottie
						options={defaultOptions}
						isPaused={false}
						isClickToPauseDisabled={true}
						height={300}
						width={300}
					/>
				</div>
			) : !data?.id ? (
				<div>no data</div>
			) : data?.id ? (
				<>
					<EmailDetailsHeader sentTime={data?.sentAt} print={handlePrint} />
					<section className="w-full my-4 container mx-auto  rounded-md ">
						<EmailContainer data={data} printRef={printRef} />
					</section>
					<EmailReplyContainer data={data} />
				</>
			) : (
				<div className="flex items-center min-h-[80vh] justify-center">
					<LoaderAnime text={error || "No email in draft"} />
				</div>
			)}
		</PanelLayout>
	);
};

export default ViewEmail;
