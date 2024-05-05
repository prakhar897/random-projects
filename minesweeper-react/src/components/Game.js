import React from 'react'
import Board from './Board'

const Game = () => {
  const [height, setHeight] = React.useState(3);
  const [width, setWidth] = React.useState(3);
  const [mines, setMines] = React.useState(3);

  return (
    <div>
      <Board height={height} width={width} mines={mines}/>
    </div>
  )
}

export default Game
