
import React, { Component, useState } from 'react'
import { CreateBoard } from './component/CreateBoard';

import './App.css';



export default function App(){


  const [state, setState] = useState([])

  const addNewObjectInArr = () => {
    setState([
      ...state,
      {
        id: Date.now()
      }
    ])
  }

    return (
      <div className='conteiner'>
        <div className='NewBoard' onClick = {addNewObjectInArr}><button>New Board!</button></div>
        <CreateBoard title = {state}/>
      </div>
    )
}

