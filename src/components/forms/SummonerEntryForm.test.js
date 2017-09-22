import React from 'react';
import ReactDOM from 'react-dom';
import SummonerEntryForm from './SummonerEntryForm.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SummonerEntryForm />, div);
});
