import { Home } from "@mui/icons-material";
import Link from "next/link";

// const links = [{ id: 1, page: "Employees", link: "/admin/employees" }];

interface ARRAY {
  id: number;
  page: string;
  link: string;
}

interface Props {
  links?: ARRAY[];
}

const AdminBreadcrumbs = ({ links }: Props) => {
  return (
    <div className="py-2 flex gap-4 items-center tracking-wide">
      <Link href="/admin">
        <span className="px-4 py-1 bg-slate-50 shadow-sm rounded-full hover:shadow-lg text-sm font-medium text-gray-600 cursor-pointer transition-all ease-in-out duration-300">
          <Home className="!text-theme" fontSize="small" /> Home
        </span>
      </Link>
      {links?.map((item) => (
        <div key={item?.id} className="flex gap-4">
          <span>/</span>
          <Link href={item?.link}>
            <span className="px-4 py-1 cursor-pointer shadow-sm bg-slate-50 rounded-full text-sm font-medium text-gray-600 hover:shadow-lg transition-all ease-in-out duration-300">
              {item?.page}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AdminBreadcrumbs;
