import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const WORDS = ["APPLE", "GRAPE", "LEMON", "MELON", "GREEN"];
const GAME_KEYS = [
  "Mango", "Peach", "Berry", "Apple", "Grape", "Melon", "Lemon", "Guava", "Olive", "Plumb",
  "Chili", "Prune", "Cacao", "Wheat", "Onion", "Wooly", "Spine", "Cider", "Sugar", "Curry",
  "Maple", "Pearl", "Coral", "Amber", "Stone", "Metal", "Glove", "Cloud", "Flame", "Charm",
  "Smile", "Teeth", "Toast", "Music", "Happy", "Brave", "Piano", "Latch", "Wrist", "Spoon",
  "Crown", "Shiny", "Tulip", "Daisy", "Petal", "Swarm", "Leech", "Thorn", "Honey", "Scent",
  "Fresh", "Windy", "Storm", "Blink", "Torch", "Light", "Blaze", "Crisp", "Frost", "Snowy",
  "Bloom", "Fauna", "Flora", "Green", "Creek", "Brook", "River", "Ocean", "Whale", "Shark",
];

const App = () => {
  const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [showGameKeys, setShowGameKeys] = useState(false);

  const handleInputChange = (e) => {
    setCurrentGuess(e.target.value.toUpperCase().slice(0, 5));
  };

  const isValidWord = (word) => WORDS.includes(word) || GAME_KEYS.includes(word);

  const getFeedback = (guess, target) => {
    return guess.split("").map((letter, index) => {
      if (letter === target[index]) {
        return "correct";
      } else if (target.includes(letter)) {
        return "present";
      } else {
        return "absent";
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentGuess.length !== 5 || !isValidWord(currentGuess)) {
      setMessage("Please enter a valid letters.");
      return;
    }

    const newGuesses = [...guesses];
    newGuesses[attempt] = currentGuess;
    setGuesses(newGuesses);

    if (currentGuess === targetWord) {
      setGameOver(true);
      setMessage("🎉 Congratulations! You guessed the word!");
    } else if (attempt === 5) {
      setGameOver(true);
      setMessage(`❌ Game over! The word was ${targetWord}.`);
    } else {
      setMessage("");
    }

    setAttempt(attempt + 1);
    setCurrentGuess("");
  };

  const resetGame = () => {
    setTargetWord(getRandomWord());
    setGuesses(Array(6).fill(""));
    setCurrentGuess("");
    setAttempt(0);
    setGameOver(false);
    setMessage("");
    setShowInstructions(false);
    setShowGameKeys(false);
  };

  return (
    <div className="App container text-center">
      <h1 className="my-4">Wordle Clone <span className="name">@Keerthana</span></h1>

      {/* Buttons Container */}
      <div className="buttons-container">
        <button className="btn btn-primary mb-3" onClick={() => setShowInstructions(true)}>
          How to Play
        </button>
        <button className="btn btn-info mb-3" onClick={() => setShowGameKeys(!showGameKeys)}>
          {showGameKeys ? "Hide Game Keys" : "Show Game Keys"}
        </button>
      </div>

      {/* Game Keys Modal */}
      {showGameKeys && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Game Keys</h5>
                  <button type="button" className="btn-close" onClick={() => setShowGameKeys(false)}></button>
                </div>
                <div className="modal-body">
                  <ul className="game-keys-list">
                    {GAME_KEYS.map((key, index) => (
                      <li key={index}>{key}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Instructions Modal */}
      {showInstructions && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">How to Play</h5>
                  <button type="button" className="btn-close" onClick={() => setShowInstructions(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Guess the 5-letter word in 6 tries.</p>
                  <p className="text-success left">• Green: Correct letter & position.</p>
                  <p className="text-warning left">• Yellow: Correct letter, wrong position.</p>
                  <p className="text-secondary left">• Gray: Incorrect letter.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Game Grid */}
      <div className="game-container my-4">
        <div className="grid">
          {guesses.map((guess, rowIndex) => (
            <div key={rowIndex} className="row">
              {Array(5)
                .fill("")
                .map((_, colIndex) => (
                  <div key={colIndex} className={`cell ${guess ? getFeedback(guess, targetWord)[colIndex] : ""}`}>
                    {guess ? guess[colIndex] : ""}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="message my-2">{message}</div>

      {/* Input Form */}
      {!gameOver && (
        <form onSubmit={handleSubmit} className="my-3">
          <input
            type="text"
            value={currentGuess}
            onChange={handleInputChange}
            maxLength={5}
            className="form-control w-50 mx-auto text-uppercase text-center"
          />
          <button type="submit" className="btn btn-success mt-2">Submit</button>
        </form>
      )}
      {/* Game Over Button */}
      {gameOver && <button onClick={resetGame} className="btn btn-warning mt-3">New Game</button>}
    </div>
  );
};

export default App;