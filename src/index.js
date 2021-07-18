import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './stylesheets/basic.css';
import './stylesheets/main.css';
import './stylesheets/level.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);