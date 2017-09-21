/*
  This file is just going to be loading components from other React files
*/

import React from 'react';
import ReactDOM from 'react-dom';
import SummonerEntryForm from './components/forms/App.js';
import './style/index.css';

ReactDOM.render(
  <SummonerEntryForm />,
  document.getElementById('root')
);
