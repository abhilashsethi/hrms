import { Avatar } from "@mui/material";

const EmailContainer = () => {
  return (
    <div className="w-full flex flex-col  gap-4">
      <div className="flex w-full items-center gap-4 justify-start">
        <Avatar />
        <div className="flex flex-col">
          <h3 className="font-medium tracking-wide">John Constantine</h3>
          <h3 className="font-medium text-xs text-gray-700">
            john@searchingyard.com
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-bold tracking-wide text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit,
          praesentium.
        </h3>
        <p className="font-medium tracking-wide text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil itaque,
          voluptatum non eveniet impedit commodi dolor magni eum quo sed id, qui
          aperiam recusandae ad deleniti dicta sint corrupti amet. Aliquid ipsa
          laboriosam totam fugit.
        </p>
      </div>
      <h3 className="font-medium tracking-wide">Attachments -</h3>
      <div className="flex flex-wrap gap-4"></div>
    </div>
  );
};

export default EmailContainer;
