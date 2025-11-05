import { useRoutes } from "react-router-dom";
import { routes } from "./Routes";
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
        {<GameLayout />}
      </nav>
      {useRoutes(routes)}
    </>
  );
}
