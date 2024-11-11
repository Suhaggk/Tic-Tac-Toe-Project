import React, { useState, useEffect } from 'react';
import './GameBoard.css';

interface GameBoardProps {
  onGameEnd: (winner: string | null) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ onGameEnd }) => {
  // State for board, next player turn, and winner
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const winningCombinations = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],
    [1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
  ];

  // Check for a winner or draw in the current board state
  const checkWinner = (newBoard: Array<string | null>) => {
    for (const [a, b, c] of winningCombinations) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    if (newBoard.every(cell => cell !== null)) {
      return 'Draw';
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const currentWinner = checkWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      onGameEnd(currentWinner); 
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    onGameEnd(null); 
  };

  return (
    <div className="game-board">
      <div className="grid">
        {board.map((cell, index) => (
          <div key={index} onClick={() => handleClick(index)} className={`cell ${cell}`}>
            {cell}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">Reset</button>
    </div>
  );
};

export default GameBoard;
