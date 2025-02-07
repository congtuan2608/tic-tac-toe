import React from "react"
import { History } from "../../App";
import Modal from "../molecules/Modal";

export type Player = "X" | "O" | null;
export type Score = Record<Exclude<Player, null>, number>;

type Props = {
  setHistory: React.Dispatch<React.SetStateAction<History[]>>
}

const winningPatterns: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // row
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // column
  [0, 4, 8], [2, 4, 6]             // diagonal
];

export default function Board(props: Props) {
  const [board, setBoard] = React.useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = React.useState<Player>("X");
  const [winner, setWinner] = React.useState<Player | "Draw" | null>(null);
  const [score, setScore] = React.useState<Score>({ X: 0, O: 0 });
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);
  const [winningWithPattern, setWinningWithPattern] = React.useState<number[]>([])
  const [openModal, setOpenModal] = React.useState(false)

  React.useEffect(() => {
    const score = localStorage.getItem("score");
    setScore(JSON.parse(score || "{ X: 0, O: 0 }"));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  React.useEffect(() => {
    if (winner) {
      props.setHistory((prev) =>
        [...prev, { winner: winner || "Draw", timestamp: Date.now(), score }]
      );
    }
  }, [winner]);

  // check if there is a winner
  const checkWinner = (newBoard: Player[]) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinningWithPattern(pattern)
        return newBoard[a];
      }
    }
    return newBoard.every(cell => cell !== null) ? "Draw" : null;
  };

  // handle click event on cell
  const handleOnClick = (index: number) => {
    if (board[index] || winner) return;

    setCurrentIndex(index)

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setOpenModal(true)
      if (gameWinner !== "Draw") {
        setScore((prev) => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
      }
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer("X");
    setCurrentIndex(null);
    setWinningWithPattern([])
    setOpenModal(false)
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0 });
  }

  return <>
    <div className="grid grid-cols-3 gap-2">
      {/* board 3x3 */}
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => handleOnClick(index)}
          className={`size-32 px-2.5 py-5 cursor-pointer flex items-center justify-center text-2xl font-bold bg-indigo-700/5 rounded-lg max-sm:size-24 border-2 hover:border-indigo-600/80 ${currentIndex === index ? "bg-indigo-700/20" : ""} ${winningWithPattern.includes(index) ? 'border-green-500' : 'border-transparent'}`}
        >
          {cell}
        </button>
      ))}
    </div>

    {/* Game control buttons - score */}
    <div>
      <div className="flex flex-row justify-center items-center gap-2">
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-white"
        >
          Restart Game
        </button>
        <button
          onClick={resetScore}
          className="mt-4 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-white"
        >
          Reset score
        </button>
      </div>
    </div>

    {/* score */}
    <div className="mt-2 text-lg">
      <p>Scoreboard:</p>
      <p>Player <b>X</b>: {score.X} | Player <b>O</b>: {score.O}</p>
    </div>

    {/* Open modal when there is a winner */}
    <Modal open={openModal}>
      <div className="flex flex-col gap-1 p-5">
        <h2 className="mt-4 text-xl">
          <b>
            {winner === "Draw" ? "It's a draw!" : `Winner: ${winner}`}
          </b>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-white font-bold"
          >
            Continue
          </button>
        </div>
      </div>
    </Modal>
  </>

}