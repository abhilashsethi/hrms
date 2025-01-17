import { makeStyles } from "@material-ui/core";
import { Close, EmailRounded, PeopleRounded } from "@mui/icons-material";
import { Container, Drawer, Grid, IconButton } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { Loader, UserLoaderAnime } from "components/core";
import { useFetch } from "hooks";
import { Role } from "types";

type Props = {
  open?: boolean;
  onClose: () => void;
  roleId?: string;
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "50vw",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "80vw",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "30vw",
    },
  },
}));
const RoleInformation = ({ open, onClose, roleId }: Props) => {
  const classes = useStyles();
  const { data: roleInfo, isLoading } = useFetch<Role>(`roles/${roleId}`);
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container style={{ marginTop: "1rem" }} className={classes.container}>
          {/* Drawer Element */}
          <div className="flex items-center justify-between ">
            <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
              <PeopleRounded />
              MEMBERS
            </p>
            <IconButton onClick={() => onClose()}>
              <Close
                fontSize="small"
                className="text-red-500 block md:hidden"
              />
            </IconButton>
          </div>

          {isLoading && <Loader />}
          {!roleInfo?.users?.length && (
            <>
              <UserLoaderAnime />
            </>
          )}
          <div className="my-4 flex flex-col gap-2">
            {roleInfo?.users?.map((item: any) => (
              <div
                key={item?.id}
                className="h-24 w-full border-[1px] rounded-lg flex gap-3 items-center px-4"
              >
                <div className="md:h-[4.5rem] w-12 h-12 md:w-[4.5rem] bg-slate-400 rounded-full overflow-hidden shadow-lg">
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
                  <p className="text-sm flex break-all items-center gap-2 mt-1">
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

export default RoleInformation;

const cards = [1, 2, 3, 4];
