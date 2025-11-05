import { Link, Outlet } from "react-router-dom";

export default function GameLayout() {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to="/games/1">games id</Link>
      <Link to="/games/search">games search</Link>
      <Outlet />
    </nav>
  );
}
