import { useState } from "react";
import type { PadProp } from "./pads";

export default function Pad({ color, on, toggle }: PadProp) {
  // import hold another status in Pad component. instead of using original in parent component
  // but this is a derived state
  const [innerOn, setInnerOn] = useState(on);
  console.log(toggle);
  return (
    <button
      onClick={toggle}
      style={{ backgroundColor: color }}
      className={innerOn ? "on" : undefined}
    ></button>
  );
}
