//riot_api_interactions.js
//Contains all Riot Games API calls
const request = require('request');
const config = require( "../../config.js");
const calc = require('../../auxillary/calculate_data.js'); //data calc

//Note: Region goes at the beginning of the url
const baseUrl = ".api.riotgames.com"

//Given a URL, returns a promise that resolves the parsed JSON of that calls response
var createPromiseForMatchData = function(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if(!error && response.statusCode == 200) {
                resolve(JSON.parse(body));
            } else {
                reject('request failed: ' + url);
            }
        });
    });
}

//Gets individual match data based on gameID's, returns an array of 
//more detailed match data
var getSpecificMatchData = function(region, matchListObject) {
    return new Promise((resolve, reject) => {
        var requests = [];
        for (var i = 0; i < 10; i++) {
            var matchDataApi = "https://" + region + baseUrl + "/lol/match/v3/matches/"
            + matchListObject.matches[i].gameId + "?api_key=" + config.api;
            requests.push(createPromiseForMatchData(matchDataApi));
        }
        Promise.all(requests)
        .then(resolve)
        .catch(reject)
    })
}

//Gets match history for a given account ID
//Returns JSON that is the region and the array of matches
//associated with the account ID.
var getMatchHistory =  function(region, accountId) {
    return new Promise((resolve, reject) => { 
        var matchHistoryUrl = "https://" + region + baseUrl + "/lol/match/v3/matchlists/by-account/" + 
        accountId + "?api_key=" + config.api;
        createPromiseForMatchData(matchHistoryUrl)
        .then(response => {
            matchData = getSpecificMatchData(region, response)
            .then(resolve)
            .catch(reject)
        })
        .catch(reject);
    }); 
};

//Gets current league information, specifically their current rank
var getLeague = function(region, summonerId) {
    return new Promise((resolve, reject) => {
        var leagueApi = "https://" + region + baseUrl + "/lol/league/v3/leagues/by-summoner/" + summonerId + "?api_key=" + config.api;
        createPromiseForMatchData(leagueApi)
        .then(resolve)
        .catch(reject);
    });
};

//Centralize where all the Riot API call functions are being called
//returns a promise.all of match and league data.
var dataPuller = function(summonerName, region, accountId, summonerId) {
    matchPromise = getMatchHistory(region, accountId);
    leaguePromise = getLeague(region, summonerId);
    return Promise.all([matchPromise, leaguePromise]);    
};

//Functions needed to pass data from node server
//to riot api callers
module.exports = {
    //Gets basic data from Riot API that includes
    //data such as the name, level, icon, but most
    //importantly, the account ID and summoner ID
    getPlayerData: function(summonerName, region) {
        return new Promise((resolve, reject) => {
            var playerData = "https://" + region + baseUrl + "/lol/summoner/v3/summoners/by-name/" + summonerName + "?api_key=" + config.api;
            var stats;
            createPromiseForMatchData(playerData)
            .then(response => {
                accountId = response.accountId;
                summonerId = response.id;
                dataPuller(summonerName, region, accountId, summonerId)
                .then(matchAndLeagueData => {
                    stats = calc.calc_data(summonerName, matchAndLeagueData);
                    resolve(stats);
                })
                .catch(error => {
                    reject(error)
                });
            })
            .catch(error => {
                console.log(error);
            });
        });
        
    }
};