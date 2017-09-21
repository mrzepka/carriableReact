const config = require( "./riot_config.js");
const request = require('request');
//Note: Region goes at the beginning of the url
const baseUrl = ".api.riotgames.com"

module.exports = {
    getPlayerData: function(summoner, region) {
        var testApi = region + baseUrl + "/lol/summoner/v3/summoners/by-name/" + summoner + "?api_key=" + config.api;
        request("https://" + testApi, function(error, response, body) {
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