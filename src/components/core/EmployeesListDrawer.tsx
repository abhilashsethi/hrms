import { EmailRounded } from "@mui/icons-material";
import React from "react";
import PhotoViewer from "./PhotoViewer";

interface ARRAY {
	id?: string | number;
	name?: string;
	email?: string;
	photo?: string | undefined;
}

interface Props {
	data?: ARRAY[];
}

const EmployeesListDrawer = ({ data }: Props) => {
	return (
		<div className="mt-4 flex flex-col gap-2">
			{data?.map((item) => (
				<div
					key={item?.id}
					className="h-24 w-full border-[1px] rounded-lg flex gap-3 items-center px-4"
				>
					<PhotoViewer name={item?.name} photo={item?.photo} />
					<div>
						<p className="font-semibold">{item?.name}</p>
						<p className="text-sm flex items-center gap-2 mt-1">
							<EmailRounded fontSize="small" /> {item?.email}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default EmployeesListDrawer;
