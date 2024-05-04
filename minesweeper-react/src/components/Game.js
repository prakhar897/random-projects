import React from 'react'
import Board from './Board'

const Game = () => {
  const [height, setHeight] = React.useState(10);
  const [width, setWidth] = React.useState(10);
  const [mines, setMines] = React.useState(10);

  return (
    <div>
      <Board height={height} width={width} mines={mines}/>
    </div>
  )
}

export default Game
