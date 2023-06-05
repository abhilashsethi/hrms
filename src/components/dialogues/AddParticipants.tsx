import { Check, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { useChange, useFetch } from "hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";

interface Props {
  open?: any;
  handleClose?: any;
  profileData?: any;
}

const AddParticipants = ({ open, handleClose, profileData }: Props) => {
  const [activeMembers, setActiveMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCode, setIsCode] = useState<string | null>(null);
  const { change } = useChange();
  const { data: employeesData } = useFetch<User[]>(`users`);
  console.log(profileData);

  useEffect(() => {
    const reqData: any = employeesData?.filter((obj) => {
      return !profileData?.chatMembers?.find((item: any) => item.id === obj.id);
    });
    setActiveMembers(reqData);
  }, [profileData]);

  const handleAdd = async () => {
    if (isCode) {
      try {
        setLoading(true);
        const res = await change(`chat/message`, {
          body: {
            message: isCode,
            category: "code",
          },
        });
        if (res?.status !== 200) {
          Swal.fire(
            "Error",
            res?.results?.msg || "Something went wrong!",
            "error"
          );
          setLoading(false);
          return;
        }
        Swal.fire(`Success`, `Code sent successfully!`, `success`);
        setLoading(false);
        handleClose();
        setIsCode(null);
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Dialog
      onClose={() => {
        handleClose();
      }}
      maxWidth="lg"
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "27rem !important" }}
      >
        <h1 className="text-center text-md font-bold text-theme tracking-wide">
          ADD PARTICIPANTS
        </h1>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            top: 10,
            right: 10,
            position: "absolute",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Tooltip title="Close">
            <Close />
          </Tooltip>
        </IconButton>
      </DialogTitle>
      <DialogContent className="app-scrollbar" sx={{ p: 3 }}>
        <div className="md:w-[27rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-2">
          <Autocomplete
            multiple
            fullWidth
            options={activeMembers ? activeMembers : []}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <div className="flex gap-2 items-center">
                  <PhotoViewerSmall
                    name={option?.name}
                    photo={option?.photo}
                    size="2rem"
                  />
                  <span>{option.name}</span>
                </div>
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} variant="standard" placeholder="Select" />
            )}
          />
          <Button
            onClick={() => handleAdd()}
            variant="contained"
            className="!bg-theme"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Check />}
          >
            SUBMIT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddParticipants;
