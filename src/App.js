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
          console.log("Team name");
          console.log(this.state.team1Name);
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
    let res = await r.json();
    console.log("query results");
    console.log(res);
  }

  handleSubmit(event) {
    alert("Team" + this.state.team);
    event.preventDefault();
  }

  handleChange = (event) => {
    console.log(event.target.team);
    this.setState({ team: event.target.team });
    console.log(this.state.team);
    this.playersOnTeam(this.state);
  };

  async stats(s) {
    let r = await fetch(`http://localhost:5000/stats?stat=${s.stats}`);
    let res = await r.json();
    console.log("query results");
    console.log(res);
  }

  handleSubmit1(event) {
    alert("stats" + this.state.stats);
    event.preventDefault();
  }

  handleChange1 = (event) => {
    console.log(event.target.stat);
    this.setState({ stats: event.target.stat });
    console.log(this.state.stat);
    this.stats(this.state);
  };

  async statsInRange(s) {
    let r = await fetch(
      `http://localhost:5000/statsInRange?stat=${s.stats}&range=${s.range}`
    );
    let res = await r.json();
    console.log("query results");
    console.log(res);
  }

  handleSubmit2(event) {
    alert("Range" + this.state.range);
    event.preventDefault();
  }

  handleChange2 = (event) => {
    console.log(event.target.range);
    this.setState({ range: event.target.range });
    console.log(this.state.range);
    this.statsInRange(this.state);
  };

  // Map over this.state.players and render a player component for each player
  render() {
    return (
      <Wrapper main="NBA All-Star Battle">
        <Title />
        <SubHeading main="Choose your Team!" />
        <SubHeading sub={`Team 1 Budget: ${this.state.budget}`} />
        <SubHeading sub={`Team 2 Budget: ${this.state.budget2}`} />
        <label>
          Team:
          <select team={this.state.team} onChange={this.handleChange}>
            <option team="all">All</option>
            <option team="Lakers">Lakers</option>
            <option team="Clippers">Clippers</option>
            <option team="Bucks">Bucks</option>
            <option team="Rockets">Rockets</option>
            <option team="Mavericks">Mavericks</option>
            <option team="Sixers">Sixers</option>
            <option team="Heat">Heat</option>
            <option team="Pelicans">Pelicans</option>
            <option team="Thunder">Thunder</option>
            <option team="Jazz">Jazz</option>
            <option team="Celtics">Celtics</option>
            <option team="Nuggets">Nuggets</option>
            <option team="Raptors">Raptors</option>
            <option team="Suns">Suns</option>
            <option team="Pacers">Pacers</option>
          </select>
        </label>
        <label>
          Stats:
          <select stat={this.state.stats} onChange={this.handleChange1}>
            <option stat="all">All</option>
            <option stat="PPG">PPG</option>
            <option stat="RPG">RPG</option>
            <option stat="APG">APG</option>
            <option stat="SPG">SPG</option>
            <option stat="BPG">BPG</option>
          </select>
        </label>
        <label>
          Range:
          <select range={this.state.range} onChange={this.handleChange2}>
            <option range="all">All</option>
            <option range="15-20">15-20</option>
            <option range="20-25">20-25</option>
            <option range="25-30">25-30</option>
            <option range="30-35">30-35</option>
          </select>
        </label>
        <Message message={this.clickResult} result={this.state.result} />

        {this.playerNewStats.map((player) => (
          <Pic
            playerStats={this.playerNewStats}
            budget={this.recordBudget}
            Cost={`Cost: $${player.Cost}`}
            PPG={`PPG: ${player.Points}`}
            RPG={`RPG:${player.Rebounds}`}
            APG={`APG: ${player.Assists}`}
            SPG={`SPG: ${player.Steals}`}
            BPG={`BPG: ${player.Blocks}`}
            id={player.Ranking}
            key={player.Ranking}
            image={player.Image}
          />
        ))}
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
