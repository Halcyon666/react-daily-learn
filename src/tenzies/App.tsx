import React, { useState } from "react";
import "./index.css";
import Die from "./Die";

const App: React.FC = () => {
  const [dice, setDice] = useState<number[]>(() =>
    Array.from({ length: 10 }, () => Math.ceil(Math.random() * 6))
  );

  const diceElements = dice.map((value, key) => (
    <Die key={key} value={value} />
  ));
  return (
    <main>
      <div className="dice-container">{diceElements}</div>
    </main>
  );
};

export default App;
