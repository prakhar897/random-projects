import React from 'react'



const Cell = ({currentHeight, currentWidth, onCellClick, isClickable}) => {
  
    return (
      <button class="cell" onClick={() => onCellClick(currentHeight, currentWidth)} isClickable={isClickable}>

      </button>
    )
}

export default Cell
