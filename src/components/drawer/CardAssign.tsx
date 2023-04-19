import { AddCardRounded, CheckCircle, Search } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Drawer,
  Radio,
  TextField,
} from "@mui/material";
import { SAMPLEDP } from "assets/home";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
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
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { change } = useChange();
  const { data: users, isLoading: isUsersFetching } = useFetch<User[]>(`users`);
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
            {users?.map((item) => (
              <div className="w-full h-[4.5rem] rounded-l-full shadow-md flex items-center gap-2">
                <div className="w-1/5">
                  <div className="h-[4.5rem] w-[4.5rem] border-2 rounded-full overflow-hidden">
                    <img
                      className="h-full object-cover"
                      src={SAMPLEDP.src}
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-4/5 flex justify-between items-start h-full">
                  <div className="flex flex-col h-full justify-center">
                    <>
                      <p className="text-md">{item?.name}</p>
                      <p className="mt-1 text-sm font-semibold text-gray-500">
                        Web Developer
                      </p>
                    </>
                  </div>
                  <div>
                    <Radio
                      onChange={() => setSelectedUser(item?.id)}
                      checked={selectedUser === item?.id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleAssign}
              startIcon={
                loading ? <CircularProgress size={20} /> : <CheckCircle />
              }
              className="!bg-emerald-500"
              variant="contained"
            >
              ASSIGN
            </Button>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default CardAssign;

const cards = [1, 2, 3, 4];
