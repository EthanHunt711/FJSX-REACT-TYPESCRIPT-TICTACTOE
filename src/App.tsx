import { useState, useEffect } from "react";
import Square from "./components/Square";

type Scores = {
  [key: string]: number;
};

const initialState = ["", "", "", "", "", "", "", "", ""];
const initialScores: Scores = { X: 0, O: 0 };
const winingCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [gameState, setGameState] = useState(initialState);
  const [currentPlaye, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState(initialScores);

  useEffect(() => {
    const savedScores = localStorage.getItem("scores");
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  useEffect(() => {
    checkForAWinner();
  }, [gameState]);

  const resetBoard = () => setGameState(initialState);

  const handleWin = () => {
    window.alert(`${currentPlaye} has won!`);
    const newPlayerScore = scores[currentPlaye] + 1;
    const newScores = { ...scores };
    newScores[currentPlaye] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));
    resetBoard();
  };

  const handleDraw = () => {
    window.alert("no winner");
    resetBoard();
  };

  const checkForAWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winingCombination.length; i++) {
      const winCombination = winingCombination[i];

      let a = gameState[winCombination[0]];
      let b = gameState[winCombination[1]];
      let c = gameState[winCombination[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);

      return;
    }
    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlaye === "X" ? "O" : "X");
  };

  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];

    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlaye;
    setGameState(newValues);
  };
  return (
    <>
      <div className="h-full p8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
        <h1 className="text-center text-5xl mb-4 font-display text-white">
          APP
        </h1>
        <div className="p-10 grid grid-cols-3 gap-3 max-auto w-96">
          {gameState.map((player, index) => (
            <Square
              key={index}
              onClick={handleCellClick}
              {...{ index, player }}
            />
          ))}
        </div>
        <div className="mx-auto w-96 text-2xl text-serif">
          <p>
            Next player: <span>{currentPlaye}</span>{" "}
          </p>
          <p className="text-white mt-5">
            Player X wins: <span>{scores["X"]}</span>
          </p>
          <p className="text-white mt-5">
            Player O wins: <span>{scores["O"]}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
