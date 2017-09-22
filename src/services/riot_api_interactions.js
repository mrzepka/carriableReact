//riot_api_interactions.js
//Contains all Riot Games API calls
const request = require('request');
const config = require( "./riot_config.js");

//Note: Region goes at the beginning of the url
const baseUrl = ".api.riotgames.com"

//Riot API calls that get data within this file

//Gets match history for a given account ID
var getMatchHistory =  function(region, accountId) {
    console.log('returning promise');
    return new Promise((resolve, reject) => {
        var matchHistoryUrl = "https://" + region + baseUrl + "/lol/match/v3/matchlists/by-account/" + 
        accountId + "?api_key=" + config.api;
        console.log(matchHistoryUrl)
        request(matchHistoryUrl, function(error, response, body) {
            if (!error && response.statusCode == 200){
                // console.log(body);
                resolve(JSON.parse(body));
            } else {
                console.log('request failed');
                console.log(error);
                reject('request failed:' + matchHistoryUrl);
            }
        });
    });
};

//Gets match data for a specific match id
var getSpecificMatchData = function(region, matchId) {
    ///lol/match/v3/matches/{matchId}
};

//Gets current league information, specifically their current rank
var getLeague = function(region, summonerId) {
    ///lol/league/v3/leagues/by-summoner/{summonerId}
};

//Centralize where all the Riot API call functions are being called
var dataPuller = function(region, accountId, summonerId) {
    getMatchHistory(region, accountId).then(
        function(resp) {
            matches = resp.matches;
            console.log(matches[35]);
        }
    )
    .catch(
        function(error) {
            console.log('promise error' + error);
        }
    );
};

//Takes information and calculates the average over the 20 game match history
//Note: to be used in comparison with data that is stored for their rank.
var calculateAverages = function() {

};

//Functions needed to pass data from node server
//to riot api callers
module.exports = {
    //Gets basic data from Riot API that includes
    //data such as the name, level, icon, but most
    //importantly, the account ID
    getPlayerData: function(summonerName, region) {
        var playerData = region + baseUrl + "/lol/summoner/v3/summoners/by-name/" + summonerName + "?api_key=" + config.api;
        request("https://" + playerData, function(error, response, body) {
            if (!error && response.statusCode == 200){
                console.log(body);
                bodyAsJson = JSON.parse(body);
                accountId = bodyAsJson.accountId;
                summonerId = bodyAsJson.id;
                dataPuller(region, accountId, summonerId);
            } else {
                console.log('request failed');
                console.log(error);
            }
        });
        console.log('getting data for ' + summonerName + ' in ' + region);
    }
};