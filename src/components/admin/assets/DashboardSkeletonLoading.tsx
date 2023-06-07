
const DashboardSkeletonLoading = () => {
  return (
    <div className="grid gap-4">
      <div className="py-2 bg-slate-300 shadow-lg rounded-lg px-2 w-full animate-pulse">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
          <div className="w-20 h-32 rounded bg-gray-700"></div>
          <div className="w-20 h-32 rounded bg-gray-700"></div>
          <div className="w-20 h-32 rounded bg-gray-700"></div>
          <div className="w-20 h-32 rounded bg-gray-700"></div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="w-full h-80 rounded bg-gray-700"></div>
        <div className="w-full h-80 rounded bg-gray-700"></div>
      </div>

    </div>
  )
}

export default DashboardSkeletonLoading