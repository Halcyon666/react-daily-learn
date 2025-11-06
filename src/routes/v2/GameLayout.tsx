import { Link, Outlet } from "react-router-dom";

// only links in layout
export default function GameLayout() {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to="/games/1">games id</Link>
      <Link to="/games/search">games search</Link>
      {/* must outlet here cuz of using wrapped nav in App.tsx
        <Route path="/games" element={<GameLayout />}>
      */}
      <Outlet />
    </nav>
  );
}
