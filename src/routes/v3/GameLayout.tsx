import { Link, Outlet } from "react-router-dom";

export default function GameLayout() {
  return (
    <nav>
      <ul>
        <li>
          {/* be careful of to value not only games but the full path */}
          <Link to="/games/search">search</Link>
        </li>
        <li>
          <Link to="/games/1">game1</Link>
        </li>
      </ul>

      <Outlet />
    </nav>
  );
}
