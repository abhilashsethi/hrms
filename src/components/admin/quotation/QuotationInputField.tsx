import { Add, BorderColor, Delete } from "@mui/icons-material";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { TextField } from "@mui/material";

const QuotationInputField = ({
	name,
	onChange,
	onBlur,
	value,
	title,
	key,
	defaultValue,
	className,
	options,
	error,
	helperText,
	handleClick,
}: any) => {
	// const [inputs, setInputs] = useState([{ value: '', amount: '' }])
	const [isBlur, setIsBlur] = useState(false);
	const [isAmountBlur, setIsAmountBlur] = useState(false);
	return (
		<FormControl fullWidth>
			<div>
				{/* {inputs.map((input, index) => ( */}
				<div className="grid grid-cols-3 gap-3 py-3">
					<div className="flex flex-col">
						<TextField
							name={name}
							size="small"
							onChange={(e) => {
								onChange(e?.target?.value, value);
							}}
							onBlur={() => setIsAmountBlur(true)}
							value={title}
							className="rounded-md border border-black p-1 py-3"
							// value={input.value}
							// onChange={(e) => handleNameChange(index, e)}
							type="text"
							placeholder="Enter Payroll Name"
						/>
						{!value && isBlur ? (
							<FormHelperText className="!text-red-600">
								{helperText}
							</FormHelperText>
						) : null}
					</div>
					<div className="flex flex-col">
						<TextField
							name={name}
							size="small"
							onChange={(e) => {
								onChange(title, e?.target?.value);
							}}
							onBlur={() => setIsAmountBlur(true)}
							value={value}
							className="rounded-md border border-black p-1 py-3"
							type="number"
							placeholder="Enter Amount"
						/>
						{isAmountBlur && !title ? (
							<FormHelperText className="!text-red-600">
								{helperText}
							</FormHelperText>
						) : null}
					</div>
					<div className="flex flex-col">
						<TextField
							name={name}
							size="small"
							onChange={(e) => {
								onChange(title, e?.target?.value);
							}}
							onBlur={() => setIsAmountBlur(true)}
							value={value}
							className="rounded-md border border-black p-1 py-3"
							type="number"
							placeholder="Enter Amount"
						/>
						{isAmountBlur && !title ? (
							<FormHelperText className="!text-red-600">
								{helperText}
							</FormHelperText>
						) : null}
					</div>
				</div>
				{/* ))} */}
			</div>
		</FormControl>
	);
};

export default QuotationInputField;
