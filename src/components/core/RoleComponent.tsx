import { useFetch } from "hooks";

interface Props {
  roleId?: string;
}
const RoleComponent = ({ roleId }: Props) => {
  const { data } = useFetch<{ name: string }>(`roles/${roleId}`);

  return <span className="py-1 px-3 tracking-wide">{data?.name}</span>;
};

export default RoleComponent;
