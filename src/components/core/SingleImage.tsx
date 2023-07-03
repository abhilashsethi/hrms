import { Update } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useRef, useState } from "react";

interface Props {
	values?: any;
	setImageValue?: any;
	children?: JSX.Element;
}

const SingleImage = ({ values, setImageValue, children }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

	// const handleImageChange = (event: any, setFieldValue: any) => {
	// 	const files = event.currentTarget.files;
	// 	const images = [];
	// 	const urls: any = [];
	// 	for (let i = 0; i < files.length; i++) {
	// 		const file = files[i];
	// 		const url = URL.createObjectURL(file);
	// 		images.push(file);
	// 		urls.push(url);
	// 	}
	// 	setFieldValue("images", images);
	// 	setImagePreviewUrls(urls);
	// };

	return (
		<div className="w-full">
			{/* <p className="text-theme font-semibold my-2">Upload Image</p> */}
			<div
				onClick={handleClick}
				className="h-32 py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
			>
				<div className="">
					<input
						ref={inputRef}
						type="file"
						multiple
						accept="image/*"
						style={{ display: "none" }}
						onChange={
							(event: any) => setImagePreviewUrls(event.currentTarget.files)
							// setImageValue(event)
						}
					/>
					<div className="text-red-500">{children}</div>

					{/* {console.log({ value: values?.logo })} */}
					{imagePreviewUrls?.length &&
						imagePreviewUrls?.map((item: any) => (
							<img
								className="w-24 object-contain"
								src={URL?.createObjectURL(item)}
								alt="Preview"
							/>
						))}
				</div>
				{/* <p>Upload Logo</p> */}
				<p>Maximum size : 300KB</p>
				{/* <Button
					variant="contained"
					className="!bg-theme !mt-3"
					startIcon={<Update />}
				>
					UPDATE LOGO
				</Button> */}
			</div>
		</div>
	);
};

export default SingleImage;
