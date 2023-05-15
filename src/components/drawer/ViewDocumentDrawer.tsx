import { Add, Delete, Person } from "@mui/icons-material";
import { Card, Container, Drawer, Modal, Tooltip } from "@mui/material";
import { DOC, IMG, PDF, XLS } from "assets/home";
import { Loader } from "components/core";
import { DocPreview } from "components/dialogues";
import { useFetch } from "hooks";
import { useEffect, useState } from "react";
import { User } from "types";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setViewDocument?: any;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // height: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const ViewDocumentDrawer = ({ open, onClose, setViewDocument }: Props) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchedUser, setSearchedUser] = useState<any>([]);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleInfoOpen = () => {
    setOpenInfoModal(true);
  };
  const handleInfoCloseModal = () => setOpenInfoModal(false);

  const { data: users, isLoading } = useFetch<User[]>(`users`);
  useEffect(() => {
    if (users) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedUser(filtered);
    }
  }, [users, searchTerm]);

  const Drawer_document = [
    {
      id: 1,
      title: "Document Title 1",
    },
    {
      id: 2,
      title: "Document Title 2",
    },
    {
      id: 3,
      title: "Document Title 3",
    },
    {
      id: 4,
      title: "Document Title 4",
    },
    {
      id: 5,
      title: "Document Title 5",
    },
    {
      id: 6,
      title: "Document Title 6",
    },
  ];

  const [isPreview, setIsPreview] = useState<{
    dialogue?: boolean;
    title?: string;
  }>({
    dialogue: false,
    title: "Preview",
  });

  return (
    <>
      <DocPreview
        open={isPreview?.dialogue}
        handleClose={() => setIsPreview({ dialogue: false })}
        title={isPreview?.title}
      />
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "30vw",
            marginTop: "3.5vh",
          }}
        >
          {/* Document Modal  */}
          <Modal
            open={openInfoModal}
            onClose={handleInfoCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Card
              sx={style}
              className="dashboard-card-shadow w-[30%] border-t-4 border-b-4 border-t-theme border-b-theme !p-6"
            >
              Open Modal
              <iframe
                src={"/invoice11.pdf"}
                width="100%"
                height="500"
                title="Document Preview"
              />
            </Card>
          </Modal>

          {/* Drawer Element */}

          <div className="flex items-center justify-between pb-4">
            <p className="text-lg font-bold text-theme flex gap-3 items-center">
              <Person />
              View Documents
            </p>
            <button className="flex text-sm items-center bg-white text-theme p-1 rounded-md group hover:bg-theme hover:text-white border border-theme">
              Add Document{" "}
              <Add
                fontSize="small"
                className="text-theme group-hover:text-white transition duration-500 ease-in-out"
              />
            </button>
          </div>

          {isLoading && <Loader />}
          <div className="mt-4 flex flex-col gap-4">
            {/* {!searchedUser?.length && (
							<p className="py-8 text-center flex gap-3 items-center justify-center">
								<Search /> No results found!
							</p>
						)} */}
            {/* {Drawer_document?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full rounded-l-xl shadow-xl border-t flex justify-between items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-teal-100"
                >
                  <Tooltip title="View Document">
                    <div
                      onClick={() => handleInfoOpen()}
                      className="w-16 cursor-pointer hover:scale-90 transition duration-200 ease-in-out"
                    >
                      <img src="/folder.png" alt="" />
                    </div>
                  </Tooltip>
                  <div>
                    <p className="font-semibold">{item?.title}</p>
                  </div>
                  <div className="font-medium text-sm flex items-center">
                    <Tooltip title="Update">
                      <Avatar
                        variant="rounded"
                        className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-green-500 !p-0"
                        sx={{
                          mr: ".1vw",
                          padding: "0px !important",
                          backgroundColor: "Highlight",
                          cursor: "pointer",
                          color: "",
                        }}
                      >
                        <BorderColor sx={{ padding: "0px !important" }} />
                      </Avatar>
                    </Tooltip>
                    <Tooltip title="Remove">
                      <Avatar
                        variant="rounded"
                        className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
                        sx={{
                          mr: ".1vw",
                          padding: "0px !important",
                          backgroundColor: "Highlight",
                          cursor: "pointer",
                          color: "",
                        }}
                      >
                        <Close sx={{ padding: "0px !important" }} />
                      </Avatar>
                    </Tooltip>
                  </div>
                </div>
              );
            })} */}
            <div className="flex justify-center w-full">
              <div className="flex gap-2 flex-wrap">
                {docs?.map((item) => (
                  <div
                    onClick={() =>
                      setIsPreview({ dialogue: true, title: item?.title })
                    }
                    key={item?.id}
                    className="h-28 w-28 border-2 rounded-md flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-slate-200 transition-all ease-in-out duration-200"
                  >
                    <img className="w-12" src={item?.img} alt="photo" />
                    <p className="text-xs">
                      {item?.title?.slice(0, 9)}
                      {item?.title?.length > 9 ? "..." : null}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex gap-2">
              <Tooltip title="Add Document">
                <div className="h-24 w-24 cursor-pointer shadow-md rounded-md bg-slate-300 hover:bg-blue-500 transition-all ease-in-out duration-200 flex flex-col gap-2 items-center justify-center">
                  <Add />
                </div>
              </Tooltip>
              <Tooltip title="Delete All">
                <div className="h-24 w-24 cursor-pointer shadow-md rounded-md bg-red-300 hover:bg-blue-500 transition-all ease-in-out duration-200 flex flex-col gap-2 items-center justify-center">
                  <Delete />
                </div>
              </Tooltip>
            </div>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ViewDocumentDrawer;

const docs = [
  { id: 1, title: "Doc 53426", img: PDF.src },
  { id: 2, title: "Document432", img: DOC.src },
  { id: 3, title: "CSV4536", img: XLS.src },
  { id: 4, title: "DCIM356.", img: IMG.src },
  { id: 5, title: "traac12", img: DOC.src },
  { id: 6, title: "JPGJHHJ11", img: PDF.src },
  { id: 7, title: "hghgug", img: PDF.src },
];
