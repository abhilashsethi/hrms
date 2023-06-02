import { LOCATION, MANAGER } from "assets/dashboard_Icons";
import { RenderIconRow } from "components/common";
import { CountryNameFlag, PhotoViewer } from "components/core";
import { UpdateDepartment } from "components/dialogues";
import { DepartmentInformation } from "components/drawer";
import { useChange } from "hooks";
import { useState, MouseEvent } from "react";
import Swal from "sweetalert2";
import Slider from "react-slick";
import { IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { DeleteRounded, Edit, MoreVertRounded } from "@mui/icons-material";
interface Props {
  data?: any;
  mutate?: any;
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
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 items-center justify-center">
          {data?.map((item: any, index: any) => (
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
const MoreOption = ({ item, mutate }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [loading, setLoading] = useState(false);
  const [isInfo, setIsInfo] = useState<{ dialogue?: boolean; role?: any }>({
    dialogue: false,
    role: null,
  });
  const { change } = useChange();
  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    departmentData?: string | null;
  }>({ dialogue: false, departmentData: null });

  const handleDelete = async (id: string) => {
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
        Swal.fire("", "Please Wait...", "info");
        try {
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`departments/${id}`, { method: "DELETE" });
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
          mutate();
          Swal.fire(`Success`, `Deleted Successfully!`, `success`);
          return;
        } catch (error) {
          console.log(error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    });
  };


  return (
    <>
      <UpdateDepartment
        departmentData={isUpdate?.departmentData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <DepartmentInformation
        open={isInfo?.dialogue}
        onClose={() => setIsInfo({ dialogue: false })}
        roleId={isInfo?.role?.id}
      />

      <div key={item?.id} className="mb-4 w-full">
        <div className="absolute right-[10px] top-[10px]">
          <Tooltip title="More">
            <IconButton onClick={handleClick}>
              <MoreVertRounded />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: "15th June 2021",
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <Edit fontSize="small" />
              </ListItemIcon>
              Edit Branch
            </MenuItem>

            <MenuItem onClick={() => handleDelete(item)}>
              <ListItemIcon>
                <DeleteRounded fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </div>
        <div className="group h-full w-full border-2 border-gray-200 
                border-opacity-60 rounded-lg overflow-hidden shadow-lg">

          {item?.photos?.length > 1 ? (
            <>
              <Slider {...settings} className="">
                {item?.photos?.map((data: any, k: any) => (
                  <img key={k} className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                    src={data?.photo} alt="blog" />
                ))}
              </Slider>
            </>
          ) : (
            <>
              {item?.photos?.map((data: any, k: any) => (
                <img key={k} className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                  src={data?.photo} alt="blog" />
              ))}
            </>
          )}
          <div className="py-1 pt-2 px-4">
            <h1 className="inline-block py-1 title-font text-xl font-extrabold 
                    text-gray-800 tracking-wide cursor-pointer">
              {item?.name}
            </h1>
            <p className="text-gray-500 flex items-start">
              <span className="group flex text-sm items-center justify-center gap-2">
                <span className="group flex items-center justify-center gap-2">
                  <img src={MANAGER.src} className="w-8 pr-2" alt="" />
                  <span>Manager : </span>
                </span>
                {item?.manager}
              </span>
            </p>
            <p className="text-gray-500 flex items-start">
              <RenderIconRow
                value={item?.phone || "---"}
                isPhone
                longText={false}
              />
            </p>

            <p className="text-gray-500 flex items-start">
              <RenderIconRow
                value={item?.email || "---"}
                isEmail
                longText={false}
              />
            </p>
            <p className="text-sm text-slate-600 font-medium py-1 flex items-center gap-3">
              <CountryNameFlag
                countryName={item?.country || "---"}
              />
            </p>

            <h2 className="py-1 pb-1 inline-block text-xs title-font font-semibold 
                    text-red-400 uppercase tracking-widest hover:font-bold"
            >
              <span className="group flex text-sm items-center justify-center gap-2">

                <img src={LOCATION.src} className="w-6 pr-2" alt="" />
                {item?.location}
              </span>
            </h2>
          </div>


        </div>
      </div>

    </>
  );
};