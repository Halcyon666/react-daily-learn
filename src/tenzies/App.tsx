import React, { useState } from "react";
import "./index.css";
import Die from "./Die";

const App: React.FC = () => {
  const generateDice = () =>
    Array.from({ length: 10 }, () => Math.ceil(Math.random() * 6));
  const [dice, setDice] = useState<number[]>(generateDice());

  const diceElements = dice.map((value, key) => (
    <Die key={key} value={value} />
  ));

  const rollDice = () => {
    setDice(generateDice());
  };
  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>Roll Dice</button>
    </main>
  );
};

export default App;
