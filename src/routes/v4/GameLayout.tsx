import { Link } from "react-router-dom";
export default function GameLayout() {
  return (
    <>
      <Link to="/">home</Link>
      <Link to="/games">games</Link>
      <Link to="/games/1">games id</Link>
      <Link to="/games/search">games search</Link>
    </>
  );
}
