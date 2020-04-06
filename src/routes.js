const express = require("express");
// const bodyParser = require('body-parser');
const mysql = require("mysql");

const connection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "nbaduel",
  password: "yourpasswordhere",
  // queueLimit: 0,
  // connectionLimit: 0,
  // insecureAuth: true
});

const app = express();

// app.use(bodyParser.json({type: 'application/json'}));
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/test", function (req, res) {
  res.send("Hello world");
});

// Get player stats. This is what is stored in App.js as 'playerStats'
app.get("/playerStats", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(
      "SELECT name, Cost, Points, Rebounds, Assists, Steals, Blocks, YrsPro, Image, Ranking FROM Player ORDER BY Ranking",
      function (err, results) {
        if (err) throw err;
        res.json(results);
      }
    );
  });
});

app.get("/playersOnTeam", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { team } = req.query;
  console.log(team);
  let SELECT_QUERY;
  if (team === "all") {
    SELECT_QUERY = `SELECT * FROM Player ORDER BY Ranking`;
  } else {
    SELECT_QUERY = `SELECT * FROM Player_isOn WHERE TeamName = '${team}'`;
  }
  console.log(SELECT_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(SELECT_QUERY, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
});

app.get("/stats", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { stat } = req.query;
  console.log(stat);
  let PROJECT_QUERY;
  switch (stat) {
    case "All":
      PROJECT_QUERY = `SELECT Name, Points, Rebounds, Assists, Steals, Blocks, Image, Ranking, Cost FROM Player ORDER BY Points DESC`;
      break;
    case "PPG":
      PROJECT_QUERY = `SELECT Name, Points, Image, Ranking, Cost FROM Player ORDER BY Points DESC`;
      break;
    case "RPG":
      PROJECT_QUERY = `SELECT Name, Rebounds, Image, Ranking, Cost FROM Player ORDER BY Rebounds DESC`;
      break;
    case "APG":
      PROJECT_QUERY = `SELECT Name, Assists, Image, Ranking, Cost FROM Player ORDER BY Assists DESC`;
      break;
    case "SPG":
      PROJECT_QUERY = `SELECT Name, Steals, Image, Ranking, Cost FROM Player ORDER BY Steals DESC`;
      break;
    case "BPG":
      PROJECT_QUERY = `SELECT Name, Blocks, Image, Ranking, Cost FROM Player ORDER BY Blocks DESC`;
      break;
    default:
      PROJECT_QUERY = `SELECT Name, Points, Rebounds, Assists, Steals, Blocks, Image, Ranking, Cost FROM Player ORDER BY Points DESC`;
      break;
  }
  console.log(PROJECT_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(PROJECT_QUERY, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
});

app.get("/statsInRange", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { stat, range } = req.query;
  console.log({ stat, range });
  let PROJECT_QUERY;
  if (range === "All") {
    switch (stat) {
      case "All":
        PROJECT_QUERY = `SELECT Name, Points, Rebounds, Assists, Steals, Blocks, Image, Ranking FROM Player ORDER BY Points DESC`;
        break;
      case "PPG":
        PROJECT_QUERY = `SELECT Name, Points, Image, Ranking FROM Player ORDER BY Points DESC`;
        break;
      case "RPG":
        PROJECT_QUERY = `SELECT Name, Rebounds, Image, Ranking FROM Player ORDER BY Rebounds DESC`;
        break;
      case "APG":
        PROJECT_QUERY = `SELECT Name, Assists, Image, Ranking FROM Player ORDER BY Assists DESC`;
        break;
      case "SPG":
        PROJECT_QUERY = `SELECT Name, Steals, Image, Ranking FROM Player ORDER BY Steals DESC`;
        break;
      case "BPG":
        PROJECT_QUERY = `SELECT Name, Blocks, Image, Ranking FROM Player ORDER BY Blocks DESC`;
        break;
      default:
        PROJECT_QUERY = `SELECT Name, Points, Rebounds, Assists, Steals, Blocks, Image, Ranking FROM Player ORDER BY Points DESC`;
        break;
    }
  } else {
    let lb = range.split("-")[0];
    let ub = range.split("-")[1];
    console.log(lb);
    console.log(ub);
    switch (stat) {
      case "All":
        PROJECT_QUERY = `SELECT Name, Points, Rebounds, Assists, Steals, Blocks, Image, Ranking FROM Player ORDER BY Points DESC`;
        break;
      case "PPG":
        PROJECT_QUERY = `SELECT Name, Points, Image, Ranking FROM Player WHERE Points >= ${lb} && Points <= ${ub} ORDER BY Points DESC`;
        break;
      case "RPG":
        PROJECT_QUERY = `SELECT Name, Rebounds, Image, Ranking FROM Player WHERE Rebounds >= ${lb} && Rebounds <= ${ub} ORDER BY Rebounds DESC`;
        break;
      case "APG":
        PROJECT_QUERY = `SELECT Name, Assists, Image, Ranking FROM Player WHERE Assists >= ${lb} && Assists <= ${ub}ORDER BY Assists DESC`;
        break;
      case "SPG":
        PROJECT_QUERY = `SELECT Name, Steals, Image, Ranking FROM Player WHERE Steals >= ${lb} && Steals <= ${ub} ORDER BY Steals DESC`;
        break;
      case "BPG":
        PROJECT_QUERY = `SELECT Name, Blocks, Image, Ranking FROM Player WHERE Blocks >= ${lb} && Blocks <= ${ub}ORDER BY Blocks DESC`;
        break;
      default:
        PROJECT_QUERY = `SELECT Name, Points, Rebounds, Assists, Steals, Blocks, Image, Ranking FROM Player ORDER BY Points DESC`;
        break;
    }
  }
  console.log(PROJECT_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(PROJECT_QUERY, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
});

app.get("/groupByCost", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  let { stat } = req.query;
  stat = stat.toUpperCase();
  console.log(stat);
  let AGG_QUERY;
  switch (stat) {
    case "PPG":
      AGG_QUERY = `SELECT Cost, AVG(Points) AS stat FROM Player GROUP BY Cost ORDER BY Cost DESC`;
      break;
    case "RPG":
      AGG_QUERY = `SELECT Cost, AVG(Rebounds) AS stat FROM Player GROUP BY Cost ORDER BY Cost DESC`;
      break;
    case "APG":
      AGG_QUERY = `SELECT Cost, AVG(Assists) AS stat FROM Player GROUP BY Cost ORDER BY Cost DESC`;
      break;
    case "SPG":
      AGG_QUERY = `SELECT Cost, AVG(Steals) AS stat FROM Player GROUP BY Cost ORDER BY Cost DESC`;
      break;
    case "BPG":
      AGG_QUERY = `SELECT Cost, AVG(Blocks) AS stat FROM Player GROUP BY Cost ORDER BY Cost DESC`;
      break;
    default:
      AGG_QUERY = `SELECT Cost, AVG(Points) AS stat FROM Player GROUP BY Cost ORDER BY Cost DESC`;
      break;
  }
  console.log(AGG_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(AGG_QUERY, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
});

app.get("/firstPlayerClient", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { playerID } = req.query;
  const INSERT_QUERY = `INSERT INTO Client VALUES (${playerID}, 0, 0, 0, 0)`;
  console.log(INSERT_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(INSERT_QUERY, function (err, results) {
      if (err) throw err;
      // res.send(results);
    });
  });
  res.send("Created new team for client and added first player.");
});

app.get("/addPlayerClient", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { playerID, playerIndex, firstID } = req.query;
  console.log({ playerID, playerIndex, firstID });
  console.log(playerIndex);
  var playerIdCol = "player".concat(playerIndex.toString(), "id");
  console.log(playerIdCol);
  const UPDATE_QUERY = `UPDATE Client SET ${playerIdCol} = ${playerID} WHERE player1id = ${firstID}`;
  console.log(UPDATE_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(UPDATE_QUERY, function (err, results) {
      if (err) throw err;
      // res.send(results);
    });
  });
  res.send("Added player");
});

app.get("/dropPlayerClient", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { playerIndex, firstID } = req.query;
  console.log(playerIndex);
  var playerIdCol = "player".concat(playerIndex.toString(), "id");
  console.log(playerIdCol);
  const UPDATE_QUERY = `UPDATE Client SET ${playerIdCol} = 0 WHERE player1id = ${firstID}`;
  console.log(UPDATE_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(UPDATE_QUERY, function (err, results) {
      if (err) throw err;
      // res.send(results);
    });
  });
  res.send("Dropped player");
});

app.get("/dropLastClient", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { playerIndex, firstID } = req.query;
  console.log(playerIndex);
  var playerIdCol = "player".concat(playerIndex.toString(), "id");
  console.log(playerIdCol);
  const DELETE_QUERY = `DELETE FROM Client WHERE player1id = ${firstID}`;
  console.log(DELETE_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(DELETE_QUERY, function (err, results) {
      if (err) throw err;
      // res.send(results);
    });
  });
  res.send("Dropped player");
});

app.get("/firstPlayerOpponent", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { playerID } = req.query;
  const INSERT_QUERY = `INSERT INTO Opponent VALUES (${playerID}, 0, 0, 0, 0)`;
  console.log(INSERT_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(INSERT_QUERY, function (err, results) {
      if (err) throw err;
      // res.send(results);
    });
  });
  res.send("Created new team for opponent and added first player.");
});

app.get("/addPlayerOpponent", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { playerID, playerIndex, firstID } = req.query;
  console.log(playerIndex);
  var playerIdCol = "player".concat(playerIndex.toString(), "id");
  console.log(playerIdCol);
  const UPDATE_QUERY = `UPDATE Opponent SET ${playerIdCol} = ${playerID} WHERE player1id = ${firstID}`;
  console.log(UPDATE_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(UPDATE_QUERY, function (err, results) {
      if (err) throw err;
      // res.send(results);
    });
  });
  res.send("Added player");
});

app.get("/dropPlayerOpponent", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { playerIndex, firstID } = req.query;
  console.log(playerIndex);
  var playerIdCol = "player".concat(playerIndex.toString(), "id");
  console.log(playerIdCol);
  const UPDATE_QUERY = `UPDATE Opponent SET ${playerIdCol} = 0 WHERE player1id = ${firstID}`;
  console.log(UPDATE_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(UPDATE_QUERY, function (err, results) {
      if (err) throw err;
      // res.send(results);
    });
  });
  res.send("Dropped player");
});

app.get("/dropLastOpponent", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { playerIndex, firstID } = req.query;
  console.log(playerIndex);
  var playerIdCol = "player".concat(playerIndex.toString(), "id");
  console.log(playerIdCol);
  const DELETE_QUERY = `DELETE FROM Opponent WHERE player1id = ${firstID}`;
  console.log(DELETE_QUERY);
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(DELETE_QUERY, function (err, results) {
      if (err) throw err;
      // res.send(results);
    });
  });
  res.send("Dropped player");
});

// Get all data from Player table
app.get("/player", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  connection.getConnection(function (err, conn) {
    if (err) {
      return res.sendStatus(400);
    }
    // Execute mySQL query
    conn.query("SELECT * FROM Player", [], function (err, results) {
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
app.get("/coach", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  connection.getConnection(function (err, conn) {
    if (err) return res.sendStatus(400);

    //Execute query
    conn.query("SELECT * FROM Coach", function (err, results) {
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

// Get player names, costs and Rankings (ID)
app.get("/playerCosts", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  connection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(
      "SELECT name, Cost, Ranking FROM Player ORDER BY Ranking",
      function (err, results) {
        if (err) throw err;
        res.json(results);
      }
    );
  });
});

app.listen(5000, () => {
  console.log("Go to http://localhost:5000/test to see HELLO WORLD.");
  console.log("Go to http://localhost:5000/player to see player data");
  console.log("Go to http://localhost:5000/coach to see coach data");
  console.log("Go to http://localhost:5000/playerStats to see player stats");
  console.log("Go to http://localhost:5000/playerCosts to see player costs");
  console.log(
    "Go to http://localhost:5000/groupByCost?stat=APG to see AVG points per cost"
  );
});
