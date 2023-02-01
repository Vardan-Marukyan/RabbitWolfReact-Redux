
import React, { Component } from 'react'
import { CreateBoard } from './component/CreateBoard';

import './App.css';



export default class App extends Component {
  constructor(){
    super()
    this.maxID = 0
    this.state = {
      objectArray: []
    }
  }

  
  addNewObjectInArr = () => {
    const createNewObject = {
      id: this.maxID++
    }
    this.setState(({objectArray}) => {
      const createNewObjectArray= [...objectArray, createNewObject]
      return {objectArray : createNewObjectArray}
    })
  }


  render() {
    return (
      <div className='conteiner'>
        <div className='NewBoard' onClick = {this.addNewObjectInArr}><button>New Board!</button></div>
        <CreateBoard title = {this.state.objectArray}/>
      </div>
    )
  }
}

