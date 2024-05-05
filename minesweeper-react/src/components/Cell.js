import React from 'react'



const Cell = ({value, currentHeight, currentWidth, onCellClick, isDisabled}) => {
    
    return (
      <button className="cell" onClick={() => onCellClick(currentHeight, currentWidth)} disabled={isDisabled}>
      {isDisabled ? value : null}
      </button>
    )
}

export default Cell
