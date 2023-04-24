const AttendanceCard = () => {
  return (
    <>
      {/* Timesheet CARD */}
      <div className="grid lg:grid-cols-3 gap-6 pt-6">
        <div className="bg-white rounded-md shadow-md shadow-theme px-6 py-4">
          <h1 className="text-xl font-medium py-2">Timesheet</h1>
          <div className="p-4 rounded-md shadow-md border ">
            <p className="text-md font-bold">Punch In at</p>
            <p className="text-gray-600 text-sm">Wed, 11th Mar 2019 10.00 AM</p>
          </div>
          <div className="flex justify-center">
            <div className="py-2 grid">
              <button className="border-4 my-2 px-6 py-16 rounded-full">
                3.45 hrs
              </button>
              <button className="bg-theme py-2 px-10 text-white font-semibold rounded-full">
                Punch Out
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 ">
            <div className="border shadow-md grid justify-items-center rounded-md p-2">
              <p>Break</p>
              <p>1.21 hrs</p>
            </div>
            <div className="border shadow-md grid justify-items-center rounded-md p-2 ">
              <p>Overtime</p>
              <p>3 hrs</p>
            </div>
          </div>
        </div>

        {/* Statistics CARD */}
        <div className="bg-white rounded-md shadow-md shadow-theme px-6 py-4">
          <h1 className="text-xl font-medium py-2">Statistics</h1>

          <div className="">
            <div className="p-2 border shadow-md border-spacing-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Today</span>
                <span className="text-sm text-slate-500 font-semibold">
                  {"3.45 / 8 hrs"}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-1 mb-4 mt-2">
                <div
                  className="bg-orange-500 h-1 rounded"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            <div className="p-2 border shadow-md border-spacing-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">This Week</span>
                <span className="text-sm text-slate-500 font-semibold">
                  {"28 / 40 hrs"}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-1 mb-4 mt-2">
                <div
                  className="bg-yellow-500 h-1 rounded"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            <div className="p-2 border shadow-md border-spacing-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">This Month</span>
                <span className="text-sm text-slate-500 font-semibold">
                  {"90 / 160 hrs"}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-1 mb-4 mt-2">
                <div
                  className="bg-green-500 h-1 rounded"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div className="p-2 border shadow-md border-spacing-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Remaining</span>
                <span className="text-sm text-slate-500 font-semibold">
                  {"90 / 160 hrs"}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-1 mt-2">
                <div
                  className="bg-red-500 h-1 rounded"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className=" p-2 border shadow-md border-spacing-2 mt-2-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Overtime</span>
              <span className="text-sm text-slate-500 font-semibold">4</span>
            </div>

            <div className="w-full bg-slate-100 h-1 mb-4 mt-2">
              <div
                className="bg-sky-400 h-1 rounded"
                style={{ width: "20%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Today Activity CARD */}
        <div className="rounded-md bg-white shadow-md shadow-theme px-6 py-4">
          <h1 className="text-xl font-medium py-2">Today Activity</h1>

          <div className="lg:py-2 lg:pr-16">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-4 h-4 border-2 rounded-full"></div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-2">
                <p className="text-md font-bold">Punch In at</p>
                <p className="text-gray-600 text-sm">10.00 AM.</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-4 h-4 border-2 rounded-full"></div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-2">
                <p className="text-md font-bold">Punch Out at</p>
                <p className="text-gray-600 text-sm">11.00 AM.</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-4 h-4 border-2 rounded-full"></div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-2">
                <p className="text-md font-bold">Punch In at</p>
                <p className="text-gray-600 text-sm">11.15 AM.</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-4 h-4 border-2 rounded-full"></div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-2">
                <p className="text-md font-bold">Punch Out at</p>
                <p className="text-gray-600 text-sm">01.30 PM.</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-4 h-4 border-2 rounded-full"></div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-2">
                <p className="text-md font-bold">Punch In at</p>
                <p className="text-gray-600 text-sm">02.00 PM.</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-4 h-4 border-2 rounded-full"></div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-2">
                <p className="text-md font-bold">Punch Out at</p>
                <p className="text-gray-600 text-sm">07.30 PM.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceCard;
