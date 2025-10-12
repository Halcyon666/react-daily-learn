import { useState } from "react";
import type JokeInfo from "./JokerInfo";

export default function Joke({ setup, punchline }: JokeInfo) {
  const [isShow, setIsShow] = useState(false);
  const changeVisible = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <>
      {setup && <h3 className="setup">setup: {setup}</h3>}
      {isShow ? <p>punchline: {punchline}</p> : null}
      {/*       {!isShow && <button onClick={changeVisible}>show punchline</button>}
      {isShow && <button onClick={changeVisible}>hide punchline</button>} */}
      <button onClick={changeVisible}>
        {isShow ? "hide" : "show"} punchline
      </button>
      <hr />
      {/* isShow: {String(isShow)} */}
    </>
  );
}
