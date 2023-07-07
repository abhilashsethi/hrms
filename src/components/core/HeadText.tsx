interface Props {
	title?: string;
	className?: any;
}
const HeadText = ({ title, className }: Props) => {
	return (
		<div className="flex gap-2 items-center">
			<div
				className={`h-3 w-3 rounded-sm  ${
					className ? className : "bg-gradient-to-r from-blue-500 to-blue-300"
				}`}
			></div>
			<p className="font-semibold">{title}</p>
		</div>
	);
};

export default HeadText;
