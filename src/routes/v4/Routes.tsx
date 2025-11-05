import type { RouteObject } from "react-router-dom";
import Games from "./Games";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <h1>home</h1>,
  },
  {
    path: "games",
    children: [
      { index: true, element: <h1>games</h1> },
      { path: ":id", element: <Games /> },
      { path: "search", element: <h1>games search</h1> },
    ],
  },
];
