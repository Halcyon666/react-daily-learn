import React from "react";
import { padsData, type PadInfo } from "./pads";
import "./index.css";
import Pad from "./Pad";

export default function App() {
  const [pads, setPads] = React.useState<PadInfo[]>(padsData);
  const toggle = (id: number) => {
    setPads((prevPads) =>
      prevPads.map((p) => (p.id === id ? { ...p, on: !p.on } : p))
    );
  };
  const buttonElements = pads.map((pad) => (
    // do not pass `toggle()` will directly call toggle method
    <Pad toggle={toggle} key={pad.id} {...pad} />
  ));
  return (
    <main>
      <div className="pad-container">{buttonElements}</div>
    </main>
  );
}
