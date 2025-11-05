import { useOutletContext, useParams } from "react-router-dom";
import type { GameInfo } from "./GameLayout";

export default function GameItem() {
  const { id } = useParams();
  const { name } = useOutletContext<GameInfo>();
  return (
    <h1>
      games {id} - {name}
    </h1>
  );
}
