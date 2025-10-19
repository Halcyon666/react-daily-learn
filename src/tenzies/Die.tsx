import type { DiceProp } from "./App";

const Die: React.FC<DiceProp> = ({ value, isHeld }) => {
  return <button className="die">{value}</button>;
};

export default Die;
