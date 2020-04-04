const express = require('express');
// const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    database:'nba',
    password:'yourpasswordhere'
    // queueLimit: 0,
    // connectionLimit: 0,
    // insecureAuth: true
});

const app = express();

// app.use(bodyParser.json({type: 'application/json'}));
// app.use(bodyParser.urlencoded({extended: true}));

app.get('/test', function(req, res) {
    res.send('Hello world');
});

// Get all data from Player table
app.get('/player', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    connection.getConnection(function(err, conn) {
        if (err) {
            return res.sendStatus(400);
        }
        // Execute mySQL query
        conn.query('SELECT * FROM Player', [], function(err, results) {
            // Check for error and throw if so
            if (err) {
                //throw err;
                // conn.release();
                //
                return res.sendStatus(404);
            }
            // Send query results to the route.
            res.send(results);
            // conn.release();
        });
    });
});

// Get all data from Coach table
app.get('/coach', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    connection.getConnection(function(err, conn) {
        if (err) return res.sendStatus(400);

        //Execute query
        conn.query('SELECT * FROM Coach', function(err, results) {
            if (err) {
                //throw err;
                // conn.release();
                //
                return res.sendStatus(404);
            }
            // Send query results to the route.
            res.send(results);
        });
    });
});

// Get player stats. This is what is stored in App.js as 'playerStats'
app.get('/playerStats', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    connection.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query('SELECT name, Cost, Points, Rebounds, Assists, Steals, Blocks, YrsPro, Ranking FROM Player ORDER BY Ranking', function(err, results) {
            if (err) throw err;
            res.json(results);
        });
    });
});

// Get player names, costs and Rankings (ID)
app.get('/playerCosts', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    connection.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query('SELECT name, Cost, Ranking FROM Player ORDER BY Ranking', function(err, results) {
            if (err) throw err;
            res.json(results);
        });
    });
});

// INSERT statements when a Player is added to a Team
// app.get('/addToTeam', function(req, res) {
//     connection.getConnection(function(err, conn) {
//         if (err) return res.sendStatus(400);
//
//         // Execute UPDATE statement -- updating a Client tuple with player IDs, accessing by User ID
//         conn.query("UPDATE Client SET player1id = req.body.player1id WHERE UserID = req.body.id", function(err, results) {
//             if (err) return res.sendStatus(404);
//             res.send(JSON.stringify(results));
//         });
//     });
// });

app.listen(5000, () => {
    console.log('Go to http://localhost:5000/test to see HELLO WORLD.');
    console.log('Go to http://192.168.0.16:5000/player to see player data');
    console.log('Go to http://localhost:5000/coach to see coach data');
    console.log('Go to http://192.168.0.16:5000/playerStats to see player stats');
    console.log('Go to http://192.168.0.16:5000/playerCosts to see player costs');
});