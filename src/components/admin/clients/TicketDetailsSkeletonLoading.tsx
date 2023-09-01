const TicketDetailsSkeletonLoading = () => {
  return (
    <div className="py-4 rounded shadow-md w-full animate-pulse">
      <div className="flex p-4 space-x-4 md:px-8">
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-700"></div>
        <div className="flex-1 py-2 space-y-4">
          <div className="w-60 h-2 rounded bg-gray-700"></div>
          <div className="w-60 h-2 rounded bg-gray-700"></div>
          <div className="w-40 h-2 rounded bg-gray-700"></div>
        </div>
      </div>
      <div className="p-4 space-y-4 md:px-8">
        <div className="flex gap-1">
          <div className="w-3/6 h-3 rounded bg-gray-700"></div>
          <div className="w-full h-2 rounded bg-gray-700"></div>
        </div>
        <div className="w-3/6 h-3 rounded bg-gray-700"></div>
        <div className="w-full h-2 rounded bg-gray-700"></div>
        <div className="w-3/4 h-3 rounded bg-gray-700"></div>
        <div className="flex gap-2">
          <div className="w-3/6 h-3 rounded bg-gray-700"></div>
          <div className="w-1/6 h-3 rounded bg-gray-700"></div>
        </div>
        <div className="flex gap-1">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700"></div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700"></div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700"></div>
        </div>
        <div className="w-3/6 h-2 rounded bg-gray-700"></div>
        <div className="flex gap-2">
          <div className="w-2/6 h-16 rounded bg-gray-700"></div>
          <div className="w-2/6 h-16 rounded bg-gray-700"></div>
          <div className="w-2/6 h-16 rounded bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsSkeletonLoading;
