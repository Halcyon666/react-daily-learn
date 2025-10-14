import React from "react";
import { padsData, type PadInfo } from "./pads";
import "./index.css";
import Pad from "./Pad";

export default function App() {
  const [pads, setPads] = React.useState<PadInfo[]>(padsData);
  const toggle = () => {
    console.log("clicked!");
  };
  const buttonElements = pads.map((pad) => (
    <Pad toggle={toggle} key={pad.id} {...pad} />
  ));
  return (
    <main>
      <div className="pad-container">{buttonElements}</div>
    </main>
  );
}
