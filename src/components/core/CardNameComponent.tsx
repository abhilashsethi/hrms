import { useFetch } from "hooks";
import RoleComponent from "./RoleComponent";
import Loader from "./Loader";

interface Props {
  userId?: any;
  isEmail?: boolean;
  isEmpId?: boolean;
  isName?: boolean;
}
const CardNameComponent = ({ userId, isEmail, isEmpId, isName }: Props) => {
  const { data, isLoading } = useFetch<any>(`users/${userId}`);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {!isLoading ? (
        <>
          {isEmail ? (
            <span className="tracking-wide">{data?.email}</span>
          ) : isEmpId ? (
            <span className="tracking-wide">{data?.employeeID}</span>
          ) : isName ? (
            <>
              <p className="py-2 px-3 tracking-wide text-center text-theme font-semibold">
                {data?.name}
              </p>
              <p className="text-sm text-gray-600 font-semibold">
                <RoleComponent roleId={data?.roleId} />
              </p>
            </>
          ) : null}
        </>
      ) : (
        <span>Not Assigned</span>
      )}
    </>
  );
};

export default CardNameComponent;
