//Return a json object of important match averages, and league data
var findParticipantNumber = function(summonerName, match) {
    participants = match.participantIdentities;
    for (var i = 0; i < participants.length; i++) {
        if (participants[i].player.summonerName === summonerName) {
            return participants[i].participantId;
        }
    }
    return -1; //If player is not found in the game.
}

var findRole = function(timelineData) {
    var lane = timelineData.lane.toLowerCase(); //Top, Jungle, Middle, Bottom
    var role = timelineData.role.toLowerCase(); //Solo, None, Duo_Carry, Duo_Support, Duo
    var cpm = timelineData.creepsPerMinDeltas; //to distinguish between adc and support
    switch(lane) {
        case "top":
            return "top";
        case "jungle":
            if(role === "none"){
                return "jungle";
            }
            return "support";
        case "middle":
            if(role === "solo"){
                return "middle";
            } else if(role === "duo_support"){
                return "support";
            }
            return "jungle";
        case "bottom":
            if(role === "duo_carry" || (role === "duo" && cpm['0-10'] > 3)) {
                return "adc";
            }
            return "support";
        default:
            return "no valuable data"
    }
}

var parseImportantData = function(summonerName, matches, league) {
    //loop through matches:
    var parsedStats = {
        playerStats: {
            kills: 0,
            deaths: 0,
            assists: 0,
            role: ""
        },
        top: {
            kills: 0,
            deaths: 0,
            assists: 0,
            games: 0
        },
        middle: {
            kills: 0,
            deaths: 0,
            assists: 0,
            games: 0
        },
        jungle: {
            kills: 0,
            deaths: 0,
            assists: 0,
            games: 0
        },
        adc: {
            kills: 0,
            deaths: 0,
            assists: 0,
            games: 0
        },
        support: {
            kills: 0,
            deaths: 0,
            assists: 0,
            games: 0
        }
    };
    for (var i = 0; i < matches.length; i++) {
        //Games shorter than 10 minutes shouldn't be counted.
        if(matches[i].gameDuration < 600) {
            continue;
        }
        var participantId = findParticipantNumber(summonerName, matches[i]);
        var participants = matches[i].participants;
        for (var j = 0; j < participants.length; j++) {
            var role = findRole(participants[j].timeline);
            if (participants[j].participantId === participantId) {
                // parsedStats.playerData.stats.kills = participants[j].stats.kills;
                // parsedStats.playerData.stats.deaths = participants[j].stats.deaths;
                // parsedStats.playerData.stats.assists = participants[j].stats.assists;
                parsedStats.playerStats.kills += participants[j].stats.kills;
                parsedStats.playerStats.deaths += participants[j].stats.deaths;
                parsedStats.playerStats.assists += participants[j].stats.assists;
                parsedStats.playerStats.role = role;
            }
            switch(role) {
                case "top":
                    parsedStats.top.kills += participants[j].stats.kills;
                    parsedStats.top.deaths += participants[j].stats.deaths;
                    parsedStats.top.assists += participants[j].stats.assists;
                    parsedStats.top.games++;
                    break;
                case "jungle":
                    parsedStats.jungle.kills += participants[j].stats.kills;
                    parsedStats.jungle.deaths += participants[j].stats.deaths;
                    parsedStats.jungle.assists += participants[j].stats.assists;
                    parsedStats.jungle.games++;
                    break;
                case "middle":
                    parsedStats.middle.kills += participants[j].stats.kills;
                    parsedStats.middle.deaths += participants[j].stats.deaths;
                    parsedStats.middle.assists += participants[j].stats.assists;
                    parsedStats.middle.games++;
                    break;
                case "adc":
                    parsedStats.adc.kills += participants[j].stats.kills;
                    parsedStats.adc.deaths += participants[j].stats.deaths;
                    parsedStats.adc.assists += participants[j].stats.assists;
                    parsedStats.adc.games++;
                    break;
                case "support":
                    parsedStats.support.kills += participants[j].stats.kills;
                    parsedStats.support.deaths += participants[j].stats.deaths;
                    parsedStats.support.assists += participants[j].stats.assists;
                    parsedStats.support.games++;
                    break;
            }
        }
    }
    return parsedStats;
        // findParticipantNumber(summonerName, matches[i])
        //loop through participants until participant id is equal to
        //the participant id
            //participants[i].participantId
            //store the rest of the data per role
            //participants[i].stats.kills/assists/deaths
    //Still need to figure out which information is important..
    //start with kda to get the db working.
    //matches.participants[i].timeline.lane/role = lane/role (check for duo_support)
    //cs/min and csdiff/min deltas are important
    //damage taken deltas is important
    //How to compare for junglers?
    //return something like:
    //{
        //rank: 
        //tier:
        //playerdata: {
            //data for player who entered data
            //role: 
            //stats
        //}
        //roledata: {
            //jungle: {
                //kills: k
                //deaths: d
                //assists: a
                //games: 2 (since we will have 2 users data)
            //},
            //top: {
                //...
            //}
        //}
    //}
}

module.exports = {
    calc_data: function(summonerName, data) {
        matches = data[0];
        league = data[1];
        return parseImportantData(summonerName, matches, league);
    }
}