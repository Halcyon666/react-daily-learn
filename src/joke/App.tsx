import Joke from "./Joke";
import { jokes } from "./JokerInfo";
import "./index.css";

export default function App() {
  return (
    <div>
      {jokes.map((joke) => (
        <Joke key={joke.id} {...joke} />
      ))}
    </div>
  );
}
