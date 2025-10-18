import { useEffect, useState } from "react";

export default function WindowTracker() {
  const [windowWidth, setWindownWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const watchWindowWidth = () => {
      console.log("resized!");
      setWindownWidth(window.innerWidth);
    };
    window.addEventListener("resize", watchWindowWidth);
    // cleaning up what creating before
    return () => {
      window.removeEventListener("resize", watchWindowWidth);
      console.log("cleaning up");
    };
  }, []);
  return <h1>Window width: {windowWidth}</h1>;
}
