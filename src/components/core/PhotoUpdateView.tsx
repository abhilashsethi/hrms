import { PhotoCamera } from "@mui/icons-material";
import { GROUP } from "assets/home";
import { BASE_URL, useChange, useChatData, useFetch, useMutation } from "hooks";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { deleteFile, uploadFile } from "utils";

const PhotoUpdateView = ({
  photo,
  chatId,
  editable,
}: {
  photo?: string;
  chatId?: string;
  editable?: boolean;
}) => {
  const [isImage, setIsImage] = useState<any>(null);
  const PhotoRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (PhotoRef.current) {
      editable && PhotoRef.current.click();
    }
  };

  const {
    revalidateChatProfileDetails,
    revalidateCurrentChat,
    selectedChatId,
    reValidateGroupChat,
    reValidatePrivateChat,
  } = useChatData();

  const { change } = useChange();

  const handleUpdateImage = async (file: any) => {
    try {
      //delete previous file
      await deleteFile(String(photo?.split("/").reverse()[0]));

      const url = await uploadFile(
        file,
        `${Date.now()}.${file.name.split(".").at(-1)}`
      );

      const res: any = await change(`chat/${chatId}`, {
        method: "PATCH",
        body: { photo: url },
      });

      chatId && revalidateChatProfileDetails(chatId);

      Swal.fire({
        title: "Success",
        icon: "success",
      });
      revalidateCurrentChat(selectedChatId);
      reValidateGroupChat();
      reValidatePrivateChat();
    } catch (error) {
      Swal.fire({
        title: "Update Failed.",
        icon: "error",
        text: error instanceof Error ? error.message : "Image Update Failed.",
      });
    }
  };

  return (
    <div className="h-40 group relative w-40 rounded-full bg-slate-200 overflow-hidden border-[1px] shadow-md">
      <img
        className="h-full object-cover w-full"
        src={isImage ? URL.createObjectURL(isImage) : photo || GROUP.src}
        alt="image"
      />

      {editable && (
        <div
          onClick={handleButtonClick}
          className="h-40 w-40 absolute hidden bg-[#00000080] cursor-pointer rounded-full top-0 left-0 group-hover:flex justify-center items-center"
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <PhotoCamera className="!text-white" />
            <span className="text-white text-sm ">ADD GROUP ICON</span>
            <input
              ref={PhotoRef}
              onChange={(e: any) => {
                setIsImage(e.target.files[0]);
                handleUpdateImage(e.target.files[0]);
              }}
              type="file"
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpdateView;
