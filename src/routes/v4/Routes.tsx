import type { RouteObject } from "react-router-dom";
import GameItem from "./GameItem";
import GameLayout from "./GameLayout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <h1>home</h1>,
  },
  {
    path: "/games",
    // nested layout links here, need Layout inside of it.
    element: <GameLayout />,
    children: [
      { index: true, element: <h1>games</h1> },
      { path: ":id", element: <GameItem /> },
      { path: "search", element: <h1>games search</h1> },
    ],
  },
];
