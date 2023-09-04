import Link from "next/link";

interface ARRAY {
  id?: number | undefined;
  icon?: JSX.Element | any;
  count?: number | undefined | string;
  title?: string | undefined;
  img?: string | undefined;
  bg?: string | undefined;
  link?: string;
  className?: string | undefined;
}

interface Props {
  data?: ARRAY[];
}

const DashboardCard = ({ data }: Props) => {
  return (
    <div className="w-full ">
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
        {data?.map((item) => (
          <div key={item?.id}>
            {item?.link ? (
              <Link href={item?.link}>
                <div
                  className={`${item?.className} w-ful md:h-44 flex flex-col border-[1px] rounded-lg p-4 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer hover:bg-theme group shadow-next`}
                >
                  <div
                    className={`h-12 border-b-[3px] border-slate-300 w-12 rounded-lg shadow-md bg-gradient-to-r flex justify-center items-center ${item?.bg}`}
                  >
                    {/* {item?.icon} */}
                    <img
                      className="h-7 object-contain"
                      src={item?.img}
                      alt=""
                    />
                  </div>
                  <h1 className="mt-4 font-semibold tracking-wide text-slate-800 group-hover:text-white transition-all ease-in-out duration-200">
                    {item?.title}
                  </h1>
                  <h3 className="mt-2 text-slate-500 tracking-wide text-sm group-hover:text-white transition-all ease-in-out duration-200">
                    {item?.count}
                  </h3>
                </div>
              </Link>
            ) : (
              <>
                <div
                  className={`${item?.className} w-ful flex flex-col border-[1px] rounded-lg p-4 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer hover:bg-theme group shadow-next`}
                >
                  <div
                    className={`h-12 border-b-[3px] border-slate-300 w-12 rounded-lg shadow-md bg-gradient-to-r flex justify-center items-center ${item?.bg}`}
                  >
                    {/* {item?.icon} */}
                    <img
                      className="h-7 object-contain"
                      src={item?.img}
                      alt=""
                    />
                  </div>
                  <h1 className="mt-4 font-semibold tracking-wide text-slate-800 group-hover:text-white transition-all ease-in-out duration-200">
                    {item?.title}
                  </h1>
                  <h3 className="mt-2 text-slate-500 tracking-wide text-sm group-hover:text-white transition-all ease-in-out duration-200">
                    {item?.count}
                  </h3>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
