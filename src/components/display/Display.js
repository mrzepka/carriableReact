import React, { Component } from 'react';
import '../../style/Display.css';



class DisplayContainer extends Component {
    render() {
        return (
        <div className="displayContainer">
            <DisplayBlock></DisplayBlock>
            <DisplayBlock></DisplayBlock>
            <DisplayBlock></DisplayBlock>
            <DisplayBlock></DisplayBlock>
            <DisplayBlock></DisplayBlock>
            <DisplayBlock></DisplayBlock>
            <DisplayBlock></DisplayBlock>
            <DisplayBlock></DisplayBlock>
        </div>
        );
    }
}

class DisplayBlock extends Component {
    render() {
        return (
            <div className="displayBlock">
            </div>
        );
    }
}

export default DisplayContainer;