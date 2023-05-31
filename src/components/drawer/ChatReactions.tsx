import { PeopleRounded } from "@mui/icons-material";
import { Container, Drawer } from "@mui/material";
import { PhotoViewerSmall } from "components/core";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const ChatReaction = ({ open, onClose }: Props) => {
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container className="lg:w-[30vw] w-full mt-[3.5vh]">
          <h1 className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            Reactions
          </h1>
          <div>
            <div className="flex justify-between items-center pr-4">
              <div className="w-4/5 hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer flex gap-3 items-center px-2 py-2">
                <PhotoViewerSmall
                  name="Srinu Reddy"
                  photo="https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg"
                  size="2.9rem"
                />
                <div>
                  <h1 className="text-sm font-semibold">Srinu Reddy</h1>
                </div>
              </div>
              <div className="text-2xl">👍</div>
            </div>
            <div className="flex justify-between items-center pr-4">
              <div className="w-4/5 hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer flex gap-3 items-center px-2 py-2">
                <PhotoViewerSmall name="Abhilash Kumar" size="2.9rem" />
                <div>
                  <h1 className="text-sm font-semibold">Abhilash Kumar</h1>
                </div>
              </div>
              <div className="text-2xl">❤️</div>
            </div>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ChatReaction;
