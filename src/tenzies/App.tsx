import React, { useState } from "react";
import "./index.css";
import Die from "./Die";
import { nanoid } from "nanoid/non-secure";
import ReactConfetti from "react-confetti";

export interface DiceProp {
  value: number;
  isHeld: boolean;
  id: string;
}

const App: React.FC = () => {
  const getRandomValue1To6 = () => Math.ceil(Math.random() * 6);
  const generateDice = () =>
    Array.from({ length: 10 }, () => ({
      value: getRandomValue1To6(),
      isHeld: false,
      id: nanoid(),
    }));
  const [dice, setDice] = useState<DiceProp[]>(generateDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => dice[0].value === die.value);

  const changeToHeld = (id: string) =>
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );

  const diceElements = dice.map((diceProp) => (
    // be careful passvalue do not pass all object,instead of spread all of it.
    <Die
      key={diceProp.id}
      changeToHeld={() => changeToHeld(diceProp.id)}
      die={diceProp}
    />
  ));

  const rollDice = () => {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld ? die : { ...die, value: getRandomValue1To6() }
      )
    );
  };

  return (
    <main>
      {gameWon && <ReactConfetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-button" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default App;
