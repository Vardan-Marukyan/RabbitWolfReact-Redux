import React from 'react'
import { CreateBoard } from './CreateBoard'
import {useSelector} from "react-redux";

export const SendBoardNumber = () => {
  const objectArray = useSelector((state) => {
    if(state === undefined){
      return []
    }
    return state
  })

  return (
    objectArray.map(el => <CreateBoard element = {el} key={el.value}/>)
  )
}
