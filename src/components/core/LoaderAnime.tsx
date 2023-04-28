import { NORESULTS } from "assets/animations";
import React from "react";
import Lottie from "react-lottie";
interface Props {
  image?: any;
  animeHight?: number;
  animeWidth?: number;
}
const LoaderAnimeLarge = ({
  image,
  animeHight = 250,
  animeWidth = 250,
}: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: image ? image : NORESULTS,
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
      <span className="text-xl capitalize tracking-wide">No result found!</span>
    </div>
  );
};

export default LoaderAnimeLarge;