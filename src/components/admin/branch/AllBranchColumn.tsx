import MaterialTable from "@material-table/core";
import { BorderColor, Delete, Edit, PeopleRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { RenderIconRow } from "components/common";
import { HeadStyle, IOSSwitch } from "components/core";
import { UpdateBranch } from "components/dialogues";
import { DepartmentInformation } from "components/drawer";
import { useChange } from "hooks";
import { useState } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { Role } from "types";
import { MuiTblOptions, clock, deleteFile, getDataWithSL } from "utils";
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
const AllBranchColumn = ({ data, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change, isChanging } = useChange();
  const [isInfo, setIsInfo] = useState<{ dialogue?: boolean; role?: any }>({
    dialogue: false,
    role: null,
  });
  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    branchId?: string | null;
  }>({ dialogue: false, branchId: null });
  const handleDelete = async (item: any) => {
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
          const res = await change(`branches/${item?.id}`, { method: "DELETE" });
          const photoPaths = item?.photos;
          if (photoPaths && photoPaths.length > 0) {
            photoPaths.forEach(async (path: any) => {
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
          console.log(error);
          setLoading(false);
        }
      }
    });
  };
  const handleBlock = async (e: any, id: string) => {
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
    <section className="mt-8">
      <UpdateBranch
        branchId={isUpdate?.branchId}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        MainMutate={mutate}
      />
      <MaterialTable
        title={<HeadStyle name="All Branch" icon={<PeopleRounded />} />}
        isLoading={!data}
        data={data ? getDataWithSL<any>(data) : []}
        options={{ ...MuiTblOptions(), selection: false, paging: false }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Branch Name",
            tooltip: "Branch Name",
            field: "name",
          },
          {
            title: "Manager",
            tooltip: "Manager",
            render: (data) => {
              return (
                <span>{data?.manager?.name}</span>
              );
            },
          },
          {
            title: "Email",
            tooltip: "Email",
            field: "email",
            render: (data) => {
              return (
                <RenderIconRow
                  value={data?.email || "---"}
                  isEmail
                />
              );
            },
          },
          {
            title: "Phone",
            tooltip: "Phone",
            field: "phone",
            render: (data) => {
              return (
                <RenderIconRow
                  value={data?.phone || "---"}
                  isPhone
                />
              );
            },
          },
          {
            title: "Country",
            tooltip: "Country",
            field: "country",
          },
          {
            title: "Location",
            tooltip: "Location",
            field: "location",
          },
          {
            title: "Status",
            tooltip: "Status",
            render: (data) => {
              return (
                <IOSSwitch size="small"
                  checked={data?.isBlocked}
                  onChange={(e) => handleBlock(e, data?.id)}
                />
              );
            },
            editable: "never",
          },

          {
            title: "Last Updated",
            field: "updatedAt",
            render: (data) => clock(data.updatedAt).fromNow(),
            editable: "never",
          },
          {
            title: "Created",
            field: "createdAt",
            render: (data) => new Date(data.createdAt).toDateString(),
            editable: "never",
          },
          {
            title: "Actions",
            tooltip: "Actions",
            render: (data) => {
              return (
                <div className="flex gap-1">
                  <Tooltip title="Details">
                    <div className="text-sm bg-blue-600 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
                      <IconButton
                        onClick={() =>
                          setIsUpdate({ dialogue: true, branchId: data?.id })
                        }
                      >
                        <BorderColor className="!text-white" />
                      </IconButton>
                    </div>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <div className="text-sm bg-red-500 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
                      <IconButton
                        onClick={() =>
                          handleDelete(data)
                        }
                      >
                        <Delete className="!text-white" />
                      </IconButton>
                    </div>
                  </Tooltip>
                </div>

              );
            },
            editable: "never",
          },
        ]}
        detailPanel={[
          {
            tooltip: "info",
            render: ({ rowData }) => (
              <>
                <div className="w-full">
                  {rowData?.photos?.length ?
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 px-8 py-4">
                      {rowData?.photos?.map((pic: any, i: any) => (
                        <div key={i} className="bg-white rounded-lg shadow-lg px-2 py-2">
                          <img className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                            src={pic} alt="Branch" />
                        </div>
                      )
                      )}
                    </div>
                    :
                    <>
                      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 px-8 py-4">
                        <div className="bg-white rounded-lg shadow-lg px-2 py-2">
                          <img className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                            src="https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt="Branch" />
                        </div>
                      </div>
                    </>
                  }
                </div>
              </>
            ),
          },
        ]}

      />
    </section>
  );
};

export default AllBranchColumn;

