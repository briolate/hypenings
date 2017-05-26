const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());


// var pool = require("./pg-connection-pool");
var pool = new pg.Pool({
    user: "postgres",
    password: 'Zambia',
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
    var sql = "INSERT INTO events(userName, eventName, date, description, hood, pic, lat, lng) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text,$7::decimal, $8::decimal)";
    var values = [event.user, event.eventName, event.date, event.description, event.hood, event.pic, event.lat, event.long];

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

// getting user's lat and long, showing events within their radius (1 mile) and events that haven't expire yet
app.get('/localevents', function(req, res) {
    var lat = req.query.lat;
    var lng = req.query.lng;
    var values = [lat, lng]
    //this sql variable selects from the data base events that are within our given radius and also within our expiration perameters.
    var sql = "select * from (SELECT * , (3959 * acos (cos ( radians($1::real) )* cos( radians( lat ) )* cos( radians( lng )- radians($2::real) )+ sin ( radians($1::real) )* sin( radians( lat ) ))) AS distance FROM events)AS distance where distance < 1 AND timeadded + INTERVAL '48 HOUR' > now()";

    console.log("lat = " + lat);
    console.log("lng = " + lng);
    pool.query(sql, [lat,lng]).then(function(result) {
        res.send(result.rows);
        console.log(result.rows);
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
hood VARCHAR(40),
pic VARCHAR(40),
lat DECIMAL(11,8),
lng DECIMAL(10,8),
timeadded TIMESTAMP DEFAULT NOW()
);

*/
