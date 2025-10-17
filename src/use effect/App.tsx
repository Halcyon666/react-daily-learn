import React from "react";
import "./index.css";

export default function App() {
  const [starWarsData, setStarWarsData] = React.useState({});

  console.log("Rendered!");

  React.useEffect(() => {
    console.log("useEffect runs");
    fetch("https://swapi.dev/api/people/1")
      .then((res) => res.json())
      .then((data) => setStarWarsData(data));
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
    </div>
  );
}
