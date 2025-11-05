import { Link, Route, Routes } from "react-router-dom";
import Games from "./Games";
import GameLayout from "./GameLayout";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>anothre home</h1>}></Route>
      </Routes>
      <nav>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
        </ul>{" "}
        <ul>
          <li>
            <Link to="/games">games</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<h1>home</h1>}></Route>

        <Route path="/games" element={<GameLayout />}>
          <Route index element={<h1>games</h1>}></Route>
          <Route path=":id" element={<Games />}></Route>
          <Route path="search" element={<h1>games search</h1>}></Route>
        </Route>
      </Routes>
    </>
  );
}
