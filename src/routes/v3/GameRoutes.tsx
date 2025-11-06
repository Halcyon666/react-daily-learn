import { Route, Routes } from "react-router-dom";
import GamesId from "./GamesId";
import GameLayout from "./GameLayout";

// this contains links and routes
// 1. move all sub Route
// 2. wrapper all routes in to a "<Route element={<GameLayout />}></Route>"
// this part of code equivalent to "src/routes/v4/gameRoutes.tsx"
export const GameRoutes = () => (
  <>
    {/* <GameLayout /> */}
    <Routes>
      <Route element={<GameLayout />}>
        <Route index element={<h1>Games</h1>}></Route>
        <Route path=":id" element={<GamesId />}></Route>
        <Route path="search" element={<h1>games search</h1>}></Route>
      </Route>
    </Routes>
  </>
);

export default GameRoutes;
