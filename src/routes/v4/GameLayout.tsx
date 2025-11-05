import { Link, Outlet } from "react-router-dom";

export type GameInfo = {
  name: string;
};
export default function GameLayout() {
  const pubg: GameInfo = {
    name: "PUBG",
  };
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to="/games/1">games id</Link>
      <Link to="/games/search">games search</Link>
      <Outlet context={pubg} />
    </nav>
  );
}
