import { NavLink, Route, Routes } from "react-router-dom";
import GameRoutes from "./GameRoutes";
import Home from "./Home";
import NotFoundPage from "./NotFoundPage";
import "./style.css";

export default function App() {
  return (
    <>
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
            <NavLink to="/" className="a">
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
