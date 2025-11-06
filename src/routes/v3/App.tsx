import { Link, Route, Routes } from "react-router-dom";
import NotFoundPage from "../other-function/NotFoundPage";
import GamesHome from "./GamesHome";
import GamesId from "./GamesId";
import GameLayout from "./GameLayout";

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
      </nav>
      <Routes>
        <Route path="/" element={<GamesHome />}></Route>
        <Route path="/games" element={<GameLayout />}>
          <Route index element={<h1>Games</h1>}></Route>
          <Route path=":id" element={<GamesId />}></Route>
          <Route path="search" element={<h1>games search</h1>}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}
