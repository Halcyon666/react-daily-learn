import { useLocation } from "react-router-dom";

export default function Home() {
  const state = useLocation().state;
  return <h1>{state.includes("Error") ? "" : state} Home</h1>;
}
