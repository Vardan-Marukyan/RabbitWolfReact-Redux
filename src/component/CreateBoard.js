import React, { createRef } from 'react'
import { gameBoardCreateScript,gameStartScript } from './gameScript'


export const CreateBoard = ({element}) => {
  const select = createRef()
  const gameBoard = createRef()
  const h2 = createRef()
  const status = createRef()

  const FREE_CELL = 0
  let matrix = []

  const selectValue = () => {
    return select.current.value
  }

  const getEmptyMatrix = (size) => {
    matrix = []
    for(let i = 0; i < size; i++){
      matrix[i] = []
      for(let j = 0; j < size; j++){
        matrix[i][j] = FREE_CELL
      }
    }
  }

  const settings = () => {
    return {
      wolves : 0,
      bans : 0,
      rabbit : 1,
      home : 1
    }
  }


  const gameSettings = settings()

  const controlerClick = (controler) => {
    gameStartScript(controler,select,gameBoard,element.matrix, h2, status)
  }



  const createGameBoard = () => {
    getEmptyMatrix(selectValue())
    element.matrix = matrix
    gameBoardCreateScript(select,gameBoard,element.matrix,gameSettings,status)
  } 

  return (
    <div className='boardStyle ' >
      <div className='divStyle'>
          <div><button onClick={createGameBoard}>Start</button></div>
          <select  ref={select}>
            <option value={5}>5X5</option>
            <option value={7}>7X7</option>
            <option value={10}>10X10</option>
      </select>
      </div>

      <div className='boardDiv'>
      <div className='board' ref={gameBoard}></div>
      </div>

      <div className='status' ref={status} style={{  display: "none"}}>
        <div className='statusBoard'>
          <h2 className='h2' ref={h2}>Game over</h2>
        </div>
      </div>

      <div className='controlersDiv'>
        <div className='controlerRight'onClick={() => controlerClick("Right")}></div>
        <div className='controlerDown'onClick={() => controlerClick("Down")}></div>
        <div className='controlerUp'onClick={() => controlerClick("Up")}></div>
        <div className='controlerLeft'onClick={() => controlerClick("Left")}></div>
      </div>
    </div>
    )
}