import React, { Component } from 'react';
import '../../style/App.css';

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summoner: '',
      region: 'NA'
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.summonerChange = this.summonerChange.bind(this);
    this.regionChange = this.regionChange.bind(this);
  }

  writeToDb(summoner, region) {
    console.log('attempting to contact api');
    fetch(`/test?summoner=${summoner}&region=${region}`, {
      accept: 'application/json',
    });
  }

  handleSubmit(event) {
    console.log('handling submit');
    //alert('Summoner submitted: ' + this.state.summoner + ' in ' + this.state.region);
    this.writeToDb(this.state.summoner, this.state.region);
    //This will need to send the data from the form to a database.

    event.preventDefault();
  }

  summonerChange(event) {
    this.setState({summoner: event.target.value});
  }

  regionChange(event) {
    this.setState({region: event.target.value});
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="SummonerInput">
            <input type="text" id="summoner_name" placeholder="SummonerName" onChange={this.summonerChange}></input>
          </div>
          <div className="RegionDropdown">
            <select id="region" value={this.state.region} onChange={this.regionChange}>
              <option value="NA">NA</option>
              <option value="EUE">EUE</option>
              <option value="EUW">EUW</option>
            </select>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

class SummonerEntryForm extends Component {
  render() {
    return (
      <div className="SummonerEntryForm">
        <div className="App-header">
          <h2>Let's get carried!</h2>
          <EntryForm></EntryForm>
        </div>
      </div>
    );
  }
}

export default SummonerEntryForm;
