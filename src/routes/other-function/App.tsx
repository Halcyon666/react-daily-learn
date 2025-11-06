import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Games from "./Games";
import NotFoundPage from "./NotFoundPage";

export default function App() {
  return (
    <>
      <nav style={{ display: "flex", flexDirection: "column" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/games">Games</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games" element={<Games />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}
