import { useState } from "react";
import type JokeInfo from "./JokerInfo";

export default function Joke({ setup, punchline }: JokeInfo) {
  const [isShow, setIsShow] = useState(false);
  const changeVisible = () => {
    setIsShow((prev) => !prev);
    console.log(isShow);
  };

  return (
    <>
      {setup && <h3 className="setup">setup: {setup}</h3>}
      {isShow && <p>punchline: {punchline}</p>}
      <button onClick={changeVisible}>change punchline visible</button>
      <hr />
      {/* isShow: {String(isShow)} */}
    </>
  );
}
