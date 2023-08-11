import Lottie from "react-lottie";
import { EMAILSENT } from "assets/animations";
import { LoaderAnime } from "components/core";
import EmailCard from "./EmailCard";
import InboxHeader from "./InboxHeader";
import { useState } from "react";
import { useAuth, useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { InboxEmailType, SentEmailType } from "types";
import Swal from "sweetalert2";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: EMAILSENT,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

type InboxDataType = {
  inboxData: InboxEmailType[];
  pagination: {
    total: number;
    limit: number;
    page: number;
  };
};

const Inbox = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [allClicked, setAllClicked] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(true);

  const { user } = useAuth();

  const { push } = useRouter();

  const { change } = useChange();

  const { data, isValidating, mutate, error } = useFetch<InboxDataType>(
    `emails/getMyInbox/${user?.id}?page=${pageNo}&limit=20` +
      (searchText?.trim()?.length ? `&userName=${searchText}` : "") +
      (typeof sortBy !== "undefined" ? `&sortBy=${sortBy}` : "")
  );

  const handleSelect = (emailId: string) => {
    setSelectedEmails((prev) => {
      if (prev?.includes(emailId)) {
        return prev.filter((item) => item !== emailId);
      }
      return [...prev, emailId];
    });
  };

  const handleReadEmail = async (emailId: string) => {
    await change(`emails/${emailId}`, {
      method: "PATCH",
      body: {
        isRead: true,
      },
    });
  };

  const handleDeleteEmail = async () => {
    try {
      if (allClicked) {
        const response = await change(`emails/deleteAll`, {
          method: "DELETE",
        });

        if (response?.status !== 200) throw new Error(response?.results?.msg);

        Swal.fire({
          title: "Success",
          text: "Email deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        mutate?.();
        return;
      }
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
      <InboxHeader
        setAllClicked={setAllClicked}
        allClicked={allClicked}
        setPageNo={setPageNo}
        setSearchText={setSearchText}
        setSelectedEmails={setSelectedEmails}
        setSortBy={setSortBy}
        mutate={mutate}
        pageNo={pageNo}
        totalPage={data?.pagination?.total}
        searchText={searchText}
        handleDeleteEmail={handleDeleteEmail}
      />

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal table-fixed ">
            <tbody>
              {isValidating ? (
                <tr>
                  {" "}
                  <td className=" h-[70vh] ">
                    <Lottie options={defaultOptions} height={300} width={300} />
                  </td>
                </tr>
              ) : data?.inboxData?.length ? (
                data?.inboxData?.map((item, i) => (
                  <EmailCard
                    selected={allClicked || selectedEmails?.includes(item?.id)}
                    onSelect={() => handleSelect(item?.id)}
                    key={item?.id}
                    isRead={item?.isRead}
                    userName={item?.sender?.name}
                    subject={item?.subject}
                    email={item?.sender?.username}
                    onclick={() => {
                      push(`/admin/email/${item?.id}`);
                      handleReadEmail(item?.id);
                    }}
                    messageDate={item?.sentAt || new Date()}
                    messages={item?.content}
                    photo={item?.sender?.photo}
                  />
                ))
              ) : (
                <tr>
                  {" "}
                  <td className=" h-[70vh] ">
                    <LoaderAnime text={error || "Inbox is empty"} />
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

export default Inbox;
