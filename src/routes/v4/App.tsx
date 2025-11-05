import { Link, Route, Routes, useRoutes } from "react-router-dom";
import { routes } from "./routes";

export default function App() {
  const gamesSubRoute = useRoutes(routes);
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Another Home</h1>}>
          {" "}
        </Route>
      </Routes>
      <nav>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/games">games</Link>
          </li>{" "}
          <li>
            <Link to="/games1">games1</Link>
          </li>
        </ul>
      </nav>
      {gamesSubRoute}
    </div>
  );
}
