import { useState, useEffect } from "react";
import Square from "./components/Square";

type Scores = {
  [key: string]: number;
};

const initialState = ["", "", "", "", "", "", "", "", ""];
const initialScores: Scores = { X: 0, O: 0, D: 0 };
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
  const [winner, setWinner] = useState("");

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
    // window.alert(`${currentPlaye} has won!`);
    setWinner(currentPlaye);
    const newPlayerScore = scores[currentPlaye] + 1;
    const newScores = { ...scores };
    newScores[currentPlaye] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));
    resetBoard();
  };

  const handleDraw = () => {
    // window.alert("no winner");
    const newDrawScore = scores["D"] + 1;
    const newScores = { ...scores };
    newScores["D"] = newDrawScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));
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
      <div className="h-full p8 text-slate-800 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <h1 className="text-center text-5xl mb-4 font-display text-white pt-10">
          TIC TAC TOE
        </h1>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col items-center justify-center p-50">
            <p className="text-black text-4xl font-bold mt-5">
              Next player: <span>{currentPlaye}</span>{" "}
            </p>
            <div className="p-10 grid grid-cols-3 gap-3 max-auto w-96">
              {gameState.map((player, index) => (
                <Square
                  key={index}
                  onClick={handleCellClick}
                  {...{ index, player }}
                />
              ))}
            </div>
          </div>
          <div className="mx-auto w-96 text-2xl text-serif flex flex-col items-center justify-center gap-10">
            <p className="text-red-600 text-4xl mt-5">
              Player X wins: <span>{scores["X"]}</span>
            </p>
            <p className="text-blue-900 text-4xl mt-5">
              Player O wins: <span>{scores["O"]}</span>
            </p>
            <p className="text-yellow-900 text-4xl mt-5">
              Games drawn: <span>{scores["D"]}</span>
            </p>
            {!gameState.includes("") ? (
              <p className="text-white text-4xl mt-25">There are no winners</p>
            ) : (
              <p className="text-white text-4xl mt-25">
                {" "}
                Congratulations! The last round won by {winner}.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
