import { PeopleRounded } from "@mui/icons-material";
import { Container, Drawer } from "@mui/material";
import { PhotoViewerSmall } from "components/core";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  chatData?: any;
};

const ChatReaction = ({ open, onClose, chatData }: Props) => {
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container className="lg:w-[30vw] w-full mt-[3.5vh]">
          <h1 className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            Reactions
          </h1>
          <div>
            {!chatData?.reactedUsers?.length && <h1>No reactions.</h1>}
            {chatData?.reactedUsers?.map((item: any) => (
              <div
                key={item?.id}
                className="flex justify-between items-center pr-4"
              >
                <div className="w-4/5 hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer flex gap-3 items-center px-2 py-2">
                  <PhotoViewerSmall
                    name={item?.user?.name}
                    photo={item?.user?.photo}
                    size="2.9rem"
                  />
                  <div>
                    <h1 className="text-sm font-semibold">
                      {item?.user?.name}
                    </h1>
                  </div>
                </div>
                <div className="text-2xl">{item?.reaction}</div>
              </div>
            ))}
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ChatReaction;
