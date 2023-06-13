
const PageAccessSkeleton = () => {
  return (
    <div className=" w-full animate-pulse">
      <div className="flex ">
        <div className="w-full py-2 px-2 rounded-md ">
          <div className="flex justify-between justify-items-center">
            <div className="w-6 rounded-lg h-3 bg-gray-700"></div>
            <div className="w-40 h-2 rounded bg-gray-700"></div>
            <div className="w-6 rounded-lg h-3 bg-gray-700"></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PageAccessSkeleton