type Props = {
  name: string;
  icon?: any;
  className?: string;
};

const Title = ({ name, icon, className }: Props) => {
  return (
    <h2
      className={`md:text-lg text-xs font-bold text-theme md:flex hidden gap-3 items-center ${className}`}
    >
      {icon} {name}
    </h2>
  );
};
export default Title;
