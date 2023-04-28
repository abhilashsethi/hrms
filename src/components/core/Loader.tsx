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
    <div className="h-[60vh] w-full flex flex-col justify-center items-center">
      <div>
        <Lottie
          options={defaultOptions}
          height={animeHight}
          width={animeWidth}
        />
      </div>
    </div>
  );
};

export default Loader;