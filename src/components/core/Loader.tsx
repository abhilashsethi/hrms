import { LOADER } from "assets/animations";
import React from "react";
import Lottie from "react-lottie";
interface Props {
  image?: any;
  animeHight?: number;
  animeWidth?: number;
}
const Loader = ({ image, animeHight = 250, animeWidth = 250 }: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: image ? image : LOADER,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-[70vh] z-50 fixed w-[80vw] bg-white flex flex-col justify-center items-center">
      <Lottie options={defaultOptions} height={animeHight} width={animeWidth} />
    </div>
  );
};

export default Loader;
