import { Link, Route, Routes } from "react-router-dom";
import Games from "./Games";
import type { JSX } from "react";
import GamesSearch from "./GamesSearch";
import GamesHome from "./GamesHome";

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
      {routes}
    </>
  );
}

const routes: JSX.Element = (
  <Routes>
    <Route path="/" element={<GamesHome />}></Route>
    <Route path="/games">
      <Route index element={<GamesHome />}></Route>
      <Route path=":id" element={<Games />}></Route>
      <Route path="search" element={<GamesSearch />}></Route>
    </Route>
  </Routes>
);
