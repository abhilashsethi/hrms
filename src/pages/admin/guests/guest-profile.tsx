import { Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import {
  AdminBreadcrumbs,
  CopyClipboard,
  HeadText,
  Loader,
  ReverseIOSSwitch,
} from "components/core";
import { ChangeProfile, UpdateGuestBasicDetails } from "components/dialogues";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";

const GuestProfile = () => {
  const router = useRouter();
  const [isDialogue, setIsDialogue] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const {
    data: employData,
    mutate,
    isLoading,
  } = useFetch<User>(`users/${router?.query?.id}`);
  const { change } = useChange();
  const basicDetails = [
    {
      id: 1,
      title: "Name",
      value: `${employData?.name ? employData?.name : "---"}`,
    },
    {
      id: 2,
      title: "Email",
      value: `${employData?.email ? employData?.email : "---"}`,
    },
    {
      id: 3,
      title: "GuestId",
      value: `${employData?.employeeID ? employData?.employeeID : "---"}`,
    },
    {
      id: 4,
      title: "Valid From",
      value: `${
        employData?.joiningDate
          ? moment(employData?.joiningDate).format("ll")
          : "---"
      }`,
    },
    {
      id: 5,
      title: "Valid Till",
      value: `${
        employData?.joiningDate
          ? moment(employData?.joiningDate).format("ll")
          : "---"
      }`,
    },
    {
      id: 6,
      title: "Phone",
      value: `${employData?.phone ? employData?.phone : "---"}`,
    },
  ];
  const roomDetails = [
    {
      id: 1,
      status: true,
      name: "Main Door",
      value: `${employData?.panNo ? employData?.panNo : "---"}`,
    },
    {
      id: 2,
      status: true,
      name: "Director Room",
      value: `${employData?.aadharNo ? employData?.aadharNo : "---"}`,
    },
    {
      id: 3,
      status: true,
      name: "Meeting Room",
      value: `${employData?.gmail ? employData?.gmail : "---"}`,
    },
    {
      id: 5,
      status: false,
      name: "Work Space",
      value: `${employData?.linkedin ? employData?.linkedin : "---"}`,
    },
    {
      id: 7,
      status: false,
      name: "Cafeteria",
      value: `${employData?.address ? employData?.address : "---"}`,
    },
  ];
  const handleBlock = async (e: any, id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then(async (result) => {
      return;
      if (result.isConfirmed) {
        const res = await change(`cards`, {
          method: "PATCH",
          body: { isBlocked: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "Status updated successfully!!", "success");
        return;
      }
    });
  };
  if (isLoading) {
    return (
      <PanelLayout title="Guest Profile - Admin Panel">
        <Loader />
      </PanelLayout>
    );
  }
  return (
    <PanelLayout title="Guest Profile - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />

        <ChangeProfile
          open={isProfile}
          handleClose={() => setIsProfile(false)}
          mutate={mutate}
        />
        <UpdateGuestBasicDetails
          mutate={mutate}
          open={isDialogue}
          handleClose={() => setIsDialogue(false)}
        />
        <div className="grid grid-cols-3 gap-4 py-6">
          <div className="bg-theme-400 rounded-lg grid justify-items-center py-4 px-4 shadow-lg shadow-gray-600">
            <div className="h-32 w-32 rounded-full border-[4px] border-white flex justify-center items-center text-3xl">
              <div className="relative h-full w-full flex justify-center items-center group">
                {employData?.photo && (
                  <div className="h-full w-full bg-slate-300 rounded-full">
                    <img
                      className="h-full w-full object-cover rounded-full shadow-md"
                      src={employData?.photo}
                      alt="John Doe"
                    />
                  </div>
                )}
                {!employData?.photo && (
                  <div className="h-full w-full text-white rounded-full uppercase shadow-lg flex justify-center items-center text-4xl font-bold bg-gradient-to-br from-theme-100 via-theme-50 to-secondary-100">
                    {employData?.name.slice(0, 1) || "J"}
                  </div>
                )}
                <div
                  onClick={() => setIsProfile(true)}
                  className="absolute cursor-pointer rounded-full w-full h-full group-hover:flex transition-all ease-in-out duration-300 justify-center items-center hidden  bg-[#0007]"
                >
                  <Edit className="!text-white" />
                </div>
              </div>
            </div>
            <h2 className="pt-2 pb-1 text-xl text-white font-bold tracking-wide">
              {employData?.name || "John Doi"}
            </h2>
            <h4 className="text-white font-semibold">
              {employData?.email || "john.doi@sy.com"}
            </h4>
            <span className="text-white font-semibold">
              <CopyClipboard value={employData?.employeeID || "YARD20036"} />
            </span>
          </div>
          <div className="col-span-2 bg-white py-4 px-4 shadow-lg shadow-gray-600 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <section className="py-2 px-2">
                <div className=" pb-2 flex justify-between items-center">
                  <HeadText title="Basic Details" />
                  <Tooltip title="Edit">
                    <IconButton onClick={() => setIsDialogue(true)}>
                      <ICONS.Edit className="h-5 w-5" />
                    </IconButton>
                  </Tooltip>
                </div>
                {basicDetails?.map((item) => (
                  <div
                    key={item?.id}
                    className="flex gap-2 items-center font-medium py-1.5"
                  >
                    <div className="w-[30%]">
                      <p className="text-sm text-gray-600">{item?.title} :</p>
                    </div>
                    <div className="w-2/3">
                      <p className="text-sm">{item?.value}</p>
                    </div>
                  </div>
                ))}
              </section>
              <section className="px-2 py-2">
                <div className=" pb-2 flex justify-between items-center">
                  <HeadText title="Room Access" />
                </div>
                {roomDetails?.map((item) => (
                  <div
                    key={item?.id}
                    className="grid grid-cols-2 gap-2 items-center font-medium py-1.5"
                  >
                    <div className="">
                      <p className="text-sm text-gray-600">{item?.name} :</p>
                    </div>
                    <div className="">
                      <ReverseIOSSwitch
                        disabled
                        checked={item?.status}
                        onChange={(e) => handleBlock(e, item?.id)}
                      />
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
        <section className="py-2">
          <div className="bg-white py-4 px-4 shadow-lg shadow-gray-600 rounded-lg">
            <h1 className="text-xl font-bold tracking-wide">
              Visitor Information{" "}
            </h1>
            <p className="py-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
              temporibus deserunt quos nobis corrupti nihil at rerum ut, sint
              perspiciatis necessitatibus excepturi atque quidem in? Recusandae
              atque placeat amet architecto.
            </p>
          </div>
        </section>
      </section>
    </PanelLayout>
  );
};

export default GuestProfile;
const links = [
  { id: 1, page: "All Guests", link: "/admin/guests/all-guests" },
  { id: 2, page: "Guest Profile", link: "/admin/guests/guest-profile" },
];
