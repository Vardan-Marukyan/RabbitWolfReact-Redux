import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import { SendBoardNumber } from './component/BoardNumber';
import { store, addObject } from './ReduxStore';


const root = ReactDOM.createRoot(document.getElementById('root'));

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
