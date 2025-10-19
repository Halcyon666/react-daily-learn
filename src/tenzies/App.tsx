import React, { useState } from "react";
import "./index.css";
import Die from "./Die";
import { nanoid } from "nanoid/non-secure";

export interface DiceProp {
  value: number;
  isHeld: boolean;
  id: string;
}

const App: React.FC = () => {
  const generateDice = () =>
    Array.from({ length: 10 }, () => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  const [dice, setDice] = useState<DiceProp[]>(generateDice());
  const changeToHeld = (id: string) =>
    setDice((prevDice) =>
      prevDice.map((die) => (die.id === id ? { ...die, isHeld: true } : die))
    );

  const diceElements = dice.map((diceProp) => (
    // becarefull passvalue do not pass all object,instead of spread all of it.
    <Die
      key={diceProp.id}
      changeToHeld={() => changeToHeld(diceProp.id)}
      die={diceProp}
    />
  ));

  const rollDice = () => {
    setDice(generateDice());
  };

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
};

export default App;
