import { Link, Route, Routes } from "react-router-dom";
import NotFoundPage from "../nav-link-and-navigate/NotFoundPage";
import GameRoutes from "./GameRoutes";
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
        {/* if using replace here, backward will be two pages instead of one page */}
        <Link to="/" replace>
          home
        </Link>
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
