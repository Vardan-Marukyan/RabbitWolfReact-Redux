import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createStore} from 'redux';

const rootState = (state = [], action ) => {
  if (action.type === "INCREMENT"){
    return [...state, action.value]
  }
}

export const store = createStore(rootState, [])

export const addObject = () => {
  store.dispatch(
    {
      type: "INCREMENT",
      value: Date.now()
    }
  )
} 
