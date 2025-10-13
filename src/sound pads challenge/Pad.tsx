import { useState } from "react";
import type { PadInfo } from "./pads";

export default function Pad({ color, on }: PadInfo) {
  // import hold another status in Pad component. instead of using original in parent component
  // but this is a derived state
  const [innerOn, setInnerOn] = useState(on);

  const toggle = () => {
    setInnerOn((prev) => !prev);
  };
  return (
    <button
      onClick={toggle}
      style={{ backgroundColor: color }}
      className={innerOn ? "on" : undefined}
    ></button>
  );
}
