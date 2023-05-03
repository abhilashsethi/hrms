import { AddCardRounded, CheckCircle, Search } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Drawer,
  Radio,
  TextField,
} from "@mui/material";
import { DEFAULTPROFILE, SAMPLEDP } from "assets/home";
import { RoleComponent } from "components/core";
import { useChange, useFetch } from "hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  cardId?: string | null;
  mutate?: any;
};

const CardAssign = ({ open, onClose, cardId, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchedUser, setSearchedUser] = useState<any>([]);
  const { change } = useChange();
  const { data: users } = useFetch<User[]>(`users`);
  useEffect(() => {
    if (users) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedUser(filtered);
    }
  }, [users, searchTerm]);
  const handleAssign = async () => {
    setLoading(true);
    try {
      const res = await change(`cards/${cardId}`, {
        method: "PATCH",
        body: { userId: selectedUser },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire(
          "Error",
          res?.results?.error?.message || "Something went wrong!",
          "error"
        );
        return;
      }
      Swal.fire("Success", "User assigned successfully!", "success");
      mutate();
      setSelectedUser(null);
      onClose();
      return;
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "30vw",
            marginTop: "3.5vh",
          }}
        >
          <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            <AddCardRounded />
            Assign User
          </p>
          <span className="text-sm">
            Assign an user from the below list of users
          </span>
          <div className="mt-2 w-full flex gap-2">
            <div className="w-2/3">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Enter name"
                onChange={(e: any) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <Button
                startIcon={<Search />}
                className="!bg-theme"
                fullWidth
                variant="contained"
              >
                SEARCH
              </Button>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {!searchedUser?.length && (
              <p className="py-8 text-center flex gap-3 items-center justify-center">
                <Search /> No results found!
              </p>
            )}
            {searchedUser?.map((item: any) => (
              <div className="w-full rounded-l-full shadow-xl border-t flex items-center gap-2 px-4 py-2">
                <div className="w-1/5">
                  <div className="h-[4rem] w-[4rem] rounded-full overflow-hidden shadow-lg">
                    {item?.photo && (
                      <img
                        className="h-full w-full object-cover"
                        src={item?.photo || DEFAULTPROFILE.src}
                        alt=""
                      />
                    )}
                    {!item?.photo ? (
                      <div className="h-full w-full text-white rounded-full flex justify-center items-center text-2xl font-semibold bg-gradient-to-br from-theme-100 via-theme-50 to-secondary-300">
                        {item?.name?.slice(0, 1)}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="w-4/5 flex justify-between items-start h-full">
                  <div className="flex flex-col h-full justify-center">
                    <>
                      <p className="text-sm">
                        {item?.name?.slice(0, 18)}
                        {item?.name?.length > 18 ? "..." : ""}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-500">
                        {item?.role?.name}
                      </p>
                    </>
                  </div>
                  {/* {!selectedUser && (
                    <div>
                      <Radio
                        onChange={() => setSelectedUser(item?.id)}
                        checked={selectedUser === item?.id}
                      />
                    </div>
                  )} */}
                  {selectedUser && selectedUser === item?.id ? (
                    <Button
                      onClick={handleAssign}
                      size="small"
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <CheckCircle />
                        )
                      }
                      className="!bg-emerald-500"
                      variant="contained"
                    >
                      ASSIGN
                    </Button>
                  ) : (
                    <div>
                      <Radio
                        onChange={() => setSelectedUser(item?.id)}
                        checked={selectedUser === item?.id}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default CardAssign;

const cards = [1, 2, 3, 4];
