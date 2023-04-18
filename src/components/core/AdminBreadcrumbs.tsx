import { Home } from "@mui/icons-material";
import Link from "next/link";

const AdminBreadcrumbs = () => {
  return (
    <div className="px-8 pt-4 pb-2 flex gap-4 items-center tracking-wide">
      <Link href="/admin">
        <span className="px-4 py-1 bg-slate-50 shadow-sm rounded-full hover:shadow-lg text-sm font-medium text-gray-600 cursor-pointer transition-all ease-in-out duration-300">
          <Home className="!text-theme" fontSize="small" /> Home
        </span>
      </Link>
      <span>/</span>
      <Link href="#">
        <span className="px-4 py-1 cursor-pointer shadow-sm bg-slate-50 rounded-full text-sm font-medium text-gray-600 hover:shadow-lg transition-all ease-in-out duration-300">
          Employees
        </span>
      </Link>
    </div>
  );
};

export default AdminBreadcrumbs;
