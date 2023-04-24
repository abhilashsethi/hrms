import { useFetch } from "hooks";

interface Props {
  userId?: any;
}
const CardNameComponent = ({ userId }: Props) => {
  const { data } = useFetch<{ name: string }>(`users/${userId}`);

  return (
    <>
      {data?.name ? (
        <span className="py-1 px-3 tracking-wide">{data.name}</span>
      ) : (
        <span>Not Assigned</span>
      )}
    </>
  );
};

export default CardNameComponent;
