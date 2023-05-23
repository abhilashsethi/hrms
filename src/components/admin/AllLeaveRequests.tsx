import MaterialTable from "@material-table/core";
import {
  Article,
  Event,
  EventAvailable,
  InfoOutlined,
  PeopleRounded,
  Receipt,
  Tag,
} from "@mui/icons-material";
import { Card, Modal, Tooltip } from "@mui/material";
import { SAMPLEDP } from "assets/home";
import { CopyClipboard, HeadStyle, PhotoViewerSmall } from "components/core";
import { useFetch } from "hooks";
import { useState } from "react";
import { User } from "types";
import { MuiTblOptions } from "utils";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const AllLeaveRequests = () => {
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleInfoOpen = () => {
    setOpenInfoModal(true);
  };
  const handleInfoCloseModal = () => setOpenInfoModal(false);
  const { data: leaveData } = useFetch<User[]>(`leaves/credits`);
  console.log(leaveData);
  return (
    <section className="mt-8">
      <MaterialTable
        title={<HeadStyle name="Employee Leaves" icon={<PeopleRounded />} />}
        isLoading={!leaveData}
        data={
          !leaveData?.length
            ? []
            : leaveData?.map((_: any, i: number) => ({
                ..._,
                sl: i + 1,
                total: _?.leavesData?.total,
                accepted: _?.leavesData?.totalAccepted,
                rejected: _?.leavesData?.totalAccepted,
                carryover: _?.leavesData?.carryOver,
                used: _?.leavesData?.totalApplied,
              }))
        }
        options={{ ...MuiTblOptions(), selection: true }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Image",
            tooltip: "Image",
            field: "photo",
            editable: "never",
            render: (item) => {
              return (
                <PhotoViewerSmall
                  name={item?.name}
                  size="3rem"
                  photo={item?.photo}
                />
              );
            },
          },
          {
            title: "Name",
            tooltip: "Name",
            field: "name",
            editable: "never",
          },
          {
            title: "Email",
            tooltip: "Email",
            field: "email",
            render: (item) => {
              return <CopyClipboard value={item?.email} />;
            },
          },
          {
            title: "Employee ID",
            tooltip: "Employee ID",
            field: "employeeID",
            render: (item) => {
              return (
                <div className="font-semibold">
                  <CopyClipboard value={item?.employeeID} />
                </div>
              );
            },
          },
          {
            title: "Total",
            tooltip: "Total Credits",
            field: "total",
            editable: "never",
          },
          {
            title: "Used",
            tooltip: "Used Credits for leave",
            field: "used",
            editable: "never",
          },
          {
            title: "Accepted",
            tooltip: "Accepted",
            field: "accepted",
            editable: "never",
          },
          {
            title: "Rejected",
            tooltip: "Rejected",
            field: "rejected",
            editable: "never",
          },
          {
            title: "Carry Over",
            tooltip: "Carry Over",
            field: "carryover",
            editable: "never",
          },
          // {
          //   title: "Details",
          //   export: true,
          //   render: (row) => (
          //     <>
          //       {console.log(row)}
          //       <div className="flex">
          //         <Tooltip title="Info">
          //           <Avatar
          //             onClick={() => handleInfoOpen()}
          //             variant="rounded"
          //             className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-blue-700 !p-0"
          //             sx={{
          //               mr: ".1vw",
          //               padding: "0px !important",
          //               backgroundColor: "Highlight",
          //               cursor: "pointer",
          //               color: "",
          //             }}
          //           >
          //             <Info sx={{ padding: "0px !important" }} />
          //           </Avatar>
          //         </Tooltip>
          //       </div>
          //     </>
          //   ),
          // },
        ]}
      />
      <Modal
        open={openInfoModal}
        onClose={handleInfoCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={style}
          className="dashboard-card-shadow w-[50%] border-t-4 border-b-4 border-t-theme border-b-theme !p-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-20 w-20 rounded-full overflow-hidden shadow-xl">
              <div className="bg-slate-200 h-full w-full">
                <img
                  className="h-full w-full object-cover"
                  src={"/manager.png"}
                  alt=""
                />
              </div>
            </div>
            <div className="font-semibold">
              Asutosh Mohapatra
              <span className="font-medium text-xs text-white rounded-md p-[1px] border border-green-500 bg-green-500">
                CEO
              </span>
            </div>
          </div>
          <div className="pt-3 flex flex-col gap-7">
            <div className="flex items-center gap-4">
              <Tooltip title="Leave Type">
                <Receipt className="text-gray-500" />
              </Tooltip>{" "}
              <p className="font-semibold">Medical Leave</p>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip title="Leave From">
                <Event className="text-gray-500" />
              </Tooltip>{" "}
              <p className="font-semibold">05/05/2023</p>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip title="Leave To">
                <EventAvailable className="text-gray-500" />
              </Tooltip>{" "}
              <p className="font-semibold">14/05/2023</p>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip title="No.of days">
                <Tag className="text-gray-500" />
              </Tooltip>
              <p className="font-semibold">10</p>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip title="Status">
                <InfoOutlined className="text-gray-500" />
              </Tooltip>
              <p className="font-semibold">Accepted</p>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip title="Reason">
                <Article className="text-gray-500" />
              </Tooltip>{" "}
              <p className="font-semibold">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus perspiciatis aliquid nam provident soluta enim,
                sunt consectetur corrupti beatae assumenda unde iure omnis totam
                possimus deleniti. Eos quam aut voluptates?
              </p>
            </div>
          </div>
        </Card>
      </Modal>
    </section>
  );
};

export default AllLeaveRequests;

const data = [
  {
    Id: "1",
    photo: SAMPLEDP.src,
    name: "Srinu Reddy",
    empid: "SYA0007",
    email: "srinu@sy.com",
    total: 24,
    used: 10,
    accepted: 10,
    rejected: 0,
    carryover: 6,
  },
  {
    Id: "2",
    photo: SAMPLEDP.src,
    name: "Abhilash Sethy",
    empid: "SYA0008",
    email: "abhilash@sy.com",
    total: 24,
    used: 10,
    accepted: 10,
    rejected: 0,
    carryover: 6,
  },
  {
    Id: "3",
    photo: SAMPLEDP.src,
    name: "Loushik Giri",
    empid: "SYA0009",
    email: "loushik@sy.com",
    total: 24,
    used: 10,
    accepted: 10,
    rejected: 0,
    carryover: 6,
  },
  {
    Id: "4",
    photo: SAMPLEDP.src,
    name: "Chinmay Muduli",
    empid: "SYA0010",
    email: "chinmay@sy.com",
    total: 24,
    used: 10,
    accepted: 10,
    rejected: 0,
    carryover: 6,
  },
];
