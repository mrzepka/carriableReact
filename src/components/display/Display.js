import React, { Component } from 'react';
import '../../style/Display.css';

class DisplayContainer extends Component {
    render() {
        return (
        <div>
            <DisplayBlock></DisplayBlock>
        </div>
        );
    }
}

class DisplayBlock extends Component {
    render() {
        return (
            <div className="displayBlock">
                <div className="dataBlock"></div>
                <div className="dataBlock"></div>
                <div className="dataBlock"></div>
                <div className="dataBlock"></div>
            </div>
        );
    }
}

export default DisplayContainer;