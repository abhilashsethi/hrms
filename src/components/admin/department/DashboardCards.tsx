import Link from "next/link";

interface Props {
  data?: any;
}
const DashboardCards = ({ data }: Props) => {
  return (
    <>
      <div className="flex gap-2 py-4">
        <div className="w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
            <Link href={"/admin/department/all-department"}>
              <div className="group hover:scale-105 transition duration-500 ease-in-out bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer">
                <div className="flex justify-around items-center pb-3">
                  <div className="p-3 bg-theme rounded-full">
                    <div className="w-16">
                      <img
                        className="w-16"
                        src="/department.png"
                        alt="dept icon"
                      />
                    </div>
                  </div>
                </div>
                <span className=" text-theme font-semibold text-center tracking-wide text-md">
                  Total Department
                </span>
                <span className="text-xl text-theme text-center font-semibold ">
                  {data?.totalDepartments}
                </span>
              </div>
            </Link>
            {/* {data?.departmentWiseUsers?.map((item: any) => (
              <div key={item?.id}>
                <div className="group hover:scale-105 transition duration-500 ease-in-out bg-white w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer">
                  <div className="flex justify-around items-center pb-3">
                    <div className="p-3 bg-theme rounded-full">
                      <div className="w-16">
                        <img
                          className="w-16"
                          src="/department.png"
                          alt="dept icon"
                        />
                      </div>
                    </div>
                  </div>
                  <span className=" text-theme font-semibold text-center tracking-wide text-md">
                    {item?.name}
                  </span>
                  <span className="text-xl text-theme text-center font-semibold ">
                    {item?._count}
                  </span>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCards;
