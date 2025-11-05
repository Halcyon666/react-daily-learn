import { Link, useRoutes } from "react-router-dom";
import { routes } from "./Routes";

export default function App() {
  return (
    <>
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to="/">home</Link>
        <Link to="/games">games</Link>
        <Link to="/games/1">games id</Link>
        <Link to="/games/search">games search</Link>
      </nav>
      {useRoutes(routes)}
    </>
  );
}
