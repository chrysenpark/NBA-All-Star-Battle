import React, { Component } from "react";
import Pic from "./components/Pic";
import Team from "./components/Team";
import Team2 from "./components/Team2";

import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Message from "./components/Message";
import SubHeading from "./components/SubHeading";
import pics from "./pics.json";
import IndentHeading from "./components/IndentHeading";
import "./App.css";
import BattleTitle from "./components/BattleTitle";
import Button from "./components/Buttons";

class App extends Component {
  // Setting this.state.pics to the players json array
  state = {
    pics,
    // clicked,
    score: 15,
    result: "win",
      team1Name: "",
      team2Name:""
  };
  playerStats = [];
  playersOnTeam1 = [];
  playersOnTeam2 = [];
  playerImages1 = [];
  playerImages2 = [];
  // team1Name = "Big Ballers";
  // team2Name = "";
  clickResult = "";
  clickWinMessages = [
    "Solid Pick Up!",
    "Great Pick!",
    "Amazing Choice!",
    "Your team is unbeatable! already",
    "Winning pick"
  ];

  async componentDidMount() {
        let r = await fetch('http://localhost:5000/playerStats');
        this.playerStats = await r.json();
        console.log(this.playerStats);
        // fetch('http://localhost:5000/playerStats')
        //     .then(response => response.json())
        //     .then(result => this.playerStats = result)
        //     .catch(err => console.error(err));
        // console.log(this.playerStats);
    };

    // async componentDidMount() {
    //     this.getStats();
    // }

  recordScore = id => {
    let maxTeamSize = 5;
    // if the clicked player was clicked before...

    if (
      this.playersOnTeam1.length === maxTeamSize &&
      this.playersOnTeam2.length === maxTeamSize
    ) {
      this.clickResult =
        "Sorry your team is full! Trade/drop before you sign a new player";
      this.setState({
        score: this.state.score,
        result: "fail"
      });
    } else if (
      this.playersOnTeam1.includes(id) &&
      this.playersOnTeam1.length !== maxTeamSize
    ) {
      this.clickResult = "Sorry, you picked that player already.";
      this.setState({
        score: this.state.score,
        result: "fail"
      });
    } else if (this.playersOnTeam2.includes(id)) {
      this.clickResult = "Sorry, you picked that player already.";
      this.setState({
        score: this.state.score,
        result: "fail"
      });
    }
    // if the clicked player wasn't picked before...
    else {
      if (
        this.playersOnTeam1.length === maxTeamSize - 1 &&
        this.playersOnTeam2.length === 0
      ) {
        this.clickResult = "Now Its Your Opponents Turn to Pick His Team";
        ///"Sorry your team is full! Trade/drop before you sign a new player";
        this.setState({
          score: 15,
          result: "win"
        });
      } else {
        let random = Math.floor(Math.random() * this.clickWinMessages.length);
        this.clickResult = `${this.clickWinMessages[random]}`;
        let score = this.state.score;
        let newScore = score - 1;
        this.setState({
          score: newScore,
          result: "win"
        });
      }
      console.log(this.playersOnTeam1.length);
      console.log(this.playersOnTeam2.length);

      let found = pics.filter(function(item) {
        return item.id === id;
      })[0];
      if (this.playersOnTeam1.length !== maxTeamSize) {
        this.playersOnTeam1.push(id);
        console.log("Player IDs");
        console.log(this.playersOnTeam1);
        console.log("Index of player just added");
        console.log(this.playersOnTeam1.length);
        console.log("Team name");
        console.log(this.state.team1Name);
        this.addPlayerClient(this.state, id, this.playersOnTeam1.length);
        this.playerImages1.push(found.image);
      } else {
          this.playersOnTeam2.push(id);
          console.log(this.playersOnTeam2);
          console.log("Index of player just added");
          console.log(this.playersOnTeam2.length);
          console.log("Team name");
          console.log(this.state.team2Name);
          this.addPlayerOpponent(this.state, id, this.playersOnTeam2.length);
          this.playerImages2.push(found.image);
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
            score: this.state.score,
            result: this.state.result,
            team1Name: e.target.value,
            team2Name: this.state.team2Name
        })
    };

    changeTeam2Name = e => {
        this.setState({
            score: this.state.score,
            result: this.state.result,
            team1Name: this.state.team1Name,
            team2Name: e.target.value
        });
    };


  // Map over this.state.pics and render a Pic component for each player
  render() {
    return (
      <Wrapper main="NBA All-Star Battle">
        <Title />
        <SubHeading main="Choose your Team!" />
        <SubHeading sub={`Budget: ${this.state.score}`} />
        <Message message={this.clickResult} result={this.state.result} />
        {this.state.pics.map(pic => (
          <Pic
            pics={this.state.pics}
            score={this.recordScore}
            id={pic.id}
            key={pic.id}
            image={pic.image}
          />
        ))}
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
        {this.playerImages1.map(player => (
          <Team image={player} />
        ))}

        <Button
          onClick={() => {
            console.log("you Clicked one me");
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn-small"
        >
          Trade
        </Button>
        <Button
          onClick={() => {
            console.log("Team1 dropped a player");
              var playerRemoved = this.playersOnTeam1.pop();
              console.log("ID of player removed:");
              console.log(playerRemoved);
              console.log(this.playersOnTeam1.length);
              // which player was dropped? 1-5
              var playerIndex = this.playersOnTeam1.length + 1;
              console.log("Index of player removed");
              console.log(playerIndex);
              this.dropPlayerClient(this.state, playerRemoved, playerIndex);
              this.playerImages1.pop();
          }}
          type="button"
          buttonStyle="btn--danger--solid"
          buttonSize="btn-small"
        >
          Drop
        </Button>

        <IndentHeading main="Versus" />
        <Button
          onClick={() => {
            console.log("you Clicked one me");
          }}
          type="button"
          buttonStyle="btn--warning--solid"
          buttonSize="btn-small"
        >
          Battle
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
        {this.playerImages2.map(player => (
          <Team2 image={player} />
        ))}
        <Button
          onClick={() => {
            console.log("you Clicked one me");
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn-small"
        >
          Trade
        </Button>

        <Button
          onClick={() => {
            console.log("you Clicked one me");
            var playerRemoved = this.playersOnTeam2.pop();
              console.log("ID of player removed:");
            console.log(playerRemoved);
            console.log(this.playersOnTeam2.length);
              var playerIndex = this.playersOnTeam2.length + 1;
              console.log("Index of player removed:");
              console.log(playerIndex);
              this.dropPlayerOpponent(this.state, playerRemoved, playerIndex);
            this.playerImages2.pop();
          }}
          type="button"
          buttonStyle="btn--danger--solid"
          buttonSize="btn-small"
        >
          Drop
        </Button>
        <IndentHeading main="Results:" />
      </Wrapper>
    );
  }
}

export default App;
