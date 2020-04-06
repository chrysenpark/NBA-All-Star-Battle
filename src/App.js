import React, { Component } from "react";
import Pic from "./components/Pic";
import Team from "./components/Team";
import Team2 from "./components/Team2";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Message from "./components/Message";
import SubHeading from "./components/SubHeading";
import IndentHeading from "./components/IndentHeading";
import "./App.css";
import BattleTitle from "./components/BattleTitle";
import Button from "./components/Buttons";
import Table from "react-bootstrap/Table";

class App extends Component {
  // Setting this.state.players to the players json array
  state = {
    playerStats: this.playerNewStats,
    budget: 15,
    budget2: 15,
    result: "win",
    team: "All",
    stats: "All",
    range: "All",
    aggStat: "Stat",
    costBreakdown: [{Cost: 5, stat: 0}, {Cost: 4, stat: 0}, {Cost: 3, stat: 0}, {Cost: 2, stat: 0}, {Cost: 1, stat: 0}]
};
  playersOnTeam1 = [];
  playersOnTeam2 = [];
  playerImages1 = [];
  playerImages2 = [];
  player1Budget = 15;
  playerNewStats = [];
  TeamTotalStats = [];
  currPlayer = [];
  BattleStatus = "";
  clickResult = "";
  clickDrop = "";
  clickDrop2 = "";
  clickPlay = "";
  results = "";
  clickWinMessages = [
    "Solid Pick Up!",
    "Great Pick!",
    "Amazing Choice!",
    "Your team is unbeatable! already",
    "Winning pick",
  ];
  BattleMessages = ["Team Big Ballers Wins", "Team Ankle Breakers Wins"];

  async componentDidMount() {
    let r = await fetch("http://localhost:5000/playerStats");
    this.playerNewStats = await r.json();
    console.log(this.playerNewStats);
  }

  recordBudget = (id) => {
    this.currPlayer = this.playerNewStats.filter(function (item) {
      return item.Ranking === id;
    })[0];
    // if the clicked player was clicked before...
    let maxTeamSize = 5;
    if (
      this.playersOnTeam1.length === maxTeamSize &&
      this.playersOnTeam2.length === maxTeamSize
    ) {
      this.clickResult =
        "Sorry your team is full! Trade/drop before you sign a new player";
      this.setState({
        budget: this.state.budget,
        budget2: this.state.budget2,
        result: "fail",
      });
    } else if (
      this.playersOnTeam1.includes(id) &&
      this.playersOnTeam1.length !== maxTeamSize
    ) {
      this.clickResult = "Sorry, you picked that player already.";
      this.setState({
        budget: this.state.budget,
        budget2: this.state.budget2,
        result: "fail",
      });
    } else if (
      this.playersOnTeam2.includes(id) &&
      this.playersOnTeam1.length === maxTeamSize
    ) {
      this.clickResult = "Sorry, you picked that player already.";
      this.setState({
        budget: this.state.budget,
        budget2: this.state.budget2,
        result: "fail",
      });
    }
    // if the clicked player wasn't picked before...
    else {
      if (
        this.playersOnTeam1.length === maxTeamSize - 1 &&
        this.playersOnTeam2.length === 0
      ) {
        this.clickResult = "Now Its Your Opponents Turn to Pick His Team";
        this.setState({
          budget: 15,
          result: "win",
        });
      } else {
        let random = Math.floor(Math.random() * this.clickWinMessages.length);
        this.clickResult = `${this.clickWinMessages[random]}`;
      }
      if (this.playersOnTeam1.length !== maxTeamSize) {
        let budget = this.state.budget;
        let newBudget = budget - this.currPlayer.Cost;
        if (newBudget >= 0) {
          this.playersOnTeam1.push(id);
          console.log("Player IDs");
          console.log(this.playersOnTeam1);
          console.log("Index of player just added");
          console.log(this.playersOnTeam1.length);
          console.log(this.playersOnTeam1[0]);
          if (this.playersOnTeam1.length === 1) {
            this.firstPlayerClient(id);
          } else {
            this.addPlayerClient(
              id,
              this.playersOnTeam1.length,
              this.playersOnTeam1[0]
            );
          }
          this.playerImages1.push(this.currPlayer.Image);
          this.setState({
            budget: newBudget,
            budget2: this.state.budget2,
            result: "win",
          });
        } else {
          this.clickResult = "Can't afford this player";
          this.setState({
            budget: this.state.budget,
            budget2: this.state.budget2,
            result: "fail",
          });
        }
      } else {
        let budget2 = this.state.budget2;
        let newBudget = budget2 - this.currPlayer.Cost;
        if (newBudget >= 0) {
          this.playersOnTeam2.push(id);
          console.log("Player IDs");
          console.log(this.playersOnTeam2);
          console.log("Index of player just added");
          console.log(this.playersOnTeam2.length);
          if (this.playersOnTeam2.length === 1) {
            this.firstPlayerOpponent(id);
          } else {
            this.addPlayerOpponent(
              id,
              this.playersOnTeam2.length,
              this.playersOnTeam2[0]
            );
          }
          this.playerImages2.push(this.currPlayer.Image);
          this.setState({
            budget: this.state.budget,
            budget2: newBudget,
            result: "win",
          });
        } else {
          this.clickResult = "Can't afford this player";
          this.setState({
            budget: this.state.budget,
            budget2: this.state.budget2,
            result: "fail",
          });
        }
      }
      console.log("Team lengths");
      console.log(this.playersOnTeam1.length);
      console.log(this.playersOnTeam2.length);
    }
  };

  firstPlayerClient = (pid) => {
    fetch(`http://localhost:5000/firstPlayerClient?playerID=${pid}`);
  };

  addPlayerClient = (pid, index, firstID) => {
    fetch(
      `http://localhost:5000/addPlayerClient?playerID=${pid}&playerIndex=${index}&firstID=${firstID}`
    );
  };

  dropPlayerClient = (index, firstID) => {
    fetch(
      `http://localhost:5000/dropPlayerClient?playerIndex=${index}&firstID=${firstID}`
    );
  };

  dropLastClient = (index, firstID) => {
    fetch(
      `http://localhost:5000/dropLastClient?playerIndex=${index}&firstID=${firstID}`
    );
  };

  firstPlayerOpponent = (pid) => {
    fetch(`http://localhost:5000/firstPlayerOpponent?playerID=${pid}`);
  };

  addPlayerOpponent = (pid, index, firstID) => {
    fetch(
      `http://localhost:5000/addPlayerOpponent?playerID=${pid}&playerIndex=${index}&firstID=${firstID}`
    );
  };

  dropPlayerOpponent = (index, firstID) => {
    fetch(
      `http://localhost:5000/dropPlayerOpponent?playerIndex=${index}&firstID=${firstID}`
    );
  };

  dropLastOpponent = (index, firstID) => {
    fetch(
      `http://localhost:5000/dropLastOpponent?playerIndex=${index}&firstID=${firstID}`
    );
  };

  async playersOnTeam(s) {
    let r = await fetch(`http://localhost:5000/playersOnTeam?team=${s.team}`);
    this.playerNewStats = await r.json();
    // let res = await r.json();
    this.setState({playerStats: this.playerNewStats}, () => {
      console.log("query results");
      console.log(this.state.playerStats);
    });
  }

  handleSubmit(event) {
    alert("Team" + this.state.team);
    event.preventDefault();
  }

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({team: event.target.value}, () => {
          console.log(this.state.team);
          this.playersOnTeam(this.state);
        });
    };

  async stats(s) {
    let r = await fetch(`http://localhost:5000/stats?stat=${s.stats}`);
    this.playerNewStats = await r.json();
    this.setState({playerStats: this.playerNewStats}, () => {
      console.log("query results");
      console.log(this.state.playerStats);
    });
  }

  handleSubmit1(event) {
    alert("stats" + this.state.stats);
    event.preventDefault();
  }

  handleChange1 = (event) => {
    console.log(event.target.value);
    this.setState({ stats: event.target.value }, () => {
      this.stats(this.state);
    });
  };

  async statsInRange(s) {
    let r = await fetch(
      `http://localhost:5000/statsInRange?stat=${s.stats}&range=${s.range}`
    );
    this.playerNewStats = await r.json();
    this.setState({playerStats: this.playerNewStats}, () => {
      console.log("query results");
      console.log(this.state.playerStats);
    });
  }

  handleSubmit2(event) {
    alert("Range" + this.state.range);
    event.preventDefault();
  }

  handleChange2 = (event) => {
    console.log(event.target.value);
    this.setState({ range: event.target.value }, () => {
      this.statsInRange(this.state);
    });
  };

  async groupByCost(s) {
    let r = await fetch(`http://localhost:5000/groupByCost?stat=${s}`);
    let res = await r.json();
    this.setState({costBreakdown: res}, () => {
      if (s === "SPG" || s === "BPG") {
        for (let t of this.state.costBreakdown) {
          t.stat = t.stat.toFixed(2);
        }
        this.setState({costBreakdown: this.state.costBreakdown});
      } else if (s === "Stat") {
        this.setState({costBreakdown:
              [{Cost: 5, stat: 0}, {Cost: 4, stat: 0}, {Cost: 3, stat: 0}, {Cost: 2, stat: 0}, {Cost: 1, stat: 0}]});
      }
      console.log("Query result");
      console.log(this.state.costBreakdown);
    });
  }

  handleChange3 = (event) => {
    console.log(event.target.value);
    this.setState({ aggStat: event.target.value }, () => {
      this.groupByCost(this.state.aggStat);
    });
  };

  // Map over this.state.players and render a player component for each player
  render() {
    return (
      <Wrapper main="NBA All-Star Battle">
        <Title />
        <SubHeading main="Choose your Team!" />
        <SubHeading sub={`Team 1 Budget: ${this.state.budget}`} />
        <SubHeading sub={`Team 2 Budget: ${this.state.budget2}`} />
        <Message message={""} result={this.state.result} />
        <label>
          Team:
          <select value={this.state.team} onChange={this.handleChange.bind(this)}>
            <option value="all">All</option>
            <option value="Lakers">Lakers</option>
            <option value="Clippers">Clippers</option>
            <option value="Bucks">Bucks</option>
            <option value="Rockets">Rockets</option>
            <option value="Mavericks">Mavericks</option>
            <option value="76ers">76ers</option>
            <option value="Heat">Heat</option>
            <option value="Pelicans">Pelicans</option>
            <option value="Thunder">Thunder</option>
            <option value="Jazz">Jazz</option>
            <option value="Celtics">Celtics</option>
            <option value="Nuggets">Nuggets</option>
            <option value="Raptors">Raptors</option>
            <option value="Suns">Suns</option>
            <option value="Pacers">Pacers</option>
            <option value="Trail Blazers">Trail Blazers</option>
            <option value="Hawks">Hawks</option>
          </select>
        </label>
        <label>
          Stats:
          <select value={this.state.stats} onChange={this.handleChange1.bind(this)}>
            <option value="all">All</option>
            <option value="PPG">PPG</option>
            <option value="RPG">RPG</option>
            <option value="APG">APG</option>
            <option value="SPG">SPG</option>
            <option value="BPG">BPG</option>
          </select>
        </label>
        <label>
          Range:
          <select value={this.state.range} onChange={this.handleChange2}>
            <option value="all">All</option>
            <option value="0-5">0-5</option>
            <option value="5-10">5-10</option>
            <option value="10-15">10-15</option>
            <option value="15-20">15-20</option>
            <option value="20-25">20-25</option>
            <option value="25-30">25-30</option>
            <option value="30-35">30-35</option>
          </select>
        </label>
        <Message message={""} result={this.state.fail} />
        <label>
          Cost Breakdown:
          <select
              value={this.state.aggStat}
              onChange={this.handleChange3}
          >
            <option value="Stat"></option>
            <option value="PPG">PPG</option>
            <option value="RPG">RPG</option>
            <option value="APG">APG</option>
            <option value="SPG">SPG</option>
            <option value="BPG">BPG</option>
          </select>
        </label>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th> Cost </th>
              <td> ${this.state.costBreakdown[0].Cost} </td>
              <td> ${this.state.costBreakdown[1].Cost} </td>
              <td> ${this.state.costBreakdown[2].Cost} </td>
              <td> ${this.state.costBreakdown[3].Cost} </td>
              <td> ${this.state.costBreakdown[4].Cost} </td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th> AVG {this.state.aggStat}</th>
              <td> {this.state.costBreakdown[0].stat}</td>
              <td> {this.state.costBreakdown[1].stat}</td>
              <td> {this.state.costBreakdown[2].stat}</td>
              <td> {this.state.costBreakdown[3].stat}</td>
              <td> {this.state.costBreakdown[4].stat}</td>
            </tr>
            </tbody>
          </Table>
        <Message message={this.clickResult} result={this.state.result} />
        {this.playerNewStats.map((player) => (
          <Pic
            playerStats={this.playerNewStats}
            budget={this.recordBudget}
            Cost={player.Cost ? `Cost: $ ${player.Cost}` : " "}
            PPG={player.Points ? `PPG: ${player.Points}` : " "}
            RPG={player.Rebounds ? `RPG: ${player.Rebounds}` : " "}
            APG={player.Assists ? `APG: ${player.Assists}` : " "}
            SPG={player.Steals ? `SPG: ${player.Steals}` : " "}
            BPG={player.Blocks ? `BPG: ${player.Blocks}` : " "}
            id={player.Ranking}
            key={player.Ranking}
            image={player.Image}
          />
        ))}
        <Message message={""} result={this.state.fail} />
        <Button
          onClick={() => {
            this.clickPlay = "Players Loaded";
            this.setState({
              playerStats: this.playerNewStats,
              budget: this.state.budget,
              result: "fail",
            });
          }}
          type="button"
          buttonStyle="btn--play--solid"
          buttonSize="btn--medium"
        >
          Play!
        </Button>
        <Message message={this.clickPlay} result={this.state.fail} />
        <BattleTitle />
        <IndentHeading main="Team Big Ballers:" />
        {this.playerImages1.map((player) => (
          <Team image={player} />
        ))}
        <Message message={this.clickDrop} result={this.state.fail} />
        <Button
          onClick={() => {
            if (
              this.playersOnTeam1.length > 0 &&
              this.playersOnTeam2.length > 0
            ) {
              let tradePlayer = this.playerImages1.pop();
              let tradePlayer2 = this.playerImages2.pop();
              this.playerImages1.push(tradePlayer2);
              this.playerImages2.push(tradePlayer);
              this.setState({
                budget: this.state.budget,
                budget2: this.state.budget2,
                result: "win",
              });
            }
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn-small"
        >
          Trade
        </Button>
        <Button
          onClick={() => {
            this.clickDrop = "Last Player Dropped";
            if (this.playersOnTeam1.length > 0) {
              var playerIndex = this.playersOnTeam1.length;
              if (this.playersOnTeam1.length === 1) {
                this.dropLastClient(playerIndex, this.playersOnTeam1[0]);
              } else {
                this.dropPlayerClient(playerIndex, this.playersOnTeam1[0]);
              }
              var playerRemoved = this.playersOnTeam1.pop();
              this.currPlayer = this.playerNewStats.filter(function (item) {
                return item.Ranking === playerRemoved;
              })[0];
              console.log("ID of player removed:");
              console.log(playerRemoved);
              console.log(this.playersOnTeam1.length);
              // which player was dropped? 1-5
              console.log("Index of player removed");
              console.log(playerIndex);
              // this.playersOnTeam1.pop();
              this.playerImages1.pop();
              this.setState({
                budget: this.state.budget + this.currPlayer.Cost,
                result: "fail",
              });
            }
          }}
          type="button"
          buttonStyle="btn--danger--solid"
          buttonSize="btn-small"
        >
          Drop
        </Button>
        <Button
          onClick={() => {
            console.log("sum");
          }}
          type="button"
          buttonStyle="btn--rank--solid"
          buttonSize="btn-small"
        >
          TeamRank
        </Button>
        <IndentHeading main="Versus" />
        <Button
          onClick={() => {
            if (
              this.playersOnTeam1.length === 5 &&
              this.playersOnTeam2.length === 5
            ) {
              this.BattleStatus = "See Results";
              let random = Math.floor(
                Math.random() * this.BattleMessages.length
              );
              this.results = `${this.BattleMessages[random]}`;
              this.setState({
                budget: this.state.budget,
                result: "win",
              });
            } else {
              this.BattleStatus = "Both teams dont have full rosters";
              this.setState({
                budget: this.state.budget,
                result: "fail",
              });
            }
          }}
          type="button"
          buttonStyle="btn--warning--solid"
          buttonSize="btn-small"
        >
          Battle
        </Button>
        <Message message={this.BattleStatus} result={this.state.fail} />
        <Button
          onClick={() => {
            console.log("sum");
          }}
          type="button"
          buttonStyle="btn--team--solid"
          buttonSize="btn-small"
        >
          Show Total Team Stats
        </Button>
        <IndentHeading main="Team Ankle Breakers:" />
        {this.playerImages2.map((player) => (
          <Team2 image={player} />
        ))}
        <Message message={this.clickDrop2} result={this.state.fail} />
        <Button
          onClick={() => {
            if (
              this.playersOnTeam1.length > 0 &&
              this.playersOnTeam2.length > 0
            ) {
              let tradePlayer = this.playerImages1.pop();
              let tradePlayer2 = this.playerImages2.pop();
              this.playerImages1.push(tradePlayer2);
              this.playerImages2.push(tradePlayer);
              this.setState({
                budget: this.state.budget,
                budget2: this.state.budget2,
                result: "win",
              });
            }
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn-small"
        >
          Trade
        </Button>
        <Button
          onClick={() => {
            this.clickDrop2 = "Last Player Dropped";
            if (this.playersOnTeam2.length > 0) {
              var playerIndex = this.playersOnTeam2.length;
              if (this.playersOnTeam2.length === 1) {
                this.dropLastOpponent(playerIndex, this.playersOnTeam2[0]);
              } else {
                this.dropPlayerOpponent(playerIndex, this.playersOnTeam2[0]);
              }
              var playerRemoved = this.playersOnTeam2.pop();
              this.currPlayer = this.playerNewStats.filter(function (item) {
                return item.Ranking === playerRemoved;
              })[0];
              console.log("ID of player removed:");
              console.log(playerRemoved);
              console.log(this.playersOnTeam2.length);
              console.log("Index of player removed:");
              console.log(playerIndex);
              this.playerImages2.pop();
              this.setState({
                budget: this.state.budget,
                budget2: this.state.budget2 + this.currPlayer.Cost,
                result: "win",
              });
            }
          }}
          type="button"
          buttonStyle="btn--danger--solid"
          buttonSize="btn-small"
        >
          Drop
        </Button>
        <Button
          onClick={() => {
            console.log("sum");
          }}
          type="button"
          buttonStyle="btn--rank--solid"
          buttonSize="btn-small"
        >
          TeamRank
        </Button>
        <IndentHeading main="Results:" />
        <Message message={this.results} result={this.state.win} />
      </Wrapper>
    );
  }
}

export default App;
