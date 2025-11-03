import { useState } from "react";
import "./index.css";
import { languages } from "./languages";
import clsx from "clsx";
import { getFarewellText, chooseAWord } from "./utils.js";
import ReactConfetti from "react-confetti";

export default function AssemblyEndgame() {
  // state values
  const [currentWord, setCurrentWord] = useState(() => chooseAWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  // drived values
  const wrongGuessesArr = guessedLetters.filter(
    (c) => !currentWord.includes(c)
  );
  const isGameLost = wrongGuessesArr.length >= languages.length - 1;
  const isGameWon = currentWord
    .split("")
    .every((c: string) => guessedLetters.includes(c));
  const isGameOver = isGameLost || isGameWon;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const lastLetterWrong =
    guessedLetters.length > 0 && !currentWord.includes(lastGuessedLetter);

  // static valuse
  const alphabet = "qwertyuiopasdfghjkl";
  const alphabet1 = "zxcvbnm";

  const currentWordElements = currentWord
    .split("")
    .map((character: string, index: number) => (
      // no change the array so use index directly
      <span
        key={index}
        className={clsx({
          "missed-letter": isGameLost && !guessedLetters.includes(character),
        })}
      >
        {/* fixed length position and prefill, no append, It is smart.
      R --- guessedLetters includes ? ture display R, otherwise ""
      E --- see above
      A --- see above
      C --- see above
      T --- see above
      */}
        {isGameLost || guessedLetters.includes(character)
          ? character.toUpperCase()
          : ""}
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
          disabled={isGameOver}
          aria-disabled={guessedLetters.includes(character)}
          aria-label={`Letter ${character}`}
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

  const languageElements = languages.map((language, index) => {
    const isLost = index < wrongGuessesArr.length;
    const className = clsx("chip", { lost: isLost });
    // const className = clsx("chip", isLost && "lost");
    return (
      <span
        key={language.name}
        // className={`chip ${isLost ? "lost" : ""}`}
        className={className}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </span>
    );
  });

  const gameStatusElement = isGameWon ? (
    <>
      <h2>You win!</h2>
      <p>Well done! 🎉</p>
    </>
  ) : isGameLost ? (
    <>
      <h2>Game Over!</h2>
      <p>You lose! Better start learning Assembly 😭</p>
    </>
  ) : lastLetterWrong ? (
    getFarewellText(languages[wrongGuessesArr.length - 1].name)
  ) : null;

  const newGame = () => {
    setGuessedLetters([]);
    setCurrentWord(chooseAWord());
  };

  return (
    <main>
      {isGameWon && <ReactConfetti recycle={false} numberOfPieces={1000} />}
      <header>
        <h1>Assembly: ENdgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section
        aria-live="polite"
        role="status"
        className={clsx("game-status", {
          "game-won": isGameWon,
          "game-lost": isGameLost,
          "game-farewell": !isGameOver && lastLetterWrong,
        })}
      >
        {gameStatusElement}
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{currentWordElements}</section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {languages.length - 1 - wrongGuessesArr.length} attempts
          left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter: string) =>
              guessedLetters.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>
      <div>
        <section className="keyboard">{keyboardElements(alphabet)}</section>
        <section className="keyboard less-gap">
          {keyboardElements(alphabet1)}
        </section>
      </div>

      {isGameOver && (
        <button onClick={newGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}
