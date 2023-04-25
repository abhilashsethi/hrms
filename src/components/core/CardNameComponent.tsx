import { useFetch } from "hooks";
import RoleComponent from "./RoleComponent";

interface Props {
  userId?: any;
  isEmail?: boolean;
  isPhone?: boolean;
  isName?: boolean;
}
const CardNameComponent = ({ userId, isEmail, isPhone, isName }: Props) => {
  const { data, isLoading } = useFetch<any>(`users/${userId}`);

  return (
    <>
      {!isLoading ? (
        <>
          {isEmail ? (
            <span className="tracking-wide">{data?.email}</span>
          ) : isPhone ? (
            <span className="tracking-wide">{data?.phone}</span>
          ) : isName ? (
            <>
              <p className="py-1 px-3 tracking-wide">{data?.name}</p>
              <p className="text-sm text-gray-600 font-medium">
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
