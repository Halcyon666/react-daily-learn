import type { DiceProp } from "./App";

const Die: React.FC<DiceProp> = ({ value, isHeld }) => {
  const style = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  return <button style={style}>{value}</button>;
};

export default Die;
