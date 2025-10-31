import { useState } from "react";
import "./index.css";
import { languages } from "./languages";
import clsx from "clsx";

export default function AssemblyEndgame() {
  // state values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  // drived valuse
  const wrongGuessesArr = guessedLetters.filter(
    (c) => !currentWord.includes(c)
  );

  // static valuse
  const alphabet = "qwertyuiopasdfghjkl";
  const alphabet1 = "zxcvbnm";

  const currentWordElements = currentWord.split("").map((character, index) => (
    // no change the array so use index directly
    <span key={index}>
      {/* fixed length position and prefill, no append, It is smart.
      R --- guessedLetters includes ? ture display R, otherwise ""
      E --- see above
      A --- see above
      C --- see above
      T --- see above
      */}
      {guessedLetters.includes(character) ? character.toUpperCase() : ""}
    </span>
  ));

  const keyboardElements = (alphabet: string) => {
    return alphabet.split("").map((character) => {
      // use two array get derived status, after clicking page will be rendered!
      const isGuessed = guessedLetters.includes(character);
      const hasCurrentWord = currentWord.includes(character);
      const isRight = isGuessed && hasCurrentWord;
      const isWrong = isGuessed && !hasCurrentWord;

      return (
        <button
          className={clsx({
            "green-background": isRight,
            "red-background": isWrong,
          })}
          key={character}
          onClick={() => keyboardClick(character)}
        >
          {character.toUpperCase()}
        </button>
      );
    });
  };

  const keyboardClick = (letter: string) => {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
    // setGuessedLetters((prevLetters) => {
    //   const set = new Set(prevLetters);
    //   set.add(letter);
    //   return Array.from(set);
    // });
  };

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
      <div>
        <section className="keyboard">{keyboardElements(alphabet)}</section>
        <section className="keyboard less-gap">
          {keyboardElements(alphabet1)}
        </section>
      </div>

      <button className="new-game">New Game</button>
    </main>
  );
}
