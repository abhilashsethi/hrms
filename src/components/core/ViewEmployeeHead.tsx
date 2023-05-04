import { Email, SendRounded, ShoppingBasket } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { RenderIconRow } from "components/common";
import { useFetch } from "hooks";
import { User } from "types";
import EmployeeProfileImage from "./EmployeeProfileImage";
import { ChangeProfile } from "components/dialogues";
import { useState } from "react";
import { useRouter } from "next/router";
import { SelectManager, ViewDocumentDrawer } from "components/drawer";

const ViewEmployeeHead = () => {
	const [document, setDocument] = useState(false);
	const [viewDocument, setViewDocument] = useState<any>(null);

	const router = useRouter();
	const [isProfile, setIsProfile] = useState(false);
	const { data: employData, mutate } = useFetch<User>(
		`users/${router?.query?.id}`
	);
	return (
		<>
			<ChangeProfile
				open={isProfile}
				handleClose={() => setIsProfile(false)}
				mutate={mutate}
			/>
			<div className="w-full bg-blue-100/50 rounded-lg p-8">
				<Grid container spacing={3}>
					<Grid item lg={9}>
						<div className="tracking-wide w-full h-full">
							<p className="font-semibold tracking-wide">{employData?.name}</p>
							<p className="text-sm text-slate-600 font-medium mt-1">
								{employData?.role?.name || "---"}
							</p>
							<p className="text-sm text-slate-600 mt-1 font-bold">
								EMP ID :{" "}
								<span className="text-slate-400">
									{employData?.employeeID || "---"}
								</span>
							</p>
							<p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
								<RenderIconRow value={employData?.email || "---"} isEmail />
							</p>
							<p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
								<RenderIconRow value={employData?.phone || "---"} isPhone />
							</p>
							<p className="mb-2 text-sm group flex items-center gap-2 pb-2 ">
								<ShoppingBasket />{" "}
								<span className=" font-medium">Credit : </span>2
							</p>
						</div>
					</Grid>
					<Grid item lg={3}>
						<div className="w-full h-full flex justify-center items-center">
							<EmployeeProfileImage employData={employData} mutate={mutate} />
						</div>
					</Grid>
				</Grid>
				<div className="flex justify-between items-center pt-4">
					{/* <p className="font-medium text-sm">
    <span className="font-extrabold pr-2">16</span> PROJECTS
    COMPLETED
  </p>
  <p className="font-medium text-sm">
    <span className="font-extrabold pr-2">2</span> ONGOING
  </p> */}
					<ViewDocumentDrawer
						open={document}
						onClose={() => setDocument(false)}
						setViewDocument={setViewDocument}
					/>
					<div className="font-medium text-sm">
						<Button
							className="!bg-theme"
							variant="contained"
							startIcon={<SendRounded />}
						>
							Send Message
						</Button>
					</div>
					<div className="font-medium text-sm">
						<Button
							onClick={() => setDocument(true)}
							className="!bg-theme"
							variant="contained"
							startIcon={<Email />}
						>
							Send Mail
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewEmployeeHead;
