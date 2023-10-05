import { DeleteRounded, Edit } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { LOCATION, MANAGER } from "assets/dashboard_Icons";
import { RenderIconRow } from "components/common";
import { CountryNameFlag, IOSSwitch } from "components/core";
import { UpdateBranch } from "components/dialogues";
import { useAuth, useChange } from "hooks";
import { ChangeEvent, useState } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { Branch } from "types";
import { deleteFile } from "utils";
interface Props {
  data?: Branch[];
  mutate: () => void;
}
const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 400,
  cssEase: "linear",
  autoplaySpeed: 3000,
  pauseOnHover: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 940,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
  ],
};
const AllBranchGrid = ({ data, mutate }: Props) => {
  return (
    <>
      <section className="py-6 ">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 items-center justify-center">
          {data?.map((item, index) => (
            <div key={index}>
              <MoreOption item={item} mutate={mutate} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllBranchGrid;
interface PROPS {
  item?: Branch;
  mutate: () => void;
}
const MoreOption = ({ item, mutate }: PROPS) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { user } = useAuth();
  const [isUpdate, setIsUpdate] = useState<{
    dialogue: boolean;
    branchId?: string;
  }>({ dialogue: false, branchId: "" });

  const handleDelete = async (item?: Branch) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          Swal.fire("", "Please Wait...", "info");
          const res = await change(`branches/${item?.id}`, {
            method: "DELETE",
          });
          const photoPaths = item?.photos;
          if (photoPaths && photoPaths.length > 0) {
            photoPaths.forEach(async (path) => {
              await deleteFile(String(path));
            });
          }
          setLoading(false);
          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            setLoading(false);
            return;
          }
          Swal.fire(`Success`, `Deleted Successfully!`, `success`);
          mutate();
          return;
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
          setLoading(false);
        }
      }
    });
  };
  const handleBlock = async (e: ChangeEvent<HTMLInputElement>, id?: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await change(`branches/${id}`, {
          method: "PATCH",
          body: { isBlocked: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "Branch status update successfully!!", "success");
        return;
      }
    });
  };

  return (
    <>
      <UpdateBranch
        branchId={isUpdate?.branchId}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        MainMutate={mutate}
      />
      <div key={item?.id} className="mb-4 w-full">
        <div
          className="group h-full w-full border-2 bg-white border-gray-200 
                border-opacity-60 rounded-lg overflow-hidden shadow-lg"
        >
          {item?.photos?.length ? (
            item?.photos?.length > 1 ? (
              <>
                <Slider {...settings} className="">
                  {item?.photos?.map((data: any, k) => (
                    <img
                      key={k}
                      className="lg:h-48 md:h-36 h-28 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                      src={data}
                      alt="Branch"
                    />
                  ))}
                </Slider>
              </>
            ) : (
              <>
                {item?.photos?.map((data: any, k: any) => (
                  <img
                    key={k}
                    className="lg:h-48 md:h-36 h-28 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                    src={data}
                    alt="Branch"
                  />
                ))}
              </>
            )
          ) : (
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
              src="/no_IMG.jpg"
              alt="Branch"
            />
          )}
          <div className="py-1 pt-2 px-4">
            <h1
              className="inline-block py-1 font-extrabold 
                    text-gray-800 cursor-pointer"
            >
              {item?.name || "---"}
            </h1>
            <Tooltip title="Manager">
              <p className="text-gray-500 flex items-start">
                <span className="group flex text-sm items-center justify-center gap-2">
                  <span className="group flex items-center justify-center gap-2">
                    <img src={MANAGER.src} className="w-8 pr-2" alt="" />
                  </span>
                  {item?.manager?.name || "---"}
                </span>
              </p>
            </Tooltip>
            <p className="text-gray-500 flex items-start">
              {/* {item?.countryCode ? item?.countryCode : null} */}
              <RenderIconRow
                value={
                  (item?.countryCode
                    ? item?.countryCode + "-" + item?.phone
                    : "" + item?.phone) || "---"
                }
                isPhone
                longText={false}
              />
            </p>

            <p className="text-gray-500 flex items-start">
              <RenderIconRow value={item?.email || "---"} isEmail />
            </p>
            <p className="text-sm text-slate-600 font-medium py-1 flex items-center gap-3">
              <CountryNameFlag countryName={item?.country || "---"} />
            </p>

            <h2
              className="py-1 pb-1 inline-block text-xs 
                    text-red-400"
            >
              <span className="group flex text-xs items-center justify-center gap-2">
                <img src={LOCATION.src} className="w-6 pr-2" alt="" />
                {item?.location || "---"}
              </span>
            </h2>
            <div className="flex bottom-0 ">
              {user?.role?.name === "MANAGER" ? null : (
                <span
                  onClick={() => handleDelete(item)}
                  className="group w-full hover:bg-theme text-red-600 hover:text-white flex border-2 px-2 py-1 items-center justify-center "
                >
                  <DeleteRounded fontSize="small" />
                </span>
              )}
              <span
                onClick={() => {
                  setIsUpdate({ dialogue: true, branchId: item?.id });
                }}
                className="group w-full hover:bg-theme text-theme hover:text-white flex border-2 px-2 py-1 items-center justify-center "
              >
                <Edit fontSize="small" />
              </span>
              <div className="group w-full hover:bg-theme hover:text-white gap-2 flex border-2 px-2 py-1 items-center justify-center ">
                <p className="font-semibold tracking-wide text-sm">STATUS</p>
                <IOSSwitch
                  size="small"
                  checked={item?.isBlocked}
                  disabled={user?.role?.name === "MANAGER"}
                  onChange={(e) => handleBlock(e, item?.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
