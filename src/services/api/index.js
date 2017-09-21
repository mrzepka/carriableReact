const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const riot = require('../riot_api_interactions.js');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/test', (req, res) => {
    console.log('hit test api');
    // console.log(req);
    const summoner = req.query.summoner;
    const region = req.query.region;

    riot.getPlayerData(summoner, region);
    res.sendStatus(200);
});

app.listen(3001, () => {
    console.log('server running on 3001');
});