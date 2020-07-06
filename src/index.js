import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import StateApi from './state-api';
import { data } from './initialData';

const store = new StateApi(data);

//use toastify
ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
