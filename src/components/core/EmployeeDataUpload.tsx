import { CloudUpload } from "@mui/icons-material";
import React, { useRef, useState } from "react";

interface Props {
	values?: any;
	setImageValue?: any;
	children?: JSX.Element;
}

const EmployeeDataUpload = ({ values, setImageValue, children }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<div className="w-full">
			<h1 className="text-lg uppercase md:text-xl lg:text-2xl text-slate-600 flex justify-center font-extrabold py-2">
				Upload File
			</h1>
			<div
				onClick={handleClick}
				className="min-h-40 py-6 w-full border-[1px] rounded-lg bg-theme border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
			>
				<div className="">
					<input
						ref={inputRef}
						type="file"
						accept="image/*|.csv"
						style={{ display: "none" }}
						onChange={(event: any) =>
							//   setFieldValue("image", event.currentTarget.files[0])
							setImageValue(event)
						}
					/>
					<div className="text-red-500">{children}</div>
					{/* {values.image && (
						<img
							className="w-24 object-contain"
							src={URL.createObjectURL(values.image)}
							alt="Preview"
						/>
					)} */}
				</div>
				{/* <p>Upload File (200 * 300)</p> */}
				<p className="font-semibold text-lg text-white">.CSV Type Only</p>
				<CloudUpload fontSize="large" className="text-white" />
			</div>
		</div>
	);
};

export default EmployeeDataUpload;
