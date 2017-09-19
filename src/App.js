import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class RegionDropdown extends Component {
  render() {
    return(
      <div className="RegionDropdown">
        <select id="region">
          <option value="NA">NA</option>
          <option value="EUE">EUE</option>
          <option value="EUW">EUW</option>
        </select>
      </div>
    );
  }
}

class SummonerInput extends Component {
  render() {
    return (
      <div className="SummonerInput">
        <form action="/temp_loading_page" method="POST">
          <div>
            <label for="summoner_name"></label>
            <input type="text" id="summoner_name" placeholder="SummonerName"></input>
          </div>
        </form>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Let's get carried!</h2>
          <SummonerInput></SummonerInput>
          <RegionDropdown></RegionDropdown>
        </div>
      </div>
    );
  }
}

export default App;
