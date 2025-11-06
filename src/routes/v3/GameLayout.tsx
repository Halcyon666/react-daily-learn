import { Link, Outlet } from "react-router-dom";

export default function GameLayout() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="search">search</Link>
        </li>
        <li>
          <Link to="1">game1</Link>
        </li>
      </ul>

      <Outlet />
    </nav>
  );
}
