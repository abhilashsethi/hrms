import {
  ChevronLeft,
  ChevronRight,
  Delete,
  MoreVert,
  Refresh,
  Search,
} from "@mui/icons-material";
import { Checkbox, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { MouseEvent, useState } from "react";
import EmailCard from "./EmailCard";
import { useAuth, useChange, useFetch } from "hooks";
import { SentEmailType } from "types";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import { EMAILSENT } from "assets/animations";
import { LoaderAnime } from "components/core";
import Swal from "sweetalert2";

type SentEmailData = {
  allSendEmails: SentEmailType[];
  pagination: {
    total: number;
    limit: number;
    page: number;
  };
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: EMAILSENT,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SentEmail = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user } = useAuth();

  const { push } = useRouter();

  const { data, isValidating, mutate, error } = useFetch<SentEmailData>(
    `emails/get/send-mail?isSend=true&page=${pageNo}&limit=20` +
      (searchText?.trim()?.length ? `&username=${searchText}` : "") +
      (sortBy ? `&sortBy=${sortBy}` : "")
  );

  const handleSelect = (emailId: string) => {
    setSelectedEmails((prev) => {
      if (prev?.includes(emailId)) {
        return prev.filter((item) => item !== emailId);
      }
      return [...prev, emailId];
    });
  };

  const { change } = useChange();

  const handleAllClicked = () => {
    if (selectedEmails?.length === data?.allSendEmails?.length)
      setSelectedEmails([]);
    else setSelectedEmails(data?.allSendEmails?.map((item) => item?.id) || []);
  };

  const handleDeleteEmail = async () => {
    try {
      if (selectedEmails?.length) {
        await Promise.all(
          selectedEmails?.map(
            (item) =>
              new Promise(async (resolve, reject) => {
                try {
                  const response = await change(`emails/${item}`, {
                    method: "DELETE",
                  });

                  if (response?.status !== 200)
                    throw new Error(response?.results?.msg);
                  resolve(true);
                } catch (error) {
                  reject(error);
                }
              })
          )
        );
        mutate?.();
        Swal.fire({
          title: "Success",
          text: "Email deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setSelectedEmails([]);
      }
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: "Error",
          text: error?.message,
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Error",
        text: "Something went wrong!.Try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-2 shadow-md rounded-lg justify-between p-4 bg-white py-4  w-full items-center ">
        <div className="flex gap-2 items-center">
          <Checkbox
            size="small"
            checked={
              data?.allSendEmails?.length
                ? data?.allSendEmails?.length === selectedEmails?.length
                : false
            }
            onClick={handleAllClicked}
          />{" "}
          <span className="text-gray-800/20">|</span>
          {selectedEmails?.length ? (
            <IconButton onClick={handleDeleteEmail}>
              <Delete />
            </IconButton>
          ) : null}
          <IconButton
            onClick={() => {
              mutate?.();
              setPageNo(1);
              setSelectedEmails([]);
              setSortBy("");
              setSearchText("");
            }}
          >
            <Refresh className={`${isValidating ? "!animate-spin" : ""}`} />
          </IconButton>
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setSortBy("hasAttachments");
                handleClose();
              }}
            >
              Has Attachments
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortBy("dse");
                handleClose();
              }}
            >
              Newest First
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortBy("asc");
                handleClose();
              }}
            >
              Oldest First
            </MenuItem>
          </Menu>
        </div>

        <div className="w-full flex items-center justify-center">
          <TextField
            className="w-full"
            id="outlined-basic"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            name={`search_${Math.random()}`}
            InputProps={{
              startAdornment: <Search />,
            }}
            onChange={(e) => setSearchText(e?.target?.value)}
            value={searchText}
          />
        </div>

        <div className="flex gap-2 items-center">
          <IconButton
            onClick={() => setPageNo((prev) => (prev <= 1 ? prev : prev - 1))}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={() =>
              setPageNo((prev) =>
                prev * 20 >= (data?.pagination?.total || 0) ? prev : prev + 1
              )
            }
          >
            <ChevronRight />
          </IconButton>
          <span>|</span>
          <span className="text-gray-400 flex gap-2 text-sm whitespace-nowrap">
            Show{" "}
            <p className="text-black font-bold">
              {(pageNo - 1) * 20 + 1} to{" "}
              {(data?.pagination?.total || 0) < 20
                ? data?.pagination?.total
                : pageNo * 20}
            </p>{" "}
            of <p className="text-black font-bold">{data?.pagination?.total}</p>
          </span>
        </div>
      </div>

      <div className=" md:-mx-8  md:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal table-fixed ">
            <tbody>
              {isValidating ? (
                <tr>
                  {" "}
                  <td className=" h-[70vh] ">
                    <Lottie
                      options={defaultOptions}
                      isPaused={false}
                      isClickToPauseDisabled={true}
                      height={300}
                      width={300}
                    />
                  </td>
                </tr>
              ) : data?.allSendEmails?.length ? (
                data?.allSendEmails?.map((item, i) => (
                  <EmailCard
                    selected={selectedEmails?.includes(item?.id)}
                    onSelect={() => handleSelect(item?.id)}
                    key={item?.id}
                    isRead={true}
                    receiver={item?.receiver}
                    subject={item?.subject}
                    onclick={() => push(`/admin/email/${item?.id}`)}
                    messageDate={item?.sentAt || item?.createdAt}
                    messages={item?.content}
                  />
                ))
              ) : (
                <tr>
                  {" "}
                  <td className=" h-[70vh] ">
                    <LoaderAnime text={error || "No sent email found"} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SentEmail;
