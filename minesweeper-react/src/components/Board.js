import React, { useEffect, useState } from 'react'
import Cell from './Cell'

const Board = ({height, width, mines}) => {

  const [board, setBoard] = useState([]);




  useEffect(()=>{
    initBoard();
  },[]);

  const checkIfAllcellsRevealed = () => {
    for(let i=0;i<height;i++) {
      for(let j=0;j<width;j++) {
        if(!board[i][j].revealed){
          return false;
        }
      }
    }
    return true;
  }

  const onCellClick = (currentHeight, currentWidth) => {
    let clickedCell = board[currentHeight][currentWidth];
    if(clickedCell.value === "Bomb") {
      alert("You lose, Resetting Board");
      initBoard();
    } else {
      clickedCell.revealed = true;
      if(checkIfAllcellsRevealed()){
        alert("You win, Resetting Board");
        initBoard();
      }
    }
  }


  /*
 "" - Not reveled

 Bomb =  Bomb
 Number =  number
 
*/
  const initBoard = (height, width, mines) => {

    for(let i=0;i<height;i++) {
      board.push([]);
      for(let j=0;j<width;j++) {
        board[i].push({"revealed": false, "value": ""});
      }
    }
    let minesPlaced = 0
    mines = [];
    while(minesPlaced < mines) {
      let randomRow = Math.floor(Math.random() * height)
      let randomCol = Math.floor(Math.random() * width)
      if(board[randomRow][randomCol].value === ""){
        board[randomRow][ randomCol] = {"revealed": false, "value": "Bomb"};
        minesPlaced += 1;

        let dir = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
        for(let k=0;k<dir.length;k++) {
          let row = randomRow + dir[k][0];
          let col = randomCol + dir[k][1];
          if(row >= 0 && row < height && col >= 0 && col < width) {
            if(board[row][col].value !== "Bomb") {
              board[row][col].value = (parseInt(board[row][col].value) + 1).toString();
            }
          }
        }
      }
    }

  }

  const renderBoard = (height, width, mines) => {
    const rows = [];
  
    for (let i = 0; i < height; i++) {
      const row = [];
  
      for (let j = 0; j < width; j++) {
        row.push(<Cell key={i * width + j} currentHeight={i} currentWidth={j} onCellClick={onCellClick} isClickable={board[i] && board[i][j] && !board[i][j].revealed}/>);
      }
  
      rows.push(<div className="board-row" key={i}>{row}</div>);
    }
  
    return rows;
  };


  return (
    <div id='board'>
      {renderBoard(height, width, mines)}
    </div>
  )

  
}


export default Board
