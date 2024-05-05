import React, { useEffect, useState } from 'react'
import Cell from './Cell'

const Board = ({height, width, mines}) => {

  const [boardData, setBoardData] = useState([]);




  useEffect(() => {
    initializeBoard(height, width, mines);
  }, []);

  const isGameWon = (board, height, width) => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (!board[i][j].revealed && board[i][j].value !== -1) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCellClick = (currentHeight, currentWidth) => {
    const newBoardData = [...boardData]; // Create a copy
    const clickedCell = newBoardData[currentHeight][currentWidth];

    if (clickedCell.value === -1) {
      alert('You lose! Resetting Board');
      initializeBoard(height, width, mines);
      return; // Early exit on losing click
    }

    newBoardData[currentHeight][currentWidth].revealed = true;
    setBoardData(newBoardData);

    if (isGameWon(newBoardData, height, width)) {
      alert('You win! Resetting Board');
      initializeBoard(height, width, mines);
    }
  };


  /*

 Bomb =  Bomb [-1]
 Number =  number [0....8]
 
*/
const initializeBoard = (height, width, mines) => {
  const board = [];
  for (let i = 0; i < height; i++) {
    board.push([]);
    for (let j = 0; j < width; j++) {
      board[i].push({ revealed: false, value: 0 });
    }
  }

  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const randomRow = Math.floor(Math.random() * height);
    const randomCol = Math.floor(Math.random() * width);

    if (board[randomRow][randomCol].value !== -1) {
      board[randomRow][randomCol] = { revealed: false, value: -1 };
      minesPlaced++;

      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ];

      for (const dir of directions) {
        const newRow = randomRow + dir[0];
        const newCol = randomCol + dir[1];

        if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
          if (board[newRow][newCol].value !== -1) {
            board[newRow][newCol].value++;
          }
        }
      }
    }
  }

  setBoardData(board);

  console.log(board);
};

const renderBoard = () => {
  return boardData.map((row, rowIndex) => (
    <div className="board-row" key={rowIndex}>
      {row.map((cell, colIndex) => (
        <Cell
          key={rowIndex * width + colIndex}
          value={cell.revealed ? cell.value : null}
          currentHeight={rowIndex}
          currentWidth={colIndex}
          onCellClick={handleCellClick}
          isDisabled={cell.revealed}
        />
      ))}
    </div>
  ));
};


return (
  <div id="board">
    {renderBoard()}
  </div>
);

  
}


export default Board
