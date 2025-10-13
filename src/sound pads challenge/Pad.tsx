import type { PadInfo } from "./pads";

export default function Pad({ color, on }: PadInfo) {
  return (
    <button
      style={{ backgroundColor: color }}
      className={on ? "on" : undefined}
    ></button>
  );
}
