import { Link, Route, Routes } from "react-router-dom";
import Games from "./Games";

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
      <Routes>
        <Route path="/" element={<h1>home</h1>}></Route>
        <Route path="/games" element={<h1>games</h1>}></Route>
        <Route path="/games/:id" element={<Games />}></Route>
        <Route path="/games/search" element={<h1>games search</h1>}></Route>
      </Routes>
    </>
  );
}
