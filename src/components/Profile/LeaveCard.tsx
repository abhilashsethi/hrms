const LeaveCard = () => {
  return (
    <>
      {/* Timesheet CARD */}
      <div className="grid lg:grid-cols-2 gap-6 pt-6">
        <div className="bg-white rounded-md shadow-md shadow-theme px-6 py-4">
          <h1 className="text-xl font-medium py-2">Leave Sheet</h1>
          <div className="p-4 rounded-md shadow-md border grid justify-items-center  ">
            <p className="text-md font-bold">Total Leaves</p>
            <p className="text-gray-600 text-sm">330</p>
          </div>
          <div className="flex justify-center">
            <div className="py-2 grid">
              <button className="border-4 my-2 px-6 py-14 rounded-full">
                24
              </button>
              <button className="bg-theme py-2 px-10 text-white font-semibold rounded-full">
                Pending
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 ">
            <div className="border shadow-md grid justify-items-center rounded-md p-2">
              <p>Approved</p>
              <p>330</p>
            </div>
            <div className="border shadow-md grid justify-items-center rounded-md p-2 ">
              <p>Reject</p>
              <p>10</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveCard;
