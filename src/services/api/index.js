const express = require('express');
const bodyParser = require('body-parser');
const db = require('../../auxillary/database_interactions.js')
const riot = require('../riot_calls/riot_api_interactions.js');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

//Allow React to make request to send us
//form data.
app.get('/api/formData', (req, res) => {
    const summoner = req.query.summoner;
    const region = req.query.region;
    riot.getPlayerData(summoner, region)
    .then(stats => {
        console.log(stats);
        db.getDataFromDb(stats);
        res.sendStatus(200);    
    })
    .catch(error => {
        console.log(error);
    });
    
});

app.get('/api/playerData', (req, res) => {

});

app.get('/api/allData', (req, res) => {
    
});
//TODO: add request to get data from database "getRankData?"

//TODO: add request to send data to database "writeRankData?"

//TODO: add request to get player data from api calls "getPlayerData?"

//db ideas:
    //use champ id as primary key in one db at least.
    //maybe store summoner data? Then can use accountId as primary key
    //role tables?
    //Need some way to compare vs other people playing the same champ
        //have champ id, but how to store?
    //stage-of-the-game tables?
        //early - mid - late game diffs?
//Spool up server
app.listen(3001, () => {
    console.log('server running on 3001');
});