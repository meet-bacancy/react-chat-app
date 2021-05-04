import React from 'react';
import ReactDOM from 'react-dom';
import AppWithProvider from './app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'emoji-mart/css/emoji-mart.css';
import './assets/scss/main.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AppWithProvider />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
