import { EmailRounded, PeopleRounded } from "@mui/icons-material";
import { Container, Drawer } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { Loader, UserLoaderAnime } from "components/core";
import { useFetch } from "hooks";
import { Role } from "types";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  roleId?: any;
};

const DepartmentInformation = ({ open, onClose, roleId }: Props) => {
  const { data: roleInfo, isLoading } = useFetch<Role>(`departments/${roleId}`);
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container className="lg:w-[30vw] w-full mt-[3.5vh]">
          <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            <PeopleRounded />
            MEMBERS
          </p>
          {/* {role && (
            <span className="text-sm">
              All Members with{" "}
              <span className="text-theme font-medium">{role?.name}</span> role
            </span>
          )} */}
          {isLoading && <Loader />}
          {!roleInfo?.users?.length && (
            <>
              <UserLoaderAnime />
            </>
          )}
          <div className="mt-4 flex flex-col gap-2">
            {roleInfo?.users?.map((item: any) => (
              <div className="h-24 w-full border-[1px] rounded-lg flex gap-3 items-center px-4">
                <div className="h-[4.5rem] w-[4.5rem] bg-slate-400 rounded-full overflow-hidden shadow-lg">
                  {item?.photo ? (
                    <img src={item?.photo || DEFAULTPROFILE?.src} alt="image" />
                  ) : (
                    <div className="h-full uppercase text-xl font-semibold flex justify-center items-center w-full bg-gradient-to-br from-theme-200 via-theme-50 to-secondary-100">
                      {item?.name?.slice(0, 1)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{item?.name}</p>
                  <p className="text-sm flex items-center gap-2 mt-1">
                    <EmailRounded fontSize="small" /> {item?.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default DepartmentInformation;

const cards = [1, 2, 3, 4];
