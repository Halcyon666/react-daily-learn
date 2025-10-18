import { useState } from "react";
import WindowTracker from "./WindowTracker";
import "./style.css";

export default function App() {
  const [show, setShow] = useState(true);
  const toggle = () => {
    setShow((prev) => !prev);
  };
  return (
    <main className="container">
      <button onClick={toggle}>Toggle WindowTracker</button>
      {show && <WindowTracker />}
    </main>
  );
}
