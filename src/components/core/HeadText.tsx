interface Props {
  title?: string;
}
const HeadText = ({ title }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="h-3 w-3 rounded-sm bg-theme"></div>
      <p className="font-semibold">{title}</p>
    </div>
  );
};

export default HeadText;
