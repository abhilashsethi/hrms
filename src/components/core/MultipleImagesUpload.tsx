import { CloudUpload } from "@mui/icons-material";
import React, { useRef, useState } from "react";

interface Props {
	children?: JSX.Element;
	setImageValues?: any;
	imagePreviewUrls?: any;
}

const MultipleImagesUpload = ({
	children,
	setImageValues,
	imagePreviewUrls,
}: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};
	//   const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

	//   const handleImageChange = (event: any, setFieldValue: any) => {
	//     const files = event.currentTarget.files;
	//     const images = [];
	//     const urls: any = [];
	//     for (let i = 0; i < files.length; i++) {
	//       const file = files[i];
	//       const url = URL.createObjectURL(file);
	//       images.push(file);
	//       urls.push(url);
	//     }
	//     setFieldValue("images", images);
	//     setImagePreviewUrls(urls);
	//   };
	return (
		<div className="w-full">
			<p className="text-theme font-semibold my-2">Upload Images</p>
			<div
				onClick={handleClick}
				className="min-h-40 py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
			>
				<input
					ref={inputRef}
					style={{ display: "none" }}
					accept="image/*"
					type="file"
					multiple
					//   onChange={(event) => handleImageChange(event, setFieldValue)}
					onChange={(event) => setImageValues(event)}
				/>
				<div className="text-red-600">{children}</div>
				<div className="flex gap-4 flex-wrap px-4 pb-6 justify-center rounded-md overflow-hidden">
					{imagePreviewUrls.map((url: any, index: any) => (
						<div key={index} className="h-24 w-24">
							<img
								src={url}
								alt={`image preview ${index}`}
								className="w-20 shadow-lg object-contain"
							/>
						</div>
					))}
				</div>
				<p>Upload Images (200 * 300)</p>
				<CloudUpload fontSize="large" color="primary" />
			</div>
		</div>
	);
};

export default MultipleImagesUpload;
