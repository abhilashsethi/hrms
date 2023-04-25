import {
  DeleteRounded,
  EditRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { ProjectUpdate } from "components/dialogues";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";

const Projects = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isDialogue, setIsDialogue] = useState(false);
  const router = useRouter();
  const [isUpdate, setisUpdate] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });
  const { data: roleData, mutate } =
    useFetch<[{ id: string; name: string }]>(`projects`);
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <ProjectUpdate
        id={isUpdate?.id}
        open={isUpdate?.dialogue}
        handleClose={() => setisUpdate({ dialogue: false })}
        mutate={mutate}
      />
      {projectsData2?.map((items: any) => (
        <div className="relative bg-white w-full rounded-xl flex flex-col gap-2 tracking-wide shadow-xl">
          <div className="absolute right-[10px] top-[10px]">
            <Tooltip title="More">
              <IconButton onClick={handleClick}>
                <MoreVertRounded />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: "15th June 2021",
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <div onClick={() => setisUpdate({ dialogue: true, id: "xx" })}>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <EditRounded fontSize="small" />
                  </ListItemIcon>
                  Edit
                </MenuItem>
              </div>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteRounded fontSize="small" />
                </ListItemIcon>
                Delete
              </MenuItem>
            </Menu>
          </div>
          <div className="px-4 py-2">
            <h1 className="py-1 text-xl font-semibold tracking-wide">
              {items?.projectName}
            </h1>
            <div className="text-sm text-gray-400 ">
              <span>Start Date -</span> <span>{items?.startDate}</span>
            </div>
            <div className="py-4 text-md text-gray-400 tracking-wide">
              <p>{items?.description}</p>
            </div>
            <div className="py-2 text-md">
              <h2>Deadline :</h2>
              <span className="text-gray-400 text-sm">{items?.deadline}</span>
            </div>
            <div className="py-2 text-md">
              <h2>Team :</h2>
              <div className="py-2 flex justify-start">
                <AvatarGroup max={5}>
                  {items?.team.map((teams: any) => (
                    <Avatar alt={teams?.name} src={teams?.img} />
                  ))}
                </AvatarGroup>
              </div>
            </div>
            <div className="py-2 text-md">
              <h2>Github :</h2>
              <Link href="#">{items?.github}</Link>
            </div>
            <div className="py-2 text-md">
              <h2>Developing URL :</h2>
              <Link href="#">{items?.linkedin} </Link>
            </div>
            <div className="py-2 text-md">
              <h2>Production URL :</h2>
              <Link href="#">{items?.linkedin} </Link>
            </div>
            <div className="p-2 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  {items?.progress}
                </span>
                <span className="text-sm text-slate-500 font-semibold">
                  {items?.perc}
                </span>
              </div>

              <div className="w-full bg-slate-200 h-1 mb-4 mt-2">
                <div
                  className="bg-green-500 h-1 rounded"
                  style={{ width: `${items?.perc}` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
const projectsData2 = [
  {
    projectName: "Office Management",
    startDate: "15th June 2021",
    taskCompllete: 9,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it",
    deadline: "17 Apr 2019",
    led: "https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    team: [
      {
        name: "Jack Rayan",
        img: "https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Srinu Ready",
        img: "https://images.pexels.com/photos/749072/pexels-photo-749072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "John Snow",
        img: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Mick Doland",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Anumous Matrix",
        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Anjel walker",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Keywara Matrix",
        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Anjel walker",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
    github: "https://github.io.com/office-management-axa122vsacs5cscs5sc",
    linkedin: "https://linkedin.com/office-management-axa122vsacs5cscs5sc",
    progress: "progress",
    perc: "60%",
  },
  {
    projectName: "Office Management",
    startDate: "15th June 2021",
    taskCompllete: 9,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it",
    deadline: "17 Apr 2019",
    led: "https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    team: [
      {
        name: "Jack Rayan",
        img: "https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Srinu Ready",
        img: "https://images.pexels.com/photos/749072/pexels-photo-749072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "John Snow",
        img: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Mick Doland",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Anumous Matrix",
        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Anjel walker",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Keywara Matrix",
        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Anjel walker",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
    github: "https://github.io.com/office-management-axa122vsacs5cscs5sc",
    linkedin: "https://linkedin.com/office-management-axa122vsacs5cscs5sc",
    progress: "progress",
    perc: "60%",
  },
  {
    projectName: "Office Management",
    startDate: "15th June 2021",
    taskCompllete: 9,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it",
    deadline: "17 Apr 2019",
    led: "https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    team: [
      {
        name: "Jack Rayan",
        img: "https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Srinu Ready",
        img: "https://images.pexels.com/photos/749072/pexels-photo-749072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "John Snow",
        img: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Mick Doland",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Anumous Matrix",
        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Anjel walker",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Keywara Matrix",
        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Anjel walker",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
    github: "https://github.io.com/office-management-axa122vsacs5cscs5sc",
    linkedin: "https://linkedin.com/office-management-axa122vsacs5cscs5sc",
    progress: "progress",
    perc: "60%",
  },
];
