
import React, { Component, useState } from 'react'
import { SendBoardNumber } from './component/BoardNumber';

import './App.css';


let ID = 0
export default function App(){
  const [state, setState] = useState([])

  const addNewObjectInArr = () => {
    setState([
      ...state,
      {
        id: ID++,
      }
    ])
  }

    return (
      <div className='conteiner'>
        <div className='NewBoard' onClick = {addNewObjectInArr}><button>New Board!</button></div>
        <SendBoardNumber arrayObject = {state}/>
      </div>
    )
}

