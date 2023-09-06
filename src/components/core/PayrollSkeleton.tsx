import PhotoViewer from "./PhotoViewer";
import HeadText from "./HeadText";

const PayrollSkeleton = () => {
  return (
    <div className="px-4 py-4 text-lg">
      <div className="grid lg:grid-cols-2 my-2 gap-x-24 gap-y-1 w-full">
        <div className="w-full animate-puls border border-gray-400 rounded-lg shadow-lg px-4 py-4">
          <div className="grid gap-2 text-white text-lg justify-items-center">
            <div className="w-28 h-28 rounded-full bg-gray-400 animate-pulse" />
            <p className="w-52 h-5 rounded-md bg-gray-400 animate-pulse "></p>
            <p className="w-64 h-5 rounded-md bg-gray-400 animate-pulse "></p>
            <p className="w-64 h-5 rounded-md bg-gray-400 animate-pulse "></p>
            <p className="w-56 h-5 rounded-md bg-gray-400 animate-pulse "></p>
          </div>
        </div>
        <div className="w-full animate-pulse">
          <div>
            <HeadText className={"bg-green-600"} title="Gains" />
            <div className="my-2 grid gap-y-3 w-full">
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full animate-pulse">
          <div>
            <HeadText className="bg-red-500" title="Deduction" />
            <div className=" my-2 grid gap-y-3 w-full">
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full animate-pulse">
          <div>
            <HeadText className={"bg-yellow-500"} title="CTC" />
            <div className=" my-2 grid gap-y-3 w-full">
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
              <div className="md:flex gap-4 justify-between">
                <p className="text-gray-700 w-3/4 h-5 bg-gray-400 rounded-md"></p>
                <span className="text-blue-700 w-1/4 bg-gray-400 h-5 rounded-md"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="w-60 h-10 bg-gray-400 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default PayrollSkeleton;
