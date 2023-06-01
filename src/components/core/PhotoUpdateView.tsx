import { PhotoCamera } from "@mui/icons-material";
import { GROUP } from "assets/home";
import { useRef, useState } from "react";

const PhotoUpdateView = ({ photo }: { photo?: string }) => {
  const [isImage, setIsImage] = useState<any>(null);
  const PhotoRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (PhotoRef.current) {
      PhotoRef.current.focus();
    }
  };
  return (
    <div className="h-40 group relative w-40 rounded-full bg-slate-200 overflow-hidden border-[1px] shadow-md">
      <img
        className="h-full object-cover w-full"
        src={isImage ? URL.createObjectURL(isImage) : photo || GROUP.src}
        alt="image"
      />
      <div
        onClick={handleButtonClick}
        className="h-40 w-40 absolute hidden bg-[#00000080] cursor-pointer rounded-full top-0 left-0 group-hover:flex justify-center items-center"
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <PhotoCamera className="!text-white" />
          <span className="text-white text-sm ">ADD GROUP ICON</span>
          <input
            ref={PhotoRef}
            onChange={(e: any) => setIsImage(e.target.files[0])}
            type="file"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoUpdateView;
