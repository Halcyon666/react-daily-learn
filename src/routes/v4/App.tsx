import { Link, useRoutes } from "react-router-dom";
import { routes } from "./Routes";

export default function App() {
  const gamesSubRoute = useRoutes(routes);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/games">games</Link>
          </li>
        </ul>
      </nav>
      {gamesSubRoute}
    </>
  );
}
