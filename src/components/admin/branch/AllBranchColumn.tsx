import MaterialTable from "@material-table/core";
import { Edit, PeopleRounded } from "@mui/icons-material";
import { HeadStyle, ReverseIOSSwitch } from "components/core";
import { UpdateBranch } from "components/dialogues";
import { DepartmentInformation } from "components/drawer";
import { useChange } from "hooks";
import { useState } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { Role } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
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
    branchData?: string | null;
  }>({ dialogue: false, branchData: null });

  return (
    <section className="mt-8">
      <UpdateBranch
        branchData={isUpdate?.branchData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
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
            title: "Photos",
            tooltip: "Photos",
            render: (data) => {
              return (
                <>
                  {data?.photos?.length ?
                    data?.photos?.length > 1 ? (
                      <>
                        <Slider {...settings} className="">
                          {data?.photos?.map((data: any, k: any) => (
                            <img key={k} className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                              src={data?.photo} alt="Branch" />
                          ))}
                        </Slider>
                      </>
                    ) : (
                      <>
                        {data?.photos?.map((data: any, k: any) => (
                          <img key={k} className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                            src={data?.photo} alt="Branch" />
                        ))}
                      </>
                    ) : <img className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                      src="https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt="Branch" />}
                </>
              );
            },
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
          },
          {
            title: "Phone",
            tooltip: "Phone",
            field: "phone",
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
                <ReverseIOSSwitch size="small"
                  checked={data?.isBlocked}
                // onChange={(e) => handleBlock(e, data?.id)}
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
            title: "Update",
            tooltip: "update",
            render: (data) => {
              return (
                <span onClick={() => {
                  setIsUpdate({ dialogue: true, branchData: data });
                }} className="group w-full hover:bg-theme text-theme hover:text-white flex border-2 px-2 py-1 datas-center justify-center ">
                  <Edit fontSize="small" />
                </span>
              );
            },
            editable: "never",
          },
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            setLoading(true);
            Swal.fire("", "Please Wait...", "info");
            try {
              const res = await change(`branches/${oldData.id}`, {
                method: "DELETE",
              });
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
          },
        }}
      />
    </section>
  );
};

export default AllBranchColumn;

