const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

var pool = new pg.Pool({
    user: "postgres",
    password: "Zambia",
    host: "localhost",
    port: 5432,
    database: "postgres",
    ssl: false
});

function errorCallback(res) {
    return function(err) {
        console.log(err);
        res.status(500); 
        res.send("ERROR!");
    }
}

app.post('/events', function(req, res) {
    var event = req.body; 
    var sql = "INSERT INTO Events(userName, eventName, date, description, hood) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)";
    var values = [event.user, event.eventName, event.date, event.description, event.hood];

    pool.query(sql, values).then(function() {
        res.status(201);
        res.send("INSERTED");
    }).catch(errorCallback(res));
});

app.get('/events', function(req, res) {
    pool.query("SELECT * FROM Events").then(function(result) {
        res.send(result.rows);
    }).catch(function(err) {
        console.log(err);
    });
});



var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('JSON Server is running on ' + port);
     
});

/*

CREATE TABLE Events (
id SERIAL UNIQUE PRIMARY KEY,
userName VARCHAR(40),
eventName VARCHAR(40),
date VARCHAR(40),
description VARCHAR(200),
hood VARCHAR(40)
);
*/