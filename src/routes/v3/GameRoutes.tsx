import { Route, Routes } from "react-router-dom";
import GamesId from "./GamesId";

export const GameRoutes = () => (
  <Routes>
    <Route index element={<h1>Games</h1>}></Route>
    <Route path=":id" element={<GamesId />}></Route>
    <Route path="search" element={<h1>games search</h1>}></Route>
  </Routes>
);

export default GameRoutes;
