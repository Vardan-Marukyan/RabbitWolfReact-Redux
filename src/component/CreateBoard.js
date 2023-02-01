import React from 'react'
import { StartComponent } from './CreateHtml'
export const CreateBoard = ({title}) => {
  return (
    title.map(el => <StartComponent id = {el}/> )
  )
}
