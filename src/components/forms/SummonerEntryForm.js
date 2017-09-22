import React, { Component } from 'react';
import '../../style/SummonerEntryForm.css';


class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summoner: '',
      region: 'NA1'
    };
    
    //Regex given by Riot to check validity of summoner names
    this.summonerNameCheck = "^[0-9\\p{L} _\\.]+$";

    this.handleSubmit = this.handleSubmit.bind(this);
    this.summonerChange = this.summonerChange.bind(this);
    this.regionChange = this.regionChange.bind(this);
  }

  //Send form data to node js api
  writeToDb(summoner, region) {
    console.log('attempting to contact api');
    fetch(`/api/formData?summoner=${summoner}&region=${region}`, {
      accept: 'application/json',
    });
  }

  //Submit form data
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
        <form onSubmit={this.handleSubmit} className="formContainer">
          <div className="SummonerInput">
            <input type="text" id="summoner_name" placeholder="SummonerName" onChange={this.summonerChange}></input>
          </div>
          <div className="RegionDropdown">
            <select id="region" value={this.state.region} onChange={this.regionChange}>
              <option value="BR1">BR</option>
              <option value="EUN1">EUNE</option>
              <option value="EUW1">EUW</option>
              <option value="JP1">JP</option>
              <option value="KR">KR</option>
              <option value="LA1">LAN</option>
              <option value="LA2">LAS</option>
              <option value="NA1">NA</option>
              <option value="OC1">OCE</option>
              <option value="TR1">TR</option>
              <option value="RU">RU</option>
              <option value="PBE1">PBE</option>
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
        <EntryForm></EntryForm>
      </div>
    );
  }
}

export default SummonerEntryForm;
