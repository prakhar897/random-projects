/**
 * IMPORTANT!
 * CodeSignal implicitly imports React, ReactDOM, and the CSS file for you.
 * `import React from 'react'`
 *
 * This means you can use hooks by prefixing them with `React.`
 * e.g. React.useState() React.useEffect()
 *
 * This assessment uses React 17.
 */

interface GridSquareProps {
  /** Callback fired when this grid square is clicked */
  onClick: (index: number) => void;
  /** Boolean indicating whether this square is mined or not */
  isExplosive: boolean;
  /** Boolean indicating whether this square has been uncovered */
  uncovered: boolean;
  /** The nearby mines count to display */
  nearbyMinesCount: number;
  /** The grid index of this square (ordinal) */
  index: number;
}
const GridSquare = ({
  index,
  onClick,
  isExplosive,
  uncovered,
  nearbyMinesCount,
}: GridSquareProps) => {
  return (
    <div
      id={`mine-${index}`}
      className={`mine ${isExplosive ? "live" : ""}`}
      onClick={() => {
        onClick(index);
      }}
    >
      <div
        id={`mine-overlay-${index}`}
        className="overlay"
        style={{
          display: uncovered ? "none" : undefined,
        }}
      />
      <span id={`mine-nearby-count-${index}`} className="nearby-count">
        {isExplosive ? "💥" : nearbyMinesCount}
      </span>
    </div>
  );
};

interface GridProps {
  height: number;
  width: number;
}
const Grid = ({ height, width }: GridProps) => {
  
  const [boardData, setBoardData] = React.useState([]);
  
  React.useEffect(() => {
    initializeBoard(height, width, mines);
  },[]);
  
  const initializeBoard = (height, width, mines) => {
    const board = [];
    for(let i=0;i< height;i++){
      board.push([]);
      for(let j=0;j<width;j++){
        board[i].push({revealed: false, value: 0});
      }
    }
    
    let minesPlaced = 0;
    //TODO
    while(minesPlaced < mines) {
      const randomRow = Math.floor(Math.random() * height);
      const randomCol = Math.floor(Math.random() * width);
      
      if(board[randomRow][randomCol].value !== -1){
        board[randomRow][randomCol] = {revealed: false, value: -1};
        minesPlaced++;
        
        const directions = [
          [1,0],
          [-1,0],
          [0,1],
          [0,-1],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1]
        ]
        
        for(const dir of directions){
          const newRow = randomRow + dir[0];
          const newCol = randomCol + dir[1];
          
          if(newRow >=0 && newRow < height && newCol >=0 && newCol < width){
            if(board[newRow][newCol].value !== -1){
              board[newRow][newCol].value++;
            }
          }
        }
      }
    }
    
    setBoardData(board);
    
  }
  
  const handleCellClick = (cellIndex) => {
    
    const currentHeight = cellIndex/height;
    const currentWidth = cellIndex % height;
    const newBoardData = [...boardData];
    const clickedCell = newBoardData[currentHeight][currentWidth];
    
    if(clickedCell.value === -1){
      alert("You Lost, Resetting Board");
      initializeBoard(height, width, mines);
      return;
    }
    
    newBoardData[currentHeight][currentWidth].revealed = true;
    setBoardData(newBoardData);
    
    if(isGameWon(newBoardData, height, width)){
      alert("You Won, Resetting Board");
      initializeBoard(height, width, mines);
    }
  }
  
  const mines = React.useMemo(() => {
    let result = [] as React.ReactNode[];
    for (let i = 0; i < height * width; i++) {
      result.push(
        <GridSquare
          index={i}
          key={i}
          onClick={(_: number) => handleCellClick(i)}
          isExplosive={false}
          uncovered={false}
          nearbyMinesCount={0}
        />
      );
    }
    return result;
  }, [height, width]);

  return (
    <div
      id="minefield"
      className="minefield"
      style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
    >
      {mines}
    </div>
  );
};


type Seed = [width: number, height: number, mineLocations: Set<number>];
function processSeed(seed: string) {
  const [width, height, ...mineIndices] = seed.split(",");

  return [
    Number(width),
    Number(height),
    new Set<number>(mineIndices.map(Number)),
  ] as Seed;
}
const GameSeedInput = ({
  _seed, _setSeed, setSeed
}) => {
 

  return (
    <div id="game-seed-input">
      <input
        id="game-seed-input-input"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          _setSeed(e.target?.value ?? "");
        }}
        placeholder={"Game Seed"}
      />
      <button
        id="game-seed-input-button"
        onClick={() => {
          setSeed(processSeed(_seed));
        }}
      >
        Play
      </button>
    </div>
  );
};

const GameOver = ({
  restartGame,
  wonOrLost,
}: {
  restartGame: () => void;
  wonOrLost: "won" | "lost";
}) => {
  return (
    <div onClick={() => restartGame()} id="minesweeper-game-over">
      You {wonOrLost === "lost" ? "Lost" : "Won"} - Click to restart
    </div>
  );
};

const Cell = ({value, currentHeight, currentWidth, onCellClick, isDisabled}) => {
  
  return (
    <button className="cell" onClick={() => onCellClick(currentHeight, currentWidth)} disabled={isDisabled}>
    {isDisabled ? value : null}
    </button>
  )
}

const Board = ({height, width, mines}) => {
  const [boardData, setBoardData] = React.useState([]);
  
  React.useEffect(() => {
    initializeBoard(height, width, mines);
  },[]);
  
  const isGameWon = (board, height, width) => {
    for(let i=0;i<height;i++){
      for(let j=0;j<width;j++){
        if(!board[i][j].revealed && board[i][j].value != -1){
          return false;
        }
      }
    }
    return true;
  }
  
  const handleCellClick = (currentHeight, currentWidth) => {
    const newBoardData = [...boardData];
    const clickedCell = newBoardData[currentHeight][currentWidth];
    
    if(clickedCell.value === -1){
      alert("You Lost, Resetting Board");
      initializeBoard(height, width, mines);
      return;
    }
    
    newBoardData[currentHeight][currentWidth].revealed = true;
    setBoardData(newBoardData);
    
    if(isGameWon(newBoardData, height, width)){
      alert("You Won, Resetting Board");
      initializeBoard(height, width, mines);
    }
  }
  
  const initializeBoard = (height, width, mines) => {
    const board = [];
    for(let i=0;i< height;i++){
      board.push([]);
      for(let j=0;j<width;j++){
        board[i].push({revealed: false, value: 0});
      }
    }
    
    let minesPlaced = 0;
    //TODO
    while(minesPlaced < mines) {
      const randomRow = Math.floor(Math.random() * height);
      const randomCol = Math.floor(Math.random() * width);
      
      if(board[randomRow][randomCol].value !== -1){
        board[randomRow][randomCol] = {revealed: false, value: -1};
        minesPlaced++;
        
        const directions = [
          [1,0],
          [-1,0],
          [0,1],
          [0,-1],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1]
        ]
        
        for(const dir of directions){
          const newRow = randomRow + dir[0];
          const newCol = randomCol + dir[1];
          
          if(newRow >=0 && newRow < height && newCol >=0 && newCol < width){
            if(board[newRow][newCol].value !== -1){
              board[newRow][newCol].value++;
            }
          }
        }
      }
    }
    
    setBoardData(board);
    
  }
  
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
    ))
  }
  
  return (
    <div id="board" className="minefield"> {renderBoard()} </div>
  )
}

const Game = () => {
   const [_seed, _setSeed] = React.useState<string>("");
  const [height, setHeight] = React.useState(3);
  const [width, setWidth] = React.useState(3);
  const [mineIndices, setMineIndices] = React.useState([]);
  
  const setSeed = (height, width, mineIndices) =>   {
    if(width*height<=0){
      return (<div></div>);
    } else if(
      for(let indice of mineIndices){
        if(indice >= height*width)
          return(<div></div>);
      }
    )
    
    
  }
  
  return (<div> <GameSeedInput _seed={_seed} _setSeed={_setSeed}/> <Grid height={height} width={width} /> </div>)
}

const Minesweeper = () => {
  return (
    <div id="minesweeper-main">
      <h1 id="minesweeper-title">Minesweeper</h1>
      <Game />
    </div>
  );
};

ReactDOM.render(<Minesweeper />, document.getElementById("app"));
