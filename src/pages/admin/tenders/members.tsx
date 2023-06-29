import { Delete, Info } from "@mui/icons-material";
import { Button } from "@mui/material";
import { AdminBreadcrumbs, PhotoViewer } from "components/core";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import Swal from "sweetalert2";
import { User } from "types";
import { deleteFile } from "utils";

const Members = () => {
  const { data: employees, mutate } = useFetch<User[]>(`users?departmentName=BID`);
  const { change } = useChange();
  const handleDelete = async (user: User) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`users/${user?.id}`, {
            method: "DELETE",
          });
          if (user?.photo) {
            await deleteFile(String(user?.photo?.split("/").reverse()[0]));
          }
          if (res?.status !== 200) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          Swal.fire(`Success`, "Deleted Successfully!", "success");
          mutate();
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PanelLayout title="Tender Members">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <section className="my-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
            {employees?.map((item) => (
              <div key={item?.id}>
                <div className="w-full border-[1px] border-blue-400 bg-gradient-to-b from-blue-50 to-blue-200 gap-2 rounded-md flex flex-col items-center py-4">
                  <PhotoViewer name={item?.name} photo={item?.photo} />
                  <h1 className="text-sm font-semibold">{item?.name}</h1>
                  <h1 className="text-sm text-gray-600">{item?.email}</h1>
                  <div className="flex gap-2 items-center">
                    <Link href={`/admin/employees/profile/${item?.id}`}>
                      <Button
                        size="small"
                        className="!bg-blue-500"
                        variant="contained"
                        startIcon={<Info />}
                      >
                        INFO
                      </Button>
                    </Link>
                    <Button
                      size="small"
                      className="!bg-youtube"
                      variant="contained"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(item)}
                    >
                      REMOVE
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </PanelLayout>
  );
};

export default Members;

const links = [
  { id: 1, page: "Tenders", link: "/admin/tenders/all-tenders" },
  {
    id: 2,
    page: "Members",
    link: "/admin/tenders/members",
  },
];

const members = [
  {
    id: 1,
    name: "Srinu Reddy",
    email: "srinu@sy.com",
    photo:
      "https://img.freepik.com/premium-vector/happy-smiling-young-man-avatar-3d-portrait-man-cartoon-character-people-vector-illustration_653240-187.jpg",
  },
  {
    id: 2,
    name: "Abhilash Sethi",
    email: "abhi@sy.com",
    photo:
      "https://cdn3d.iconscout.com/3d/premium/thumb/young-businessman-avatar-5692602-4743371.png",
  },
  {
    id: 3,
    name: "Gourav Kumar",
    email: "kumar@sy.com",
    photo:
      "https://www.getillustrations.com/packs/3d-avatar-illustrations/male/_1x/Avatar,%203D%20_%20man,%20male,%20people,%20person,%20glasses,%20short%20hair,%20suit,%20blazer,%20tie_md.png",
  },
  {
    id: 4,
    name: "Loushik Giri",
    email: "loushik@sy.com",
    photo:
      "https://www.getillustrations.com/packs/3d-avatar-illustrations/female/_1x/Avatar,%203D%20_%20woman,%20female,%20person,%20people,%20short%20hair,%20earring,%20glasses,%20necklace,%20sweater_md.png",
  },
  {
    id: 5,
    name: "Dinesh Kumar",
    email: "dinesh@sy.com",
    photo:
      "https://cdn3d.iconscout.com/3d/premium/thumb/young-businessman-avatar-5692602-4743371.png",
  },
];
