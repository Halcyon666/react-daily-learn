import { useParams } from "react-router-dom";

export default function GameItem() {
  const { id } = useParams();
  return <h1>games {id}</h1>;
}
