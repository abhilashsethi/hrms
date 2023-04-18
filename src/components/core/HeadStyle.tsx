type Props = {
  name: string;
  icon?: any;
};

const Title = ({ name, icon }: Props) => {
  return (
    <h2 className="text-lg font-bold text-theme flex gap-3 items-center">
      {icon} {name}
    </h2>
  );
};
export default Title;
