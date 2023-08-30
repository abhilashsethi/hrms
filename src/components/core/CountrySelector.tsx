// import { countries } from "configs";

import { countries } from "schemas/Countries";

const CountrySelector = ({
	name,
	onChange,
	onBlur,
	value,
	defaultValue,
	className,
}: any) => {
	return (
		<>
			<select
				defaultValue={defaultValue}
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				id=""
				className={`flex w-full gap-3 rounded-lg border  p-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${className}`}
			>
				{countries.map((item, index) => (
					<option key={index} value={item.phone}>
						+ {item.phone}
					</option>
				))}
			</select>
		</>
	);
};

export default CountrySelector;

// interface CountryType {
//   code: string;
//   label: string;
//   phone: string;
//   suggested?: boolean;
// }
