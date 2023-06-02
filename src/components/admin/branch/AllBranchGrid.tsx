import { LOCATION } from "assets/dashboard_Icons";
import { RenderIconRow } from "components/common";
import { CountryNameFlag } from "components/core";
import { UpdateDepartment } from "components/dialogues";
import { DepartmentInformation } from "components/drawer";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
interface Props {
  data?: any;
  mutate?: any;
}
const AllBranchGrid = ({ data, mutate }: Props) => {
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
      <div className="my-4">
        <div className="grid xl:grid-cols-4 gap-4 lg:grid-cols-2">
          {data?.map((item: any) => (
            <>
              <div key={item?.id} className="mb-4 w-full">
                <div className="group h-full w-full border-2 border-gray-200 
                border-opacity-60 rounded-lg overflow-hidden shadow-lg">

                  <img className="lg:h-48 md:h-36 w-full object-cover object-center 
                  transition duration-500 ease-in-out transform group-hover:scale-105"
                    src={item?.photo} alt="blog" />
                  <div className="py-1 pt-2 px-4">
                    <h1 className="inline-block py-1 title-font text-xl font-extrabold 
                    text-gray-800 tracking-wide cursor-pointer">
                      {item?.name}
                    </h1>
                    <p className="text-gray-500">{item?.manager}</p>
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
                      <span className="pr-2">
                        <img src={LOCATION.src} className="w-4" alt="" />
                      </span>
                      {item?.location}
                    </h2>
                  </div>


                </div>
              </div>
            </>))}
        </div>
      </div>
    </>
  );
};

export default AllBranchGrid;
