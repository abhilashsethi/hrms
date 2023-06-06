interface Props {
  children?: JSX.Element | any;
  title?: string | null;
}
const TenderLayout = ({ children, title = "Add Title" }: Props) => {
  return (
    <div className=" relative w-full border-[1px] border-theme mt-4 rounded-b-md p-4">
      <span className="px-4 py-2 top-[-40px] rounded-t-md left-[-1px] absolute bg-theme text-white tracking-wide">
        {title}
      </span>
      {children}
    </div>
  );
};

export default TenderLayout;
