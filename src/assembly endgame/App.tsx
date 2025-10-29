import { useState } from "react";
import "./index.css";
import { languages } from "./languages";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react");
  const currentWordElements = currentWord.split("").map((character, index) => (
    // no change the array so use index directly
    <span key={index}>{character.toUpperCase()}</span>
  ));
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return (
    <main>
      <header>
        <h1>Assembly: ENdgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">
        {languages.map((language) => (
          <span
            key={language.name}
            className="chip"
            style={{
              backgroundColor: language.backgroundColor,
              color: language.color,
            }}
          >
            {language.name}
          </span>
        ))}
      </section>
      <section className="word">{currentWordElements}</section>
      <section className="keyboard">
        {alphabet.split("").map((character) => (
          <span>{character}</span>
        ))}
      </section>
    </main>
  );
}
