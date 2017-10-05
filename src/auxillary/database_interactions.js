const mysql = require('mysql');
const config = require( "../config.js");

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : config.db_pw,
    database : 'test'
});

connection.connect(err => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = {
    getDataFromDb: function(stats) {
        var select_query = "SELECT * FROM test1 WHERE rank = \"" + stats.rank + "\" AND tier = \"" + stats.tier + "\"";
        connection.query(select_query, (error, results, fields) => {
            if (error) throw error;
            console.log('results');
            console.log(results);
        });
    }
};