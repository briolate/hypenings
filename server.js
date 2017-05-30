const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();

// Mailjet variables etc
var mailjet = require('node-mailjet').connect('7672f7d7861def0d58556c8fde5fd009', 'e46c285ea610edd14646958ed4ce3223');
function handleError (err) {
  throw new Error(err.ErrorMessage);
}



app.use(express.static('public'));
app.use(bodyParser.json());


// var pool = require("./pg-connection-pool");
var pool = new pg.Pool({
    user: "postgres",
    password: "EBriolat1.",
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
// declaring function that adjust time stamp so that event posting goes away at desired time
// function also makes another query to the database to make this adjustment
    var adjust=function(){
      var dur= event.postDuration;
      var user= event.user;
      var values=[dur, user];
      var sql = "UPDATE events SET timeadded = current_timestamp - ((48-$1::smallint)* interval '1 hour') where username = $2::text"
      pool.query(sql, values).then(function() {
          console.log('yeah dude!');
      }).catch(errorCallback(res));
    }
    // this function sends an email with users postid
    function testEmail () {
      console.log('this works');
      email = {};
      email['FromName'] = 'Hypenings Staff';
      email['FromEmail'] = 'dogtindergc@gmail.com';
      email['Subject'] = 'Your Post ID for Your Event ' + event.eventName;
      email['Recipients'] = [{Email: event.email}];
      email['Text-Part'] = 'Thank you for using Hypenings. Your post ID is ' + postid;

      mailjet.post('send')
        .request(email)
        .catch(handleError);
    }

// declaring variables to post events
    var event = req.body;
    var postid= event.postid;
    var sql = "INSERT INTO events(userName, eventName, date, description, hood, pic, lat, lng, postid, postduration, email) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text,$7::decimal, $8::decimal, $9::text, $10::smallint, $11::text)";
    var values = [event.user, event.eventName, event.date, event.description, event.hood, event.pic, event.lat, event.long, event.postid, event.postDuration, event.email];

    pool.query(sql, values).then(function() {
        res.status(201);
        res.send("INSERTED");
        adjust();
        testEmail();
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
//get posted event
app.get('/managepost', function(req, res) {
    var userPostid = req.query.postid;
    var values = [userPostid];
    //this sql variable selects from the data base events that are within our given radius and also within our expiration perameters.
    var sql = "select * from events where postid = $1::text";

    console.log(values);
    pool.query(sql, values).then(function(result) {
      if(result.rowCount === 0){
        res.send(result.rows);
        console.log('not found');
      }else{
        res.send(result.rows);
        console.log(result.rows);
      }
    }).catch(function(err) {
        console.log(err);
    });
});

app.get('/viewpost', function(req, res) {
    var postId = req.query.id;
    postId = Number(postId);
    var values = [postId];
    //this sql variable selects from the data base events that are within our given radius and also within our expiration perameters.
    var sql = "select * from events where id = $1::int";

    pool.query(sql, values).then(function(result) {
      res.send(result.rows);
    }).catch(function(err) {
        console.log(err);
    });
});

app.delete('/deletepost', function(req, res) {
    var userPostid = req.query.postid;
    var sql = "DELETE FROM events WHERE postid = $1::text";
    var values= [userPostid]; // <-- This gets the :id part of the URL
    pool.query(sql, values).then(function() {
        res.send("DELETED");
    }).catch(res);
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
postduration SMALLINT,
postid VARCHAR(12),
email VARCHAR(40),
timeadded TIMESTAMP DEFAULT NOW()

);

*/
