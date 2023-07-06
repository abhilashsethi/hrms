const GstConfigSkeleton = () => {
  return (
    <div className="grid gap-4">
      <div className="py-2 px-2 w-full animate-pulse">
        <div className="flex justify-center text-center justify-items-center">
          <div className="w-1/3 h-8 rounded bg-gray-400"></div>
        </div>
      </div>
      <div className="grid gap-6 animate-pulse">
        <div className="w-32 h-4 rounded bg-gray-400"></div>
        <div className="w-full h-10 rounded bg-gray-400"></div>
        <div className="w-32 h-4 rounded bg-gray-400"></div>
        <div className="w-full h-10 rounded bg-gray-400"></div>
        <div className="w-32 h-4 rounded bg-gray-400"></div>
        <div className="w-full h-10 rounded bg-gray-400"></div>
      </div>
      <div className="flex mt-6 animate-pulse justify-center text-center justify-items-center">
        <div className="w-52 h-10 rounded bg-gray-400"></div>
      </div>
    </div>
  );
};

export default GstConfigSkeleton;
