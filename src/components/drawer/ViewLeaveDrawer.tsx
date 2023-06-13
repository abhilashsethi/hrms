import { makeStyles } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import { Container, Drawer, IconButton } from "@mui/material";
import { Loader, NoDatas } from "components/core";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "types";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setViewLeaves?: any;
  employeeId?: any;
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

const ViewLeaveDrawer = ({
  open,
  onClose,
  setViewLeaves,
  employeeId,
}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchedUser, setSearchedUser] = useState<any>([]);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleInfoOpen = () => {
    setOpenInfoModal(true);
  };
  const handleInfoCloseModal = () => setOpenInfoModal(false);

  const { data: leaveData, isLoading: leaveDataLoading } = useFetch<any[]>(
    `leaves?employeeID=${employeeId}`
  );

  const { data: users, isLoading } = useFetch<User[]>(`users`);
  useEffect(() => {
    if (users) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedUser(filtered);
    }
  }, [users, searchTerm]);

  const classes = useStyles();

  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container style={{ marginTop: "1rem" }} className={classes.container}>
          <div className="flex items-center justify-between pb-4">
            <p className="text-lg font-bold text-theme">View Leaves</p>
            <IconButton onClick={() => onClose()}>
              <Close
                fontSize="small"
                className="text-red-500 block md:hidden"
              />
            </IconButton>
          </div>

          {isLoading && <Loader />}
          <div className="mt-4 flex flex-col gap-4">
            {leaveData?.length === 0 && <NoDatas title="No leaves found!" />}
            {leaveData?.map((item, index) => {
              return (
                <div key={item?.id} className="">
                  <div
                    key={index}
                    className={`w-full h-full rounded-l-xl shadow-xl px-2 py-2 bg-[#edf4fe] my-3`}
                  >
                    <div className="flex flex-col gap-3 font-semibold text-blue-700">
                      {item?.variant === "MultipleDays" ? (
                        <>
                          <div className="flex gap-2">
                            Start Date :{" "}
                            <span className="text-black font-medium">
                              {moment(item?.startDate)?.format("DD/MM/YYYY")}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            End Date :{" "}
                            <span className="text-black font-medium">
                              {moment(item?.endDate)?.format("DD/MM/YYYY")}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex gap-2">
                          Date :{" "}
                          <span className="text-black font-medium">
                            {moment(item?.startDate)?.format("DD/MM/YYYY")}
                          </span>
                        </div>
                      )}
                      <div>
                        Status :{" "}
                        <span
                          className={`text-sm ${
                            item?.status === "Rejected"
                              ? "bg-red-500"
                              : item?.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          } text-white p-1 rounded-lg`}
                        >
                          {item?.status}
                        </span>
                      </div>
                      <div>
                        Leave Type :{" "}
                        <span className="text-black font-medium">
                          {item?.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ViewLeaveDrawer;
