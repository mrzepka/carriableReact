import React, { Component } from 'react';
import SummonerEntryForm from '../forms/SummonerEntryForm.js';
import DisplayContainer from './Display.js';

class App extends Component {
    render() {
        return (
            <div className="App-header">
                <h2>Let's get carried!</h2>
                <div>
                    <SummonerEntryForm></SummonerEntryForm>
                    <DisplayContainer></DisplayContainer>
                </div>
            </div>
        );
    }
}

export default App;