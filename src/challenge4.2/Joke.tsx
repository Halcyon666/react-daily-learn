import type JokeInfo from "./JokerInfo";

export default function Joke({ setup, punchline }: JokeInfo) {
  return (
    <>
      <p>{setup}</p>
      <p>{punchline}</p>
      <hr />
    </>
  );
}
