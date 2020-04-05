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
        value: "",
        team1Name: "",
        team2Name:""
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
    "Winning pick"
  ];
    BattleMessages = ["Team Big Ballers Wins", "Team Ankle Breakers Wins"];

  async componentDidMount() {
        let r = await fetch('http://localhost:5000/playerStats');
        this.playerNewStats = await r.json();
        console.log(this.playerNewStats);
        // fetch('http://localhost:5000/playerStats')
        //     .then(response => response.json())
        //     .then(result => this.playerStats = result)
        //     .catch(err => console.error(err));
    };

  // recordScore = id => {
  //   let maxTeamSize = 5;
  //   // if the clicked player was clicked before...
  //
  //   if (
  //     this.playersOnTeam1.length === maxTeamSize &&
  //     this.playersOnTeam2.length === maxTeamSize
  //   ) {
  //     this.clickResult =
  //       "Sorry your team is full! Trade/drop before you sign a new player";
  //     this.setState({
  //       score: this.state.score,
  //       result: "fail"
  //     });
  //   } else if (
  //     this.playersOnTeam1.includes(id) &&
  //     this.playersOnTeam1.length !== maxTeamSize
  //   ) {
  //     this.clickResult = "Sorry, you picked that player already.";
  //     this.setState({
  //       score: this.state.score,
  //       result: "fail"
  //     });
  //   } else if (this.playersOnTeam2.includes(id)) {
  //     this.clickResult = "Sorry, you picked that player already.";
  //     this.setState({
  //       score: this.state.score,
  //       result: "fail"
  //     });
  //   }
  //   // if the clicked player wasn't picked before...
  //   else {
  //     if (
  //       this.playersOnTeam1.length === maxTeamSize - 1 &&
  //       this.playersOnTeam2.length === 0
  //     ) {
  //       this.clickResult = "Now Its Your Opponents Turn to Pick His Team";
  //       this.setState({
  //         score: 15,
  //         result: "win"
  //       });
  //     } else {
  //       let random = Math.floor(Math.random() * this.clickWinMessages.length);
  //       this.clickResult = `${this.clickWinMessages[random]}`;
  //       let score = this.state.score;
  //       let newScore = score - 1;
  //       this.setState({
  //         score: newScore,
  //         result: "win"
  //       });
  //     }
  //     console.log(this.playersOnTeam1.length);
  //     console.log(this.playersOnTeam2.length);
  //
  //     let found = pics.filter(function(item) {
  //       return item.id === id;
  //     })[0];
  //     if (this.playersOnTeam1.length !== maxTeamSize) {
  //       this.playersOnTeam1.push(id);
  //       console.log("Player IDs");
  //       console.log(this.playersOnTeam1);
  //       console.log("Index of player just added");
  //       console.log(this.playersOnTeam1.length);
  //       console.log("Team name");
  //       console.log(this.state.team1Name);
  //       this.addPlayerClient(this.state, id, this.playersOnTeam1.length);
  //       this.playerImages1.push(found.image);
  //     } else {
  //         this.playersOnTeam2.push(id);
  //         console.log(this.playersOnTeam2);
  //         console.log("Index of player just added");
  //         console.log(this.playersOnTeam2.length);
  //         console.log("Team name");
  //         console.log(this.state.team2Name);
  //         this.addPlayerOpponent(this.state, id, this.playersOnTeam2.length);
  //         this.playerImages2.push(found.image);
  //     }
  //     console.log("Team lengths");
  //       console.log(this.playersOnTeam1.length);
  //       console.log(this.playersOnTeam2.length);
  //   }
  // };

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
                    this.addPlayerClient(this.state, id, this.playersOnTeam1.length);
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
                    console.log("Team name");
                    console.log(this.state.team2Name);
                    this.addPlayerOpponent(this.state, id, this.playersOnTeam2.length);
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

  addTeamClient = s => {
      fetch(`http://localhost:5000/newTeamClient?teamName=${s.team1Name}`);
  };

  addPlayerClient = (s, pid, index) => {
      fetch(`http://localhost:5000/addPlayerClient?teamName=${s.team1Name}&playerID=${pid}&playerIndex=${index}`);
  };

  dropPlayerClient = (s, pid, index) => {
      fetch(`http://localhost:5000/dropPlayerClient?teamName=${s.team1Name}&playerID=${pid}&playerIndex=${index}`);
  };

  addTeamOpponent = s => {
      fetch(`http://localhost:5000/newTeamOpponent?teamName=${s.team2Name}`);
  };

  addPlayerOpponent = (s, pid, index) => {
      fetch(`http://localhost:5000/addPlayerOpponent?teamName=${s.team2Name}&playerID=${pid}&playerIndex=${index}`);
  };

  dropPlayerOpponent = (s, pid, index) => {
      fetch(`http://localhost:5000/dropPlayerOpponent?teamName=${s.team2Name}&playerID=${pid}&playerIndex=${index}`);
  };

    changeTeam1Name = e => {
        this.setState({
            // score: this.state.score,
            result: this.state.result,
            team1Name: e.target.value,
            team2Name: this.state.team2Name
        })
    };

    changeTeam2Name = e => {
        this.setState({
            // score: this.state.score,
            result: this.state.result,
            team1Name: this.state.team1Name,
            team2Name: e.target.value
        });
    };

    handleSubmit(event) {
        alert("Team" + this.state.team);
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({ value: event.target.team });
    };

    handleSubmit1(event) {
        alert("stats" + this.state.stat);
        event.preventDefault();
    }

    handleChange1 = (event) => {
        this.setState({ value1: event.target.stat });
    };
    handleSubmit2(event) {
        alert("Range" + this.state.range);
        event.preventDefault();
    }

    handleChange2 = (event) => {
        this.setState({ value: event.target.range });
    };


  // Map over this.state.pics and render a Pic component for each player
  // render() {
  //   return (
  //     <Wrapper main="NBA All-Star Battle">
  //       <Title />
  //       <SubHeading main="Choose your Team!" />
  //       <SubHeading sub={`Budget: ${this.state.score}`} />
  //       <Message message={this.clickResult} result={this.state.result} />
  //       {this.state.pics.map(pic => (
  //         <Pic
  //           pics={this.state.pics}
  //           score={this.recordScore}
  //           id={pic.id}
  //           key={pic.id}
  //           image={pic.image}
  //         />
  //       ))}
  //       <BattleTitle />
  //       <IndentHeading main="Team Big Ballers:" />
  //         <IndentHeading main="Enter your team name!" />
  //       <input type="text"
  //              value={this.state.team1Name}
  //               onChange = {this.changeTeam1Name.bind(this)}/>
  //       <Button onClick={() => {this.addTeamClient(this.state)}}
  //               type="button"
  //               buttonSize="btn-small"
  //       > Create your team! </Button>
  //       {this.playerImages1.map(player => (
  //         <Team image={player} />
  //       ))}
  //
  //       <Button
  //         onClick={() => {
  //           console.log("you Clicked one me");
  //         }}
  //         type="button"
  //         buttonStyle="btn--primary--solid"
  //         buttonSize="btn-small"
  //       >
  //         Trade
  //       </Button>
  //       <Button
  //         onClick={() => {
  //           console.log("Team1 dropped a player");
  //             var playerRemoved = this.playersOnTeam1.pop();
  //             console.log("ID of player removed:");
  //             console.log(playerRemoved);
  //             console.log(this.playersOnTeam1.length);
  //             // which player was dropped? 1-5
  //             var playerIndex = this.playersOnTeam1.length + 1;
  //             console.log("Index of player removed");
  //             console.log(playerIndex);
  //             this.dropPlayerClient(this.state, playerRemoved, playerIndex);
  //             this.playerImages1.pop();
  //         }}
  //         type="button"
  //         buttonStyle="btn--danger--solid"
  //         buttonSize="btn-small"
  //       >
  //         Drop
  //       </Button>
  //
  //       <IndentHeading main="Versus" />
  //       <Button
  //         onClick={() => {
  //           console.log("you Clicked one me");
  //         }}
  //         type="button"
  //         buttonStyle="btn--warning--solid"
  //         buttonSize="btn-small"
  //       >
  //         Battle
  //       </Button>
  //
  //       <IndentHeading main="Team Ankle Breakers:" />
  //         <IndentHeading main="Enter your opponent's team name!" />
  //         <input type="text"
  //                value={this.state.team2Name}
  //                onChange = {this.changeTeam2Name.bind(this)}/>
  //         <Button onClick={() => {this.addTeamOpponent(this.state)}}
  //                 type="button"
  //                 buttonSize="btn-small"
  //         > Create your opponent's team! </Button>
  //       {this.playerImages2.map(player => (
  //         <Team2 image={player} />
  //       ))}
  //       <Button
  //         onClick={() => {
  //           console.log("you Clicked one me");
  //         }}
  //         type="button"
  //         buttonStyle="btn--primary--solid"
  //         buttonSize="btn-small"
  //       >
  //         Trade
  //       </Button>
  //
  //       <Button
  //         onClick={() => {
  //           console.log("you Clicked one me");
  //           var playerRemoved = this.playersOnTeam2.pop();
  //             console.log("ID of player removed:");
  //           console.log(playerRemoved);
  //           console.log(this.playersOnTeam2.length);
  //             var playerIndex = this.playersOnTeam2.length + 1;
  //             console.log("Index of player removed:");
  //             console.log(playerIndex);
  //             this.dropPlayerOpponent(this.state, playerRemoved, playerIndex);
  //           this.playerImages2.pop();
  //         }}
  //         type="button"
  //         buttonStyle="btn--danger--solid"
  //         buttonSize="btn-small"
  //       >
  //         Drop
  //       </Button>
  //       <IndentHeading main="Results:" />
  //     </Wrapper>
  //   );
  // }

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
                        <option team="Clippers">Clipers</option>
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
                    <select stat={this.state.stat} onChange={this.handleChange1}>
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
                <IndentHeading main="Enter your team name!" />
                <input type="text"
                       value={this.state.team1Name}
                       onChange = {this.changeTeam1Name.bind(this)}/>
                <Button onClick={() => {this.addTeamClient(this.state)}}
                        type="button"
                        buttonSize="btn-small"
                > Create your team! </Button>
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
                            var playerRemoved = this.playersOnTeam1.pop();
                            console.log("ID of player removed:");
                            console.log(playerRemoved);
                            console.log(this.playersOnTeam1.length);
                            // which player was dropped? 1-5
                            var playerIndex = this.playersOnTeam1.length + 1;
                            console.log("Index of player removed");
                            console.log(playerIndex);
                            this.dropPlayerClient(this.state, playerRemoved, playerIndex);
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
                <IndentHeading main="Enter your opponent's team name!" />
                <input type="text"
                       value={this.state.team2Name}
                       onChange = {this.changeTeam2Name.bind(this)}/>
                <Button onClick={() => {this.addTeamOpponent(this.state)}}
                        type="button"
                        buttonSize="btn-small"
                > Create your opponent's team! </Button>
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
                        if (this.playersOnTeam1.length > 0) {
                            this.clickDrop2 = "Last Player Dropped";
                            // this.playersOnTeam2.pop();
                            var playerRemoved = this.playersOnTeam2.pop();
                            console.log("ID of player removed:");
                            console.log(playerRemoved);
                            console.log(this.playersOnTeam2.length);
                            var playerIndex = this.playersOnTeam2.length + 1;
                            console.log("Index of player removed:");
                            console.log(playerIndex);
                            this.dropPlayerOpponent(this.state, playerRemoved, playerIndex);
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
