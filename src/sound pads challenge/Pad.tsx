import type { PadProp } from "./pads";
import React from "react";

const Pad: React.FC<PadProp> = ({ id, color, on, toggle }: PadProp) => {
  // import hold another status in Pad component. instead of using original in parent component
  // but this is a derived state
  //  const [innerOn, setInnerOn] = useState(on);
  return (
    <button
      onClick={() => toggle(id)}
      style={{ backgroundColor: color }}
      className={on ? "on" : undefined}
    ></button>
  );
};

export default Pad;
