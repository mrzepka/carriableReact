/*
  This file is just going to be loading components from other React files
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/display/App.js';
import './style/index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
