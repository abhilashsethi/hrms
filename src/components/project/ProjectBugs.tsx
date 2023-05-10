import { Add, Person } from "@mui/icons-material";
import { Button } from "@mui/material";

const ProjectBugs = () => {
  return (
    <section>
      <div className="flex gap-2 pb-2 mb-2 border-b-2">
        <div className="w-[60%]">
          <Button
            size="small"
            className="!bg-cyan-500"
            variant="contained"
            startIcon={<Add />}
          >
            ADD NEW
          </Button>
        </div>
        <div className="w-[40%] h-8 border-2 flex justify-between px-4">
          <span>STATUS</span>
          <span>DOCS</span>
          <span>
            <Person fontSize="small" />
          </span>
        </div>
      </div>
      <div className="h-40 w-full border-2 rounded-md">
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
          corrupti!
        </h1>
      </div>
    </section>
  );
};

export default ProjectBugs;
