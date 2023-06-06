import { useEffect, useRef, useState } from "react";

const useIsVisible = () => {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement: any = useRef<any>();

  const onScroll = () => {
    if (!currentElement.current) {
      setIsVisible(false);
      return;
    }
    const top = currentElement.current.getBoundingClientRect().top;
    setIsVisible(top >= 0 && top <= window?.innerHeight);
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll, true);
    return () => document.removeEventListener("scroll", onScroll, true);
  });

  return [isVisible, currentElement];
};

export default useIsVisible;
