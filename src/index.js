import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import { SendBoardNumber } from './component/BoardNumber';



const root = ReactDOM.createRoot(document.getElementById('root'));


let ID = 0
const rootState = (state = [], action ) => {
  if (action.type === "INCREMENT"){
    return [
      ...state,
      action
    ]
  }
}  


const store = createStore(rootState, [])
const addObject = () => {
  store.dispatch(
    {
      type: "INCREMENT",
      id: ID++
    }
  )
} 



root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <div className='conteiner'>
            <div className='NewBoard' onClick={addObject}><button>New Board!</button></div>
            <SendBoardNumber/>
      </div>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
