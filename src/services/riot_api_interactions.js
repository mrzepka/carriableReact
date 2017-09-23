//riot_api_interactions.js
//Contains all Riot Games API calls
const request = require('request');
const config = require( "./riot_config.js");

//Note: Region goes at the beginning of the url
const baseUrl = ".api.riotgames.com"

//Riot API calls that get data within this file

//Gets match history for a given account ID
//Returns JSON that is the region and the array of matches
//associated with the account ID.
var getMatchHistory =  function(region, accountId) {
    var matchHistoryUrl = "https://" + region + baseUrl + "/lol/match/v3/matchlists/by-account/" + 
    accountId + "?api_key=" + config.api;
    createPromiseForMatchData(matchHistoryUrl)
    .then(response => {
        console.log('got list of matches');
        console.log(response);
        var requests = [];
        for (var i = 0; i < 10; i++) {
            console.log(response.matches[i].gameId);
            var matchDataApi = "https://" + region + baseUrl + "/lol/match/v3/matches/"
             + response.matches[i].gameId + "?api_key=" + config.api;
            requests.push(createPromiseForMatchData(matchDataApi));
        }
        Promise.all(requests)
        .then(matchData => {
            console.log('all promises resolved');
        }).catch(error => {
            console.log(error);
        })
    })
    // return new Promise((resolve, reject) => {
    //     var matchHistoryUrl = "https://" + region + baseUrl + "/lol/match/v3/matchlists/by-account/" + 
    //     accountId + "?api_key=" + config.api;
    //     console.log(matchHistoryUrl)
    //     request(matchHistoryUrl, (error, response, body) => {
    //         if (!error && response.statusCode == 200){
    //             respBody = JSON.parse(body);
    //             regionAndMatches = {
    //                 "matches": respBody.matches,
    //                 "region": region
    //             };
    //             resolve(regionAndMatches);
    //         } else {
    //             reject('request failed: ' + matchHistoryUrl);
    //         }
    //     });
    // });
};

var createPromiseForMatchData = function(url) {
    console.log(url);
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

//Gets match data for a specific match id
// var getSpecificMatchData = function(regionAndMatches) {
//     region = regionAndMatches.region;
//     matches = regionAndMatches.matches;
//     requests = [];
//     return new Promise((resolve, reject) => {
//         for (var i = 0; i < 10; i++) {
//             var matchDataApi = "https://" + region + baseUrl + "/lol/match/v3/matches/"
//              + matches[i].gameId + "?api_key=" + config.api;
//             requests.push(createPromiseForMatchData(matchDataApi));
//         }
//         Promise.all(requests)
//         .then(matchData => {
//             console.log('all promises resolved');
//         }).catch(error => {
//             console.log(error);
//         })
//     });
// };

//Gets current league information, specifically their current rank
var getLeague = function(region, summonerId) {
    return new Promise((resolve, reject) => {
        var leagueApi = "https://" + region + baseUrl + "/lol/league/v3/leagues/by-summoner/" + summonerId + "?api_key=" + config.api;
        createPromiseForMatchData(leagueApi)
        .then(response => {
            console.log('got league data');
            // console.log(response);
        })
    });
};

//Centralize where all the Riot API call functions are being called
var dataPuller = function(region, accountId, summonerId) {
    getMatchHistory(region, accountId)
    // .then(getSpecificMatchData)
    // .then(matchData => {
    //         console.log('got match history');
    //         // console.log(matchData);
    //     }
    // )
    // .catch(error => {
    //         console.log('promise error' + error);
    //     }
    // );
    getLeague(region, summonerId);
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
        var playerData = "https://" + region + baseUrl + "/lol/summoner/v3/summoners/by-name/" + summonerName + "?api_key=" + config.api;
        createPromiseForMatchData(playerData)
        .then(response => {
            accountId = response.accountId;
            summonerId = response.id;
            dataPuller(region, accountId, summonerId);
        })
        console.log('getting data for ' + summonerName + ' in ' + region);
    }
};