//Return a json object of important match averages, and league data
var parseImportantData = function(matches, league) {
    
}

module.exports = {
    calc_data: function(data) {
        console.log(data);
        matches = data[0];
        league = data[1];
        parseImportantData(matches, league);
    }
}