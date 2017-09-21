const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const riot = require('../riot_api_interactions.js');
const keys = require('../riot_config.json');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

//Allow React to make request to send us
//form data.
app.get('/test', (req, res) => {
    console.log('hit test api');
    // console.log(req);
    const summoner = req.query.summoner;
    const region = req.query.region;
    riot.getPlayerData(summoner, region);
    res.sendStatus(200);
});

//Spool up server
app.listen(3001, () => {
    console.log('server running on 3001');
});