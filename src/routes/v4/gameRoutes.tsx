import type { RouteObject } from "react-router-dom";
import GameLayout from "./GameLayout";
import GameItem from "./GameItem";
/**
 * reusable links and routes in gameRoutes,
 * - index
 * - index > {id}
 * - index > description
 */
const gameRoutes: RouteObject = {
  element: <GameLayout />,
  children: [
    { index: true, element: <h1>games</h1> },
    { path: ":id", element: <GameItem /> },
    {
      path: "description",
      element: (
        <p>
          PUBG is a last-player-standing shooter where up to 100 players
          parachute onto an island, scavenge for weapons and equipment, and
          fight to be the sole survivor. The playable area continuously shrinks
          throughout the match, forcing players into closer combat.
        </p>
      ),
    },
  ],
};

export default gameRoutes;
