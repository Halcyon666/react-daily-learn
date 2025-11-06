import { Link, Route, Routes } from "react-router-dom";
import NotFoundPage from "../other-function/NotFoundPage";
import GameRoutes from "./gameRoutes";
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
      </nav>
      <Routes>
        <Route path="/" element={<GamesHome />}></Route>
        {/* must "/*"" after "/games" */}
        <Route path="/games/*" element={<GameRoutes />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}
