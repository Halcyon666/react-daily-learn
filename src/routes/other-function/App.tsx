import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import GameRoutes from "./GameRoutes";
import Home from "./Home";
import NotFoundPage from "./NotFoundPage";
import "./style.css";

export default function App() {
  const state = useLocation().state;

  console.log(state);
  return (
    <>
      <h2>{state?.includes("Hi") ? "" : state}</h2>
      <nav>
        <ul>
          <li>
            {/* <NavLink
              style={({ isActive }) => {
                return isActive ? { color: "red" } : {};
              }}
              to="/"
            >
              {({ isActive }) => {
                return isActive ? "active home" : " home";
              }}
            </NavLink> */}
            <NavLink to="/" className="a" state="Hi">
              home
            </NavLink>
          </li>
          <li>
            <NavLink to="/games">games</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games/*" element={<GameRoutes />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}
