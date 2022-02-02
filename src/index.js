import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { toast } from 'react-toastify';

// Stylesheets
import './stylesheets/global.css';
import './stylesheets/levelItem.css';
import './stylesheets/main.css';
import './stylesheets/mod.css';
import './stylesheets/modList.css';
import './stylesheets/level.css';
import './stylesheets/levelList.css';
import 'react-toastify/dist/ReactToastify.min.css';

require('dotenv').config();

toast.configure();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
