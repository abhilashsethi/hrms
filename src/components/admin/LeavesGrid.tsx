const LeavesGrid = () => {
  return (
    <>
      <section className="py-6 ">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row flex-wrap-reverse justify-center mt-8">
            <div className="flex flex-col justify-center w-full px-8 mx-4 my-6 text-center rounded-md md:w-96 lg:w-80 xl:w- shadow-xl drop-shadow-lg bg-white">
              <img
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500"
                src="https://source.unsplash.com/100x100/?portrait?0"
              />
              <div className="flex-1 my-6">
                <p className="text-xl font-semibold leading-snug">
                  Leroy Jenkins
                </p>
                <p className="mb-2">Visual Designer</p>
                <span className="bg-green-300 text-green-600 rounded-full px-6 py-1 font-semibold ">
                  Approved
                </span>
              </div>
              <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                <button className="bg-green-600 text-white font-semibold rounded-md px-6 py-2">
                  Accept{" "}
                </button>
                <button className="bg-red-600 text-white font-semibold rounded-md px-6 py-2">
                  Decline
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full px-8 mx-4 my-6 text-center rounded-md md:w-96 lg:w-80 xl:w- shadow-xl drop-shadow-lg bg-white">
              <img
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500"
                src="https://source.unsplash.com/100x100/?portrait?1"
              />
              <div className="flex-1 my-6">
                <p className="text-xl font-semibold leading-snug">
                  Leroy Jenkins
                </p>
                <p className="mb-2">Visual Designer</p>
                <span className="bg-red-300 text-red-600 rounded-full px-6 py-1 font-semibold ">
                  Decline
                </span>
              </div>
              <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                <button className="bg-green-600 text-white font-semibold rounded-md px-6 py-2">
                  Accept{" "}
                </button>
                <button className="bg-red-600 text-white font-semibold rounded-md px-6 py-2">
                  Decline
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full px-8 mx-4 my-6 text-center rounded-md md:w-96 lg:w-80 xl:w- shadow-xl drop-shadow-lg bg-white">
              <img
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500"
                src="https://source.unsplash.com/100x100/?portrait?2"
              />
              <div className="flex-1 my-6">
                <p className="text-xl font-semibold leading-snug">
                  Leroy Jenkins
                </p>
                <p className="mb-2">Visual Designer</p>
                <span className="bg-yellow-300 text-yellow-600 rounded-full px-6 py-1 font-semibold ">
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                <button className="bg-green-600 text-white font-semibold rounded-md px-6 py-2">
                  Accept{" "}
                </button>
                <button className="bg-red-600 text-white font-semibold rounded-md px-6 py-2">
                  Decline
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full px-8 mx-4 my-6 text-center rounded-md md:w-96 lg:w-80 xl:w- shadow-xl drop-shadow-lg bg-white">
              <img
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500"
                src="https://source.unsplash.com/100x100/?portrait?3"
              />
              <div className="flex-1 my-6">
                <p className="text-xl font-semibold leading-snug">
                  Leroy Jenkins
                </p>
                <p className="mb-2">Visual Designer</p>
                <span className="bg-yellow-300 text-yellow-600 rounded-full px-6 py-1 font-semibold ">
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                <button className="bg-green-600 text-white font-semibold rounded-md px-6 py-2">
                  Accept{" "}
                </button>
                <button className="bg-red-600 text-white font-semibold rounded-md px-6 py-2">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeavesGrid;
