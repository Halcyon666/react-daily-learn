import { useParams } from "react-router-dom";

export default function Games() {
  const { id } = useParams();
  return <h1>games {id}</h1>;
}
