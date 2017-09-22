//riot_api_interactions.js
//Contains all Riot Games API calls
const request = require('request');
const mysql = require('mysql');
const config = require( "./riot_config.js");

//Note: Region goes at the beginning of the url
const baseUrl = ".api.riotgames.com"

//Riot API calls that get data within this file

//Gets match history for a given account ID
var getMatchHistory =  function(accountid) {
    
};

//Gets match data for a specific match id
var getSpecificMatchData = function(matchid) {
    
};

//Gets current league information, specifically their current rank
var getLeague = function(summonerId) {

};

//Centralize where all the Riot API call functions are being called
var dataPuller = function() {

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
            } else {
                console.log('request failed');
                console.log(error);
            }
        });
        console.log('getting data for ' + summoner + ' in ' + region);
    }
};