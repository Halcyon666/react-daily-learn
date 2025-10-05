import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hello from "./Hello";

// import { createElement } from "react";

// we need not this
// const reactElement = createElement(
//   "h1",
//   null,
//   createElement("span", null, "I am inside span")
// );

// imperative code create element
// const h1 = document.createElement("h1")
// h1.textContent = "This is imperative coding"
// h1.className = "header"
// document.getElementById("root").appendChild(h1)

const reactElement = (
  <h1>
    <span>Hello from TSX</span>
  </h1>
);
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more !!!
      </p>
      <Hello /> this from react component
      {reactElement} this from reactElement
      <h1 className="header">Hello react!</h1>
    </>
  );
}

export default App;
