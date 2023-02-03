import React from 'react'
import { CreateBoard } from './CreateBoard'
export const SendBoardNumber = ({arrayObject}) => {
  return (
    arrayObject.map(el => <CreateBoard element = {el} key={el.id}/>)
  )
}
