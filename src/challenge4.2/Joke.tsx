import type JokeInfo from "./JokerInfo";

export default function Joke({ setup, punchline }: JokeInfo) {
  return (
    <>
      {setup && <p className="setup">setup: {setup}</p>}
      <p>punchline: {punchline}</p>
      <hr />
    </>
  );
}
