import { Link, Outlet, useSearchParams } from "react-router-dom";

export default function GameLayout() {
  // const [number, setNumber] = useState("");
  // want a search parameter instead of a state
  const [searchParams, setSearchParams] = useSearchParams({ n: "3" });
  const number = searchParams.get("n") || "";
  return (
    <nav>
      <ul>
        <li>
          {/* be careful of to value not only games but the full path */}
          <Link to="/games/search">search</Link>
        </li>
        <li>
          <Link to="/games/1">game1</Link>
        </li>
        <li>
          <Link to={`/games`}>games{number}</Link>
        </li>
      </ul>

      <Outlet />

      <input
        value={number}
        type="number"
        onChange={(e) => setSearchParams({ n: e.target.value })}
      ></input>
    </nav>
  );
}
