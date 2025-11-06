import type { RouteObject } from "react-router-dom";

import gameRoutes from "./gameRoutes";

// equivalent to <Routes>...</Routes>
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <h1>home</h1>,
  },
  {
    path: "/games",
    // nested layout links here, need Layout inside of it.
    /* element: <GameLayout />,
    children: [
      { index: true, element: <h1>games</h1> },
      { path: ":id", element: <GameItem /> },
      { path: "search", element: <h1>games search</h1> },
    ], */
    // reuse code from gameRoutes
    ...gameRoutes,
  },
  {
    path: "/games1",
    ...gameRoutes,
  },
];
